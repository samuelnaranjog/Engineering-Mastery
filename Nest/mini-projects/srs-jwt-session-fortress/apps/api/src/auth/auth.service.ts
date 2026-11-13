import { Inject, Injectable, NotFoundException, UnauthorizedException, OnApplicationBootstrap } from '@nestjs/common';
import { LoginDto } from './dto/login.dto.js';
import { DRIZZLE } from '../database/database.tokens.js';
import type { DrizzleDBSchema } from '../database/database.module.js';
import { NewRefreshToken, refresh_tokens, RefreshToken, User, users } from '../database/schema/auth.schema.js';
import { eq } from 'drizzle-orm';
import * as crypto from 'node:crypto';

import { ConfigService } from '@nestjs/config';
// Utils
import {hashPassword, verifyPassword} from '../common/utils/password.util.js';


const FIFTEEN_MINUTES_MS = 15 * 60 * 1000;
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

@Injectable()
export class AuthService {
  private readonly refreshSecret: string;
  private readonly accessSecret: string;
  

  constructor(
    @Inject(DRIZZLE) private readonly db: DrizzleDBSchema,
    private readonly configService: ConfigService) {

    const refreshSecret = this.configService.get<string>('REFRESH_TOKEN_SECRET');
    if (!refreshSecret) {
      throw new Error('REFRESH_TOKEN_SECRET is not defined in environment variables');
    }
    this.refreshSecret = refreshSecret;

    const accessSecret = this.configService.get<string>('ACCESS_TOKEN_SECRET');
    if (!accessSecret) {
      throw new Error('ACCESS_TOKEN_SECRET is not defined in environment variables');
    }
    this.accessSecret = accessSecret;

  }

    // Inserting synthetic data

    // Runs once after all modules are initialized and providers are ready
  async onApplicationBootstrap(): Promise<void> {
    try {
      await this.seedSyntheticUser();
      console.log('Synthetic user seed completed.');
    } catch (err) {
      console.log('Error seeding synthetic user:', err);
    }
  }
  private async seedSyntheticUser() {
    const email = 'synthetic@example.com';
    const rawPassword = 'SyntheticPassword123!';

    console.log(`Hashing password for synthetic user...`);
    const passwordHash = await hashPassword(rawPassword);

    await this.db.insert(users).values({
      email,
      passwordHash,
    });
  }


  async login(loginDto: LoginDto) {
    // Check the user is registered
    console.log('Attempting login for email:', loginDto.email);
    const [userData] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, loginDto.email))
      .limit(1);

    if (!userData) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check for a match
    const isPasswordValid = await verifyPassword(
      userData.passwordHash,
      loginDto.password
    );

    console.log('Password verification result:', isPasswordValid);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // 4. Generate tokens
    const { refreshTokenHash, rawRefreshToken } = this.generateRefreshToken();
    const accessToken = this.generateAccessToken(userData.id);

    // 5. Store the token
    await this.storeRefreshToken(userData, refreshTokenHash);

    return {
      user: { id: userData.id, email: userData.email },
      accessToken,
      rawRefreshToken,
    };
  }

  private generateRefreshToken(): { refreshTokenHash: string; rawRefreshToken: string } {
    // Creating the opaque key
    const rawRefreshToken = crypto.randomBytes(32).toString('hex');
    const refreshTokenHash = crypto
      .createHmac('sha256', this.refreshSecret)
      .update(rawRefreshToken)
      .digest('hex');

    console.log('Generated refresh token:', rawRefreshToken);
    console.log('Generated refresh token hash:', refreshTokenHash);

    return { refreshTokenHash, rawRefreshToken };
  }

  private async storeRefreshToken(userData: User, refreshToken: string) {
    const expiresAt = Date.now() + SEVEN_DAYS_MS;
    const tokenData: NewRefreshToken = {
      userId: userData.id,
      tokenHash: refreshToken,
      expiresAt: expiresAt,
    };

    // Upsert to handle existing sessions cleanly without SQLite unique constraint errors
    await this.db
      .insert(refresh_tokens)
      .values(tokenData)
      // .onConflictDoUpdate({
      //   target: refresh_tokens.userId,
      //   set: {
      //     tokenHash: tokenData.tokenHash,
      //     expiresAt: tokenData.expiresAt,
      //     revoked: false,
      //   },
      // });
  }

  private generateAccessToken(userId: number | string): string {
    // 1. Static JWT metadata (NOT an HTTP header)
    const jwtHeader = { alg: 'HS256', typ: 'JWT' };
    
    // 2. The token claims
    const payload = {
      sub: userId,
      exp: Date.now() + FIFTEEN_MINUTES_MS,
    };

    // 3. Encode both to base64url
    const encodedHeader = Buffer.from(JSON.stringify(jwtHeader)).toString('base64url');
    const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');

    // 4. Sign the combination
    const signature = crypto
      .createHmac('sha256', this.accessSecret)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest('base64url');

    // 5. Result: A standard RFC 7519 3-part JWT
    return `${encodedHeader}.${encodedPayload}.${signature}`;
  }

  async refreshAccessToken(refreshToken: string) {
    // We must check the refresh token from the cookie, validate it, and then issue a new access token.
    console.log('Received refresh token for validation:', refreshToken);

    const hashedRefreshToken = crypto.createHmac('sha256', this.refreshSecret).update(refreshToken).digest('hex');

    const [tokenData] : RefreshToken [] = await this.db.select().from(refresh_tokens).where(eq(refresh_tokens.tokenHash, hashedRefreshToken)).limit(1) 
    // Access database
    // if not match reject the generation and throw an error
    console.log('Fetched token data from database:', tokenData);
    if (!tokenData || tokenData.revoked || tokenData.expiresAt < Date.now()) {
      throw new UnauthorizedException('Invalid or expired refresh token');
    }

    // Yes, then issue the new access token and return it to the client
    const JWT = this.generateAccessToken(tokenData.userId); 
    return  {
      accessToken: JWT,
    }

  }
}
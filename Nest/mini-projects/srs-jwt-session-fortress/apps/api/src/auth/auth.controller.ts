import { Body, Controller, Post, Get, Res, HttpCode, HttpStatus, Header, Headers, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto } from './dto/login.dto.js';
import type  { Request, Response } from 'express';
import { AuthGuard } from './guards/access.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ) {
    // Must await the promise
    const { user, accessToken, rawRefreshToken } =
      await this.authService.login(loginDto);

    // Attach secure HTTP-only refresh cookie
    res.cookie('refreshToken', rawRefreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/', // Restrict cookie transmission to refresh route only
    });

    // Return accessToken and user info in response body
    return {
      accessToken,
      user,
    };
  }

  
  @Post('refresh')
  refreshAccessToken(@Req() req: Request) { 
    // Implementation for refreshing access token goes here
    const refreshToken = req.cookies['refreshToken']
    
    if (!refreshToken) {
      console.error('❌ FATAL: Refresh token is undefined. The browser did not send the cookie.');
    } else {
      console.log('✅ Refresh token successfully received by server.');
    }

    return this.authService.refreshAccessToken(refreshToken)
  }

  @UseGuards(AuthGuard)
  @Get('me')
  @HttpCode(HttpStatus.OK)
  getCurrentUser(@Req() req: Request) {
    console.log('✅ hit me route');
    return true // Assuming user info is attached to the request by an authentication middleware
  }
}
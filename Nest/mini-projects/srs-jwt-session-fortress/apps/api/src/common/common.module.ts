import { Module } from "@nestjs/common";
import HmacGuard from "./guards/Hmac.guard.js";

@Module({
    providers: [HmacGuard]
})

export class Common {}
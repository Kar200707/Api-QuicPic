import { Body, Controller, Post, Res } from "@nestjs/common";
import { Response } from "express";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }, @Res() res: Response) {
    const result = await this.authService.login(body.email, body.password);
    return res.status(result.status).json(result.data);
  }

  @Post('register')
  async register(@Body() body: { email: string; password: string }, @Res() res: Response) {
    const result = await this.authService.register(body.email, body.password);
    return res.status(result.status).json(result.data);
  }
}

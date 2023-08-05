import { Body, Controller, Post, ValidationPipe, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthCredentialDto } from './dto/auth-credential.dto'
import { AuthGuard } from '@nestjs/passport'
import { GetUser } from './get-user.decorator'
import { User } from './user.entity'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<void> {
    return this.authService.signUp(authCredentialDto)
  }

  @Post('/login')
  login(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto): Promise<{ userName: string; accessToken: string }> {
    return this.authService.login(authCredentialDto)
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    console.log('req', user)
  }
}

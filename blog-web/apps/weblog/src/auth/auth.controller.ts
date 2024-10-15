import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/index';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  // @UseGuards(AdminGuard)
  // @ApiConsumes('application/json')
  // @ApiBearerAuth()
  signup(@Body() authDto: AuthDto) {
    return this.authService.signup(authDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  signin(@Body() authDto: AuthDto) {
    return this.authService.signin(authDto);
  }

  // @Get()
  // findAll(): string {
  //   // return this.authService.findAll();
  //   return 'yourJsonString';
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return 'this.authService.findOne(+id)' + id;
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() authDto: AuthDto) {
  //   return 'this.authService.update(+id, updateAuthDto)' + id + authDto;
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return 'this.authService.remove(+id)';
  // }
}

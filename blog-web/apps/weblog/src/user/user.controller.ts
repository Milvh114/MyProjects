import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '@app/database-type-orm/constants/enum';
import { RolesGuard } from '../auth/guard/roles.guard';
import { IsAdmin } from '../auth/decorators/isAdmin.decorator';
import { AdminGuard } from '../auth/guard/admin.guard';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto) {
    return this.userService.createUser(createUserDto);
  }

  // @UseGuards(AuthGuard)
  // @Public()
  // @UseGuards(RolesGuard)
  // @Roles(Role.Admin, Role.User)
  @UseGuards(AdminGuard)
  @IsAdmin(1)
  @Get('profile')
  getProfile(@Req() req) {
    console.log(req.user.sub)
    return req.user;
  }
  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}

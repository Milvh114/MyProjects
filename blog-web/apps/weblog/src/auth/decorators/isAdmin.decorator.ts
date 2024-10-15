import { SetMetadata } from '@nestjs/common';

export const IS_ADMIN_KEY = 'roles';
export const IsAdmin = (isAdmin: number) => SetMetadata(IS_ADMIN_KEY, isAdmin);

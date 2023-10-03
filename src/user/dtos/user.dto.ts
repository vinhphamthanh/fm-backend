import { Expose } from 'class-transformer'
import { IsString } from 'class-validator';

export class UserDto {
	@Expose()
	@IsString()
	email: string;

	@IsString()
	password: string;
}
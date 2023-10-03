import { Expose } from 'class-transformer';
import {
	IsBoolean,
	IsString,
} from 'class-validator';

export class AuthDto {
	@Expose()
	@IsString()
	email: string;

	@Expose()
	@IsBoolean()
	isAuthenticated: boolean;
}
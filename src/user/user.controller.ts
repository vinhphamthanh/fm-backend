import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Post,
} from '@nestjs/common';
import { SerializeDecorator } from '../interceptors-decorators/serialize.decorator';
import { UserDto } from './dtos/user.dto';
import { AuthDto } from './dtos/auth.dto';
import { UserService } from './user.service';

@Controller('')
@SerializeDecorator(AuthDto)
export class UserController {
	constructor(private readonly usersService: UserService) {}

	@Post('/register')
	async register(@Body() data: UserDto) {
		return await this.usersService.register(data);
	}

	@Post('/login')
	async login(@Body() data: UserDto) {
		const user = await this.usersService.login(data);

		console.log('login in the back end 00> ', user);
		if (!user) {
			throw new BadRequestException('Cannot fetch user!');
		}

		return {
			email: user?.email,
			isAuthenticated: true,
		};
	}

	@Delete()
	delete(email: string) {
		return this.usersService.delete(email);
	}
}

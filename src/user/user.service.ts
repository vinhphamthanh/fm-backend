import {
	BadRequestException,
	Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
	randomBytes,
	scrypt as _scrypt,
} from 'crypto';
import { Repository } from 'typeorm';
import { promisify } from 'util';
import { UserDto } from './dtos/user.dto';
import { Users } from './users.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class UserService {
	constructor(@InjectRepository(Users) private readonly repo: Repository<Users>) {}

	async register(data: UserDto) {
		const { email, password } = data;
		const verifyingUser = await this.repo.findOne({ where: { email } });

		if (verifyingUser) {
			throw new BadRequestException('This email already registered.');
		}

		const salt = randomBytes(8).toString('hex');
		const hash = (await scrypt(password, salt, 32)) as Buffer;
		const hashPassword = `${salt}.${hash.toString('hex')}`;
		const newData = {
			email,
			password: hashPassword,
		};

		const newUser = this.repo.create(newData);

		return this.repo.save(newUser);
	}

	async login(data: UserDto) {
		const { email, password } = data;
		const verifyingUser = await this.repo.findOne({ where: { email } });

		if (!verifyingUser) {
			return this.register(data);
		}

		const [salt, storedHash] = verifyingUser.password.split('.');
		const hash = (await scrypt(password, salt, 32)) as Buffer;

		if (storedHash !== hash.toString('hex')) {
			throw new BadRequestException('Email and Password mismatch!');
		}

		return verifyingUser;
	}

	async delete(email: string) {
		const user = await this.repo.findOne({ where: { email } });
		if (!user) {
			throw new BadRequestException('User not exist');
		}

		return this.repo.remove(user);
	}
}

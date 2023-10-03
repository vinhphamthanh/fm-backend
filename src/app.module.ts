import { APP_PIPE } from '@nestjs/core';
import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { Users } from './user/users.entity';

@Module({
  imports: [
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: 'funny_movies.sqlite',
			entities: [Users],
			synchronize: true,
		}),
		UserModule
	],
  controllers: [AppController],
  providers: [
		AppService,
		{
			provide: APP_PIPE,
			useValue: new ValidationPipe({
				whitelist: true,
			})
		}
	],
})
export class AppModule {}

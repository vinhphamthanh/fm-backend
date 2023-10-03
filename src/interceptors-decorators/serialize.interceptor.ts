import {
	CallHandler,
	ExecutionContext,
	NestInterceptor,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class SerializeInterceptor implements NestInterceptor {
	constructor(private readonly dto: any) {}

	intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
		return next.handle().pipe(map((data) => {
			return plainToInstance(this.dto, data, {
				excludeExtraneousValues: true,
			});
		}));
	}
}
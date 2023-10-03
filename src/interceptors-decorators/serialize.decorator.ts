import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from './serialize.interceptor';

interface Dto {
	new (...args: any[]): {}
}

export function SerializeDecorator(dto: Dto) {
	return UseInterceptors(new SerializeInterceptor(dto))
}
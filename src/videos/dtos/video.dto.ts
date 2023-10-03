import {
	IsString,
} from 'class-validator';

export class VideoDto {
	@IsString()
	title: string;

	@IsString()
	description: string;

	@IsString()
	youtubeId: string;

	@IsString()
	email: string;

	@IsString()
	likes: string;

	@IsString()
	dislikes: string;
}
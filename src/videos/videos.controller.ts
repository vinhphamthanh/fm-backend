import {
	Body,
	Controller,
	Get,
	NotFoundException,
	Post,
} from '@nestjs/common';
import axios from 'axios';
import { VideoDto } from './dtos/video.dto';
import { VideosService } from './videos.service';

@Controller('')
export class VideosController {
	constructor(private readonly videosService: VideosService) {}

	@Get('/')
	async fetchYoutube() {
		return this.videosService.findAll();
	}

	@Post('/share')
	async shareYoutube(@Body() body: { youtubeId: string, email: string }) {
		const { youtubeId, email } = body
		// TODO: check here for video existing....
		const options = {
			method: 'GET',
			url: 'https://youtube-v31.p.rapidapi.com/videos',
			params: {
				part: 'contentDetails,snippet,statistics',
				id: youtubeId,
			},
			headers: {
				'X-RapidAPI-Key': '6e04e47193msh808357922d2dd69p129d45jsn8d017d7a60b9',
				'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
			},
		};
		try {
			const response = await axios.request(options);
			const { data } = response || {};
			console.log('response for none-existing --> ', response.data);
			if (data.items?.length > 0) {
				const title = data.items[0]?.snippet?.title;
				const description = data.items[0]?.snippet?.description;
				const shareData: VideoDto = {
					title,
					description,
					youtubeId,
					email,
					likes: '',
					dislikes: '',
				};

				return await this.videosService.create(shareData);
			} else {
				return {
					status: 404,
					message: 'Video not found!'
				}
			}
		} catch (error) {
			console.error(error);
		}
	}
}

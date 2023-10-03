import {
	BadRequestException,
	Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoDto } from './dtos/video.dto';
import { Videos } from './videos.entity';

@Injectable()
export class VideosService {
	constructor(@InjectRepository(Videos) private readonly repo: Repository<Videos>) {}

	async create(data: VideoDto) {
		const { youtubeId } = data;
		const video = await this.repo.findOne({ where: { youtubeId } });

		if (video) {
			throw new BadRequestException('Video already shared!')
		}

		const newVideo = this.repo.create(data);

		return this.repo.save(newVideo);
	}

	findAll() {
		return this.repo.find();
	}
}

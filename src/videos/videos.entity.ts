import {
	Column,
	Entity,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Videos {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	youtubeId: string;

	@Column()
	email: string;

	@Column()
	likes: string;

	@Column()
	dislikes: string;
}
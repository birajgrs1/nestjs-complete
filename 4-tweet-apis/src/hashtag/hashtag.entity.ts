import { Tweet } from 'src/tweets/tweet.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Hashtag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({
    type: 'text',
    nullable: false,
    unique: true,
  })
  name: string;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToMany(() => Tweet, (tweet) => tweet.hashtags, {
    onDelete: 'CASCADE',
  })
  tweets: Tweet[];
}

import { Tweet } from 'src/tweets/tweet.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

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

  @ManyToMany(() => Tweet, (tweet) => tweet.hashtags, {
    onDelete: 'CASCADE',
  })
  tweets: Tweet[];
}

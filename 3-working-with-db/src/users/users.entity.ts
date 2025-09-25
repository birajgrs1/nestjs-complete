import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  // JoinColumn,
} from 'typeorm';
import { Profile } from '../profiles/profile.entity';

@Entity()
export class User {
  // @Column({ type: 'int', primary: true })
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({
  //   type: 'varchar',
  //   length: 100,
  //   nullable: false,
  // })
  // name: string;

  // @Column({
  //   type: 'varchar',
  //   length: 100,
  //   nullable: false,
  //   unique: true,
  // })
  // username: string;

  @Column({ type: 'varchar', length: 100, nullable: false, unique: true })
  username: string;

  // @Column({
  //   type: 'int',
  //   nullable: false,
  // })
  // age: number;

  // @Column({
  //   type: 'varchar',
  //   length: 10,
  //   nullable: true,
  // })
  // gender?: string;

  // @Column({
  //   type: 'varchar',
  //   length: 100,
  //   nullable: true,
  // })
  // profession: string;

  @Column({
    type: 'varchar',
    length: 150,
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  password: string;

  // @Column({
  //   type: 'boolean',
  //   default: false,
  //   nullable: true,
  // })
  // isMarried?: boolean;

  @OneToOne(() => Profile, (profile) => profile.user, {
    // cascade: true,  // ['insert', 'update']
    cascade: ['insert'], //cascading to insert operation
    eager: true, //eager loading
  })
  // @JoinColumn()
  profile?: Profile;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

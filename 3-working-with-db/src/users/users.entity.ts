import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}

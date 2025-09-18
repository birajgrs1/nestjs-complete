import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class User {
  // @Column({ type: 'int', primary: true })
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  age: number;
  @Column({ nullable: true })
  gender?: string;
  @Column({ nullable: true })
  profession: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ default: false })
  isMarried?: boolean;
}

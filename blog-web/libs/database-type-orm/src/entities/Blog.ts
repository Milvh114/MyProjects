import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './User';

@Entity('blog')
export default class blog {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @Column({
    name: 'content',
    type: 'varchar',
    select: false,
    nullable: false,
  })
  content: string;

  @Column({ name: 'name', type: 'varchar', length: 100, nullable: true })
  name: string;

  @DeleteDateColumn({ name: 'deleted_at', type: 'datetime' })
  deletedAt: string;

  @CreateDateColumn({ name: 'created_at', type: 'datetime' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'datetime' })
  updatedAt: string;

  // @OneToMany(() => Comment, (comment) => comment.post)
  // comments: Comment[]
  @Column({ name: 'user_id', type: 'bigint', unsigned: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.blogs)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // @OneToMany(() => Like, (like) => like.post)
  // likes: Like[]
}

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from '../../category/entities/category.entity';

@Entity({ name: 'expense' })
export class ExpenseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'id_category' })
  @ManyToOne(() => CategoryEntity)
  category: CategoryEntity;

  @Column({
    name: 'amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  amount: number;

  @Column({
    name: 'description',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  description: string;

  @Column({
    name: 'photo_url',
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  photoUrl: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}

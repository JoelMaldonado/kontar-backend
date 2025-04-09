import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CategoryEntity } from '../../category/entities/category.entity';

@Entity({ name: 'budget' })
export class BudgetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @JoinColumn({ name: 'id_category' })
  @ManyToOne(() => CategoryEntity)
  category: CategoryEntity;

  @Column({
    name: 'max_amount',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  maxAmount: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}

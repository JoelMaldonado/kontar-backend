import { UserAuthEntity } from 'src/modules/auth/entities/user-auth';
import { CommonColorEntity } from 'src/modules/common/entities/common-color.entity';
import { CommonIconEntity } from 'src/modules/common/entities/common-icon.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'category' })
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  name: string;

  @JoinColumn({ name: 'id_user' })
  @ManyToOne(() => UserAuthEntity)
  user: UserAuthEntity;

  @JoinColumn({ name: 'id_icon' })
  @ManyToOne(() => CommonIconEntity)
  icon: CommonIconEntity;

  @JoinColumn({ name: 'id_color' })
  @ManyToOne(() => CommonColorEntity)
  color: CommonColorEntity;

  @CreateDateColumn({
    name: 'created_at',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}

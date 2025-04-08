import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'category_user' })
export class CateogryUserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;
}

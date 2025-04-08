import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'common_icon' })
export class CommonIconEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    name: 'file_name',
    type: 'varchar',
    length: 100,
  })
  fileName: string;
}

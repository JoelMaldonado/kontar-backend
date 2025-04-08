import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'common_color' })
export class CommonColorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
  })
  name: string;

  @Column({
    name: 'hex_code',
    type: 'varchar',
    length: 10,
  })
  hexCode: string;
}

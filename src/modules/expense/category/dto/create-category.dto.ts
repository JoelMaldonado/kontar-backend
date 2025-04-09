import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString({ message: 'Se espera un string' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  name: string;

  @IsNumber({}, { message: 'Se espera un número' })
  @IsPositive({ message: 'El idIcon deber ser positivo' })
  idIcon: number;

  @IsNumber({}, { message: 'Se espera un número' })
  @IsPositive({ message: 'El idColor deber ser positivo' })
  idColor: number;
}

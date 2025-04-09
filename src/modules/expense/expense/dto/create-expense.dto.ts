import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsNumber({}, { message: 'Se espera un número' })
  @IsPositive({ message: 'El idCategory deber ser positivo' })
  idCategory: number;

  @IsNumber({}, { message: 'Se espera un número' })
  amount: number;

  @IsString({ message: 'Se espera un string' })
  @IsOptional()
  description: string;

  @IsString({ message: 'Se espera un string' })
  @IsOptional()
  photoUrl: string;
}

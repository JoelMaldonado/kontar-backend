import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../category/entities/category.entity';
import { Repository } from 'typeorm';
import { ExpenseEntity } from './entities/expense.entity';
import { BudgetEntity } from '../budget/entities/budget.entity';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectRepository(ExpenseEntity)
    private readonly repoExpense: Repository<ExpenseEntity>,

    @InjectRepository(CategoryEntity)
    private readonly repoCategory: Repository<CategoryEntity>,
  ) {}

  async fetchAll(idUser: number) {
    const items = await this.repoExpense.find({
      relations: ['category', 'category.icon', 'category.color'],
      where: {
        category: { user: { id: idUser } },
      },
    });
    const itemsMap = items.map((item) => {
      return {
        id: item.id,
        amount: Number(item.amount),
        description: item.description,
        photoUrl: item.photoUrl,
        createdAt: item.createdAt,
      };
    });
    return itemsMap;
  }

  async create(idUser: number, dto: CreateExpenseDto) {
    const category = await this.repoCategory.findOne({
      where: { id: dto.idCategory, user: { id: idUser } },
    });

    if (!category) {
      throw new ConflictException(
        'La categoría no pertenece al usuario o no existe',
      );
    }

    const expense = this.repoExpense.create({
      category: { id: dto.idCategory },
      amount: dto.amount,
      description: dto.description,
      photoUrl: dto.photoUrl,
    });
    await this.repoExpense.save(expense);
    return expense;
  }
}

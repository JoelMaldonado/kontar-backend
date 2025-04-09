import { Injectable } from '@nestjs/common';
import { BudgetEntity } from './entities/budget.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseEntity } from '../expense/entities/expense.entity';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(BudgetEntity)
    private readonly repoBudget: Repository<BudgetEntity>,

    @InjectRepository(ExpenseEntity)
    private readonly repoExpense: Repository<ExpenseEntity>,
  ) {}

  async getBudgets(idUser: number) {
    const budgets = await this.repoBudget.find({
      relations: [
        'category',
        'category.user',
        'category.icon',
        'category.color',
      ],
      where: {
        category: {
          user: {
            id: idUser,
          },
        },
      },
    });

    // 2. Suma de gastos por categoría en una sola consulta
    const expenseSums = await this.repoExpense
      .createQueryBuilder('expense')
      .select('category.id', 'categoryId')
      .addSelect('SUM(expense.amount)', 'total')
      .innerJoin('expense.category', 'category')
      .innerJoin('category.user', 'user')
      .where('user.id = :idUser', { idUser })
      .groupBy('category.id')
      .getRawMany();

    // 3. Armar respuesta final
    const result = budgets.map((budget) => {
      const expense = expenseSums.find(
        (e) => e.categoryId === budget.category.id,
      );
      const total = expense ? Number(expense.total) : 0;

      return {
        id: budget.id,
        idCategory: budget.category.id,
        name: budget.category.name,
        iconFileName: budget.category.icon.fileName,
        colorHex: budget.category.color.hexCode,
        maxAmount: Number(budget.maxAmount),
        total,
      };
    });

    return result;
  }
}

import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { BudgetEntity } from './entities/budget.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseEntity } from '../expense/entities/expense.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BudgetEntity, ExpenseEntity])],
  controllers: [BudgetController],
  providers: [BudgetService],
})
export class BudgetModule {}

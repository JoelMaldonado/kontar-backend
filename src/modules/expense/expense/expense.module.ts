import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseEntity } from './entities/expense.entity';
import { BudgetModule } from '../budget/budget.module';
import { CategoryModule } from '../category/category.module';
import { CategoryEntity } from '../category/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpenseEntity, CategoryEntity]),
    BudgetModule,
    CategoryModule,
    ExpenseModule,
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
})
export class ExpenseModule {}

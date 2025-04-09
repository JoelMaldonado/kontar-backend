import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { AuthGuard } from 'src/config/guards/auth.guard';
import { Request } from 'express';
import { responseHelper } from 'src/config/response-helper';
import { constants } from 'src/config/constants';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Controller('expense')
@UseGuards(AuthGuard)
export class ExpenseController {
  constructor(private readonly expenseService: ExpenseService) {}

  @Get()
  async fetchAll(@Req() request: Request) {
    try {
      const user = request[constants.user];
      const expenses = await this.expenseService.fetchAll(user.sub);
      return responseHelper.success(expenses, 'Expenses fetched successfully');
    } catch (error) {
      return responseHelper.error(error);
    }
  }

  @Post()
  async create(@Req() request: Request, @Body() dto: CreateExpenseDto) {
    try {
      const user = request[constants.user];
      const expense = await this.expenseService.create(user.sub, dto);
      return responseHelper.success(expense, 'Expense created successfully');
    } catch (error) {
      return responseHelper.error(error);
    }
  }
}

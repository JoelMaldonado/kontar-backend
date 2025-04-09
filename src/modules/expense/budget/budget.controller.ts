import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { responseHelper } from 'src/config/response-helper';
import { constants } from 'src/config/constants';
import { AuthGuard } from 'src/config/guards/auth.guard';

@Controller('expense/budget')
@UseGuards(AuthGuard)
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get()
  async getBudgets(@Req() request: Request) {
    try {
      const user = request[constants.user];
      const budgets = await this.budgetService.getBudgets(user.sub);
      return responseHelper.success(budgets, 'Budgets fetched successfully');
    } catch (error) {
      return responseHelper.error(error);
    }
  }
}

import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { responseHelper } from 'src/config/response-helper';
import { constants } from 'src/config/constants';
import { AuthGuard } from 'src/config/guards/auth.guard';
import { CreateCategoryDto } from './dto/create-category.dto';

@Controller('expense/category')
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories(@Req() request: Request) {
    try {
      const user = request[constants.user];
      const categories = await this.categoryService.getCategories(user.sub);
      return responseHelper.success(
        categories,
        'Categories fetched successfully',
      );
    } catch (error) {
      return responseHelper.error(error);
    }
  }

  @Post()
  async create(@Body() dto: CreateCategoryDto, @Req() request: Request) {
    try {
      const user = request[constants.user];
      const category = await this.categoryService.create(user.sub, dto);
      return responseHelper.success(category, 'Category created successfully');
    } catch (error) {
      return responseHelper.error(error);
    }
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly repoCategory: Repository<CategoryEntity>,
  ) {}
  async getCategories(idUser: number) {
    const categories = await this.repoCategory.find({
      relations: ['icon', 'color', 'user'],
      where: {
        user: { id: idUser },
      },
    });
    const categoriesMap = categories.map((category) => {
      return {
        id: category.id,
        name: category.name,
        iconFileName: category.icon.fileName,
        colorHex: category.color.hexCode,
      };
    });
    return categoriesMap;
  }

  async create(idUser: number, dto: CreateCategoryDto) {
    const category = this.repoCategory.create({
      name: dto.name,
      icon: { id: dto.idIcon },
      color: { id: dto.idColor },
      user: { id: idUser },
    });
    await this.repoCategory.save(category);
    return;
  }
}

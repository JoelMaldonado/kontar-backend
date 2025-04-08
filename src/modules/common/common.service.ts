import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonColorEntity } from './entities/common-color.entity';
import { Repository } from 'typeorm';
import { CommonIconEntity } from './entities/common-icon.entity';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(CommonColorEntity)
    private readonly commonColorRepository: Repository<CommonColorEntity>,

    @InjectRepository(CommonIconEntity)
    private readonly commonIconRepository: Repository<CommonIconEntity>,
  ) {}

  async getColors() {
    const colors = await this.commonColorRepository.find();
    return colors;
  }

  async getIcons() {
    const icons = await this.commonIconRepository.find();
    return icons;
  }
}

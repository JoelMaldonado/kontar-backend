import { Controller, Get } from '@nestjs/common';
import { CommonService } from './common.service';

@Controller('common')
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get('colors')
  async getColors() {
    const colors = await this.commonService.getColors();
    return {
      statusCode: 200,
      message: 'Colors fetched successfully',
      data: colors,
    };
  }

  @Get('icons')
  async getIcons() {
    const icons = await this.commonService.getIcons();
    return {
      statusCode: 200,
      message: 'Icons fetched successfully',
      data: icons,
    };
  }
}

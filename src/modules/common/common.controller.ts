import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { CommonService } from './common.service';
import { AuthGuard } from 'src/config/guards/auth.guard';
import { Request } from 'express';

@Controller('common')
@UseGuards(AuthGuard)
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get('colors')
  async getColors(@Req() request: Request) {
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

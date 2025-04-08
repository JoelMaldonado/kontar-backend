import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonColorEntity } from './entities/common-color.entity';
import { CommonIconEntity } from './entities/common-icon.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommonColorEntity, CommonIconEntity])],
  controllers: [CommonController],
  providers: [CommonService],
})
export class CommonModule {}

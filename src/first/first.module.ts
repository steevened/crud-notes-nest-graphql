import { Module } from '@nestjs/common';
import { FirstResolver } from './first.resolver';

@Module({
  providers: [FirstResolver],
})
export class FirstModule {}

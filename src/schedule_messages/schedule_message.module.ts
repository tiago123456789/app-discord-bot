import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleMessageController } from './schedule_message.controller';
import { ScheduleMessage } from './schedule_message.entity';
import { ScheduleMessageService } from './schedule_message.service';

@Module({
    imports: [TypeOrmModule.forFeature([ScheduleMessage])],
    controllers: [ ScheduleMessageController ],
    providers: [ ScheduleMessageService ]

})
export class ScheduleMessageModule {}
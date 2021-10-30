import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandsModule } from './commands/commands.module';
import { CommonModule } from './common/common.module';
import { ScheduleMessageModule } from './schedule_messages/schedule_message.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<any> => {
        return {
          type: "postgres",
          host: configService.get("DATABASE_HOST"),
          port: configService.get("DATABASE_PORT"),
          username: configService.get("DATABASE_USER"),
          password: configService.get("DATABASE_PASSWORD"),
          database: configService.get("DATABASE_NAME"),
          autoLoadEntities: true,
          synchronize: true,
          logging: configService.get("ENV") == "dev" ? true : false
        };
      }
    }),
    CommandsModule, UserModule,
    ScheduleMessageModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

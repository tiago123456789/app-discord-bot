import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import * as moment from "moment";
import { LessThanOrEqual, Repository } from "typeorm";
import { ScheduleMessage } from "./schedule_message.entity";

import Discord = require('discord.js');

//     setInterval(() => {
//         for (let indice = 0; indice < scheduleMessages.length; indice++) {
//             const scheduledMessage = scheduleMessages[indice]
//             if (!scheduledMessage) {
//                 continue;
//             }
//             const isSendMessage = (new Date().getTime()) > (new Date(scheduledMessage.scheduledAt).getTime())
//             const channel = client.channels.cache
//                 .find(channel => channel.name === scheduledMessage.channel)
//             if (isSendMessage && channel) {
//                 channel.send(scheduledMessage.message)
//                 delete scheduleMessages[indice]
//             }
//         }
//     }, 5000)
// });


@Injectable()
export class ScheduleMessageService {

  private discordClient;
  private isDiscordClientLogger: boolean = false;

  constructor(
    @InjectRepository(ScheduleMessage) private repository: Repository<ScheduleMessage>) {
    this.discordClient = new Discord.Client({})
  }

  private getScheduledMessageLessThanDate(currentDate: Date) {
    return this.repository.find({
      where: {
        triggerAt: LessThanOrEqual(currentDate)
      },
      order: { "triggerAt": "ASC" }
    })
  }

  @Cron('* */1 * * * *')
  async triggerScheduledMessages() {
    const registers = await this.getScheduledMessageLessThanDate(new Date())
    const registersRemove: ScheduleMessage[] = [];
    if (registers.length == 0) {
      return;
    }

    if (!this.isDiscordClientLogger) {
      await this.discordClient.login(process.env.DISCORD_TOKEN)
      this.isDiscordClientLogger = true;
    }

    console.log("Start trigger messages to discord")
    for (let indice = 0; indice < registers.length; indice++) {
      const scheduledMessage: { [key: string]: any } = registers[indice]
      if (!scheduledMessage) {
        continue;
      }

      console.log(`Trigger message: ${scheduledMessage.message} on channel ${scheduledMessage.channel}`)
      const channel = this.discordClient.channels.cache
        .find(channel => channel.name === scheduledMessage.channel)
      if (channel) {
        channel.send(scheduledMessage.message)
        // @ts-ignore
        registersRemove.push(scheduledMessage)
      }
    }

    await this.repository.remove(registersRemove)
    console.log("End trigger messages to discord")
  }

  async delete(id) {
    const register = await this.repository.findOne({ where: { id }})
    return this.repository.delete(register);
  }

  async getAll() {
    const registers: Array<ScheduleMessage> = await this.repository.find()
    if (!Array.isArray(registers)) {
      return [registers];
    }
    return registers || []
  }

  register(scheduleMessage: ScheduleMessage) {
    scheduleMessage.triggerAt = new Date(
      moment(scheduleMessage.triggerAt).utc().toISOString()
    )
    console.log(scheduleMessage)
    return this.repository.save(scheduleMessage)
  }

}
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, Table } from 'typeorm';

@Entity()
export class ScheduleMessage {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80 })
  channel: string;

  @Column({ length: 200 })
  message: string;

  @Column({ type: "timestamp" })
  triggerAt: Date

}
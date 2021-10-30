import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity()
export class Command {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 80 })
  command: string;

  @Column({ length: 255 })
  description: string;

  @Column({ length: 255 })
  reply: string;

  @Column({ length: 50 })
  typeAction: string;

  @Column({ type: "timestamp" })
  createdAt: Date

}
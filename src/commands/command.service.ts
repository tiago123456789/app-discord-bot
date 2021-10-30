import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Command } from "./command.entities";

@Injectable()
export class CommandService {

    constructor(
        @InjectRepository(Command) private repository: Repository<Command>
    ) { }

    getAll() {
        return this.repository.find({})
    }

    save(command: Command) {
        command.createdAt = new Date()
        return this.repository.insert(command)
    }

    async delete(id) {
        const register = await this.repository.findOne({ where: { id } })
        return this.repository.delete(register)
    }
}
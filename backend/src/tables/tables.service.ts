import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { Table } from '../entities/table.entity';

@Injectable()
export class TablesService {
  constructor(
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
  ) {}

  async create(createTableDto: CreateTableDto) {
    const newTable = this.tableRepository.create(createTableDto);
    return await this.tableRepository.save(newTable);
  }

  findAll() {
    return this.tableRepository.find();
  }

  findOne(id: number) {
    return this.tableRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTableDto: UpdateTableDto) {
    await this.tableRepository.update(id, updateTableDto);
    return this.findOne(id);  // Retornar la mesa actualizada
  }

  async remove(id: number) {
    const table = await this.findOne(id);
    if (table) {
      return this.tableRepository.remove(table);
    }
    throw new Error('Table not found');
  }
}

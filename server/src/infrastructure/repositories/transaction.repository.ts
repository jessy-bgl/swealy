import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ITransactionRepository } from '../../domain/repositories/transaction.repository';
import { Transaction } from '../../domain/models/transaction';
import { CreateTransactionDTO } from '../controllers/transaction/transaction.create.dto';
import {
  Transaction as TransactionEntity,
  TransactionDocument,
} from '../entities/transaction.entity';
import { TransactionMapper } from '../mappers/transaction.mapper';

@Injectable()
class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectModel(TransactionEntity.name)
    private readonly transactionEntity: Model<TransactionDocument>,
  ) {}

  async fetch(): Promise<Transaction[]> {
    try {
      const transactions = await this.transactionEntity
        .find()
        .populate('dca')
        .sort({ datetime: -1 })
        .lean();
      return transactions.map((t) => TransactionMapper.toTransaction(t));
    } catch (e) {
      throw e;
    }
  }

  async create(
    createTransactionDTO: CreateTransactionDTO,
  ): Promise<Transaction> {
    try {
      const transaction = new this.transactionEntity(createTransactionDTO);
      await (await transaction.save()).populate('dca');
      return TransactionMapper.toTransaction(transaction);
    } catch (e) {
      throw e;
    }
  }

  async delete(id: string): Promise<Transaction> {
    try {
      const transaction = await this.transactionEntity
        .findOneAndDelete({ _id: id })
        .populate('dca');
      if (!transaction) throw new NotFoundException();
      return TransactionMapper.toTransaction(transaction);
    } catch (e) {
      throw e;
    }
  }

  async fetchLastDcaSuccessfulTransaction(dcaId: string): Promise<Transaction> {
    try {
      const transactions = await this.transactionEntity
        .find({ dca: dcaId, success: true })
        .sort({ datetime: -1 })
        .limit(1)
        .populate('dca');
      if (!transactions.length) return undefined;
      return TransactionMapper.toTransaction(transactions[0]);
    } catch (e) {
      throw e;
    }
  }
}

export { TransactionRepository };

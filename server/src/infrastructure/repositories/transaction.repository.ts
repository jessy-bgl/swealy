import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import {
  ICreateTransactionDTO,
  ITransactionRepository,
} from '../../domain/repositories/transaction.repository';
import { Transaction } from '../../domain/models/transaction';
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
        .populate({ path: 'dca', populate: 'exchange' })
        .sort({ datetime: -1 })
        .lean();
      return transactions.map((t) => TransactionMapper.toTransaction(t));
    } catch (e) {
      throw e;
    }
  }

  async create(
    createTransactionDTO: ICreateTransactionDTO,
  ): Promise<Transaction> {
    try {
      const transaction = new this.transactionEntity(createTransactionDTO);
      await (await transaction.save()).populate('dca dca.exchange');
      return TransactionMapper.toTransaction(transaction);
    } catch (e) {
      throw e;
    }
  }

  async delete(id: string): Promise<Transaction> {
    try {
      const transaction = await this.transactionEntity
        .findOneAndDelete({ _id: id })
        .populate({ path: 'dca', populate: 'exchange' });
      if (!transaction) throw new NotFoundException();
      return TransactionMapper.toTransaction(transaction);
    } catch (e) {
      throw e;
    }
  }

  async deleteByDcaIds(dcaIds: string[]): Promise<void> {
    try {
      await this.transactionEntity.deleteMany({ dca: { $in: dcaIds } });
    } catch (e) {
      throw e;
    }
  }

  async fetchLastDcaAutoTransaction(dcaId: string): Promise<Transaction> {
    try {
      const transactions = await this.transactionEntity
        .find({ dca: dcaId, manual: false })
        .sort({ datetime: -1 })
        .limit(1)
        .populate({ path: 'dca', populate: 'exchange' });
      if (!transactions.length) return undefined;
      return TransactionMapper.toTransaction(transactions[0]);
    } catch (e) {
      throw e;
    }
  }
}

export { TransactionRepository };

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { ITransactionRepository } from '../../domain/repositories/transaction.repository';
import { Transaction } from '../../domain/models/transaction';
import { CreateTransactionDTO } from '../controllers/transaction/transaction.create.dto';
import {
  Transaction as TransactionModel,
  TransactionDocument,
} from '../entities/transaction.entity';

@Injectable()
class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectModel(TransactionModel.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  async fetch(): Promise<Transaction[]> {
    try {
      const transactions = await this.transactionModel.find().lean();
      return transactions;
    } catch (e) {
      throw e;
    }
  }

  create(createTransactionDTO: CreateTransactionDTO): Promise<Transaction> {
    try {
      const transaction = new this.transactionModel(createTransactionDTO);
      return transaction.save();
    } catch (e) {
      throw e;
    }
  }

  async delete(id: string): Promise<Transaction> {
    try {
      const transaction = await this.transactionModel.findOneAndDelete({
        _id: id,
      });
      if (!transaction) throw new NotFoundException();
      return transaction;
    } catch (e) {
      throw e;
    }
  }
}

export { TransactionRepository };

import { Transaction as TransactionEntity } from '../entities/transaction.entity';
import { Dca as DcaEntity } from '../entities/dca.entity';
import { Transaction } from '../../domain/models/transaction';
import { DcaMapper } from './dca.mapper';
import { Types } from 'mongoose';

class TransactionMapper {
  static toTransaction(transactionEntity: TransactionEntity): Transaction {
    if (!transactionEntity) return undefined;
    const transaction = new Transaction();
    const dcaEntity = transactionEntity.dca as DcaEntity;
    transaction.id = transactionEntity._id.toString();
    transaction.amount = transactionEntity.amount;
    transaction.datetime = transactionEntity.datetime;
    transaction.dca = DcaMapper.toDca(dcaEntity);
    transaction.pair = transactionEntity.pair;
    transaction.price = transactionEntity.price;
    transaction.size = transactionEntity.size;
    transaction.success = transactionEntity.success;
    transaction.type = transactionEntity.type;
    transaction.description = transactionEntity.description;
    return transaction;
  }

  static toTransactionEntity(transaction: Transaction): TransactionEntity {
    const transactionEntity = new TransactionEntity();
    transactionEntity._id = new Types.ObjectId(transaction.id);
    transactionEntity.amount = transaction.amount;
    transactionEntity.datetime = transaction.datetime;
    transactionEntity.dca = DcaMapper.toDcaEntity(transaction.dca);
    transactionEntity.pair = transaction.pair;
    transactionEntity.price = transaction.price;
    transactionEntity.size = transaction.size;
    transactionEntity.success = transaction.success;
    transactionEntity.type = transaction.type;
    transactionEntity.description = transaction.description;
    return transactionEntity;
  }
}

export { TransactionMapper };

import { Dca } from '../../domain/models/dca';
import { Transaction } from '../../domain/models/transaction';

const computeNextDcaTransactionDatetime = (
  dca: Dca,
  lastTransaction?: Transaction,
): Date => {
  const now = new Date();
  let nextTransactionDatetime: Date;

  // case 1 - there is a last transaction
  if (lastTransaction) {
    const lastTransactionDatetime = lastTransaction.datetime;
    nextTransactionDatetime = new Date(
      new Date(
        lastTransactionDatetime.setDate(
          lastTransactionDatetime.getDate() + dca.frequencyInDays,
        ),
      ).setHours(dca.hour, 0, 0),
    );
  }

  // case 2 - there is no last transaction OR the next transaction is planned in the past
  if (!lastTransaction || nextTransactionDatetime < now) {
    nextTransactionDatetime =
      now.getHours() > dca.hour
        ? new Date(
            new Date(now.setDate(now.getDate() + 1)).setHours(dca.hour, 0, 0),
          )
        : new Date(now.setHours(dca.hour, 0, 0));
  }

  return nextTransactionDatetime;
};

export { computeNextDcaTransactionDatetime };

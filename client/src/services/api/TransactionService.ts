import api from "./http-api";
import { Transaction, CreateTransactionDTO } from "../../models/Transaction";

const TransactionService = {
  fetchTransactions: (): Promise<Transaction[]> => api.get("/transaction"),
  createTransaction: (dto: CreateTransactionDTO): Promise<Transaction> =>
    api.post("/transaction", dto),
  deleteTransaction: (id: string): Promise<Transaction> =>
    api.delete(`/transaction/${id}`),
};

export { TransactionService };

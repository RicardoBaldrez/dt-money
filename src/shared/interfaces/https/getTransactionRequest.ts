import { ITransaction } from "../transaction";
import { ITotalTransactions } from "../totalTransactions";

export interface IGetTransactionRequest {
  page: number;
  perPage: number;
  fromDate?: Date;
  to?: Date;
  typeId?: number;
  categoryId?: number;
  searchText?: string;
}

export interface IGetTransactionResponse {
  data: ITransaction[];
  totalRows: number;
  totalPages: number;
  page: number;
  perPage: number;
  totalTransactions: ITotalTransactions;
}

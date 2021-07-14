export type TaskMetaData = {
  bankAccessToken: string;
  intervalFetching: number;
  account: string;
  _id?: string;
  userId?: string;
  accessInvalid?: boolean;
};

export type TransactionSearchable = {
  transactionType?: string;
  creditCardNumber?: string;
  currencyName?: string;
};

export type TransactionDTO =
  | TransactionSearchable
  | {
      account: string;
      amount: number;
      transactionDescription: string;
      iban: string;
    };

export type SyncStatus = {
  success: boolean;
  accountId?: string;
  reasonOfFailure?: string;
};

export interface handlerFn<T> {
  (data?: T, nextFn?: Function, additionalInfo?: any): Promise<void>;
}

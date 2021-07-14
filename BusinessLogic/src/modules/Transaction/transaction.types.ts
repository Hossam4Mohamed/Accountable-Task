export type TransactionSearchable = {
  transactionType?: string;
  creditCardNumber?: string;
  currencyName?: string;
};

export type TransactionReqQuery = {
  where?: TransactionSearchable;
  limit?: number;
  skip?: number;
};

export type TransactionDTO =
  | TransactionSearchable
  | {
      account: string;
      amount: number;
      transactionDescription: string;
      iban: string;
    };

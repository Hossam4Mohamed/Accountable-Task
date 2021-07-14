import faker from 'faker';

enum financeProps {
  amount = 'amount',
  currencyName = 'currencyName',
  creditCardNumber = 'creditCardNumber',
  iban = 'iban',
  transactionDescription = 'transactionDescription',
  transactionType = 'transactionType',
}

const randomNumber = (intervalFetching: number = 1) =>
  Math.floor(
    Math.random() *
      (Number(process.env.MAX_TRANSACTIONS_NUMBER) || 10) *
      intervalFetching
  ) + 1;

export const mockTransactionsList = (
  account: string,
  intervalFetching: number
) =>
  Array.from({ length: randomNumber(intervalFetching) }).map(() =>
    Object.keys(financeProps).reduce<Record<string, string>>(
      (acc, cat) => {
        acc[cat] = faker.finance[cat as financeProps]();
        return acc;
      },
      { account }
    )
  );

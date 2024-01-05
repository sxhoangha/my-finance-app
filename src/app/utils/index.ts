import { IInvoice, ITransaction } from "@/types";
import dayjs from "dayjs";
import { Table } from "fakebase";

const getInvoiceStatus = async (
  invoice: IInvoice,
  transactionData: Table<ITransaction>
) => {
  const transactions = await transactionData.findAll();
  //find if there is transaction with same reference number
  const transaction = transactions.find(
    (transaction) => transaction.referenceNumber === invoice.referenceNumber
  );

  if (transaction) {
    //PAID if there is a bank transaction for the same amount,
    //and transaction date later than the invoice creation date.
    const { transactionDate, amount } = transaction;
    if (amount === invoice.amount && transactionDate > invoice.creationDate) {
      return "PAID";
    }
  }
  return "NOT PAID";
};

const addInvoiceToDb = async (
  invoice: IInvoice,
  invoicesData: Table<IInvoice>,
  transactionsData: Table<ITransaction>
) => {
  const status = await getInvoiceStatus(invoice, transactionsData);
  invoice.status = status;
  await invoicesData.create(invoice);
  return invoice;
};

const updateInvoiceInDb = async (
  newInvoice: IInvoice,
  invoicesData: Table<IInvoice>,
  transactionsData: Table<ITransaction>
) => {
  const existingInvoice = await invoicesData.findById(newInvoice.id);
  if (!existingInvoice) return "no invoice with that id";

  const status = await getInvoiceStatus(newInvoice, transactionsData);
  newInvoice.status = status;

  await invoicesData.update(newInvoice);
  return newInvoice;
};

const formatDate = (date: string | Date) => {
  const DATE_FORMAT = "MMM D, YYYY H:mm";
  const dayjsDate = dayjs(date);
  return dayjsDate.isValid() ? dayjsDate.format(DATE_FORMAT) : "";
};

export { addInvoiceToDb, updateInvoiceInDb, getInvoiceStatus, formatDate };

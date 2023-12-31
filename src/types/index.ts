import { Entity } from "fakebase";

interface ITransaction extends Entity {
  transactionDate: Date;
  description: string;
  referenceNumber: string;
  amount: number;
}

interface IInvoice extends Entity {
  clientName: string;
  creationDate: Date;
  referenceNumber: string;
  amount: number;
  status?: "PAID" | "NOT PAID";
}

export type { ITransaction, IInvoice };

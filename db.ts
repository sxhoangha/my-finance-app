import { ITransaction, IInvoice } from "@/types";
import { Database } from "fakebase";

const db = new Database("./data");

export const TransactionsData = db.table<ITransaction>("transactions");
export const InvoicesData = db.table<IInvoice>("invoices");

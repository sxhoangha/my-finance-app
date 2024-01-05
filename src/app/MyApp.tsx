"use client";
import { IInvoice, ITransaction } from "@/types";
import { useState } from "react";
import Invoices from "./Invoices/Invoices";
import Nav from "./Nav";
import Summary from "./Summary/Summary";
import "./MyApp.scss";

interface MyAppProps {
  transactions: Array<ITransaction>;
  invoices: Array<IInvoice>;
}

const MyApp = ({ transactions, invoices }: MyAppProps) => {
  const [invoiceState, setInvoiceState] = useState(invoices);

  return (
    <div className="my-app">
      <Nav />
      <Summary transactions={transactions} invoices={invoiceState} />
      <Invoices invoices={invoiceState} setInvoices={setInvoiceState} />
    </div>
  );
};

export default MyApp;

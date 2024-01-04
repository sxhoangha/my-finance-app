"use client";
import React, { useState } from "react";
import { IInvoice, ITransaction } from "@/types";
import Nav from "./Nav";
import Summary from "./Summary/Summary";
import Invoices from "./Invoices/Invoices";

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

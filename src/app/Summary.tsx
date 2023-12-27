"use client";
import React, { useEffect } from "react";
import { ITransaction } from "@/types";

interface SummaryProps {
  transactions: Array<ITransaction>;
}

const Summary = ({ transactions }: SummaryProps) => {
  console.log(transactions);

  return (
    <div>
      <h1>Summary</h1>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.referenceNumber}>{transaction.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Summary;

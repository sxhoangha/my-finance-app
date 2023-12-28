"use client";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { ITransaction } from "@/types";
import { BalanceColor } from "@/types/constants";
import React, { useState } from "react";
import SummaryModal from "./SummaryModal";

interface SummaryProps {
  transactions: Array<ITransaction>;
}

const Summary = ({ transactions }: SummaryProps) => {
  const [threshold, setThreshold] = useState(0);

  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const balance = transactions.reduce((acc, transaction) => {
    return acc + transaction.amount;
  }, 0);

  const color =
    balance < 0
      ? BalanceColor.RED
      : balance < (isNaN(threshold) ? 0 : threshold)
      ? BalanceColor.YELLOW
      : BalanceColor.GREEN;

  return (
    <div>
      <h2>Summary</h2>
      <p>Here is a summary of your account</p>
      <div>
        Account balance:{" "}
        <span style={{ color: color }}>
          {balance} <Button onClick={handleOpen}>View transactions</Button>
        </span>
      </div>
      <TextField
        id="threshold"
        label="Threshold"
        type="number"
        variant="filled"
        InputLabelProps={{
          shrink: true,
        }}
        value={threshold}
        onChange={(e) => setThreshold(parseInt(e.target.value))}
        error={threshold < 0}
        helperText={threshold < 0 ? "Threshold cannot be negative" : ""}
      />

      <SummaryModal
        open={openModal}
        handleOpen={handleOpen}
        handleClose={handleClose}
        transactions={transactions}
      />
    </div>
  );
};

export default Summary;

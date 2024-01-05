"use client";
import dayjs from "dayjs";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { IInvoice, ITransaction } from "@/types";
import { BalanceColor } from "@/types/constants";
import React, { useState } from "react";
import SummaryModal from "./SummaryModal";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import Tooltip from "@mui/material/Tooltip";

interface SummaryProps {
  transactions: Array<ITransaction>;
  invoices: Array<IInvoice>;
}

const Summary = ({ transactions, invoices }: SummaryProps) => {
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
    <div className="fi-summary">
      <h4 className="fi-summary-title">Summary</h4>
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
      <div>
        Account balance: <span style={{ color: color }}>{balance}</span>
      </div>
      <div>
        Total number of transactions: {transactions.length}{" "}
        <Tooltip title="Transaction details">
          <Button onClick={handleOpen}>
            <ReceiptLongIcon />
          </Button>
        </Tooltip>
      </div>

      <div>
        Total number of invoices in the last 30 days:{" "}
        {
          invoices.filter(({ creationDate }) =>
            dayjs(creationDate).isAfter(dayjs(new Date()).subtract(30, "day"))
          ).length
        }
      </div>

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

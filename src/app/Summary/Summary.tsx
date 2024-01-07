"use client";
import { IInvoice, ITransaction } from "@/types";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import dayjs from "dayjs";
import React, { useState } from "react";
import { BalanceColor } from "../../types/constants";
import SummaryModal from "./SummaryModal";

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
          <IconButton onClick={handleOpen}>
            <ReceiptLongIcon />
          </IconButton>
        </Tooltip>
      </div>

      <div>
        Total number of invoices in the last 30 days:{" "}
        <span data-testid="number-of-invoices">
          {
            invoices.filter(({ creationDate }) =>
              dayjs(creationDate).isAfter(dayjs(new Date()).subtract(30, "day"))
            ).length
          }
        </span>
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

"use client";
import { IInvoice } from "@/types";
import { Button } from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import NewInvoice from "./NewInvoice";

interface InvoicesProps {
  invoices: Array<IInvoice>;
}

const Invoices = ({ invoices }: InvoicesProps) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const columns: GridColDef[] = [
    { field: "referenceNumber", headerName: "Reference number", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "clientName", headerName: "Client name", width: 150 },
    { field: "creationDate", headerName: "Creation date", width: 150 },
  ];
  const rows: GridRowsProp = invoices.map(
    ({ referenceNumber, amount, status, clientName, creationDate }) => ({
      id: referenceNumber,
      referenceNumber: referenceNumber,
      amount: amount,
      status: status,
      clientName: clientName,
      creationDate: creationDate,
    })
  );

  return (
    <div>
      <h2>Invoices</h2>
      <Button variant="outlined" onClick={handleOpen}>
        New invoice
      </Button>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        pageSizeOptions={[5, 10]}
      />
      <NewInvoice
        open={openModal}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Invoices;

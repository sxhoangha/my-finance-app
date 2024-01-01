"use client";
import { IInvoice } from "@/types";
import { Button } from "@mui/material";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import React, { useState } from "react";
import NewInvoice from "./NewInvoice";
import { formatDate } from "../utils";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

interface InvoicesProps {
  invoices: Array<IInvoice>;
}

const getRows = (invoices: Array<IInvoice>) => {
  return invoices.map((invoice) => ({
    ...invoice,
    creationDate: formatDate(invoice.creationDate),
  }));
};

const Invoices = ({ invoices }: InvoicesProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [rows, setRows] = useState<GridRowsProp>(getRows(invoices));
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const columns: GridColDef[] = [
    { field: "referenceNumber", headerName: "Reference number", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "clientName", headerName: "Client name", width: 150 },
    { field: "creationDate", headerName: "Creation date", width: 150 },
  ];

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/invoices");
      const invoices = response.data.invoices;
      setRows(getRows(invoices));
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  const onAddInvoiceSuccess = () => {
    handleClose();
    fetchInvoices();
  };

  return (
    <div className="fi-invoices">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="fi-invoices-main">
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
            onAddInvoiceSuccess={onAddInvoiceSuccess}
          />
        </div>
      )}
    </div>
  );
};

export default Invoices;

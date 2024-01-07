"use client";
import axios from "axios";
import React, { useState } from "react";
import { IInvoice } from "@/types";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import EditIcon from "@mui/icons-material/Edit";
import {
  DataGrid,
  GridColDef,
  GridRowId,
  GridActionsCellItem,
} from "@mui/x-data-grid";
import NewInvoice from "./NewInvoice";
import { formatDate } from "../utils";
import Tooltip from "@mui/material/Tooltip";
import useInvoices from "../hooks/useInvoices";

interface InvoicesProps {
  invoices: Array<IInvoice>;
  setInvoices: (invoices: IInvoice) => void;
}

const Invoices = ({ invoices, setInvoices }: InvoicesProps) => {
  const [openModal, setOpenModal] = useState(false);
  const [invoiceToEdit, setInvoiceToEdit] = useState<IInvoice | null>(null);
  const [loading, setLoading] = useState(false);
  //Modal handlers
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  //get from hooks
  const { fetchInvoices } = useInvoices(setLoading, setInvoices);

  //DataGrid handlers
  const handleEditClick = (id: GridRowId) => () => {
    const invoiceToEdit = rows.find((invoice) => invoice.id === id) ?? null;
    setInvoiceToEdit(invoiceToEdit);
    handleOpen();
  };

  const rows = invoices.map((invoice) => ({
    ...invoice,
    displayDate: formatDate(invoice.creationDate),
  }));

  const columns: GridColDef[] = [
    {
      field: "referenceNumber",
      headerName: "Reference number",
      width: 150,
      editable: true,
    },
    { field: "amount", headerName: "Amount", width: 150, editable: true },
    { field: "status", headerName: "Status", width: 120 },
    {
      field: "clientName",
      headerName: "Client name",
      width: 150,
      editable: true,
    },
    {
      field: "displayDate",
      headerName: "Date",
      width: 170,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (item) => {
        const title = `Edit invoice ${item.row.referenceNumber}`;
        return [
          <GridActionsCellItem
            key="edit"
            icon={
              <Tooltip title={title}>
                <EditIcon />
              </Tooltip>
            }
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(item.id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  // const fetchInvoices = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.get("/api/invoices");
  //     const invoices = response.data.invoices;
  //     setInvoices(invoices);
  //   } catch (error) {
  //     console.error("Error fetching invoices:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const onAddInvoiceSuccess = () => {
    handleClose();
    fetchInvoices();
  };

  const addNewInvoiceClick = () => {
    setInvoiceToEdit(null);
    handleOpen();
  };

  return (
    <div className="fi-invoices">
      {loading ? (
        <CircularProgress />
      ) : (
        <div className="fi-invoices-main">
          <h4 className="fi-invoices-title">Invoices</h4>
          <Button variant="outlined" onClick={addNewInvoiceClick}>
            New invoice
          </Button>
          <div className="fi-invoices-table">
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              pageSizeOptions={[5, 10]}
            />
          </div>
          <NewInvoice
            open={openModal}
            handleOpen={handleOpen}
            handleClose={handleClose}
            onAddInvoiceSuccess={onAddInvoiceSuccess}
            invoiceToEdit={invoiceToEdit}
          />
        </div>
      )}
    </div>
  );
};

export default Invoices;

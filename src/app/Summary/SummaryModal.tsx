import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import { ITransaction } from "@/types";
import { formatDate } from "../utils";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45rem",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface SummaryModalProps {
  transactions: Array<ITransaction>;
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
}

const SummaryModal: React.FC<SummaryModalProps> = (props) => {
  const { transactions, open, handleClose } = props;

  const rows: GridRowsProp = transactions.map((transaction) => ({
    ...transaction,
    transactionDate: formatDate(transaction.transactionDate),
  }));

  const columns: GridColDef[] = [
    { field: "referenceNumber", headerName: "Reference Number", width: 150 },
    { field: "amount", headerName: "Amount", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "transactionDate", headerName: "Date", width: 150 },
  ];

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Your transactions
          </Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            pageSizeOptions={[5, 10]}
          />
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
};

export default SummaryModal;

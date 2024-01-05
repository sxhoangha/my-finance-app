import axios from "axios";
import dayjs from "dayjs";
import { Formik, Form, Field } from "formik";
import React from "react";
import { TextField } from "formik-mui";
import { DatePicker } from "formik-mui-x-date-pickers";
import { IInvoice } from "@/types";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { LinearProgress } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "22rem",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

interface FormValues {
  clientName: string;
  creationDate: Date | string;
  referenceNumber: string;
  amount: number | string;
}

interface NewInvoiceProps {
  open: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  onAddInvoiceSuccess: () => void;
  invoiceToEdit: IInvoice | null;
}

const NewInvoice = ({
  open,
  handleClose,
  onAddInvoiceSuccess,
  invoiceToEdit,
}: NewInvoiceProps) => {
  const addOrEditInvoice = async (values: FormValues) => {
    const apiRequest = invoiceToEdit ? axios.put : axios.post;
    const payload = {
      ...values,
      ...(invoiceToEdit ? { id: invoiceToEdit.id } : {}),
    };
    try {
      const response = await apiRequest("/api/invoices", payload);
      if (response.status === 200) {
        onAddInvoiceSuccess();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (values: FormValues, { setSubmitting }: any) => {
    setTimeout(() => {
      setSubmitting(false);
      addOrEditInvoice(values);
    }, 500);
  };

  const validateForm = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
    if (!values.clientName) {
      errors.clientName = "Required";
    }
    if (!dayjs(values.creationDate).isValid) {
      errors.creationDate = "Required";
    }
    if (!values.referenceNumber) {
      errors.referenceNumber = "Required";
    }
    if (values.amount === "") {
      errors.amount = "Required";
    }
    return errors;
  };

  const { clientName, creationDate, referenceNumber, amount } =
    invoiceToEdit ?? {};

  const initialValues = {
    clientName: clientName ?? "",
    creationDate: creationDate ?? new Date(),
    referenceNumber: referenceNumber ?? "",
    amount: amount ?? "",
  };

  return (
    <div className="fi-new-invoice">
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5">
            {invoiceToEdit ? "Edit invoice" : "Add new invoice"}
          </Typography>
          <div style={{ margin: "1rem 1rem" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Formik
                initialValues={initialValues}
                validate={validateForm}
                onSubmit={handleSubmit}
              >
                {({ submitForm, isSubmitting, values }) => (
                  <Form>
                    <Field
                      component={TextField}
                      name="clientName"
                      type="text"
                      label="Client name"
                      fullWidth
                    />
                    <div style={{ height: "0.5rem" }} />
                    <Field
                      component={DatePicker}
                      value={dayjs(values.creationDate)}
                      name="creationDate"
                      label="Date"
                      fullWidth
                    />
                    <div style={{ height: "0.5rem" }} />
                    <Field
                      component={TextField}
                      name="referenceNumber"
                      label="Reference number"
                      type="text"
                      fullWidth
                    />
                    <div style={{ height: "0.5rem" }} />
                    <Field
                      component={TextField}
                      name="amount"
                      label="Amount"
                      type="number"
                      fullWidth
                    />
                    <div style={{ height: "0.5rem" }} />
                    {isSubmitting && <LinearProgress />}

                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      {invoiceToEdit ? "Save" : "Add"}
                    </Button>
                    <Button onClick={handleClose}>Cancel</Button>
                  </Form>
                )}
              </Formik>
            </LocalizationProvider>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default NewInvoice;

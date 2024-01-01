import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-mui";
import { LinearProgress } from "@mui/material";
import { DatePicker } from "formik-mui-x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45rem",
  bgcolor: "background.paper",
  border: "2px solid #000",
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
}

const NewInvoice: React.FC<NewInvoiceProps> = (props) => {
  const { open, handleClose, onAddInvoiceSuccess } = props;

  const addNewInvoice = async (values: FormValues) => {
    try {
      const response = await axios.post("/api/invoices", values);

      onAddInvoiceSuccess();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (values: FormValues, { setSubmitting }: any) => {
    setTimeout(() => {
      setSubmitting(false);
      addNewInvoice(values);
    }, 500);
  };

  const validateForm = (values: FormValues) => {
    const errors: Partial<FormValues> = {};
    if (!values.clientName) {
      errors.clientName = "Required";
      if (!dayjs(values.creationDate).isValid) {
        errors.creationDate = "Required";
      }
      if (!values.referenceNumber) {
        errors.referenceNumber = "Required";
      }
      if (!values.amount) {
        errors.amount = "Required";
      }
    }

    return errors;
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5">
            Add new invoice
          </Typography>
          <div style={{ margin: "1rem 1rem" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Formik
                initialValues={{
                  clientName: "",
                  creationDate: new Date(),
                  referenceNumber: "",
                  amount: 0,
                }}
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
                    />
                    <div style={{ height: "0.5rem" }} />
                    <Field
                      component={DatePicker}
                      value={dayjs(values.creationDate)}
                      name="creationDate"
                      label="Date"
                      textField={{
                        helperText: "Helper text",
                        variant: "filled",
                      }}
                    />
                    <div style={{ height: "0.5rem" }} />
                    <Field
                      component={TextField}
                      name="referenceNumber"
                      label="Reference number"
                      type="text"
                    />
                    <div style={{ height: "0.5rem" }} />
                    <Field
                      component={TextField}
                      name="amount"
                      label="Amount"
                      type="number"
                    />
                    <div style={{ height: "0.5rem" }} />
                    {isSubmitting && <LinearProgress />}

                    <Button
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      onClick={submitForm}
                    >
                      Add
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

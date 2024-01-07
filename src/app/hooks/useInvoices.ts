import { IInvoice } from "@/types";
import axios from "axios";

const useInvoices = (
  setLoading: (loading: boolean) => void,
  setInvoices: (invoices: IInvoice) => void
) => {
  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/invoices");
      const invoices = response.data.invoices;
      setInvoices(invoices);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setLoading(false);
    }
  };

  return { fetchInvoices };
};

export default useInvoices;

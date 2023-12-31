// import { IInvoice, ITransaction } from "@/types";
// import { Table } from "fakebase";
import { getInvoiceStatus } from "../index";

describe("getInvoiceStatus", () => {
  it("should return PAID when transaction amount equals invoice amount, reference numbers match, and transaction date is later than invoice creation date", async () => {
    const mockInvoice = {
      creationDate: new Date("2022-01-01"),
      referenceNumber: "TRX001",
      amount: 5000.0,
      clientName: "John Doe",
      id: "1",
    };

    const mockTransactionData = {
      findAll: jest.fn().mockResolvedValue([
        {
          id: "1a3e4b5c-6d7e-8f9a-bcde-0123456789ab",
          transactionDate: new Date("2022-01-02"),
          description: "Salary",
          referenceNumber: "TRX001",
          amount: 5000,
        },
      ]),
    };

    const status = await getInvoiceStatus(mockInvoice, mockTransactionData);
    expect(status).toBe("PAID");
  });

  it("should return NOT PAID when transaction amount is less than invoice amount, reference numbers match, and transaction date is later than invoice creation date", async () => {
    const mockInvoice = {
      creationDate: new Date("2022-01-01"),
      referenceNumber: "TRX001",
      amount: 5000.0,
      clientName: "John Doe",
      id: "1",
    };

    const mockTransactionData = {
      findAll: jest.fn().mockResolvedValue([
        {
          id: "1a3e4b5c-6d7e-8f9a-bcde-0123456789ab",
          transactionDate: new Date("2022-01-02"),
          description: "Salary",
          referenceNumber: "TRX001",
          amount: 4000,
        },
      ]),
    };

    const status = await getInvoiceStatus(mockInvoice, mockTransactionData);
    expect(status).toBe("NOT PAID");
  });
});

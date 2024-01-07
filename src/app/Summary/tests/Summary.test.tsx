import renderer from "react-test-renderer";
import React from "react";
import { render, screen } from "@testing-library/react";
import Summary from "../Summary";

describe("Summary", () => {
  const transactions = [
    {
      id: "1a3e4b5c-6d7e-8f9a-bcde-0123456789ab",
      transactionDate: new Date("2022-01-02T00:00:00Z"),
      description: "Salary",
      referenceNumber: "TRX001",
      amount: 5000,
    },
    {
      id: "2b4d6f8a-0c2e-4g6i-8k0m-123456789abc",
      transactionDate: new Date("2022-01-02T00:00:00Z"),
      description: "Rent",
      referenceNumber: "TRX002",
      amount: -1000,
    },
  ];

  const invoices = [
    {
      clientName: "hoang",
      creationDate: new Date("2021-11-01T14:20:04.961Z"),
      referenceNumber: "TRX001",
      amount: 5000,
      id: "g_LOYCFKgXH9M2PTyF5u9",
      status: "PAID",
    },
    {
      id: "64uj94Bgpo0qffLtzTxmD",
      clientName: "111",
      creationDate: new Date("2024-01-05T03:22:31.449Z"),
      referenceNumber: "111",
      amount: 11,
      status: "NOT PAID",
    },
  ];
  test("renders Summary component correctly", () => {
    const tree = renderer
      .create(<Summary transactions={transactions} invoices={invoices} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("number of invoice should be 1", () => {
    const { getByText } = render(
      <Summary transactions={transactions} invoices={invoices} />
    );
    const element = screen.getByTestId("number-of-invoices");
    expect(element.textContent).toBe("1");
  });
});

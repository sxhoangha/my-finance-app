This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

To run test, first rename .babelrc123 to .babelrc and then "npm run test". This, however will cause error when run "npm run dev" with NextJS 14.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## App details

This app helps self-employed individuals to track their income and expenses in order to give them better insights into their monetary situation, so they can focus on what they love doing without worrying about their finances!

It has:

1. A widget (Summary Widget) to track a summary of the customer’s financial status.

   - It should read the data from the list of transactions from the customer’s bank account.
   - Each transaction contains:
     - Transaction date
     - Description
     - Unique reference number
     - Monetary amount (positive for cash in, negative for cash out)
   - The widget should show the total monetary amount in the bank account based on the transaction data.
     - If the total is greater than a configured positive threshold, the number should be shown in green.
     - If the total is lower than the configured threshold (but still positive), the number should be shown in yellow.
     - If the total is lower than 0.00, the number should be shown in red.

2. One widget (Invoices Widget) to manage the list of invoices the user has for their customers, supporting both editing existing invoices and creating new ones.

   - Each invoice contains:
     - Name of the client
     - Creation date
     - Unique reference number
     - Monetary amount (positive for money to be received, negative for a refund to the customer)
     - Status (PAID or NOT PAID)
   - Every field should be modifiable, except the invoice status which is read-only and is determined as follows:
     - An invoice is considered PAID if there is a bank transaction for the same amount, with the bank transaction’s reference number being equal to the invoice’s reference number, and with the bank transaction date being later than the invoice creation date.
     - An invoice is considered NOT PAID if the above criteria are not met.
   - Users should be able to create a new invoice.

3. Other Requirements:
   - The Summary widget should also show the number of invoices created in the last 30 days.
   - Changes in one widget should automatically update other widgets. For example, the creation of an invoice should affect the summary widget, as it shows the number of invoices created in the month.

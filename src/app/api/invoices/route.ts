import { addInvoiceToDb, updateInvoiceInDb } from "@/app/utils";
import { IInvoice } from "@/types";
import { NextResponse } from "next/server";
import { InvoicesData, TransactionsData } from "../../../../db";

export async function GET() {
  const invoices = await InvoicesData.findAll();
  return NextResponse.json({ invoices });
}

export async function POST(req: Request) {
  const newInvoice: IInvoice = await req.json();

  const invoice = await addInvoiceToDb(
    newInvoice,
    InvoicesData,
    TransactionsData
  );

  return NextResponse.json({ data: invoice });
}

export async function PUT(req: Request) {
  const updatedInvoice: IInvoice = await req.json();

  const invoice = await updateInvoiceInDb(
    updatedInvoice,
    InvoicesData,
    TransactionsData
  );

  return NextResponse.json({ data: invoice });
}

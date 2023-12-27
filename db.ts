import { ITransaction } from "@/types";
import { Database } from "fakebase";

const db = new Database("./data");

export const Transactions = db.table<ITransaction>("transactions");

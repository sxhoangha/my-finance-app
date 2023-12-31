import styles from "./page.module.css";
import Nav from "./Nav";
import Summary from "./Summary/Summary";
import Invoices from "./Invoices/Invoices";
import { TransactionsData, InvoicesData } from "../../db";

export default async function Home() {
  const transactions = await TransactionsData.findAll();
  const invoices = await InvoicesData.findAll();

  return (
    <div className={styles.main}>
      <Nav />
      <Summary transactions={transactions} />
      <Invoices invoices={invoices} />
    </div>
  );
}

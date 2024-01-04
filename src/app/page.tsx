import styles from "./page.module.css";
import { TransactionsData, InvoicesData } from "../../db";
import MyApp from "./MyApp";

export default async function Home() {
  const transactions = await TransactionsData.findAll();
  const invoices = await InvoicesData.findAll();

  return (
    <div className={styles.main}>
      <MyApp transactions={transactions} invoices={invoices} />
    </div>
  );
}

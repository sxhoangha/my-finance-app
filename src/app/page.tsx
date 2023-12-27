import styles from "./page.module.css";
import Nav from "./Nav";
import Summary from "./Summary";
import Invoices from "./Invoices";
import { Transactions } from "../../db";

export default async function Home() {
  const transactions = await Transactions.findAll();
  return (
    <div className={styles.main}>
      <Nav />
      <Summary transactions={transactions} />
      <Invoices />
    </div>
  );
}

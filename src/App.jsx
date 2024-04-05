import { useState } from "react";
import { useEffect } from "react";
import BalanceContainer from "./components/balanceContainer/balanceContainer";
import Header from "./components/header/header";
import Transaction from "./components/transaction/transaction";
import Form from "./components/form/form";
import "./index.css";


function App() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    let totalIncome = 0;
    let totalExpense = 0;
    transactions.forEach((transaction) => {
      if (transaction.type === "Ingreso") {
        totalIncome += parseInt(transaction.money);
      } else {
        totalExpense += parseInt(transaction.money);
      }
    });
    setIncome(totalIncome);
    setExpense(totalExpense);
    setBalance(totalIncome - totalExpense);
  }, [transactions]);

  const currencyFormat = {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
    currencyDisplay: "symbol",
  };

  const COUNTRY = "es-CO";

  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const renderTransactions = () => {
    if (transactions.length === 0) {
      return (
        <p className="no-transactions">
          No hay transacciones <br /> <b>¡Añade una! </b>
        </p>
      );
    } else {
      return transactions.map((transaction, index) => {
        return (
          <Transaction
            key={index}
            initial={transaction.description[0].toLowerCase()}
            description={transaction.description}
            date={transaction.date}
            tag={transaction.type}
            money={transaction.money}
          />
        );
      });
    }
  };

  return (
    <>
      <div className="container-web">
        <Header />
        <div className="content">
          <div className="expenses-feed">{renderTransactions()}</div>
          <div className="expenses-resume">
            <BalanceContainer
              boxStyle={"balance"}
              titleStyle={"balance-title"}
              moneyStyle={"balance-money"}
              title={
                <>
                  Tu balance
                  <br />
                  del mes
                </>
              }
              money={balance
                .toLocaleString(COUNTRY, currencyFormat)
                .replace(/\s/g, "")}
            />
            <div className="resume-detail">
              <BalanceContainer
                boxStyle={"income"}
                title={"Ingresos"}
                money={income
                  .toLocaleString(COUNTRY, currencyFormat)
                  .replace(/\s/g, "")}
              />
              <BalanceContainer
                boxStyle={"expense"}
                title={"Egresos"}
                money={
                  "-" +
                  expense
                    .toLocaleString(COUNTRY, currencyFormat)
                    .replace(/\s/g, "")
                }
              />
            </div>
            <Form addTransaction={addTransaction} />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

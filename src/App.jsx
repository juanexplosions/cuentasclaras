import { useState } from "react";
import { useEffect } from "react";
import Modal from "./components/modal";
import "./index.css";

const BalanceContainer = ({
  title,
  money,
  boxStyle,
  titleStyle,
  moneyStyle,
}) => {
  return (
    <div className={`box ${boxStyle}`}>
      <p className={`title-box ${titleStyle}`}>{title}</p>
      <p className={`money-box ${moneyStyle}`}>{money}</p>
    </div>
  );
};

const Header = () => {
  return (
    <div className="header">
      <img className="logo" src="/cuentasclaras-logo.svg" alt="" />
      <Modal />
    </div>
  );
};

const Transaction = ({ initial, description, date, tag, money }) => {
  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("es-CO", options);
  };

  return (
    <div className="transaction-container">
      <div className="transaction">
        <div
          className={`
          transaction-initial-container
          ${tag === "Ingreso" ? "initial-income" : "initial-expense"}
        `}
        >
          <p>{initial}</p>
        </div>
        <p className="transaction-description">{description}</p>
        <p className="transaction-date">{formatDate(date)}</p>{" "}
        <div
          className={`
          transaction-tag
          ${tag === "Ingreso" ? "tag-green" : "tag-red"}
        `}
        >
          <p>{tag}</p>
        </div>
        <p className="transaction-money">
          {tag === "Egreso" ? "-" : ""}$
          {parseInt(money).toLocaleString("es-CO")}
        </p>
      </div>
      <div className="line"></div>
    </div>
  );
};

const Form = ({ addTransaction }) => {
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    money: "",
    date: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      formData.type === "" ||
      formData.description === "" ||
      formData.money === 0 ||
      formData.date === ""
    ) {
      alert("Por favor, llena todos los campos");
      return;
    } else {
      addTransaction(formData);

      // setFormData({type: "", description: "", money: "", date: ""});
    }
  };

  return (
    <form className="expenses-form" onSubmit={handleSubmit}>
      <div className="radio-btns">
        <label className="radio-text" htmlFor="income">
          <input
            type="radio"
            name="type"
            id="income"
            value="Ingreso"
            checked={formData.type === "Ingreso"}
            onChange={handleChange}
          />
          Ingreso
        </label>
        <label className="radio-text" htmlFor="expense">
          <input
            type="radio"
            name="type"
            id="expense"
            value="Egreso"
            checked={formData.type === "Egreso"}
            onChange={handleChange}
          />
          Egreso
        </label>
      </div>
      <button className="form-submit" type="submit">
        <span className="material-symbols-outlined">add</span>
        <p className="submit-text">Añadir</p>
      </button>
      <input
        className="form-description"
        type="text"
        placeholder="Descripción"
        name="description"
        value={formData.description}
        onChange={handleChange}
        maxLength="25"
      />
      <input
        className="form-money"
        type="number"
        placeholder="Monto"
        name="money"
        value={formData.money}
        onChange={handleChange}
      />
      <input
        className="form-date"
        type="date"
        placeholder="Fecha"
        name="date"
        value={formData.date}
        onChange={handleChange}
      />
    </form>
  );
};

function App() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const currencyFormat = {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
    currencyDisplay: "symbol",
  };

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
                .toLocaleString("es-CO", currencyFormat)
                .replace(/\s/g, "")}
            />
            <div className="resume-detail">
              <BalanceContainer
                boxStyle={"income"}
                title={"Ingresos"}
                money={income
                  .toLocaleString("es-CO", currencyFormat)
                  .replace(/\s/g, "")}
              />
              <BalanceContainer
                boxStyle={"expense"}
                title={"Egresos"}
                money={
                  "-" +
                  expense
                    .toLocaleString("es-CO", currencyFormat)
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

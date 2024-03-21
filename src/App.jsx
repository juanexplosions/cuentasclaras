import { useState } from "react";
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
      <button className="btn-faq">¿Qué es?</button>
    </div>
  );
};

const Transaction = ({ initial, description, date, tag, money }) => {
  return (
    <div className="transaction-container">
      <div className="transaction">
        <div
          className={`
          transaction-initial-container
          ${tag === "Ingreso" ? "initial-income" : "initial-expense"}
        `}
        >
          <p className>{initial}</p>
        </div>
        <p className="transaction-description">{description}</p>
        <p className="transaction-date">{date}</p>
        <div
          className={`
          transaction-tag
          ${tag === "Ingreso" ? "tag-green" : "tag-red"}
        `}
        >
          <p>{tag}</p>
        </div>
        <p className="transaction-money">{money}</p>
      </div>
      <div className="line"></div>
    </div>
  );
};

const Form = () => {
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
    console.log(formData);
  };

  return (
    <form className="expenses-form" onSubmit={handleSubmit}>
      <div className="radio-btns">
        <label className="income-text" htmlFor="income">
          <input
            type="radio"
            name="type"
            id="income" />
          Ingreso
        </label>
        <label htmlFor="expense">
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
      <input className="form-submit" type="submit" value="Añadir" />
      <input
        className="form-description"
        type="text"
        placeholder="Descripción"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
      <input
        className="form-money"
        type="text"
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
  return (
    <>
      <div className="container-web">
        <Header />
        <div className="content">
          <div className="expenses-feed">
            <Transaction
              initial="S"
              description="Salario mes de junio"
              date="Enero, 19. 2024"
              tag="Ingreso"
              money="$2.190.219"
            />
            <Transaction
              initial="S"
              description="Compra de cosas otakus"
              date="Enero, 20. 2024"
              tag="Egreso"
              money="-$2.190.219"
            />
          </div>
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
              money={"$1.900.000.000"}
            />
            <div className="resume-detail">
              <BalanceContainer
                boxStyle={"income"}
                title={"Ingresos"}
                money={"$1.900.000.000"}
              />
              <BalanceContainer
                boxStyle={"expense"}
                title={"Egresos"}
                money={"-$1.900.000.000"}
              />
            </div>
            <Form />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

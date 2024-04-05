import { useState } from "react";

export default function Form ({ addTransaction }) {
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

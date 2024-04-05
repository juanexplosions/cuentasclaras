export default function Transaction ({ initial, description, date, tag, money }) {
    const formatDate = (dateString) => {
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      return new Date(dateString).toLocaleDateString("es-CO", options);
    };

    const isIncome = tag === "Ingreso";

    return (
      <div className="transaction-container">
        <div className="transaction">
          <div
            className={`
            transaction-initial-container
            ${isIncome ? "initial-income" : "initial-expense"}
          `}
          >
            <p>{initial}</p>
          </div>
          <p className="transaction-description">{description}</p>
          <p className="transaction-date">{formatDate(date)}</p>{" "}
          <div
            className={`
            transaction-tag
            ${isIncome ? "tag-green" : "tag-red"}
          `}
          >
            <p>{tag}</p>
          </div>
          <p className="transaction-money">
            {!isIncome ? "-" : ""}$
            {parseInt(money).toLocaleString("es-CO")}
          </p>
        </div>
        <div className="line"></div>
      </div>
    );
  };
export default function BalanceContainer({
  title,
  money,
  boxStyle,
  titleStyle,
  moneyStyle,
}) {
  return (
    <div className={`box ${boxStyle}`}>
      <p className={`title-box ${titleStyle}`}>{title}</p>
      <p className={`money-box ${moneyStyle}`}>{money}</p>
    </div>
  );
}

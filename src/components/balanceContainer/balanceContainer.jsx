export default function BalanceContainer({
  title,
  money,
  boxStyle,
  titleStyle,
  moneyStyle,
}) {
  return (
    <div className={`box ${boxStyle}`}>
      <p className={`title-box ${boxStyle}`}>{title}</p>
      <p className={`money-box ${boxStyle}`}>{money}</p>
    </div>
  );
}

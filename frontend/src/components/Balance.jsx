export default function Balance({ value }) {
  return (
    <div className="flex">
      <div className="font-bold text-lg">Your balance</div>
      <div className="text-semibold ml-4 text-lg">Rs {value}</div>
    </div>
  );
}

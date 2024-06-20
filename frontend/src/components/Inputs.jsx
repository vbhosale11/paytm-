

function Inputs({ label, placeholder, onChange}) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2">
        <label>{label}</label>
      </div>
        <input onChange={onChange} className="w-full px-2 py-1 border-2 rounded-lg" placeholder={placeholder} title={label}></input>
    </div>
  );
}

export default Inputs;

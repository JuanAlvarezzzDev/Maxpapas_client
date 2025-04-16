const SelectionCombo = ({ option ,onClick, opcionActual}) => {
  const {id, imagen, nombre } = option;
  return (
    <div className={`aspect-square  w-[65px] lg:w-20 col-span-1 shadow rounded-md text-center p-3 flex justify-center items-center flex-col ${opcionActual.id === id ? 'gray-scale' : ''}`} onClick={onClick}>
      <div className="h-4/5 w-full">
        <img src={`/img/${imagen}.webp`} alt="" className="w-full h-full object-contain" />
      </div>
      <div className="h-1/5 font-bold text-sm">
        <p>{nombre}</p>
      </div>
    </div>
  );
};

export default SelectionCombo;

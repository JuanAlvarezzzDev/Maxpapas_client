import { createContext, useEffect, useState } from "react";
import { useCoins } from "../store/Admin/useCoins";
import useOrdenes from "../store/Admin/useOrdenes";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  //Hook Coins
  const { bills, handleCoins, coinsTotal, setCoins} = useCoins();
  const { orden, handleSetOrden, handleSetPay, pay, handleChangePay, setPay, payOrder } = useOrdenes();
  const [active, setActive] = useState(null);

  const handleClickSideItem = (text) => {
    setActive(text);
  };
 const stateInitialCalculator = () => {
  setCoins([])
  setPay([])
 }

  return (
    <AdminContext.Provider
      value={{
        handleClickSideItem,
        active,
        bills,
        coinsTotal,
        handleCoins,
        setCoins,
        orden,
        handleSetOrden,
        handleSetPay,
        handleChangePay,
        stateInitialCalculator,
        pay,
        payOrder,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export { AdminProvider };
export default AdminContext;

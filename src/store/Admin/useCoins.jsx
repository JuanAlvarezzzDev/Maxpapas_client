import React, { useEffect, useState } from "react";
import api from "../../service/apiService";
import { ReduceTotal } from "../../helpers";

export const useCoins = () => {
  const [bills, setBills] = useState([]);
  const [coins, setCoins] = useState([]);

  const obtenerCoins = async () => {
    try {
      const data = await api.fetch("monedas");
      setBills(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCoins = (coin, cantidad) => {
    if (cantidad === 0) {
      const coinsUpdated = coins.filter((option) => option.id !== coin.id);
      setCoins(coinsUpdated);
    } else if (coins.some((option) => option.id === coin.id)) {
      const coinsUpdated = coins.map((option) =>
        option.id === coin.id ? { ...option, cantidad } : option
      );
      setCoins(coinsUpdated);
    } else {
      setCoins([...coins, { ...coin, cantidad }]);
    }
  };
 const coinsTotal = ReduceTotal(coins)

  useEffect(() => {
    obtenerCoins();
  }, []);
  return { bills, handleCoins, coinsTotal, setCoins};
};

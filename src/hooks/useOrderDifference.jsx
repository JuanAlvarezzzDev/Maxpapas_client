import { useState, useEffect } from 'react';

const useOrderDifference = (ordenTotal, coinsTotal) => {
  const [diferencia, setDiferencia] = useState(0);
  const [textoEstado, setTextoEstado] = useState('');
  const [colorEstado, setColorEstado] = useState('');

  useEffect(() => {
    const diff = (ordenTotal ?? 0) - coinsTotal;
    setDiferencia(diff);

    if (diff > 0) {
      setTextoEstado('Faltante');
      setColorEstado('text-red-500');
    } else if (diff < 0) {
      setTextoEstado('Devuelta');
      setColorEstado('text-green-500');
    } else if (diff === 0) {
      setTextoEstado('Completado');
      setColorEstado('text-blue-500');
    }
  }, [ordenTotal, coinsTotal]);

  return { diferencia, textoEstado, colorEstado };
};

export default useOrderDifference;

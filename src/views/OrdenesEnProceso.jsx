import React from "react";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import Loading from "../components/Loading";
import ItemOrden from "../components/ItemOrden";

const OrdenesEnProceso = () => {
  const stateProcess = 2;
  const token = localStorage.getItem("AUTH_TOKEN");
  const fetcher = () =>
    clienteAxios(`/api/pedidos/estado/${stateProcess}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  const { data, error, isLoading } = useSWR(
    `/api/pedidos/estado/${stateProcess}`,
    fetcher,
    { refreshInterval: 1000 }
  );

  if (isLoading) return <Loading />;
  if (error) return <p>Error al cargar datos</p>;

  return (
    <div>
      <h1 className="text-4xl font-black">Ordenes En Proceso...</h1>
      {data.data.data.map((pedido) => (
        <ItemOrden key={pedido.id} pedido={pedido} />
      ))}
    </div>
  );
};

export default OrdenesEnProceso;

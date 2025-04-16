import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import useQuisco from "../hooks/useQuiosco";
import { AsideCombo, PrepareCombo } from "../containers";
import Loading from "../components/Loading";
import CustomModal from "../components/UI/CustomModal";
import { ModalEdit } from "../components/ModalEdit";
import { useAuth } from "../hooks/useAuth";

const OrdenCombo = () => {
  useAuth({ middleware: "auth" });
  const { idProducto } = useParams();
  const { editModal, editToggleModal } = useQuisco();
  const [dataCombo, setDataCombo] = useState(null);

  const token = localStorage.getItem("AUTH_TOKEN");
  const fetcher = () =>
    clienteAxios(`/api/detalle/${idProducto}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  const { data, error, isLoading } = useSWR(
    `/api/detalle/${idProducto}`,
    fetcher,
    { refreshInterval: 1000 }
  );

  useEffect(() => {
    if (data) {
      setDataCombo(data.data);
    }
  }, [data]);

  if (isLoading) return <Loading />;

  return (
    <div className="flex overflow-x-auto h-screen snap-mandatory snap-x">
      {dataCombo && (
        <>
          <div className="w-screen h-full flex-shrink-0 lg:w-2/3 relative snap-center">
            <PrepareCombo dataCombo={dataCombo} />
          </div>
          <div className="w-screen h-full flex-shrink-0 relative snap-center lg:w-1/3">
            <AsideCombo />
          </div>
        </>
      )}
      <CustomModal isOpen={editModal} onRequestClose={editToggleModal}>
        <ModalEdit />
      </CustomModal>
    </div>
  );
};

export default OrdenCombo;

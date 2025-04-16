import React, { useState } from "react";
import useSWR from "swr";
import clienteAxios from "../config/axios";
import DataTable from "react-data-table-component";
import { ButtonPrinter } from "../components/UI";
import Ticket from "../Printer/Ticket";
import { formatearDinero } from "../helpers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const columns = [
  {
    name: "id",
    selector: (row) => row.id,
  },
  {
    name: "Nombre",
    selector: (row) => row.cliente,
  },
  {
    name: "Total",
    selector: (row) => formatearDinero(row.total),
  },
  {
    name: "Fecha y Hora",
    selector: (row) => {
      const date = new Date(row.updated_at);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    },
  },
  {
    name: "Imprimir",
    cell: (row) => (
      <div className="flex justify-center items-center">
        <ButtonPrinter
          onClick={() => {
            Ticket(row);
          }}
        />
      </div>
    ),
  },
];

const customStyles = {
  headRow: {
    style: {
      border: "none",
    },
  },
  headCells: {
    style: {
      color: "#202124",
      fontSize: "1rem",
    },
  },
  rows: {
    highlightOnHoverStyle: {
      backgroundColor: "rgb(238, 242 ,255)",
      borderBottomColor: "#FFFFFF",
      outline: "1px solid #FFFFFF",
    },
  },
  pagination: {
    style: {
      border: "none",
    },
  },
};

export const Ordenes = () => {
  const token = localStorage.getItem("AUTH_TOKEN");
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [url, setUrl] = useState(`/api/pedidos?page=${currentPage}`);
  const fetcher = (url) =>
    clienteAxios(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  // Función para actualizar la URL con los filtros y llamar a la API
  const handleFilter = () => {
    let newUrl = `/api/pedidos?page=${currentPage}`;
    if (startDate) {
      newUrl += `&start_date=${startDate.toISOString().split("T")[0]}`;
    }
    if (endDate) {
      newUrl += `&end_date=${endDate.toISOString().split("T")[0]}`;
    }
    setUrl(newUrl); // Actualiza la URL en useSWR
  };

  const updatePageUrl = (page) => {
    let newUrl = `/api/pedidos?page=${page}`;
    if (startDate) {
      newUrl += `&start_date=${startDate.toISOString().split("T")[0]}`;
    }
    if (endDate) {
      newUrl += `&end_date=${endDate.toISOString().split("T")[0]}`;
    }
    setUrl(newUrl);
  };
  const { data, error, isLoading } = useSWR(url, fetcher, {
    refreshInterval: 1000,
  });

  if (isLoading) return;
  if (error) return <p>Error al cargar datos</p>;

  // Funciones para cambiar la página y actualizar la URL
  const handleNextPage = () => {
    if (data.data.data.current_page < data.data.data.last_page) {
      const nextPage = data.data.data.current_page + 1;
      setCurrentPage(nextPage);
      updatePageUrl(nextPage); // Actualiza la URL con la nueva página
    }
  };

  const handlePrevPage = () => {
    if (data.data.data.current_page > 1) {
      const prevPage = data.data.data.current_page - 1;
      setCurrentPage(prevPage);
      updatePageUrl(prevPage); // Actualiza la URL con la nueva página
    }
  };

  return (
    <div className="relative">
       <div className="bg-green-200 p-2 mb-2 rounded flex font-bold  text-3xl justify-center gap-7 sticky">
        <h2 className="font-bold">Total Pedidos:</h2>
        <p className=" font-semibold">{formatearDinero(data.data.total)}</p>
      </div>
      <div>
        <div className="flex justify-center mb-5">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Fecha de inicio"
            className="px-4 py-2 border rounded"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="Fecha de fin"
            className="px-4 py-2 border rounded ml-2"
          />
          <button
            onClick={handleFilter}
            className="bg-blue-500 text-white px-4 py-2 rounded ml-4"
          >
            Filtrar
          </button>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={data.data.data.data}
        pagination={false}
        customStyles={customStyles}
        highlightOnHover
        pointerOnHover
      />
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePrevPage}
          disabled={data.data.data.current_page === 1}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span>
          Página {data.data.data.current_page} de {data.data.data.last_page}
        </span>
        <button
          onClick={handleNextPage}
          disabled={data.data.data.current_page === data.data.data.last_page}
          className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div> 
    </div>
  );
};

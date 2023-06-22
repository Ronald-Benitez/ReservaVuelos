import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import moment from "moment/moment";
import "moment/locale/es";

const Atrasados = () => {
  const [pasajerosAtrasados, setPasajerosAtrasados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          localStorage.getItem("base") + "pasajeros_atrasados/boleto"
        );
        setPasajerosAtrasados(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      name: "Número de Vuelo",
      selector: (row) => row.boleto.n_vuelo,
      sortable: true,
    },
    {
      name: "Pasaporte",
      selector: (row) => row.pasaporte_pasajero,
      sortable: true,
    },
    {
      name: "Motivo",
      selector: (row) => row.motivo,
      sortable: true,
    },
    {
      name: "Fecha Registro",
      selector: (row) => row.fecha_registro.split("T")[0],
      sortable: true,
    },
    {
      name: "Hora Registro",
      selector: (row) => row.hora_registro.split("T")[1],
      sortable: true,
    },
    {
      name: "Clase",
      selector: (row) => row.boleto.clase,
      sortable: true,
    },
    {
      name: "Precio",
      selector: (row) => "$" + row.boleto.precio,
      sortable: true,
    },
    {
      name: "Número de Boleto",
      selector: (row) => row.boleto.n_boleto,
      sortable: true,
    },
  ];

  return (
    <div className="container p-4 mt-2">
      <h1 className="text-center">Pasajeros Atrasados</h1>
      <div className="p-5">
        <DataTable
          columns={columns}
          data={pasajerosAtrasados}
          pagination
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default Atrasados;

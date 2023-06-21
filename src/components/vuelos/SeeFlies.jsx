import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import moment from "moment/moment";

export default function SeeFlies({ reload }) {
  const [vuelos, setVuelos] = useState([]);
  const [escalas, setEscalas] = useState([]);
  const [avion, setAvion] = useState({});
  const [aeropuertos, setAeropuertos] = useState([]);
  const [aerolinea, setAerolinea] = useState({});
  const [selected, setSelected] = useState({});

  useEffect(() => {
    axios.get(localStorage.getItem("base") + "vuelos").then((res) => {
      setVuelos(res.data);
    });

    setAerolinea({});
    setAvion({});
    setAeropuertos([]);
    setEscalas([]);
    setSelected({});
  }, [reload]);

  useEffect(() => {
    setAerolinea({});
    setAvion({});
    setAeropuertos([]);
    setEscalas([]);
    if (selected.n_vuelo) {
      axios
        .get(localStorage.getItem("base") + "escalas/vuelo/" + selected.n_vuelo)
        .then((res) => {
          setEscalas(res.data);
        });

      axios
        .get(localStorage.getItem("base") + "aviones/" + selected.id_avion)
        .then((res) => {
          setAvion(res.data);
        });

      axios
        .get(
          localStorage.getItem("base") +
            "aerolineas/" +
            selected.codigo_aerolinea
        )
        .then((res) => {
          setAerolinea(res.data);
        });

      axios
        .get(
          localStorage.getItem("base") + "aeropuertos/" + selected.codigo_origen
        )
        .then((res) => {
          setAeropuertos([]);
          setAeropuertos((prev) => [...prev, res.data]);
        });

      axios
        .get(
          localStorage.getItem("base") +
            "aeropuertos/" +
            selected.codigo_destino
        )
        .then((res) => {
          setAeropuertos((prev) => [...prev, res.data]);
        });
    }
  }, [selected]);

  const renderVuelo = () => {
    if (!selected || !selected.n_vuelo) return <Fragment></Fragment>;
    return (
      <div className="container p-4 border my-2">
        <h3 className="text-center">Vuelo</h3>
        <p>
          <strong>Número de vuelo: </strong>
          {selected.n_vuelo}
        </p>
        <p>
          <strong>Fecha de salida: </strong>
          {moment(selected.fecha).format("LL")}
        </p>
        <p>
          <strong>Hora de salida: </strong>
          {moment(selected.hora_salida.split("T")[1], "HH:mm:ss").format("LT")}
        </p>
        <p>
          <strong>Hora de llegada: </strong>
          {moment(selected.hora_llegada.split("T")[1], "HH:mm:ss").format("LT")}
        </p>
        <p>
          <strong>Distancia: </strong>
          {selected.distancia} km
        </p>
      </div>
    );
  };

  const renderAerolinea = () => {
    if (!aerolinea.codigo_iata) return <Fragment></Fragment>;
    return (
      <div className="container p-4 border my-2">
        <h3 className="text-center">Aerolínea</h3>
        <p>
          <strong>Código: </strong>
          {aerolinea.codigo_iata}
        </p>
        <p>
          <strong>Nombre: </strong>
          {aerolinea.nombre}
        </p>
      </div>
    );
  };

  const renderAvion = () => {
    if (!avion.id_avion) return <Fragment></Fragment>;
    return (
      <div className="container p-4 border my-2">
        <h3 className="text-center">Avión</h3>
        <p>
          <strong>ID: </strong>
          {avion?.id_avion || "No asignado"}
        </p>
        <p>
          <strong>Modelo: </strong>
          {avion?.nombre || "No asignado"}
        </p>
        <p>
          <strong>Capacidad clase economica: </strong>
          {avion?.asientos_economica || "No asignado"}
        </p>
        <p>
          <strong>Capacidad clase negocios: </strong>
          {avion?.asientos_negocios || "No asignado"}
        </p>
      </div>
    );
  };

  const renderAeropuertos = () => {
    if (aeropuertos.length === 0) return <Fragment></Fragment>;
    return (
      <div className="container p-4 border my-2">
        <h3 className="text-center">Aeropuertos</h3>
        {aeropuertos.map((aeropuerto, index) => (
          <Fragment key={index}>
            <h5 className="text-center mt-2">Aeropuerto {index + 1}</h5>
            <div key={aeropuerto.codigo}>
              <p>
                <strong>Código: </strong>
                {aeropuerto.codigo_iata}
              </p>
              <p>
                <strong>Nombre: </strong>
                {aeropuerto.nombre}
              </p>
              <p>
                <strong>Ciudad: </strong>
                {aeropuerto.ciudad}
              </p>
              <p>
                <strong>País: </strong>
                {aeropuerto.pais}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
    );
  };

  const renderEscalas = () => {
    if (escalas.length === 0) return <Fragment></Fragment>;
    return (
      <div className="container p-4 border my-2">
        <h3 className="text-center">Escalas</h3>
        {escalas.map((escala, index) => (
          <Fragment key={index}>
            <h5 className="text-center mt-2">Escala {index + 1}</h5>
            <div key={escala.id_escala}>
              <p>
                <strong>Aeropuerto: </strong>
                {escala.codigo_aeropuerto}
              </p>
              <p>
                <strong>Fecha de llegada: </strong>
                {moment(escala.fecha_llegada).format("LL")}
              </p>
              <p>
                <strong>Hora de llegada: </strong>
                {moment(escala.hora_llegada.split("T")[1], "HH:mm:ss").format(
                  "LT"
                )}
              </p>
              <p>
                <strong>Hora de salida: </strong>
                {moment(escala.hora_salida.split("T")[1], "HH:mm:ss").format(
                  "LT"
                )}
              </p>
            </div>
          </Fragment>
        ))}
      </div>
    );
  };

  return (
    <div>
      <select
        name=""
        id=""
        className="form-control"
        onChange={(e) => {
          setSelected(
            vuelos.find((vuelo) => vuelo.n_vuelo == e.target.value) || {}
          );
        }}
      >
        <option value="">Seleccione un vuelo</option>
        {vuelos.map((vuelo) => (
          <option value={vuelo.n_vuelo} key={vuelo.n_vuelo}>
            {vuelo.n_vuelo}
          </option>
        ))}
      </select>
      {renderVuelo()}
      {renderAerolinea()}
      {renderAvion()}
      {renderAeropuertos()}
      {renderEscalas()}
    </div>
  );
}

import { useEffect, useState } from "react";

import axios from "axios";

export default function AddFly({ reload, setReload, toasts }) {
  const [aerolineas, setAerolineas] = useState([]);
  const [aviones, setAviones] = useState([]);
  const [aeropuertos, setAeropuertos] = useState([]);

  const [codigo_aerolinea, setCodigo_aerolinea] = useState("");
  const [id_avion, setId_avion] = useState("");
  const [codigo_origen, setCodigo_origen] = useState("");
  const [codigo_destino, setCodigo_destino] = useState("");
  const [fecha, setFecha] = useState("");
  const [hora_salida, setHora_salida] = useState("");
  const [hora_llegada, setHora_llegada] = useState("");

  useEffect(() => {
    axios.get(localStorage.getItem("base") + "aerolineas").then((res) => {
      setAerolineas(res.data);
    });

    axios.get(localStorage.getItem("base") + "aviones").then((res) => {
      setAviones(res.data);
    });

    axios.get(localStorage.getItem("base") + "aeropuertos").then((res) => {
      setAeropuertos(res.data);
    });

    setCodigo_aerolinea("");
    setId_avion("");
    setCodigo_origen("");
    setCodigo_destino("");
    setFecha("");
    setHora_salida("");
    setHora_llegada("");
  }, [reload]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const vuelo = {
      codigo_aerolinea,
      id_avion: parseInt(id_avion),
      codigo_origen,
      codigo_destino,
      fecha,
      hora_salida,
      hora_llegada,
    };

    axios
      .post(localStorage.getItem("base") + "vuelos", vuelo)
      .then((res) => {
        setReload(!reload);
        toasts.success("Vuelo agregado");
      })
      .catch((err) => {
        console.log(err);
        toasts.error("Error al agregar vuelo");
      });
  };

  return (
    <div className="container p-4 border">
      <h3 className="text-center">Agregar vuelo</h3>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group mt-2">
              <label htmlFor="codigo_aerolinea">Aerolínea</label>
              <select
                className="form-control"
                id="codigo_aerolinea"
                value={codigo_aerolinea}
                onChange={(e) => setCodigo_aerolinea(e.target.value)}
              >
                <option value="">Seleccione una aerolínea</option>
                {aerolineas.map((aerolinea) => (
                  <option
                    key={aerolinea.codigo_iata}
                    value={aerolinea.codigo_iata}
                  >
                    {aerolinea.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mt-2">
              <label htmlFor="id_avion">Avión</label>
              <select
                className="form-control"
                id="id_avion"
                value={id_avion}
                onChange={(e) => setId_avion(e.target.value)}
              >
                <option value="">Seleccione un avión</option>
                {aviones.map((avion) => (
                  <option key={avion.id_avion} value={avion.id_avion}>
                    {avion.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mt-2">
              <label htmlFor="codigo_origen">Aeropuerto de origen</label>
              <select
                className="form-control"
                id="codigo_origen"
                value={codigo_origen}
                onChange={(e) => setCodigo_origen(e.target.value)}
              >
                <option value="">Seleccione un aeropuerto</option>
                {aeropuertos.map((aeropuerto) => (
                  <option
                    key={aeropuerto.codigo_iata}
                    value={aeropuerto.codigo_iata}
                  >
                    {aeropuerto.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mt-2">
              <label htmlFor="codigo_destino">Aeropuerto de destino</label>
              <select
                className="form-control"
                id="codigo_destino"
                value={codigo_destino}
                onChange={(e) => setCodigo_destino(e.target.value)}
              >
                <option value="">Seleccione un aeropuerto</option>
                {aeropuertos.map((aeropuerto) => (
                  <option
                    key={aeropuerto.codigo_iata}
                    value={aeropuerto.codigo_iata}
                  >
                    {aeropuerto.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="form-group mt-2">
              <label htmlFor="fecha">Fecha</label>
              <input
                type="date"
                className="form-control"
                id="fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="hora_salida">Hora de salida</label>
              <input
                type="time"
                className="form-control"
                id="hora_salida"
                value={hora_salida}
                onChange={(e) => setHora_salida(e.target.value)}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="hora_llegada">Hora de llegada</label>
              <input
                type="time"
                className="form-control"
                id="hora_llegada"
                value={hora_llegada}
                onChange={(e) => setHora_llegada(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 text-center mt-3">
            <button type="submit" className="col-md-6 btn btn-dark">
              Agregar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

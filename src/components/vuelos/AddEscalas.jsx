import { useEffect, useState } from "react";
import moment from "moment/moment";
import axios from "axios";

export default function AddEscalas({ toasts, vuelos }) {
  const [n_vuelo, setN_vuelo] = useState("");
  const [codigo_aeropuerto, setCodigo_aeropuerto] = useState("");
  const [hora_llegada, setHora_llegada] = useState("");
  const [hora_salida, setHora_salida] = useState("");
  const [fecha, setFecha] = useState("");
  const [orden, setOrden] = useState("");
  const [vuelo, setVuelo] = useState({});
  const [escalas, setEscalas] = useState([]);
  const [aeropuertos, setAeropuertos] = useState([]);

  useEffect(() => {
    axios.get(localStorage.getItem("base") + "aeropuertos").then((res) => {
      setAeropuertos(res.data);
    });

    setN_vuelo("");
    setCodigo_aeropuerto("");
    setHora_llegada("");
    setHora_salida("");
    setFecha("");
    setOrden("");
  }, [vuelos]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const escala = {
      n_vuelo,
      codigo_aeropuerto,
      hora_llegada,
      hora_salida,
      fecha,
      orden: parseInt(orden),
    };

    axios
      .post(localStorage.getItem("base") + "escalas", escala)
      .then((res) => {
        toasts.success("Escala agregada");
      })
      .catch((err) => {
        console.log(err);
        toasts.error("Error al agregar la escala");
      });
  };

  useEffect(() => {
    if (n_vuelo !== "") {
      axios
        .get(localStorage.getItem("base") + "escalas/vuelo/" + n_vuelo)
        .then((res) => {
          setOrden(res.data.length + 1);
        });
    }
  }, [n_vuelo]);

  return (
    <div className="container p-4 border mt-2">
      <h2>Agregar Escala</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-group mt-2">
              <label htmlFor="n_vuelo">Número de vuelo</label>
              <select
                className="form-control"
                name="n_vuelo"
                id="n_vuelo"
                value={n_vuelo}
                onChange={(e) => {
                  setN_vuelo(e.target.value);
                }}
              >
                <option value="">Seleccione un vuelo</option>
                {vuelos.map((vuelo) => (
                  <option key={vuelo.n_vuelo} value={vuelo.n_vuelo}>
                    {vuelo.n_vuelo}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group mt-2">
              <label htmlFor="codigo_aeropuerto">Aeropuerto</label>
              <select
                className="form-control"
                name="codigo_aeropuerto"
                id="codigo_aeropuerto"
                value={codigo_aeropuerto}
                onChange={(e) => {
                  setCodigo_aeropuerto(e.target.value);
                }}
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
              <label htmlFor="orden">Orden</label>
              <input
                type="number"
                className="form-control"
                name="orden"
                id="orden"
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
                readOnly
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            {" "}
            <div className="form-group mt-2">
              <label htmlFor="fecha">Fecha</label>
              <input
                type="date"
                className="form-control"
                name="fecha"
                id="fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="hora_llegada">Hora de llegada</label>
              <input
                type="time"
                className="form-control"
                name="hora_llegada"
                id="hora_llegada"
                value={hora_llegada}
                onChange={(e) => setHora_llegada(e.target.value)}
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="hora_salida">Hora de salida</label>
              <input
                type="time"
                className="form-control"
                name="hora_salida"
                id="hora_salida"
                value={hora_salida}
                onChange={(e) => setHora_salida(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-center mt-3">
              <button type="submit" className="col-md-6 btn btn-dark">
                Agregar
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

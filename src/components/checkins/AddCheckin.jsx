import { useEffect, useState } from "react";
import axios from "axios";

export default function AddCheckin({ toasts, vuelos }) {
  const [boletos, setBoletos] = useState([]);
  const [selected, setSelected] = useState({});
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [estado, setEstado] = useState("");
  const [id_boleto, setId_boleto] = useState("");

  useEffect(() => {
    axios.get(localStorage.getItem("base") + "boletos").then((res) => {
      setBoletos(res.data);
    });

    setSelected("");
    setFecha("");
    setHora("");
    setEstado("");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkin = {
      id_boleto: selected.id_boleto,
      pasaporte_pasajero: selected.pasaporte_pasajero,
      n_vuelo: selected.n_vuelo,
      fecha,
      hora,
      estado,
    };

    axios
      .post(localStorage.getItem("base") + "checkins", checkin)
      .then((res) => {
        toasts.success("Checkin agregado");
      })
      .catch((err) => {
        console.log(err);
        toasts.error("Error al agregar el checkin");
      });
  };

  return (
    <div className="container p-4 border">
      <h3>Agregar Checkin</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-2">
          <label htmlFor="id_boleto">Boleto</label>
          <select
            className="form-control"
            id="id_boleto"
            name="id_boleto"
            value={id_boleto}
            onChange={(e) => {
              setId_boleto(e.target.value);
              setSelected(
                boletos.find((boleto) => boleto.id_boleto == e.target.value)
              );
            }}
          >
            <option value="">Seleccione un boleto</option>
            {boletos.map((boleto, index) => (
              <option key={index} value={boleto.id_boleto}>
                {"(V: " +
                  boleto.n_vuelo +
                  "), (N: " +
                  boleto.n_boleto +
                  "), (P: " +
                  boleto.pasaporte_pasajero +
                  ")"}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mt-2">
          <label htmlFor="pasaporte_pasajero">Pasaporte</label>
          <input
            type="text"
            className="form-control"
            id="pasaporte_pasajero"
            name="pasaporte_pasajero"
            value={selected?.pasaporte_pasajero || ""}
            readOnly
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="n_vuelo">Número de vuelo</label>
          <input
            type="text"
            className="form-control"
            id="n_vuelo"
            name="n_vuelo"
            value={selected?.n_vuelo || ""}
            readOnly
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="n_vuelo">Número de boleto</label>
          <input
            type="text"
            className="form-control"
            id="n_vuelo"
            name="n_vuelo"
            value={selected?.n_boleto || ""}
            readOnly
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="fecha">Fecha</label>
          <input
            type="date"
            className="form-control"
            id="fecha"
            name="fecha"
            value={fecha}
            onChange={(e) => {
              setFecha(e.target.value);
            }}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="hora">Hora</label>
          <input
            type="time"
            className="form-control"
            id="hora"
            name="hora"
            value={hora}
            onChange={(e) => {
              setHora(e.target.value);
            }}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="estado">Estado</label>
          <input
            type="text"
            className="form-control"
            id="estado"
            name="estado"
            value={estado}
            onChange={(e) => {
              setEstado(e.target.value);
            }}
          />
        </div>
        <div className="row justify-content-center mt-2">
          <button type="submit" className="btn btn-dark col-12 col-md-6">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
}

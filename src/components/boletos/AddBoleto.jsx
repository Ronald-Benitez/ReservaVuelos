import { useEffect, useState } from "react";
import axios from "axios";

export default function AddBoleto({ toasts, vuelos }) {
  const [pasajeros, setPasajeros] = useState([]);
  const [n_vuelo, setN_vuelo] = useState("");
  const [pasaporte_pasajero, setPasaporte_pasajero] = useState("");
  const [fecha_compra, setFecha_compra] = useState("");
  const [clase, setClase] = useState("");
  const [precio, setPrecio] = useState("");

  useEffect(() => {
    axios.get(localStorage.getItem("base") + "pasajeros").then((res) => {
      setPasajeros(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const boleto = {
      n_vuelo,
      pasaporte_pasajero,
      fecha_compra,
      clase,
      precio: parseFloat(precio),
    };

    console.log(boleto);

    axios
      .post(localStorage.getItem("base") + "boletos", boleto)
      .then((res) => {
        toasts.success("Boleto agregado");
      })
      .catch((err) => {
        console.log(err);
        toasts.error("Error al agregar boleto");
      });
  };

  return (
    <div className="container p-4 border">
      <h3 className="text-center">Agregar boleto</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-2">
          <label htmlFor="n_vuelo">Número de vuelo</label>
          <select
            className="form-control"
            id="n_vuelo"
            name="n_vuelo"
            value={n_vuelo}
            onChange={(e) => {
              setN_vuelo(e.target.value);
            }}
          >
            <option value="">Seleccione un vuelo</option>
            {vuelos.map((vuelo, index) => (
              <option key={index} value={vuelo.n_vuelo}>
                {vuelo.n_vuelo}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mt-2">
          <label htmlFor="pasaporte_pasajero">Pasaporte del pasajero</label>
          <select
            className="form-control"
            id="pasaporte_pasajero"
            name="pasaporte_pasajero"
            value={pasaporte_pasajero}
            onChange={(e) => setPasaporte_pasajero(e.target.value)}
          >
            <option value="">Seleccione un pasajero</option>
            {pasajeros.map((pasajero, index) => (
              <option key={index} value={pasajero.n_pasaporte}>
                {pasajero.n_pasaporte +
                  " - " +
                  pasajero.nombres +
                  " " +
                  pasajero.apellidos}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mt-2">
          <label htmlFor="fecha_compra">Fecha de compra</label>
          <input
            type="date"
            className="form-control"
            id="fecha_compra"
            name="fecha_compra"
            value={fecha_compra}
            onChange={(e) => setFecha_compra(e.target.value)}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="clase">Clase</label>
          <select
            className="form-control"
            id="clase"
            name="clase"
            value={clase}
            onChange={(e) => setClase(e.target.value)}
          >
            <option value="">Seleccione una clase</option>
            <option value="Económica">Económica</option>
            <option value="Negocios">Negocios</option>
          </select>
        </div>
        <div className="form-group mt-2">
          <label htmlFor="precio">Precio</label>
          <input
            type="number"
            className="form-control"
            id="precio"
            name="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
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

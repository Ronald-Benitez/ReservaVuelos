import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import moment from "moment/moment";
import "moment/locale/es";

export default function SeeBoletos({ vuelos }) {
  const [boletos, setBoletos] = useState([]);
  const [n_vuelo, setN_vuelo] = useState("");

  useEffect(() => {
    setBoletos([]);
    setN_vuelo("");
    if (n_vuelo) {
      axios
        .get(localStorage.getItem("base") + "boletos/n_vuelo/" + n_vuelo)
        .then((res) => {
          setBoletos(res.data);
        });
    }
  }, [n_vuelo]);

  const renderBoletos = () => {
    if (boletos.length > 0) {
      return boletos.map((boleto, index) => {
        return (
          <Fragment key={index}>
            <div className="container p-4 border my-2">
              <h3 className="text-center">Boleto</h3>
              <p>
                <strong>ID: </strong>
                {boleto.id_boleto}
              </p>
              <p>
                <strong>Numero de vuelo: </strong>
                {boleto.n_vuelo}
              </p>
              <p>
                <strong>Fecha de compra: </strong>
                {moment(boleto.fecha_compra).format("LL")}
              </p>
              <p>
                <strong>Clase: </strong>
                <span
                  className={
                    boleto.clase == "Económica"
                      ? "text-info"
                      : "text-success"
                  }
                >
                  {boleto.clase}
                </span>
              </p>
              <p>
                <strong>Asiento: </strong>
                {boleto.n_boleto}
              </p>
              <p>
                <strong>Costo: </strong>
                {boleto.precio}
              </p>
              <p>
                <strong>Cliente: </strong>
                {boleto.pasaporte_pasajero}
              </p>
            </div>
          </Fragment>
        );
      });
    } else {
      return (
        <div className="container p-4 border my-2" key="no-boletos">
          <h3 className="text-center">Boleto</h3>
          <p>
            <strong>No hay boletos para este vuelo</strong>
          </p>
        </div>
      );
    }
  };

  return (
    <div>
      <select
        name=""
        id=""
        className="form-control"
        onChange={(e) => {
          setN_vuelo(e.target.value);
        }}
      >
        <option value="">Seleccione un vuelo</option>
        {vuelos.map((vuelo) => (
          <option value={vuelo.n_vuelo} key={vuelo.n_vuelo}>
            {vuelo.n_vuelo}
          </option>
        ))}
      </select>

      {renderBoletos()}
    </div>
  );
}

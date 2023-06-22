import { useEffect, useState, Fragment } from "react";
import axios from "axios";
import moment from "moment/moment";
import "moment/locale/es";

export default function SeeCheckin({ vuelos }) {
  const [checkins, setCheckins] = useState([]);
  const [n_vuelo, setN_vuelo] = useState("");

  useEffect(() => {
    setCheckins([]);
    setN_vuelo("");
    if (n_vuelo) {
      axios
        .get(localStorage.getItem("base") + "checkins/n_vuelo/" + n_vuelo)
        .then((res) => {
          setCheckins(res.data);
        });
    }
  }, [n_vuelo]);

  const renderCheckins = () => {
    if (checkins.length > 0) {
      return checkins.map((checkin, index) => {
        return (
          <Fragment key={index}>
            <div className="container p-4 border my-2">
              <h3 className="text-center">Check-in</h3>
              <p>
                <strong>ID: </strong>
                {checkin.id_boleto}
              </p>
              <p>
                <strong>Número de vuelo: </strong>
                {checkin.n_vuelo}
              </p>
              <p>
                <strong>Fecha: </strong>
                {moment(checkin.fecha).format("LL")}
              </p>
              <p>
                <strong>Hora: </strong>
                {moment(checkin.hora).format("LT")}
              </p>
              <p>
                <strong>Estado: </strong>
                {checkin.estado}
              </p>
            </div>
          </Fragment>
        );
      });
    } else {
      return (
        <div className="container p-4 border my-2" key="no-checkins">
          <h3 className="text-center">Check-in</h3>
          <p>
            <strong>No hay check-ins para este vuelo</strong>
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

      {renderCheckins()}
    </div>
  );
}

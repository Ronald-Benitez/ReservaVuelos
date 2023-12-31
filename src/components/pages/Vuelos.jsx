import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import AddFly from "../vuelos/AddFly";
import SeeFlies from "../vuelos/SeeFlies";
import AddEscalas from "../vuelos/AddEscalas";

export default function Vuelos() {
  const [reload, setReload] = useState(false);
  const [vuelos, setVuelos] = useState([]);

  useEffect(() => {
    setVuelos([]);
    axios.get(localStorage.getItem("base") + "vuelos").then((res) => {
      setVuelos(res.data);
    });
  }, [reload]);

  return (
    <div>
      <div className="row justify-content-center">
        <button
          className="btn btn-dark col-12 col-md-4 mt-4"
          onClick={() => {
            setReload(!reload);
            toast.success("Vuelos recargados");
          }}
        >
          Recargar vuelos
        </button>
      </div>
      <div className="row p-4">
        <div className="col-12 col-md-6 p-3">
          <div className="row">
            <AddFly
              reload={reload}
              setReload={setReload.bind(this)}
              toasts={toast}
            />
          </div>
          <div className="row">
            <AddEscalas
              reload={reload}
              setReload={setReload.bind(this)}
              toasts={toast}
              vuelos={vuelos}
            />
          </div>
        </div>
        <div className="col-12 col-md-6 p-3">
          <SeeFlies reload={reload} vuelos={vuelos} />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

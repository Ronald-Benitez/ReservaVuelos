import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import AddBoleto from "../boletos/AddBoleto";
import SeeBoletos from "../boletos/SeeBoletos";

export default function Boletos() {
  const [vuelos, setVuelos] = useState([]);
  const [reload, setReload] = useState(false);

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
            <AddBoleto toasts={toast} vuelos={vuelos} />
          </div>
        </div>
        <div className="col-12 col-md-6 p-3">
          <SeeBoletos vuelos={vuelos} />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

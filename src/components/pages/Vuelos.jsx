import { useEffect, useState } from "react";
import AddFly from "../vuelos/AddFly";
import SeeFlies from "../vuelos/SeeFlies";
import toast, { Toaster } from "react-hot-toast";

export default function Vuelos() {
  const [reload, setReload] = useState(false);

  return (
    <div>
      <div className="row p-4">
        <div className="col-12 col-md-6 p-3">
          <AddFly reload={reload} setReload={setReload.bind(this)} toasts={toast}/>
        </div>
        <div className="col-12 col-md-6 p-3">
          <SeeFlies reload={reload} />
        </div>
      </div>
      <Toaster />
    </div>
  );
}

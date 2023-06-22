import { useState } from "react";
import reactLogo from "./assets/react.svg";
import ChangeBD from "./components/layouts/ChangeBD";
import Vuelos from "./components/pages/Vuelos";
import Boletos from "./components/pages/Boletos";
import Checkin from "./components/pages/Checkin";
import Atrasados from "./components/pages/Atrasados";

function App() {
  const [view, setView] = useState("");

  const renderView = () => {
    switch (view) {
      case "vuelos": {
        return <Vuelos />;
      }
      case "boletos": {
        return <Boletos />;
      }
      case "checkin": {
        return <Checkin />;
      }
      case "atrasados": {
        return <Atrasados />;
      }
      default: {
        return (
          <div className="row justify-content-center align-items-center mt-5 p-5">
            <div className="col-12 col-md-6">
              <p className="text-center">
                Seleccione una vista para comenzar a trabajar con la base de
                datos
              </p>
            </div>
          </div>
        );
      }
    }
  };

  return (
    <div className="row w-100">
      <ChangeBD view={view} setView={setView.bind(this)} />
      {renderView()}
    </div>
  );
}

export default App;

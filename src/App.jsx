import { useState } from "react";
import reactLogo from "./assets/react.svg";
import ChangeBD from "./components/layouts/ChangeBD";
import Vuelos from "./components/pages/Vuelos";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="row w-100">
      <ChangeBD />
      <Vuelos />
    </div>
  );
}

export default App;

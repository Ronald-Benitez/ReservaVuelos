import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ChangeBD() {
  const [bd, setBD] = useState(localStorage.getItem("bd"));

  useEffect(() => {
    if (bd == "PostgreSQL") {
      localStorage.setItem("bd", "PostgreSQL");
      localStorage.setItem("base", "http://localhost:3000/api/");
      toast.success("Base de datos cambiada a PostgreSQL");
    }
    if (bd == "MySQL") {
      localStorage.setItem("bd", "MySQL");
      localStorage.setItem("base", "http://localhost:4000/api/");
      toast.success("Base de datos cambiada a MySQL");
    }
    if (bd == "MongoDB") {
      localStorage.setItem("bd", "MongoDB");
      localStorage.setItem("base", "http://localhost:5000/api/");
      toast.success("Base de datos cambiada a MongoDB");
    }
  }, [bd]);

  return (
    <div className="row justify-content-center align-items-center mt-4">
      <div className="col-12 col-md-6">
        <select
          name=""
          id=""
          className="form-control"
          value={bd}
          onChange={(e) => setBD(e.target.value)}
        >
          <option value="">Select la base de datos</option>
          <option value="MySQL">MySQL</option>
          <option value="PostgreSQL">PostgreSQL</option>
          <option value="MongoDB">MongoDB</option>
        </select>
      </div>
      <Toaster />
    </div>
  );
}

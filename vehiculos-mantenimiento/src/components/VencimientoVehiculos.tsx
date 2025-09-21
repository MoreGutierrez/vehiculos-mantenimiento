import { useState } from "react";
import type { Vehiculo } from "../interfaces/vehiculo";

interface VencimientosVehiculosProps {
  vehiculos: Vehiculo[];
  setVehiculos: React.Dispatch<React.SetStateAction<Vehiculo[]>>;
}

function VencimientosVehiculos({ vehiculos, setVehiculos }: VencimientosVehiculosProps) {
  const [formData, setFormData] = useState({
    vehiculoId: "",
    tipo: "",
    fecha: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.vehiculoId || !formData.tipo.trim() || !formData.fecha.trim()) {
      alert("Todos los campos son obligatorios");
      return;
    }

    const vehiculo = vehiculos.find((v) => v.id === formData.vehiculoId);
    if (!vehiculo) {
      alert("Vehículo no encontrado");
      return;
    }

    const updatedVehiculo = {
      ...vehiculo,
      vencimientoPatente:
        formData.tipo === "Patente" ? formData.fecha : vehiculo.vencimientoPatente,
      vencimientoSeguro:
        formData.tipo === "Seguro" ? formData.fecha : vehiculo.vencimientoSeguro
    };

    try {
      const res = await fetch(
        `https://66bfd18b42533c4031472125.mockapi.io/api/vehiculos/${vehiculo.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedVehiculo)
        }
      );

      if (!res.ok) throw new Error("Error al actualizar vencimiento");
      const data: Vehiculo = await res.json();

      setVehiculos((prev) =>
        prev.map((v) => (v.id === data.id ? data : v))
      );

      alert("Vencimiento actualizado correctamente");
    } catch (error) {
      console.error(error);
      alert("Hubo un problema al actualizar el vencimiento");
    }

    setFormData({
      vehiculoId: "",
      tipo: "",
      fecha: ""
    });
  };

  const hoy = new Date();
  const proximosDias = 7 * 24 * 60 * 60 * 1000;

  const vencidos: { v: Vehiculo; tipo: string; fecha: string }[] = [];
  const proximos: { v: Vehiculo; tipo: string; fecha: string }[] = [];

  vehiculos.forEach((v) => {
    if (v.vencimientoPatente) {
      const fecha = new Date(v.vencimientoPatente);
      if (fecha < hoy) vencidos.push({ v, tipo: "Patente", fecha: v.vencimientoPatente });
      else if (fecha <= new Date(hoy.getTime() + proximosDias))
        proximos.push({ v, tipo: "Patente", fecha: v.vencimientoPatente });
    }

    if (v.vencimientoSeguro) {
      const fecha = new Date(v.vencimientoSeguro);
      if (fecha < hoy) vencidos.push({ v, tipo: "Seguro", fecha: v.vencimientoSeguro });
      else if (fecha <= new Date(hoy.getTime() + proximosDias))
        proximos.push({ v, tipo: "Seguro", fecha: v.vencimientoSeguro });
    }
  });

  const [mostrarVencimientos, setMostrarVencimientos] = useState(false);






  return (
    <>
      <div className="vencimientos-container">
        <h2>Administración de Vencimientos</h2>

        <form onSubmit={handleSubmit}>
          <label>Vehículo:</label>
          <select
            name="vehiculoId"
            value={formData.vehiculoId}
            onChange={handleChange}
          >
            <option value="">Seleccione un vehículo</option>
            {vehiculos.map((v) => (
              <option key={v.id} value={v.id}>
                {v.marca} {v.modelo} - {v.patente}
              </option>
            ))}
          </select>

          <label>Tipo de vencimiento:</label>
          <select name="tipo" value={formData.tipo} onChange={handleChange}>
            <option value="">Seleccione tipo</option>
            <option value="Patente">Patente</option>
            <option value="Seguro">Seguro</option>
          </select>

          <label>Fecha de vencimiento:</label>
          <input
            type="date"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
          />

          <button type="submit">Actualizar Vencimiento</button>
        </form>

        <button onClick={() => setMostrarVencimientos(prev => !prev)}>
          {mostrarVencimientos ? "Ocultar Vencimientos" : "Mostrar Vencimientos"}
        </button>


        {mostrarVencimientos && (
          <div className="alertas">
            {vencidos.length > 0 && (
              <div style={{ color: "red", marginTop: "10px" }}>
                <h3>Vencidos:</h3>
                <ul>
                  {vencidos.map((x) => (
                    <li key={x.v.id + '-' + x.tipo}>
                      {x.v.marca} {x.v.modelo} - {x.v.patente} | {x.tipo} | {x.fecha}
                    </li>
                  ))}
                </ul>
              </div>
            )}


            {proximos.length > 0 && (
              <div style={{ color: "orange", marginTop: "10px" }}>
                <h3>Próximos a vencer (7 días):</h3>
                <ul>
                  {proximos.map((x) => (
                    <li key={x.v.id + '-' + x.tipo}>
                      {x.v.marca} {x.v.modelo} - {x.v.patente} | {x.tipo} | {x.fecha}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default VencimientosVehiculos;

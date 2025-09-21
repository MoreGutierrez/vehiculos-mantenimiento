import type { Mantenimiento } from "../interfaces/mantenimiento";
import type { Vehiculo } from "../interfaces/vehiculo";
import { useState } from "react";

interface HistorialMantenimientosProps {
  mantenimientos: Mantenimiento[];
  vehiculos: Vehiculo[];
}

function HistorialMantenimientos({ mantenimientos, vehiculos }: HistorialMantenimientosProps) {

  const [vehiculoSeleccionado, setVehiculoSeleccionado] = useState<string>("");

  //filtra los mantenimientos segun el vehiculo que haya sido seleccionado
  const mantenimientosFiltrados = vehiculoSeleccionado
    ? mantenimientos.filter(mantenimiento => mantenimiento.vehiculoId === vehiculoSeleccionado)
    : [];



  return (
    <>
      <div className="historial-container">
        <h2>Historial de Mantenimientos por Vehículo</h2>

        {/*select de vehiculos*/}
        <label htmlFor='selectVehiculo'>Seleccione un Vehiculo:</label>
        <select
          name="selecVehiculo"
          value={vehiculoSeleccionado}
          onChange={(e) => setVehiculoSeleccionado(e.target.value)}
        >
          <option value="">Seleccione un vehículo - </option>
          {vehiculos.map(v => (
            <option key={v.id} value={v.id}>
              {v.marca} {v.modelo} - {v.patente}
            </option>
          ))}
        </select>

        {/*mensaje que sale si no hay mantenimientos*/}
        {vehiculoSeleccionado && mantenimientosFiltrados.length === 0 && (
          <p style={{ color: 'orange', fontWeight: 'bold' }}>No hay mantenimientos registrados para este vehiculo.</p>
        )}

        {/*list de mantenimientos filtrados*/}
        {mantenimientosFiltrados.length > 0 && (
          <ul className="lista-historial">
            {mantenimientosFiltrados.map(mantenimiento => {
              const vehiculo = vehiculos.find(v => v.id === mantenimiento.vehiculoId);

              return (
                <li key={mantenimiento.id}>
                  <strong>Vehículo:</strong> {""}
                  {vehiculo ? (
                    <>
                      {vehiculo.marca} {vehiculo.modelo} - <strong>Patente:</strong> {vehiculo.patente}
                    </>
                  ) : (
                    "Desconocido"
                  )}
                  <br />
                  <strong>Tipo de mantenimiento:</strong> {mantenimiento.tipo}<br />
                  <strong>Fecha:</strong> {mantenimiento.fecha}<br />
                  <strong>Costo:</strong> ${mantenimiento.costo}
                </li>
              );
            })}
          </ul>
        )
        }
      </div>
    </>
  );
}


export default HistorialMantenimientos;

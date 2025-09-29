import { useState } from "react";
import type { Mantenimiento } from "../interfaces/mantenimiento";
import type { Vehiculo } from "../interfaces/vehiculo";

interface ListaMantenimientosProps {
  mantenimientos: Mantenimiento[];
  vehiculos: Vehiculo[];
}

function ListaMantenimientos({ mantenimientos, vehiculos }: ListaMantenimientosProps) {

  const [mostrarMantenimientos, setMostrarMantenimientos] = useState(false);


  return (
    <>
      <div className="list-container">
        <h2>Lista de Mantenimientos</h2>

        {/*btn para mostrar u ocultar lista*/}
        <button onClick={() => setMostrarMantenimientos(prev => !prev)}>
          {mostrarMantenimientos ? "Ocultar Mantenimientos" : "Mostrar Mantenimientos"}
        </button>


        {mostrarMantenimientos && (
          mantenimientos.length === 0 ? (
            <p>No hay mantenimientos registrados.</p>
          ) : (
            <ul className="lista-mantenimientos">
              {mantenimientos.map((mantenimiento) => {
                const vehiculo = vehiculos.find(
                  (v) => v.id === mantenimiento.vehiculoId
                ); //esto busca el vehiculo

                return (
                  <li key={mantenimiento.id}>
                    <strong>Vehiculo:</strong>{" "}
                    {vehiculo ? (
                      <>
                        {vehiculo.marca} {vehiculo.modelo} - <strong>Patente:</strong> {vehiculo.patente}
                      </>
                    ) : (
                      "Desconocido"
                    )}
                    <br />
                    <strong>Tipo de mantenimiento:</strong> {mantenimiento.tipo}
                    <br />
                    <strong>Fecha:</strong> {mantenimiento.fecha}
                    <br />
                    <strong>Costo:</strong> ${mantenimiento.costo}
                  </li>
                );
              })}
            </ul>
          )
        )}
      </div>
    </>
  );
};

export default ListaMantenimientos;

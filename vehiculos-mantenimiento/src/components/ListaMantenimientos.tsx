import type { Mantenimiento } from "../interfaces/mantenimiento";
import type { Vehiculo } from "../interfaces/vehiculo";

interface ListaMantenimientosProps {
  mantenimientos: Mantenimiento[];
  vehiculos: Vehiculo[];
}

function ListaMantenimientos({ mantenimientos, vehiculos }: ListaMantenimientosProps) {


  return (
    <>
      <div className="list-container">
        <h2>Lista de Mantenimientos</h2>

        {mantenimientos.length === 0 ? (
          <p>No hay mantenimientos registrados.</p>
        ) : (
          <ul className="lista-mantenimientos">
            {mantenimientos.map((mantenimiento) => {
              const vehiculo = vehiculos.find(
                (v) => v.id === mantenimiento.vehiculoId
              ); //esto busca el vehiculo
              console.log("Buscando vehiculo:", mantenimiento.vehiculoId, "en", vehiculos.map(v => v.id));


              return (
                <li key={mantenimiento.id}>
                  <strong>Vehículo:</strong>{" "}
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
        )}
      </div>
    </>
  );
};

export default ListaMantenimientos;

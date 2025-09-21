import type { Mantenimiento } from "../interfaces/mantenimiento";

interface ListaMantenimientosProps {
  mantenimientos: Mantenimiento[];
}

function ListaMantenimientos({ mantenimientos }: ListaMantenimientosProps) {


  return (
    <>
      <div className="list-container">
        <h2>Lista de Mantenimientos</h2>

        {mantenimientos.length === 0 ? (
          <p>No hay mantenimientos registrados.</p>
        ) : (
          <ul className="lista-mantenimientos">
            {mantenimientos.map((mantenimiento) => (
              <li key={mantenimiento.id}>
                <strong>{mantenimiento.tipo}</strong> - {mantenimiento.fecha}
                <br />
                Costo: ${mantenimiento.costo}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default ListaMantenimientos;

import type { Vehiculo } from '../interfaces/vehiculo';
import vehiculos from '../data/arrayVehiculos.json';


function ListaVehiculos() {
  const listaVehiculos: Vehiculo[] = vehiculos;
  //array de prueba


  return (
    <>
      <div className="list-container">
        <h2>Lista de Vehiculos</h2>

        <ul className="lista-vehiculos">
          {listaVehiculos.map(vehiculo => (
            <li key={vehiculo.id}>
              {vehiculo.marca} {vehiculo.modelo} - Patente: {vehiculo.patente} <br />
              {/*br es un salto de línea*/}
              Vencimiento Patente: {vehiculo.vencimientoPatente} <br />
              Vencimiento Seguro: {vehiculo.vencimientoSeguro}
            </li>
          ))}
        </ul>

      </div>
    </>
  );
}

export default ListaVehiculos;
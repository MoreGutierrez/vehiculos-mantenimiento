import React from 'react';
import type { Vehiculo } from '../interfaces/vehiculo';


const ListaVehiculos: React.FC = () => {

  //array de prueba
  const vehiculos: Vehiculo[] = [
    {
      id: 1,
      marca: 'Toyota',
      modelo: 'Corolla',
      patente: 'ABC123',
      vencimientoPatente: '2025-10-01',
      vencimientoSeguro: '2025-09-30'
    },
    {
      id: 2,
      marca: 'Honda',
      modelo: 'Civic',
      patente: 'XYZ789',
      vencimientoPatente: '2025-11-15',
      vencimientoSeguro: '2025-11-10'
    }
  ];

  return (
    <>
      <div className="list-container">
        <h2>Lista de Vehiculos</h2>

        <ul className="lista-vehiculos">
          {vehiculos.map(vehiculo => (
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
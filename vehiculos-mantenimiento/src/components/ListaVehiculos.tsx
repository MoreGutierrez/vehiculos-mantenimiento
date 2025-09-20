import type { Vehiculo } from '../interfaces/vehiculo';
import { useEffect, useState } from 'react';

function ListaVehiculos() {

  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);

  useEffect(() => {
    fetch('https://66bfd18b42533c4031472125.mockapi.io/api/vehiculos')
      .then(response => response.json())
      .then((data: Vehiculo[]) => {
        setVehiculos(data);
      })
      .catch(error => {
        console.error('Error al traer vehículos:', error);
      });
  }, []);


  return (
    <>
      <div className="list-container">
        <h2>Lista de Vehiculos</h2>

        {vehiculos.length === 0 ? (
          <p>No hay vehículos cargados</p>
        ) : (
          <ul className='lista-vehiculos'>
            {vehiculos.map(vehiculo => (
              <li key={vehiculo.id}>
                {vehiculo.marca} {vehiculo.modelo} - Patente: {vehiculo.patente} <br />
              {/*br es un salto de línea*/}
                Vencimiento Patente: {vehiculo.vencimientoPatente} <br />
                Vencimiento Seguro: {vehiculo.vencimientoSeguro}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default ListaVehiculos;


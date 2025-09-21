import type { Vehiculo } from '../interfaces/vehiculo';
import { useState } from 'react';

interface ListaVehiculosProps {
  vehiculos: Vehiculo[];
}

function ListaVehiculos({ vehiculos }: ListaVehiculosProps) {

  const [mostrarVehiculos, setMostrarVehiculos] = useState(false);

  /*const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);

  useEffect(() => {
    fetch('https://66bfd18b42533c4031472125.mockapi.io/api/vehiculos')
      .then(response => response.json())
      .then((data: Vehiculo[]) => {
        setVehiculos(data);
      })
      .catch(error => {
        console.error('Error al traer vehículos:', error);
      });
  }, []);*/


  return (
    <>
      <div className="list-container">
        <h2>Lista de Vehiculos</h2>

        {/*btn para mostrar/ocultar lista de vehiculos*/}
        <button onClick={() => setMostrarVehiculos(prev => !prev)}>
          {mostrarVehiculos ? "Ocultar Vehículos" : "Mostrar Vehículos"}
        </button>

        {mostrarVehiculos && (
          vehiculos.length === 0 ? (
            <p>No hay vehículos cargados</p>
          ) : (
            <ul className='lista-vehiculos'>
              {vehiculos.map((vehiculo) => (
                <li key={vehiculo.id}>
                  <strong>Vehiculo:</strong> {vehiculo.marca} {vehiculo.modelo} - <strong>Patente:</strong> {vehiculo.patente} <br />
                  {/*br es un salto de línea*/}
                  <strong>Vencimiento Patente:</strong> {vehiculo.vencimientoPatente} <br />
                  <strong>Vencimiento Seguro:</strong> {vehiculo.vencimientoSeguro}
                </li>
              ))}
            </ul>
          )
        )}
      </div>
    </>
  );
}

export default ListaVehiculos;


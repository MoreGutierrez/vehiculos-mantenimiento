import type { Vehiculo } from '../interfaces/vehiculo';
import { useState } from 'react';

interface ListaVehiculosProps {
  vehiculos: Vehiculo[];
  eliminarVehiculo: (id: string) => void;
}

function ListaVehiculos({ vehiculos, eliminarVehiculo }: ListaVehiculosProps) {
  const [mostrarVehiculos, setMostrarVehiculos] = useState(false);
  const [busqueda, setBusqueda] = useState("");




  //filtra los v segun marca, modelo o patente
  const vehiculosFiltrados = vehiculos.filter((v) =>
    v.marca.toLowerCase().includes(busqueda.toLowerCase()) ||
    v.modelo.toLowerCase().includes(busqueda.toLowerCase()) ||
    v.patente.toLowerCase().includes(busqueda.toLowerCase())
  );




  return (
    <div className="list-container">
      <h2>Lista de Vehículos</h2>

      {/*input para buscar*/}
      <label>Buscar vehículo:</label>
      <input
        className='buscador'
        type="text"
        placeholder="Marca, Modelo o Patente"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {/*btn mostrar/ocultar lista*/}
      <button onClick={() => setMostrarVehiculos(prev => !prev)}>
        {mostrarVehiculos ? "Ocultar Vehículos" : "Mostrar Vehículos"}
      </button>

      {mostrarVehiculos && (
        vehiculosFiltrados.length === 0 ? (
          <p>No hay vehículos cargados</p>
        ) : (
          <ul className='lista-vehiculos'>
            {vehiculosFiltrados.map((vehiculo) => (
              <li key={vehiculo.id}>
                <strong>Vehículo:</strong> {vehiculo.marca} {vehiculo.modelo} - <strong>Patente:</strong> {vehiculo.patente} <br />
                <strong>Vencimiento Patente:</strong> {vehiculo.vencimientoPatente} <br />
                <strong>Vencimiento Seguro:</strong> {vehiculo.vencimientoSeguro} <br />
                {/*btn para eliminar el v*/}
                <button onClick={() => eliminarVehiculo(vehiculo.id)}>Eliminar</button>
              </li>
            ))}
          </ul>
        )
      )}
    </div>
  );
}

export default ListaVehiculos;

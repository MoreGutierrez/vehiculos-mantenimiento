
import ListaVehiculos from './components/ListaVehiculos';
import ListaMantenimientos from './components/ListaMantenimientos';

import FormularioVehiculo from './components/FormularioVehiculo';
import FormularioMantenimiento from './components/FormularioMantenimiento';
import type { Mantenimiento } from './interfaces/mantenimiento';
import type { Vehiculo } from './interfaces/vehiculo';
import { useState, useEffect } from 'react';


function App() {

  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [mantenimientos, setMantenimientos] = useState<Mantenimiento[]>([]);

  //trae los v desde la API cuando levanta la pag
  useEffect(() => {
    fetch('https://66bfd18b42533c4031472125.mockapi.io/api/vehiculos')
      .then(res => res.json())
      .then((data: Vehiculo[]) => setVehiculos(data))
      .catch(err => console.error('Error al traer vehículos:', err));
  }, []);

  //funcion para agregar un v al estado y a la lista
  const agregarVehiculo = (vehiculo: Vehiculo) => {
    setVehiculos(prev => [...prev, vehiculo]);
    console.log("Vehículo agregado:", vehiculo);
  };

  //funcion para agregar un mantenimiento
  const agregarMantenimiento = (mantenimiento: Mantenimiento) => {
    setMantenimientos(prev => [...prev, mantenimiento]);
    console.log("Mantenimiento agregado:", mantenimiento);
  };


  return (
    <div className="App">
      <h1>Administración de Vehículos</h1>

      {/* Formularios */}
      <FormularioVehiculo agregarVehiculo={agregarVehiculo} />
      <FormularioMantenimiento
        agregarMantenimiento={agregarMantenimiento}
        vehiculos={vehiculos}
      />

      {/* Listas */}
      <ListaVehiculos vehiculos={vehiculos} />
      <ListaMantenimientos mantenimientos={mantenimientos} />

    </div>
  );
}

export default App;

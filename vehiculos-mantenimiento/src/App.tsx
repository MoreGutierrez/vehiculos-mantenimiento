import './App.css';

import ListaVehiculos from './components/ListaVehiculos';
import ListaMantenimientos from './components/ListaMantenimientos';

import FormularioVehiculo from './components/FormularioVehiculo';
import FormularioMantenimiento from './components/FormularioMantenimiento';

import HistorialMantenimientos from './components/HistorialMantenimientos';

import VencimientosVehiculos from './components/VencimientoVehiculos';



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
      .catch(error => console.error('Error al traer vehículos:', error));
  }, []);

  //trae los m desde la API cuando levanta la pag
  useEffect(() => {
    fetch("https://66bfd18b42533c4031472125.mockapi.io/api/mantenimientos")
      .then(res => res.json())
      .then((data: Mantenimiento[]) => setMantenimientos(data))
      .catch(error => console.error('Error al traer mantenimientos:', error));
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

      {/*VEHICULOS*/}
      <FormularioVehiculo agregarVehiculo={agregarVehiculo} />
      <ListaVehiculos vehiculos={vehiculos} />

      {/*VENCIMIENTOS*/}
      <VencimientosVehiculos vehiculos={vehiculos} setVehiculos={setVehiculos} />

      {/*MANTENIMIENTOS*/}
      <FormularioMantenimiento
        agregarMantenimiento={agregarMantenimiento}
        vehiculos={vehiculos}
      />

      <HistorialMantenimientos
        mantenimientos={mantenimientos}
        vehiculos={vehiculos}
      />

      <ListaMantenimientos
        mantenimientos={mantenimientos}
        vehiculos={vehiculos}
      />



    </div>
  );
}

export default App;

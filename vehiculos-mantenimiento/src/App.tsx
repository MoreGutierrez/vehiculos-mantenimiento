
import ListaVehiculos from './components/ListaVehiculos';
import FormularioVehiculo from './components/FormularioVehiculo';
import type { Vehiculo } from './interfaces/vehiculo';
import { useState, useEffect } from 'react';


function App() {

  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);

  //trae los v desde la API cuando levanta la pag
  useEffect(() => {
    fetch('https://66bfd18b42533c4031472125.mockapi.io/api/vehiculos')
      .then(res => res.json())
      .then((data: Vehiculo[]) => setVehiculos(data))
      .catch(err => console.error('Error al traer vehículos:', err));
  }, []);

  //funcion para agregar un v al estado y a la lista
  const agregarVehiculo = (vehiculo: Vehiculo) => {
    setVehiculos(prev => [...prev, vehiculo]); //lo agrega al final de la array
    console.log("Vehículo agregado:", vehiculo); //prueba para ver si funciona
  };


  return (
    <div className="App">
      <h1>Administración de Vehículos</h1>


      <FormularioVehiculo agregarVehiculo={agregarVehiculo} />

      <ListaVehiculos vehiculos={vehiculos} />

    </div>
  );
}

export default App;

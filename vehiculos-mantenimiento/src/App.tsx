
import ListaVehiculos from './components/ListaVehiculos';
import FormularioVehiculo from './components/FormularioVehiculo';
import type { Vehiculo } from './interfaces/vehiculo';

function App() {


const agregarVehiculo = (vehiculo: Vehiculo) => {
    console.log("Vehículo agregado:", vehiculo);
  };
  
  return (
    <div className="App">
      <h1>Administración de Vehículos</h1>


      <FormularioVehiculo agregarVehiculo={agregarVehiculo} />

      <ListaVehiculos />

    </div>
  );
}

export default App;

import React, { useState } from 'react';
import type { Vehiculo } from '../interfaces/vehiculo';

interface VehiculoProps {
  agregarVehiculo: (vehiculo: Vehiculo) => void;
}

export default function FormularioVehiculo({ agregarVehiculo }: VehiculoProps) {

  const [editData, setEditData] = useState({ //guarda los datos del form
    marca: "",
    modelo: "",
    patente: "",
    vencimientoPatente: "",
    vencimientoSeguro: ""
  });


  const [error, setError] = useState("");
  const [exito, setExito] = useState("");

  //HANDLER DE CAMBIO actualiza los datos del usuario al escribir en los imputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  //HANDLER DE ENVIO DE FORMULARIO CON VALIDACIONES - POST A LA API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //VALIDACIONES
    if (!editData.marca.trim() || !editData.modelo.trim() || !editData.patente.trim() || !editData.vencimientoPatente.trim() || !editData.vencimientoSeguro.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (editData.patente.length !== 6) {
      setError("La patente debe tener 6 caracteres");
      return;
    }


    //API
    try {

      //trae lso vehiculos para validar sus patentes y ver que no exista
      const respuestaVehiculos = await fetch("https://66bfd18b42533c4031472125.mockapi.io/api/vehiculos");
      const vehiculosExistentes: Vehiculo[] = await respuestaVehiculos.json();

      const patenteExistente = vehiculosExistentes.find(vehiculo => vehiculo.patente === editData.patente);
      if (patenteExistente) {
        setError("Ya existe un vehiculo con esta patente");
        return;
      }

      //si no existe hacemos un POST
      const respuesta = await fetch('https://66bfd18b42533c4031472125.mockapi.io/api/vehiculos', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editData)
      });

      if (!respuesta.ok) {
        throw new Error("Error al guardar el vahiculo en la API")
      }

      const nuevoVehiculo: Vehiculo = await respuesta.json();
      agregarVehiculo(nuevoVehiculo);

      setEditData({
        marca: "",
        modelo: "",
        patente: "",
        vencimientoPatente: "",
        vencimientoSeguro: ""
      });

      setError("");
      setExito("Vehiculo agregado correctamente");
      setTimeout(() => setExito(""), 3000);

    } catch (error) {
      console.error(error);
      setError("Ocurrio un error al guardar el vehiculo");
    }
  }

  return (
    <>
      <form className='formulario-vehiculo' onSubmit={handleSubmit}>

        <label htmlFor='marca'>Marca del Vehículo:</label>
        <input
          type="text"
          name='marca'
          placeholder="Ingresa la marca"
          value={editData.marca}
          onChange={handleChange}
          required
        />

        <label htmlFor='modelo'>Modelo del Vehículo:</label>
        <input
          type="text"
          name='modelo'
          placeholder="Ingresa el modelo"
          value={editData.modelo}
          onChange={handleChange}
          required
        />

        <label htmlFor='patente'>Patente del Vehículo:</label>
        <input
          type="text"
          name='patente'
          placeholder="Ingresa la patente"
          value={editData.patente}
          onChange={handleChange}
          required
        />

        <label htmlFor='vencimientoPatente'>Vencimiento de Patente:</label>
        <input
          type="date"
          name='vencimientoPatente'
          value={editData.vencimientoPatente}
          onChange={handleChange}
          required
        />

        <label htmlFor='vencimientoSeguro'>Vencimiento de Seguro:</label>
        <input
          type="date"
          name='vencimientoSeguro'
          value={editData.vencimientoSeguro}
          onChange={handleChange}
          required
        />

        <button type="submit">Agregar Vehículo</button>


        {/*Mostrar mensajes de error o éxito*/}
        {error && (
          <div className="message-sent" style={{ color: 'red', marginTop: '10px' }}>
            <h3>{error}</h3>
          </div>
        )}
        {exito && (
          <div className="message-sent" style={{ color: 'green', marginTop: '10px' }}>
            <h3>{exito}</h3>
          </div>
        )}

      </form>
    </>
  );
}

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

  //HANDLER DE ENVIO DE FORMULARIO CON VALIDACIONES
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    //VALIDACIONES
    if (!editData.marca || !editData.modelo || !editData.patente || !editData.vencimientoPatente || !editData.vencimientoSeguro) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (editData.patente.length !== 6) {
      setError("La patente debe tener 6 caracteres");
      return;
    }

    //LocalStorage
    const vehiculosGuardados: Vehiculo[] = JSON.parse(localStorage.getItem("Vehiculos") || "[]");

    //Validar que no exista la misma patente
    const patenteExistente = vehiculosGuardados.find(v => v.patente === editData.patente);
    if (patenteExistente) {
      setError("Ya existe un vehículo con esta patente");
      return;
    }

    //Crear nuevo vehículo
    const nuevoVehiculo: Vehiculo = {
      id: Date.now(),
      marca: editData.marca,
      modelo: editData.modelo,
      patente: editData.patente,
      vencimientoPatente: editData.vencimientoPatente,
      vencimientoSeguro: editData.vencimientoSeguro
    };

    //Guardar en LocalStorage
    vehiculosGuardados.push(nuevoVehiculo);
    localStorage.setItem("Vehiculos", JSON.stringify(vehiculosGuardados));

    agregarVehiculo(nuevoVehiculo);

    setEditData({
      marca: "",
      modelo: "",
      patente: "",
      vencimientoPatente: "",
      vencimientoSeguro: ""
    });

    setError("");
    setExito("Vehículo agregado correctamente");
    setTimeout(() => setExito(""), 3000);
  };



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


        //Mostrar mensajes de error o éxito
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

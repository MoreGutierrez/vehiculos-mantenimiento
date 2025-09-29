import React, { useState } from 'react';
import type { Mantenimiento } from '../interfaces/mantenimiento';
import type { Vehiculo } from '../interfaces/vehiculo';

interface FormularioMantenimientoProps {
  agregarMantenimiento: (mantenimiento: Mantenimiento) => void;
  vehiculos: Vehiculo[];
}

function FormularioMantenimiento({ agregarMantenimiento, vehiculos }: FormularioMantenimientoProps) {

  const [formData, setFormData] = useState({//guarda los datos del form
    vehiculoId: '',
    tipo: '',
    fecha: '',
    costo: ''
  });

  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  //HANDLER DE CAMBIO actualiza los datos del usuario al escribir en los inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  //HANDLER DE ENVIO DE FORMULARIO CON VALIDACIONES - POST A LA API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    //validaciones
    if (!formData.vehiculoId || !formData.tipo.trim() || !formData.fecha.trim() || !formData.costo.trim()) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (Number(formData.costo) <= 0) {
      setError("El costo debe ser mayor a 0");
      return;
    }

    //API
    try {
      //POST a la API
      const response = await fetch("https://66bfd18b42533c4031472125.mockapi.io/api/mantenimientos", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          vehiculoId: formData.vehiculoId,
          tipo: formData.tipo,
          fecha: formData.fecha,
          costo: Number(formData.costo)
        })
      });

      if (!response.ok) {
        throw new Error("Error al guardar el mantenimiento");
      }

      const nuevoMantenimiento: Mantenimiento = await response.json();
      agregarMantenimiento(nuevoMantenimiento);

      setFormData({
        vehiculoId: '',
        tipo: '',
        fecha: '',
        costo: ''
      });

      setError('');
      setExito("Mantenimiento agregado correctamente");
      setTimeout(() => setExito(''), 3000);

    } catch (error) {
      console.error(error);
      setError("Ocurrio un error al guardar el mantenimiento");
    }
  };



  return (
    <>
      <form className='formulario-mantenimiento' onSubmit={handleSubmit}>

        <label htmlFor='vehiculoId'>Vehiculo:</label>
        <select
          name='vehiculoId'
          value={formData.vehiculoId}
          onChange={handleChange}
          
        >
          {/*desplegable con los vehiculos para seleccionar*/}
          <option value=''>Seleccione un vehiculo</option>
          {vehiculos.map(vehiculo => (
            <option key={vehiculo.id} value={vehiculo.id}>
              {vehiculo.marca} {vehiculo.modelo} - {vehiculo.patente}
            </option>
          ))}
        </select>

        <label htmlFor='tipo'>Tipo de mantengitimiento:</label>
        <input
          type='text'
          name='tipo'
          placeholder='Ej: Cambio de aceite'
          value={formData.tipo}
          onChange={handleChange}
          
        />

        <label htmlFor='fecha'>Fecha:</label>
        <input
          type='date'
          name='fecha'
          value={formData.fecha}
          onChange={handleChange}
          
        />

        <label htmlFor='costo'>Costo:</label>
        <input
          type='number'
          name='costo'
          placeholder='0'
          value={formData.costo}
          onChange={handleChange}
          
        />

        <button type='submit'>Agregar Mantenimiento</button>

        {error &&
          <div className='message-sent' style={{ color: 'red', marginTop: '10px' }}>
            <h3>{error}</h3>
          </div>
        }
        {exito &&
          <div className='message-sent' style={{ color: 'green', marginTop: '10px' }}>
            <h3>{exito}</h3>
          </div>
        }
      </form>
    </>
  );
}

export default FormularioMantenimiento;
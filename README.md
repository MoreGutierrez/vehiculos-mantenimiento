# Administración de Vehículos

_Proyecto creado en **React** & **TypeScript** para administrar vehiculos, registrar y llevar un seguimiento de los mantenimientos y los vencimientos de pagos (patente, seguro). Creado con Vite._

## Funcionalidades

- Registrar vehiculos con marca, modelo, patente, vencimiento de patente y vencimiento de seguro.  
- Registrar mantenimientos de vehiculos: cambios de aceite, frenos, cubiertas, etc.  
- Visualizar la lista completa de vehiculos y mantenimientos.  
- Filtrar y buscar vehiculos por marca, modelo o patente.  
- Mostrar y ocultar listas de vehiculos y mantenimientos.  
- Eliminar vehiculos de la lista y de la API.  
- Control de vencimientos de pagos mediante actualizacion de datos.  

## Desarrollo

- Componentes: `FormularioVehiculo`, `ListaVehiculos`, `FormularioMantenimiento`, `ListaMantenimientos`, `HistorialMantenimientos` y `VencimientosVehiculos`.  
- Manejo de estados con `useState`.  
- Consumo de **API externa mock** usando `fetch` para obtener, agregar, actualizar y eliminar vehiculos y mantenimientos.  
- Implementacion de CRUD:  
  - **POST**: agregar vehiculos y mantenimientos.  
  - **PUT**: actualizar vencimientos de pagos.  
  - **DELETE**: eliminar vehiculos.  
- Estilos en **CSS**, con separacion entre botones y listas para mejorar la experiencia visual.  

## Consideraciones

- Los datos se obtienen y actualizan en la **API externa** (mock).  
- Los botones de mostrar/ocultar listas permiten no saturar la interfaz.  
- La busqueda funciona en tiempo real filtrando por marca, modelo o patente.  
- Se priorizó una interfaz simple, funcional e intuitiva.  

## Tecnologías Utilizadas

_En este proyecto se utilizaron las siguientes tecnologías:_

- **React**  
- **TypeScript**  
- **CSS**  
- **API Mock**: [mockapi.io](https://mockapi.io/)  

## Instalación y Uso

1. Clonar el repositorio:  
```
git clone <url-del-repo>
```

2. Instalar dependencias:
```
npm install
```

3. Correr:
```
npm run dev
```
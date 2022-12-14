import React, { useEffect, useRef, useState } from 'react';
import { supabase } from './config/client';
import { Empresa } from './models/Empresa';
import { Box, Button, Modal } from '@mui/material';
import './App.css';


/**
 * Estilo de Box
 */
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function App() {

  const [empresas, setEmpresas] = useState([]);
  const [tablaEmpresas, setTablaEmpresas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [open, setOpen] = useState(false);

  
  const fetchEmpresas = async () => {
    try {
      const { data } = await supabase
        .from('empresas')
        .select('*',{count:'exact'})
        .order("id", { ascending: true }) 
        
      setEmpresas(data);
      setTablaEmpresas(data)
      console.log('data', data)

    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    fetchEmpresas();
  }, []);

  // Busqueda
  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value)
    console.log('busqueda', e.target.value)
  }

 
  const filtrar = (codigo) => {
    let resultado = tablaEmpresas.filter((em) => {
        if (em.codigo.toString().toLowerCase().includes(codigo.toLowerCase())) {
          return em
        }
      });
    setEmpresas(resultado)
  }

// Modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

// Formulario de creacion de Empresa
  // valor de Codigo por defecto
  const newNombre = useRef('')
  const newRazonsocial = useRef('')
  const newNit = useRef('')
  const newTelefono = useRef('')
  const newCodigo = useRef(busqueda)
 
// api
  async function createEmpresa() {
    const { data } = await supabase
      .from('empresas')
      .insert(
        {
          nombre: newNombre.current.value,
          razon_social: newRazonsocial.current.value,
          nit: newNit.current.value,
          telefono: newTelefono.current.value,
          codigo: newCodigo.current.value
        }
      )
      .single();
    console.log('data', data)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let newEmpresa = new Empresa(
      newNombre.current.value,
      newRazonsocial.current.value,
      newNit.current.value,
      newTelefono.current.value,
      newCodigo.current.value
    )
    createEmpresa(newEmpresa)
    console.log('newEmpresa', newEmpresa)
    newEmpresa = (
      newNombre.current.value = '',
      newRazonsocial.current.value = '',
      newNit.current.value = '',
      newTelefono.current.value = '',
      newCodigo.current.value = ''
      )
      fetchEmpresas()
    }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Title">Dropdown Challenge</h1>
        <div className="containerInput" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
          <input
            type='search'
            className='form-control inputBuscar'
            value={busqueda}
            placeholder="Ingrese un Codigo"
            onChange={handleChange}
          />
        </div>
        <div className="collapse" id="collapseExample">
          <div className="card card-body">
            <div className='table-responsive-lg'>
              <div className='agregar'>Empresa:
                <Button className='border m-2 p-1' onClick={handleOpen}>Agregar</Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <form onSubmit={handleSubmit}>
                      <div className='card-header border'>
                        <h1>Empresa</h1>
                      </div>
                      <div className='card-body border'>
                        <div className="m-3">
                          <label htmlFor="codigo" className="form-label d-flex">C??digo: </label>
                          <input
                            type="text"
                            className="form-control"
                            id="codigo"
                            ref={newCodigo}
                            placeholder="Ingrese un codigo"
                            required
                            defaultValue={busqueda}

                          />
                        </div>
                        <div className="m-3">
                          <label htmlFor="nombre" className="form-label d-flex">Nombre: </label>
                          <input
                            type="text"
                            className="form-control"
                            id="nombre"
                            ref={newNombre}
                            placeholder="Ingrese un nombre"
                            required
                          />
                        </div>
                        <div className="m-3">
                          <label htmlFor="razon_social" className="form-label d-flex">Razon Social: </label>
                          <input
                            type="text"
                            className="form-control"
                            id="razon_social"
                            ref={newRazonsocial}
                            placeholder="Ingese raz??n social"
                            required
                          />
                        </div>
                        <div className="m-3">
                          <label htmlFor="nit" className="form-label d-flex">N. Identificacion Tributaria: </label>
                          <input
                            type="text"
                            className="form-control"
                            id="nit"
                            ref={newNit}
                            placeholder="Ingese un nit"
                            required
                          />
                        </div>
                        <div className="m-3">
                          <label htmlFor="telefono" className="form-label d-flex">Tel??fono: </label>
                          <input
                            type="text"
                            className="form-control"
                            id="telefono"
                            ref={newTelefono}
                            placeholder="Ingese un telefono"
                            required
                          />
                        </div>

                      </div>
                      <div className='card-footer border'>
                        <div>
                          <button type='submit' className='btn btn-dark'>Add Contact</button>
                        </div>
                      </div>
                    </form>
                  </Box>
                </Modal>
              </div>

              <table className='table table-hover'>
                <thead>
                  <tr>
                    <th scope='col'>N??</th>
                    <th scope='col'>Codigo</th>
                    <th scope='col'>Nombre</th>
                    <th scope='col'>Razon Social</th>
                    <th scope='col'>N.I.T</th>
                    <th scope='col'>Telefono</th>
                  </tr>
                </thead>
                <tbody >
                
                  {empresas.map((empresa) => (
                    <tr key={empresa.id}>
                      <td>{empresa.id}</td>
                      <td>{empresa.codigo}</td>
                      <td>{empresa.nombre}</td>
                      <td>{empresa.razon_social}</td>
                      <td>{empresa.nit}</td>
                      <td>{empresa.telefono}</td>
                    </tr>
                  ))
                  }
                </tbody>  
              </table>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

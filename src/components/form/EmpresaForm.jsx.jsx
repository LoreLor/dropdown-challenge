import React, { useRef} from 'react';
import { supabase } from '../../config/client';
import { Empresa } from '../../models/Empresa';



const EmpresaForm = () => {
    const codigoStorage = localStorage.getItem('codigo')
    
    const newNombre = useRef('')
    const newRazonsocial = useRef('')
    const newNit = useRef('')
    const newTelefono = useRef('')
    const newCodigo = useRef(codigoStorage)

    async function createEmpresa() {
        const {data}= await supabase
            .from('empresas')
            .insert(
               { 
                    nombre:newNombre.current.value,
                    razon_social:newRazonsocial.current.value,
                    nit:newNit.current.value,
                    telefono:newTelefono.current.value,
                    codigo:newCodigo,
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
        newEmpresa=(
            newNombre.current.value='',
            newRazonsocial.current.value='',
            newNit.current.value='',
            newTelefono.current.value='',
            newCodigo.current.value=""
        )
    }

    

    return(        
        <form onSubmit={handleSubmit}>
            <div className='card-header border'>
                <h1>Empresa</h1>
            </div>
            <div className='card-body border'>
            <div className="m-3">
                <label htmlFor="codigo" className="form-label d-flex">Código: </label>
                <input
                    type="text"
                    className="form-control"
                    id="codigo" 
                    value={newCodigo}        
                    placeholder="Ingrese un codigo"
                    required                   
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
                    placeholder="Ingese razón social" 
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
                <label htmlFor="telefono" className="form-label d-flex">Teléfono: </label>
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
                <div className='d-inline-block'>           
                    <button type='submit' className='btn btn-dark'>Add Contact</button>                           
                </div>
            </div>
        </form>
    )
}


export default EmpresaForm;
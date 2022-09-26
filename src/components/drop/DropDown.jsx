import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { supabase } from '../../config/client';





const DropDown = () => {
    const [empresas, setEmpresas] = useState([])


    async function fetchEmpresas() {
        const { data } = await supabase
            .from('empresas')
            .select('*')
            
        setEmpresas(data)
        console.log('data', data)
    }

    useEffect(() => {
        fetchEmpresas();
    }, []);


    

    return (
        <div>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={empresas}
                autoHighlight
                getOptionLabel={(option) => option.codigo}
                sx={{ width: 300 }}
                
                renderOption={(props, option) => (
                    <div>
                        <Box
                            component="li"
                            sx={{ mr: 2, flexShrink: 0 }}
                            {...props}
                        >
                            {option.codigo} - {option.nombre} - {option.telefono}
                        </Box>

                    </div>
                )}

                renderInput={(codigo) =>
                    <TextField
                        {...codigo}
                        label="Empresas"
                        inputProps={{
                            ...codigo.inputProps,
                            autoComplete: 'new-password',
                        }} />

                } />
        </div>
    )
}


export default DropDown
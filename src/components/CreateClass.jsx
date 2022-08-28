import InputLabel from '../modules/common/InputLabel';
import  '../styles/sass/CreateM.scss'

import { useDispatch } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup'; 


import { SelectLabel } from '../modules/Select';
import ReturnHome from '../modules/common/ReturnHome';
import { findCedulaTeacher } from '../CRUD/teacher';
import { useState } from 'react';
import { createClass } from '../CRUD/class';
import salones from '../tools/salones';

const CreateClass = () => {
    const nav = useNavigate()
    const dispatch = useDispatch();

    const [ existTeacher, setExistTeacher ] = useState( false )

    const materias = [
        'Matematicas',
        'Ciencia',
        'Ciencia sociales',
        'Tecnologia'
    ]

    const semestre = []

    for (let i = 1; i <= 10; i++) {
        semestre.push(i)
    }

    const formik = useFormik({
        initialValues: {
            cedula: '',
            materia: 'tecnologia',
            semestre: 10,
            salon: 'D5'
        },
        validationSchema: yup.object({
            cedula: yup.number().required(),
            
            materia: yup.string().required(),
            semestre: yup.number().required(),

            date: yup.string().required(),
            hour: yup.string().required(),
        }),
        onSubmit: ( data ) =>{
            if( existTeacher ){
                data.semestre = parseInt( data.semestre )
                data.cedula = parseInt( data.cedula )

                createClass( data )

                //console.log( data )
            }
            else{
                alert( 'porfabor verificar profesor con cedula' )
            }
            //data.materia = data.materia.toLowerCase()
            
            //dispatch( AgregarDatos( data ) )
        },
    })

    const addData = () =>{
        const x = document.getElementById('cedula')
        const cedula =  parseInt(x.value)

        findCedulaTeacher( cedula, true )
            .then( exist => {
                const name = document.getElementById('name')
                name.value = exist.name
                const lsName = document.getElementById('last name')
                lsName.value = exist['last name']
                setExistTeacher( true )
            })
    }

    return (
        <div className="create-m" style={{height:'100vh'}}>
            <ReturnHome/>
            <h1>Crear monitor</h1>
            <form onSubmit={ formik.handleSubmit }
                onChange={ formik.handleChange }
                className="create-m">
                <label htmlFor="cedula">Cedula</label>
                <input type="text" name="cedula" id="cedula" />
                <button type='notFormik' onClick={ addData }>Verificar</button>
                <div className="flex-two">
                    <InputLabel type='text' name='name' disabled={true}/>
                    <InputLabel type='text' name='last name' disabled={true}/>
                </div>
                <div className="flex-two">
                    <SelectLabel array={materias} name='materia'/>
                    <SelectLabel array={semestre} name='semestre'/>
                </div>
                <input type="date" name="date" id="date" />
                <input type="time" name="hour" id="hour" />
                <SelectLabel array={ salones } name='salon'/>
                <button type="submit">Crear</button>
            </form>
           
        </div>
    );
};

export default CreateClass;
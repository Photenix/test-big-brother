import InputLabel from '../modules/common/InputLabel';
import  '../styles/sass/CreateM.scss'

import { useDispatch } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup'; 


import Select, { SelectLabel } from '../modules/Select';
import ReturnHome from '../modules/common/ReturnHome';
import { createTeacher, findCedulaTeacher } from '../CRUD/teacher';
import { clearInput } from '../tools/clearInput';

const CreateTeacher = () => {
    const nav = useNavigate()
    const dispatch = useDispatch();

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


    const rePassword = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{5,}$/
    const formik = useFormik({
        initialValues: {
            name: '',
            'last name': '',
            cedula: '',
            materia: 'tecnologia',
            semestre: 10,
            celular: ''
        },
        validationSchema: yup.object({
            name: yup.string().min(3).required(),
            'last name': yup.string(),
            cedula: yup.number().required(),
            materia: yup.string().required(),
            semestre: yup.number().required(),
            celular: yup.number().min(10).required()
        }),
        onSubmit: ( data ) =>{
            
            //data.materia = data.materia.toLowerCase()
            data.celular = parseInt( data.celular )
            data.semestre = parseInt( data.semestre )
            data.cedula = parseInt( data.cedula )
            
            findCedulaTeacher( data.cedula )
                .then( exist => {
                    if( !exist ) {
                        //console.log( data )
                        createTeacher( data )
                        clearInput()
                    }
                    else alert('Este monitor ya existe');
                })
            //dispatch( AgregarDatos( data ) )
        },
    })

    return (
        <div className="create-m" style={{height:'100vh'}}>
            <ReturnHome/>
            <h1>Crear monitor</h1>
            <form onSubmit={ formik.handleSubmit }
                onChange={ formik.handleChange}
                className="create-m">
                <div className="flex-two">
                    <InputLabel type='text' name='name'/>
                    <InputLabel type='text' name='last name'/>
                </div>
                <label htmlFor="cedula">Cedula</label>
                <input type="text" name="cedula" id="cedula" />
                <div className="flex-two">
                    <SelectLabel array={materias} name='materia'/>
                    <SelectLabel array={semestre} name='semestre'/>
                </div>
                <InputLabel type='text' name='celular'/>
                <button type="submit">Crear</button>
            </form>
           
        </div>
    );
};

export default CreateTeacher;
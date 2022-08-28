import Select from "../modules/Select";

import '../styles/sass/SearchClass.scss'

import { BiSearch } from "react-icons/bi";
import ReturnHome from "../modules/common/ReturnHome";
import { filterClass, filterExatliClass, getClass } from "../CRUD/class";
import { useDispatch, useSelector } from "react-redux";
import { mentoria } from "../redux/actions/actionMentoria";
import { useEffect, useState } from "react";


import CardMentoria from "../modules/CardMentoria";

const SearchClass = () => {

    const [ mentorias, setMentorias ] = useState([])

    const dispatch = useDispatch();

    //const m = useSelector( state => state.mentorias)
    const option = [
        'cedula',
        'materia',
        'salon',
        'semestre',
        'dia'
    ]

    const aloneNumber = num =>{
        try{
            num = parseInt(num)
            return num
        }catch(e){
            alert('solo ingrese numeros')
        }
        
    }

    const gf = ( value, filter ) => {
        filterClass( value, filter )
            .then( arr => {
                //console.log(arr)
                dispatch( mentoria( arr ) )
                setMentorias( arr )
            })
            .catch( error => console.log(error))
    }

    const filter = e =>{
        const select = document.getElementById('filter')
        const input = document.getElementById('buscar')

        //console.log( input.value, select.value );

        let s;
        switch( select.value ){
            case 'cedula':
                s = aloneNumber( input.value )
                filterExatliClass( select.value, s )
                    .then( arr => {
                        //console.log(arr)
                        dispatch( mentoria( arr ) )
                        setMentorias( arr )
                    })
                    .catch( error => console.log(error))
                break
            case 'semestre':
                s = aloneNumber( input.value )

                filterExatliClass( select.value, s )
                    .then( arr => {
                        //console.log(arr)
                        dispatch( mentoria( arr ) )
                        setMentorias( arr )
                    })
                    .catch( error => console.log(error))
                break
            case 'dia':
                gf( 'date', input.value )
                break
            case 'materia':
                let v = input.value
                const capitalized = v.charAt(0).toUpperCase() + v.slice(1);
                gf( select.value, capitalized )
                break
            case 'salon':
                gf( select.value, input.value )
                break
            default:
                break
        }
    }
    

    const giveMeAll = () =>{
        getClass( )
            .then( arr => {
                //console.log(arr)
                dispatch( mentoria( arr ) )
                setMentorias( arr )

                document.getElementById('buscar').value = ''
            })
            .catch( error => console.log(error))
    }

    useEffect(()=>{
        giveMeAll()
    },[])

    return (
        <div className="mentoria">
            <ReturnHome/>
            <h1>Buscar mentoria</h1>
            <div className="search">
                <Select  array={ option } name={'filter'}/>
                <input type="text" placeholder="Buscar" id="buscar"/>
                <BiSearch size={30} className="lupa" onClick={ filter }/>
            </div>
            <button onClick={ giveMeAll }>Show All</button>
            <div className="container-class">
                {
                    mentorias.map( e =>{
                        const {
                            date, hour,
                            materia, salon,
                            semestre, cedula,
                            uid
                        } = e 
                        //console.log( e )
                        return(
                            <CardMentoria date={ date } 
                                hour={ hour } materia={ materia }
                                salon={ salon } semestre={ semestre } cedula={ cedula } uid={ uid }/>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default SearchClass;
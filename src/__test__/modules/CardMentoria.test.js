import { render, screen } from '@testing-library/react';
import CardMentoria from '../../modules/CardMentoria';

describe('card',()=>{
    const json ={
        date:'20-16-2020', 
        hour:'13:30 p.m',
        materia: 'Matematicas',
        salon: 'A1',
        semestre: 6,
        cedula: 123456,
        uid: 'A1354W8E4C5G8WE5F4S' 
    }
    
    const { container } = render(<CardMentoria
        date={json.date} hour={json.hour}
        materia={json.materia} salon={json.salon}
        semestre={json.semestre} cedula={json.cedula}
        uid={json.uid} />)

    test('cedula exist',()=>{
        const linkElement = screen.getByText(json.cedula);
        expect(linkElement).toBeInTheDocument();
    })
})


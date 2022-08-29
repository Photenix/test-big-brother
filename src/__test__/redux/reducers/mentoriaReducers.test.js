import { mentoriaReducers as mR } from "../../../Redux/reducers/mentoriaReducers"
import { typeMentoria } from "../../../Redux/types/types"

describe('verificacion de informacion de plantas reducers',()=>{

    let state = []

    test('initial state',()=>{
        expect( mR( state, 'error' ) ).toStrictEqual([])

        const x = {
            type: typeMentoria.addMentoria,
            payload: [
                { valor: 'first' },
                { valor: 'secondary' }
            ]
        }

        expect( mR( state, x ) ).not.toStrictEqual( [] )
        expect( mR( state, x ) ).toStrictEqual( x.payload )

        const y = {
            type: typeMentoria.addMentoria,
            payload: [
                { valor: 'color' },
                { valor: 'none' }
            ]
        }

        expect( mR( state, y ) ).not.toStrictEqual( [] )
        expect( mR( state, y ) ).toStrictEqual( y.payload )
    })
})
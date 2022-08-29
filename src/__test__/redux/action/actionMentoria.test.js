import { mentoria } from "../../../redux/actions/actionMentoria";
import { typeMentoria } from "../../../Redux/types/types";

test('mentoria action',()=>{
    expect( mentoria([]).payload ).toStrictEqual([])
    expect( mentoria([{},{},{}]).payload ).toStrictEqual([{},{},{}])

    expect( mentoria([]).type )
        .toStrictEqual( typeMentoria.addMentoria )

    expect( mentoria([]).type )
        .not.toStrictEqual( '' )
})
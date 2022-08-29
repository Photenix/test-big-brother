import { typesLogin, typeMentoria, typeTeacher } from "../../../Redux/types/types"

describe('types',()=>{
    test('types login',()=>{
        expect( typesLogin.login ).toMatch('login')
        expect( typesLogin.logout ).toMatch('logout')
        expect( typesLogin.register ).toMatch('register')
    })
    test('type teacher',()=>{
        expect( typeTeacher.add_teacher ).toMatch('add_teacher')
        expect( typeTeacher.find_teacher ).toMatch('find_teacher')

        expect( typeTeacher.add_teacher ).not.toEqual('del')
        expect( typeTeacher.find_teacher ).not.toMatch('class')
    })

    test('type mentoria',()=>{
        expect( typeMentoria.addMentoria ).toMatch('addMentoria')
        expect( typeMentoria.addMentoria ).not.toMatch('del')
    })
})
import { app } from '../../app.js'
import request from 'supertest'
import { findUserWhere, updateUser } from '../db/user.js'

export const getTesterUser = async (user) => {
    const role = user.role

    if (user.passwordConfirmation == null){
        user.passwordConfirmatio = user.password
    }
    
    var userExists = await findUserWhere({email: user.email})
    if (userExists == null || userExists.length == 0){
        await request(app).post('/users').send(user)
    }else{
        user.role = userExists[0].role
    }

    if (user.role == null || user.role != role){

        const upAdminUser = (await findUserWhere({email: user.email}))[0]
        upAdminUser.role = role
        await updateUser(upAdminUser)
    }
    
    const loginAdminUserRes = await request(app).post('/signin').send({
        email: user.email,
        password: user.password
    })
    
    user.token = loginAdminUserRes.body.token
    return user
}
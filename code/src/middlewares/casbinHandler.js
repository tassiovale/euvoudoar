import { newEnforcer } from 'casbin'
import { asyncMiddleware } from 'middleware-async'
import jwt from 'jsonwebtoken'
import { HTTP_STATUS_UNAUTHORIZED } from '../constants/httpStatusCodes.js'

let enforcerInstance = undefined

const getEnforcerInstance = async () => {
    if (!enforcerInstance) {
        enforcerInstance = await newEnforcer('model.conf', 'policy.csv')
    }
    return enforcerInstance
}

export const enforceAuthorization = (object, actions) => {
    return asyncMiddleware(
        async (req, res, next) => {
            jwt.verify(
                req.headers['x-access-token'],
                process.env.SECRETKEY,
                async (err, userData) => {
                    if (err) {
                        return res.status(HTTP_STATUS_UNAUTHORIZED).send()
                    } else {
                        const enforcer = await getEnforcerInstance()
                        let granted = false
                        for (const action of actions) {
                            const result = await enforcer.enforce(
                                userData.role,
                                object,
                                action
                            )
                            granted = granted || result
                        }
                        if (granted) {
                            next()
                        } else {
                            return res.status(HTTP_STATUS_UNAUTHORIZED).send()
                        }
                    }
                }
            )
        }
    )
}
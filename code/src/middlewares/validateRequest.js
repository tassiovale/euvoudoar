import _ from 'lodash'
import { validationResult } from 'express-validator'
import { HTTP_STATUS_BAD_REQUEST } from '../constants/httpStatusCodes.js'

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const processedErrors = _.map(
            errors.array(),
            (error) => (
                { 
                    attribute: error.param,
                    message: error.msg
                }
            )
        )
        return res.status(HTTP_STATUS_BAD_REQUEST).send({ errors: processedErrors })
    }
    next()
}
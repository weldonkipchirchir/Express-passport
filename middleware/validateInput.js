const {
    body,
    validationResult } = require('express-validator')

const validateInput = [
    body('username').notEmpty().withMessage('username required'),
    body('password').notEmpty().withMessage('password required'), (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                error: errors.array(),
                message: 'Invalid input'
            })
        }
        next()
    }
]
module.exports= validateInput;
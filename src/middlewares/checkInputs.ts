import express from 'express'

const validate = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        if (checkPhoneNo(req.body.phone_number) && checkAge(req.body.age)) {
            console.log('here')
            next()
        }
        if (!checkPhoneNo(req.body.phone_number))
            res.send('Phone Number is not valid')
        if (!checkAge(req.body.age)) res.send('Age is not valid')
    } catch (e) {
        res.send('Cannot create user')
    }
}

function checkPhoneNo(number: string): boolean {
    if (isNaN(Number(number))) return false
    return true
}
function checkAge(age: string) {
    if (isNaN(Number(age))) return false
    return true
}

export default validate

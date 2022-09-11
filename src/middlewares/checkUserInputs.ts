import express from 'express'

const validate = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    try {
        if (
            checkfirstName(req.body.firstName) &&
            checkSecondName(req.body.secondName)
        )
            next()

        if (!checkfirstName(req.body.firstName))
            res.send('FirstName is not valid')
        if (!checkSecondName(req.body.secondName))
            res.send('SecondName is not valid')
    } catch (e) {
        res.send('Cannot create user')
    }
}

export default validate
/*
Reference
https://bobbyhadz.com/blog/javascript-check-if-string-contains-only-letters
*/
function checkfirstName(firstName: string): boolean {
    return /^[a-zA-Z]+$/.test(firstName)
}

function checkSecondName(secondName: string): boolean {
    return /^[a-zA-Z]+$/.test(secondName)
}

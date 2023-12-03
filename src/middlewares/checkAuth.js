export const checkAuth = (req, res, next) => {
    if(req.headers.authorization === 'Password sicura'){
        next();
    } else {
        const error = new Error('Password Errata')
        error.statusCode = 401
        next(error)
    }
}
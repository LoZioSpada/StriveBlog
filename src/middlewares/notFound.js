export const notFound = (err, req, res, next) => {
    console.log(error)
    res.status(error.statusCode || 404).send(error.message)
}


const notFound = (err,req, res, next) => {
     res.status(404).send('Not found');
     next(err);
}

const errorHandler = (err, req, res, next) => {
    const statuseCode = res.statuseCode === 200 ? 500 : res.statusCode;
    res.status(statuseCode).json({ message: err.message });
  }



  module.exports = { notFound, errorHandler };
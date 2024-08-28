exports.notFoundError = ((req, res, next) => {
    res.status(404).send({ msg: "Not Found" });
    next(err)
  });
  
  
  exports.psqlError = ((err, req, res, next) => {
    if(err.code === '22P02'){
      res.status(400).send({ msg: "Bad request"});
    }
    next(err)
  })
  
  exports.internalServerError = ((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).send({ msg: err.msg || "Internal Server Error" });
  });
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    let userId = 0
    if(req.params.userId !== null){ 
      userId = req.headers.authorization.split(' ')[2] 
    } else { 
      userId = req.params.userId 
    }
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    if ((parseInt(userId)) !== parseInt(decodedToken.userId)) {
      throw 'User ID non valable!';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | 'Requête non authentifiée!' });
  }
};

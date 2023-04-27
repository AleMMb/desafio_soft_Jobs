const jwt = require("jsonwebtoken");

const credenciales = (req, res, next) => {  //implementar en la ruta login
  const { email, password } = req.body;  
  if (!email || !password) {
    res.status(401).send({ msg: "Debe ingresar al menos el usuario y la contraseña" });
    return;
  }
  next();
};

const verificaToken = async (req, res, next) => {  //falta validar el token
  try {
    const token = req.header("Authorization").split("Bearer ")[1];
    if (!token) {
      res.status(401).send({ msg: "Se necesita un token para continuar" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).send({ msg: error });
    console.error(`Un usuario acaba de generar el error: ${error}`);
  }
};





module.exports = {credenciales, verificaToken}
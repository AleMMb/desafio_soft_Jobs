const jwt = require("jsonwebtoken");
const {
  getUsuario,
  verificarCredenciales,
  registrarUsuario,
} = require("../services/user.services");
const token_key = process.env.TOKENKEY;

const indexController = {
  mostrar: async (req, res) => {
    try {
      const Authorization = req.header("Authorization"); //pido el token
      const token = Authorization.split("Bearer ")[1]; //obtengo el token
      jwt.verify(token, token_key); //verifico si el token es válido se compara con mi firma
      const { email } = jwt.decode(token); //saco el e-mail del token
      const usuario = await getUsuario(email); //va a hacer la consulta...
      res.status(200).send(usuario[0]); //envio el usuario...
    } catch (error) {
      res.status(error.code || 500).send(error.message);
    }
  },

  crear: async (req, res) => {
    try {
      const usuario = req.body;
      await registrarUsuario(usuario);
      res.send("Usuario creado con éxito");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      await verificarCredenciales(email, password);
      const token = jwt.sign({ email }, token_key); //  {expriresIn: 68400} duracion de 24hrs
      res.send(token);
    } catch (error) {
      console.log(error);
      res.status(error.code || 500).send(error.message);
    }
  },
};

module.exports = indexController;

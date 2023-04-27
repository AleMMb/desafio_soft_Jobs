const pool = require("../database/conexion");
const bcrypt = require("bcryptjs");

const getUsuario = async (email) => {
  const consulta = "SELECT * FROM usuarios WHERE email = $1";
  const values = [email];
  const { rows: usuario } = await pool.query(consulta, values);
  return usuario;
};

const verificarCredenciales = async (email, password) => {
  const values = [email]; //contiene/captura el usuario desde la query (el cliente me la tiene que enviar)
  const consulta = "SELECT * FROM usuarios WHERE email = $1"; //genera la consulta con el usuario obtenido anteriormente
  const {
    rows: [usuario],
    rowCount,
  } = await pool.query(consulta, values); // ejecuta la consulta y devuelve el objeto usuario usuario

  const { password: passwordEncriptada } = usuario; // desestructura el objeto usuario para obtener la password encriptada desde la base de datos
  const passwordEsCorrecta = bcrypt.compareSync(password, passwordEncriptada); // compara la contraseña encriptada y la del usuario

  if (!passwordEsCorrecta || !rowCount)
    //determina si es correcta o no y dependiendo de eso devuelve el token o lanza error
    throw {
      code: 401,
      message: "Email o contraseña incorrecta",
    };
};

const registrarUsuario = async (usuario) => {
  let { email, password, rol, lenguage } = usuario;
  const passwordEncriptada = bcrypt.hashSync(password);
  password = passwordEncriptada;
  const values = [email, passwordEncriptada, rol, lenguage];
  const consulta = "INSERT INTO usuarios values (DEFAULT, $1, $2, $3, $4)";
  await pool.query(consulta, values);
};

module.exports = { getUsuario, verificarCredenciales, registrarUsuario };

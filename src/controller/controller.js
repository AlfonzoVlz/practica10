import { pool } from "../config/db.js"


export const index = async (req, res) => {
    try {
        const [usuarios] = await pool.query('SELECT u.usuario_id, u.usuario_nombre,u.email, u.foto, r.rol_nombre FROM usuarios u INNER JOIN roles r ON u.rol_id = r.rol_id;')
        res.json(usuarios)
    } catch (error) {
        res.status(500).json({ menssge: 'hubo un error interno' })
    }
}
export const handleErrors = (err, req, res, next) => {
    if (err.message) {
      return res.status(400).json({ message: err.message })
    } else {
      return res.status(500).json({ message: 'Hubo un error interno' })
    }
  }

export const eliminar = async (req, res) => {
    try {
        const { id } = req.params
        await pool.execute('DELETE FROM usuarios WHERE usuario_id = ?', [id])
        res.json({ message: 'Usuario Eliminado' })
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error interno' })
    }
}

export const createUser = async (req, res) => {

    try {
        const { nombre, email, foto,  rol_id: rolId } = req.body

        if (!nombre || !email || !foto || !rolId) {
            res.status(400).json({ message: 'Faltan datos que ingresar' })
        }
        await pool.execute('INSERT INTO usuarios(usuario_nombre, email ,foto , rol_id) VALUES (?, ? , ?, ?)', [nombre, email, foto,  rolId])
        res.status(201).json({ menssge: 'Usuario creado exitosamente' })
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error interno', detail : error.menssge})
        res(error => console.log(error))
    }
}

export const actualizar = async (req, res) => {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).json({ menssge: 'No se reconoce el usuario' })
        }
        const { nombre, email, rol_id: rolId } = req.body
        if (!nombre || !email || !rolId) {
            res.status(400).json({ message: 'Faltan datos que ingresar' })
        }
        await pool.execute('UPDATE usuarios SET usuario_nombre = ?, email = ?, rol_id = ? WHERE usuario_id = ?', [nombre, email, rolId, id])
        res.status(201).json({ menssge: 'Usuario actualizado exitosamente' })
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error interno', detail: error.menssge })
    }
}
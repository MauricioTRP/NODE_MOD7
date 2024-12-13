const { User, ToDo } = require('../config')

const UsersController = {}

UsersController.create = async (req, res, next) => {
  const data = req.body

  try {
    const user = await User.create(data)

    return res.json(user)
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: err.message })
  }
}

UsersController.getAll = async (req, res, next) => {
  try {
    const users = await User.findAll({ order: [ [ 'id', 'ASC'] ] })

    return res.json(users)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

// /usuarios/:id
UsersController.findById = async (req, res, next) => {
  const { id } = req.params

  try {
    const usuario = await User.findByPk(id)

    if(!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }
    return res.json(usuario)
  } catch (err) {
    console.error(err)

    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

UsersController.delete = async (req, res, next) => {
  const { id } = req.params

  try {
    await User.destroy({ where: { id } })
    return res.json({ message: 'Usuario eliminado' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

UsersController.update = async (req, res, next) => {
  const data = req.body
  const { id } = req.params

  try {
    const user = await User.update(data, { where: { id } })

    if(user[0] == 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    return res.json({ message: 'Usuario actualizado' })
  } catch (err) {
    console.error(err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
}

// POST /usuarios/:id/tarea + payload
UsersController.createTodo = async (req, res, next) => {
  const { id } = req.params
  const data = req.body
  data.userId = id

  try {
    const user = await User.findByPk(id)

    if(!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' })
    }

    const todo = await ToDo.create(data)

    return res.json({ user, todo })
  } catch (err) {
    // TODO: definir status codes
    return res.json({ message: err.message })
  }
}

module.exports = {
  UsersController
}
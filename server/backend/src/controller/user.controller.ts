import Role from '../models/Role'
import User from '../models/User'

const updateRole = async (email: string, newRole: string) => {
  const user = await User.findOne({ email: email })
  const role = await Role.findOne({ name: newRole })
  if (!user) {
    throw new Error('User Not found.')
  }
  user.role = role!
  await user.save()
}

const getAll = async () => {
  const users = await User.find().populate({ path: 'role', select: 'name -_id' }).select('-password -_id')
  return users
}

const getOne = async (email: string) => {
  const user = await User.findOne({ email }).populate({ path: 'role', select: 'name -_id' })
  return user
}

const usercontroller = { updateRole, getAll, getOne }
export default usercontroller

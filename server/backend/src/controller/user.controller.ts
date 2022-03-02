import Role from '../models/Role'
import User from '../models/User'

const updateRole = async (userId: string, newRole: string) => {
  const user = await User.findOne({ _id: userId })
  const role = await Role.findOne({ name: newRole })
  if (!user) {
    throw new Error('User Not found.')
  }
  user.role = role!
  const newUser = await user.save()
  return newUser
}

const getUserByRole = async (desiredRole: string) => {
  const role = await Role.findOne({ name: desiredRole })
  const user = await User.find({ role: role }).select('-password').populate({ path: 'role', select: 'name -_id' })
  if (!user) {
    throw new Error('No users found.')
  }
  return user
}

const getAll = async () => {
  const users = await User.find().populate({ path: 'role', select: 'name -_id' }).select('-password')
  return users
}

const getOne = async (userId: string) => {
  const user = await User.findOne({ _id: userId }).populate({ path: 'role', select: 'name -_id' }).select('-password')
  return user
}

const searchUser = async (searchString: string) => {
  const user = await User.find({
    $or: [
      { firstName: { $regex: '(?i)' + searchString } },
      { lastName: { $regex: '(?i)' + searchString } },
      { email: { $regex: '(?i)' + searchString } }
    ]
  })
    .populate({ path: 'role', select: 'name -_id' })
    .select('-password')
  return user
}

const usercontroller = { updateRole, getAll, getOne, searchUser, getUserByRole }
export default usercontroller

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

const usercontroller = { updateRole, getAll, getOne, searchUser }
export default usercontroller

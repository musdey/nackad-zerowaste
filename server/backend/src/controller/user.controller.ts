import Role from '../models/Role'
import User, { IUser } from '../models/User'

const updateRole = async (userId: string, newRole: string, shop: string) => {
  const user = await User.findOne({ _id: userId, mainShop: shop })
  const role = await Role.findOne({ name: newRole })
  if (!user) {
    throw new Error('User Not found.')
  }
  user.role = role!
  const newUser = await user.save()
  return newUser
}

const update = async (incoming: IUser) => {
  const user = await User.findOne({ _id: incoming._id })
  if (!user) {
    throw new Error('User Not found.')
  }
  user.cloudSMS = incoming.cloudSMS
  const newUser = await user.save()
  return newUser
}


const getUserByRole = async (desiredRole: string, shop: string) => {
  const role = await Role.findOne({ name: desiredRole })
  const user = await User.find({ role: role, mainShop: shop })
    .select('-password')
    .populate({ path: 'role', select: 'name -_id' })
  if (!user) {
    throw new Error('No users found.')
  }
  return user
}

const getAll = async (shop: string) => {
  const users = await User.find({ mainShop: shop }).populate({ path: 'role', select: 'name -_id' }).select('-password')
  return users
}

const getOne = async (userId: string) => {
  const user = await User.findOne({ _id: userId }).populate({ path: 'role mainShop', select: 'name -_id' }).select('-password')
  return user
}

const searchUser = async (searchString: string, shop: string) => {
  const user = await User.find({
    mainShop: shop,
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

const usercontroller = { update, updateRole, getAll, getOne, searchUser, getUserByRole }
export default usercontroller

import User from '../../models/User'
import bcrypt from 'bcryptjs'
import Role, { IRole } from '../../models/Role'


const initializeTestUser = async function () {
  const exists = await User.findOne({ email: 'test@test.at' })
  if (exists) {
    return
  }

  // Set customer role
  const role = (await Role.findOne({ name: 'MANAGER' })) as IRole
  const testUser = new User({
    email: 'test@test.at',
    firstName: 'Test',
    lastName: 'User',
    username: 'testUser',
    password: bcrypt.hashSync("test"!, 8),
    phoneNumber: '0123456',
    address: {
      city: 'Vienna',
      postalCode: 1010,
      street: 'Stadtplatz',
      streetNumber: '1',
      streetExtra: 'Top1'
    },
    role: role
  })

  try {
    await testUser.save()
  } catch (err) {
    console.log(err)
  }
}

export default initializeTestUser

import User from '../../models/User'
import bcrypt from 'bcryptjs'
import Role, { IRole } from '../../models/Role'
import Shop from '../../models/Shop'

const initializeTestUser = async function () {
  if (process.env.NODE_ENV === 'PRODUCTION') {
    return
  }
  const nackadShop = await Shop.findOne({ name: 'NACKAD' })
  const exists = await User.findOne({ email: 'test@test.at' })
  const role = (await Role.findOne({ name: 'MANAGER' })) as IRole
  const testUser = new User({
    email: 'test@test.at',
    firstName: 'Test',
    lastName: 'User',
    username: 'testUser',
    mainShop: nackadShop,
    password: bcrypt.hashSync('test'!, 8),
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

  const exists2 = await User.findOne({ email: 'rex@rex.at' })
  const rexEatShop = await Shop.findOne({ name: 'REXEAT' })
  const testUser2 = new User({
    email: 'rex@rex.at',
    firstName: 'Rex',
    lastName: 'Eat',
    username: 'testUserRex',
    mainShop: rexEatShop,
    password: bcrypt.hashSync('rex'!, 8),
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
    if (!exists) {
      await testUser.save()
    }
    if (!exists2) {
      await testUser2.save()
    }
  } catch (err) {
    console.log(err)
  }
}

export default initializeTestUser

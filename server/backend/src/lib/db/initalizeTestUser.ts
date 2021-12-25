import User from '../../models/User'

const initializeTestUser = async function () {
  const testUser = new User({
    email: 'test@User.at',
    firstName: 'Test',
    lastName: 'User',
    username: 'testUser',
    password: 'blabla',
    phoneNumber: '0123456',
    address: {
      city: 'Vienna',
      postalCode: 1010,
      street: 'Stadtplatz',
      streetNumber: '1',
      streetExtra: 'Top1'
    }
  })

  try {
    await testUser.save()
  } catch (err) {
    console.log(err)
  }
}

export default initializeTestUser

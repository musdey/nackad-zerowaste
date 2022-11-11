import Shop from '../../models/Shop'
import User from '../../models/User'

const updateNackadUsers = async () => {
  const user = await User.findOne({ email: 'mustafa.cicek@live.at' })
  if (!user) {
    console.log('No user mustafa..')
    return
  }
  // Set customer role
  const nackad = await Shop.findOne({ name: 'NACKAD' })
  if (!nackad) {
    console.log('No shop Nackad...')
    return
  }

  if (!user.mainShop) {
    await User.updateMany({ mainShop: nackad })
    console.log('Updated all existing users.')
  }
}

export default updateNackadUsers

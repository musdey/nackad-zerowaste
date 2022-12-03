import Role from '../../models/Role'

const initalizeRoles = async function () {
  try {
    const result = await Role.estimatedDocumentCount()
    if (result === 0) {
      await createRoles()
      console.log('Roles are created initially')
    }
  } catch (err) {
    await createRoles()
  }
}

const createRoles = async function () {
  const userRole = new Role({ name: 'CUSTOMER' })
  const moderatorRole = new Role({ name: 'EMPLOYEE' })
  const managerRole = new Role({ name: 'MANAGER' })
  const adminRole = new Role({ name: 'ADMIN' })

  try {
    await userRole.save()
    await moderatorRole.save()
    await managerRole.save()
    await adminRole.save()
  } catch (err) {
    console.log(err)
  }
}

export default initalizeRoles

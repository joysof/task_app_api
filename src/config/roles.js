// An application depends on what roles it will have.

const allRoles = {
  Tasker: ['common', 'Tasker'],
  client: ['common', 'commonClient', 'client'],
  admin: ['common', 'commonAdmin', 'admin'],
}

const roles = Object.keys(allRoles)
const roleRights = new Map(Object.entries(allRoles))

module.exports = {
  roles,
  roleRights,
}

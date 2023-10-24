const db = '[{"username": "user", "password": "user123", "roles": ["USER"]}, {"username": "admin", "password": "admin123", "roles": ["USER", "ADMIN"]}]'

const authPage = (permissions) => {

    return (req, res, next) => {

        const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
        const strauth = Buffer.from(b64auth, 'base64').toString()
        const splitIndex = strauth.indexOf(':')
        const username = strauth.substring(0, splitIndex)
        const password = strauth.substring(splitIndex + 1)
        const roles = getRolesByUsernameAndPassword(username, password)
        const found = ( roles == null) ? false : permissions.some(r=> roles.includes(r))

        if ( !found ) {
            res.status(401).json(JSON.parse('{"message": "Unauthorized for this Resource"}'))
        } else {
            next()
        }        

    }

}

function getRolesByUsernameAndPassword(username, password) {

    var user = JSON.parse(db).find(function(e) {
        return e.username == username && e.password == password
    })

    return (user != null) ? user.roles : null;

}

module.exports = { authPage };
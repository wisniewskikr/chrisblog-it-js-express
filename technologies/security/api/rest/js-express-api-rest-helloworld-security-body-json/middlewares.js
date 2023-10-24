const db = '[{"username": "user", "password": "user123", "roles": ["USER"]}, {"username": "admin", "password": "admin123", "roles": ["USER", "ADMIN"]}]'

const authPage = (permissions) => {

    return (req, res, next) => {
        
        const username = req.body.username
        const password = req.body.password
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
const jwt = require('jsonwebtoken');
const db = '[{"username": "user", "password": "user123", "roles": ["USER"]}, {"username": "admin", "password": "admin123", "roles": ["USER", "ADMIN"]}]';
const maxAge = 1 * 24 * 60 * 60;
const secret = "secret";

const createToken = (req, res, next) => {

    const username = req.body.username
    const password = req.body.password
    const roles = getRolesByUsernameAndPassword(username, password)

    if ( !roles ) {
        res.status(401).json(JSON.parse('{"message": "Unauthorized for token"}'))
    } else {
        const token = buildToken( roles )
        res.locals.token = token
        next()
    }    

};

const authPage = (permissions) => {

    return (req, res, next) => {

        let roles = null;
        
        const token = getTokenFromReq(req);
        if (!token) {
            res.status(401).json(JSON.parse('{"message": "Unauthorized for this Resource"}'))
            return;
        }

        jwt.verify(token, `${secret}`, (err, authData) => {
            if(err) {
                res.status(401).json(JSON.parse('{"message": "Unauthorized for this Resource"}'))
                return;
            } else {
                roles = authData.roles
            }
        })

        const found = ( roles == null) ? false : permissions.some(r=> roles.includes(r))

        if ( !found ) {
            res.status(401).json(JSON.parse('{"message": "Unauthorized for this Resource"}'))
            return;
        } else {
            next()
        }

    }

};

function buildToken (roles) {

  return jwt.sign({ roles }, `${secret}`, {
    expiresIn: maxAge
  });

}

function getRolesByUsernameAndPassword(username, password) {

    var user = JSON.parse(db).find(function(e) {
        return e.username == username && e.password == password
    })

    return (user != null) ? user.roles : null;

}

function getTokenFromReq(req) {

    const bearerHeader = req.headers['authorization'];
    return (typeof bearerHeader !== 'undefined') ? bearerHeader.split(' ')[1] : null ;

}

module.exports = { authPage, createToken };
const jwt = require('jsonwebtoken');
const db = '[{"username": "user", "password": "user123", "roles": ["USER"]}, {"username": "admin", "password": "admin123", "roles": ["USER", "ADMIN"]}]'
const maxAge = 1 * 24 * 60 * 60;
const secret = "secret";

const login = (req, res) => {

    let username = req.body.username;
	let password = req.body.password;

    const roles = getRolesByUsernameAndPassword(username, password)

    if ( roles != null ) {
        const token = buildToken(roles, username);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });      
        res.redirect('/')
    } else {
        res.cookie('error', 'Wrong username or password')
        res.redirect('/login')
    }

}

const logout = (req, res) => {

    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect("/");

}

const authPage = (permissions) => {

    return (req, res, next) => {

        let roles = null;
        
        const token = req.cookies.jwt;
        if (!token) {
            res.redirect('/401');
            return;
        }

        jwt.verify(token, `${secret}`, (err, authData) => {
            if(err) {
                res.redirect('/401');
                return;
            } else {
                roles = authData.roles
            }
        })
        
        
        const found = ( roles == null) ? false : permissions.some(r=> roles.includes(r));
        if ( !found ) {
            res.redirect('/401')
        } else {            
            next()
        }         

    }

}

const handleUsername = (req, res, next) => {

    const token = req.cookies.jwt;
        if (!token) {
            res.locals.username = null
            next()
            return;
        }

        jwt.verify(token, `${secret}`, (err, authData) => {
            if(err) {
                res.redirect('/401');
                return;
            } else {
                res.locals.username = authData.username
                next()
            }
        })

}

function getRolesByUsernameAndPassword(username, password) {

    var user = JSON.parse(db).find(function(e) {
        return e.username == username && e.password == password
    })

    return (user != null) ? user.roles : null;

}

function buildToken (roles, username) {

    return jwt.sign({ roles, username }, `${secret}`, {
      expiresIn: maxAge
    });
  
  }

module.exports = { login, logout, authPage, handleUsername };
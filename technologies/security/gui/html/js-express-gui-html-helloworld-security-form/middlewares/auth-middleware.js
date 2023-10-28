const db = '[{"username": "user", "password": "user123", "roles": ["USER"]}, {"username": "admin", "password": "admin123", "roles": ["USER", "ADMIN"]}]'

const login = (req, res) => {

    let username = req.body.username;
	let password = req.body.password;

    const roles = getRolesByUsernameAndPassword(username, password)

    if ( roles != null ) {
        req.session.roles = roles;
		req.session.username = username;       
        res.redirect("/");
    } else {
        res.redirect('/401');
    }

}

const logout = (req, res) => {

    req.session.roles = null;
	req.session.username = null;
    res.redirect("/");

}

const authPage = (permissions) => {

    return (req, res, next) => {

        const roles = req.session.roles;
        const found = ( roles == null) ? false : permissions.some(r=> roles.includes(r));
        if ( !found ) {
            res.redirect('/401')
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

module.exports = { login, logout, authPage };
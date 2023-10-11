const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const checkJWT = async (req, res, next) => {
    //let token = req.headers['x-access-token'] || req.headers['authorization'];
    const token = req.cookies.jwt

    if (!!token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, decoded) => {
            if (err) {
                console.log('token_required 1')
                console.log(err)
                
                res.cookie("jwt", "", { maxAge: 1});

                res.redirect("http://localhost:3000/")
                //return res.status(401).json('token_not_valid');
                
            } else {
                req.decoded = decoded;

                const expiresIn = 24 * 60 * 60;
                const newToken  = jwt.sign({
                    user : decoded.user
                },
                SECRET_KEY,
                {
                    expiresIn: expiresIn
                });

                res.header('Authorization', 'Bearer ' + newToken);
                next();
            }
        });
    } else {
        console.log(req.headers)
        //res.redirect("/login")
        console.log('token_required 2')
        res.redirect("http://localhost:3000/")
        //return res.status(401).json('token_required');
    }
}

module.exports = { checkJWT };
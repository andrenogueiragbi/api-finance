
const Token = require('../modals/Token')  
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ error: 'No token provider' });
    }
    const parts = authHeader.split(' ');

    if (!parts.length == 2) {
        return res.status(401).send({ error: 'Token error!' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token malFormatted' });
    }

    var allToken = token

    jwt.verify(token, authConfig.secret, async (err, decoded) => {

        const dataToken = await Token.findOne({where:[{token:allToken}]})
            

        if (err || !dataToken){

            if(dataToken)  await Token.destroy({where:{token:allToken}})

            return res.status(200).send({
                erro: true,
                message: 'Token invalid'

            });
        }
        

        return next();
    });

};
const User = require('../modals/User');
const Token = require('../modals/Token');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth')

function generateToken(params = {}) {
    let duratiomToken = 180;  // 3 days
    return jwt.sign(params, authConfig.secret, {
        expiresIn: duratiomToken,
    });
}

module.exports = {
    async login(req, res) {
        try {
            const { password, email } = req.body;

            if (!password || !email) {
                return res.status(200).send({
                    error: true,
                    message: 'missing parameters'
                });
            }
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(200).send({
                    error: true,
                    message: 'Credentials invalid'
                });
            }

            if (!bcrypt.compareSync(password, user.password)) {
                return res.status(200).send({
                    error: true,
                    message: 'Credentials invalid'
                });

            }


            await User.update({
                islogged: true
            }, {
                where: {
                    id: user.id

                }
            });

            user.password = undefined;

            const token = generateToken({ id: user.id, name: user.name, email: user.email });

            Token.destroy({ where: [{ email: user.name }] })
            await Token.create({ token, email: user.name })

            return res.status(200).send({
                erro: false,
                message: "User logged",
                user,
                token
            });

        } catch (err) {
            return res.status(200).send({
                erro: true,
                message: "Error service: " + err,

            });

        }




    },
    async refresh(req, res) {

        const { token } = req.body;

        try {
            if (!token) {
                return res.status(200).send({
                    erro: true,
                    message: 'missing parameters'
                });
            }


            //await Token.destroy({where:[{token}]})
            var allToken = token

            jwt.verify(token, authConfig.secret, async (err, decoded) => {


                const dataToken = await Token.findOne({ where: [{ token: allToken }] })


                if (err || !dataToken) {

                    if (dataToken) await Token.destroy({ where: { token: allToken } })

                    return res.status(200).send({
                        erro: true,
                        message: 'Token invalid'

                    });
                }



                const token = generateToken({ id: decoded.id, name: decoded.name, email: decoded.email });


                const user = await User.findOne({ where: { id: decoded.id, name: decoded.name, email: decoded.email } });


                await Token.update({
                    token
                }, {
                    where: {
                        token: dataToken.token

                    }
                });

                await User.update({
                    islogged: true,
                }, {
                    where: {
                        id: user.id

                    }
                });

                user.password = undefined;

                return res.status(200).send({
                    erro: false,
                    message: "User logged",
                    user,
                    token

                });


            });

        } catch (err) {
            return res.status(200).send({
                erro: true,
                message: "Error service: " + err,

            });
        }


    },
    async logout(req, res) {

        const { token } = req.body;

        try {
            if (!token) {
                return res.status(200).send({
                    erro: true,
                    message: 'missing parameters'
                });
            }



            if (!await Token.findOne({ where: [{ token }] })) {
                return res.status(200).send({
                    erro: true,
                    message: 'Token invalid'

                });
            }

            await Token.destroy({ where: { token } })

            return res.status(200).send({
                erro: false,
                message: 'Logout successfully'

            });

        } catch (err) {
            return res.status(200).send({
                erro: true,
                message: "Error service: " + err,

            });

        }

    }
}
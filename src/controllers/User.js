const User = require('../modals/User');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth')

function generateToken(params = {}) {
    let duratiomToken = 30;  // 1 dia
    return jwt.sign(params, authConfig.secret, {
        expiresIn: duratiomToken,
    });
}

module.exports = {
    async login(req, res) {
        const { password, email, islogged } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).send({
                status: 0,
                message: 'Credentials invalid'
            });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).send({
                status: 0,
                message: 'Credentials invalid'
            });

        }

        const user_id = user.id;

        await User.update({
            islogged
        }, {
            where: {
                id: user_id

            }
        });

        user.password = undefined;

        const token = generateToken({ id: user.email });

        return res.status(200).send({
            status: 1,
            message: "User logged",
            user, token
        });


    },

    async index(req, res) {
        const users = await User.findAll();

        if (users == "" || users == null) {
            return res.status(200).send({ 'message': 'user not found' });
        }

        return res.status(200).send({ users });

    },

    async store(req, res) {
        const { name, password, email } = req.body;

        if ( await User.findOne({ where: { email: email } })){
            return res.status(400).send({
                status: 0,
                message: 'user already exists'     
            });
        }


        const user = await User.create({ name, password, email });

        const token = generateToken({ id: user.id });

        return res.status(200).send({
            erro: false,
            message: 'user created success',
            user, token
        })

    },


    async update(req, res) {
        const { name, password, email } = req.body;

        const { user_id } = req.params;

        const userExist = await User.findByPk(user_id);

        if (!userExist) {
            return res.status(404).send({
                erro: true,
                message: 'user not found'
            });
        }

        await User.update({
            name, password, email
        }, {
            where: {
                id: userExist.id
            }
        });

        const user = await User.findOne({ where: { id: userExist.id } });

        return res.status(200).send({
            erro: false,
            message: "Usuario update with success",
            user


        })

    },


    async delete(req, res) {
        const { user_id } = req.params;


        const userExist = await User.findByPk(user_id);

        if (!userExist) {
            return res.status(404).send({
                status: 0,
                message: 'user not found'
            });
        }

        await User.destroy({
            where: {
                id: user_id
            }
        });

        return res.status(200).send({
            status: 1,
            message: "Usuario delete with success"
        })


    }


};

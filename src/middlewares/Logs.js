const logAcess = require('../controllers/logAcess')
const Log = require('../modals/Log')
const Key = require('../modals/Key')
const print = require('../controllers/print')



module.exports = async (req, res, next) => {
    const {key=null} = req.headers
    const { ip, source_port, destinatioPort, route, hour } = logAcess(req, res)

    try {

        const resultKey = await Key.findOne({ where: { key,status:'A' } })

        if(!key || !resultKey){
            print(`ACESSO NEGADO IP: ${ip} PORTA: ${source_port} KEY: ${key?key:null} ROTA: ${route} `,'ERRO',true)
            await Log.create({ip, source:key?key:'key vazia',source_port, route, status:'UNAUTHORIZED-400'})
            return res.status(200).send({
                error: true,
                message: `key unauthorized`
            });  
        }

        await Log.create({ip, source:key,source_port, destinatioPort, route, status:'OK-200'})
        return next();

    } catch (err) {
        console.warn(err)
        return next();

    }


};
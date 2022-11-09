const express = require('express');
const routes = express.Router()
const makerLog = require('./middlewares/Logs')


const online = require('./view/index')
const User = require('./controllers/User');
const Auth = require('./controllers/Auth');
const authMiddleware = require('./middlewares/auth');

routes.get("/",makerLog, authMiddleware,(req, res) => {
    res.send("hello I'm runnig 4000")
})

//ROTA LOGIN
routes.post('/auth',makerLog,Auth.login);
routes.post('/auth/refresh',makerLog, Auth.refresh);
routes.post('/logout',makerLog, Auth.logout);

//ROTA ONLINE
routes.get('/online',makerLog,online.pageStart);






//VALIDAR
routes.get('/users', User.index);
routes.post('/users',User.store);
routes.put('/users/:user_id', User.update);
routes.delete('/users/:user_id', User.delete);
routes.post('/users/login', User.login);




module.exports = routes;
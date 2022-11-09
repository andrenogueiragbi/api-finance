const express = require('express');
const bodyParserErrorHandler = require('express-body-parser-error-handler')
const routes = require('./routes');
const cors = require('cors');
const print = require('./controllers/print')
require('dotenv').config()
const app = express();




require('./database')
app.use(express.json());
app.use(cors());
app.use(bodyParserErrorHandler({
    errorMessage: (err) => {
		return "body is not a json";
	}
}))
//app.use(morgan('combined'));
app.use(routes);

app.listen(process.env.PORT || 3000, () =>{
    print(`API is running on port ${process.env.PORT_TESTE || process.env.PORT} http`,'INFO',true)
})











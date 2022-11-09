const { Model, DataTypes } = require('sequelize');

class Token extends Model {
    static init(sequelize){
        super.init({
            token: DataTypes.STRING,
            email: DataTypes.STRING,
        }, {sequelize})
    }
}    
module.exports = Token    
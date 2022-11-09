const { Model, DataTypes } = require('sequelize');

class Key extends Model {
    static init(sequelize){
        super.init({
            key: DataTypes.STRING,
            source: DataTypes.STRING,
            status: DataTypes.STRING,
        }, {sequelize})
    }
}    
module.exports = Key    
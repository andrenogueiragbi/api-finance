const date = require('./date');


module.exports = (print, type, hour = false) => {

    if (type == "info" || type == "INFO") {
        console.log('\x1b[34m%s\x1b[0m', `${hour? '['+date().dateHour+'] - ': ""}${print}`);
    } else if (type == "erro" || type == "ERRO") {
        console.log('\x1b[31m%s\x1b[0m', `${hour? '['+date().dateHour+'] - ': ""}${print}`);
    } else if (type == "alert" || type == "ALERT") {
        console.log('\x1b[33m%s\x1b[0m', `${hour? '['+date().dateHour+'] - ': ""}${print}`);
    } else {
        console.log('\x1b[32m%s\x1b[0m', `${ hour? '['+date().dateHour+'] - ': ""}${print}`);
    }
}
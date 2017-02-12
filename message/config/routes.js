'use strict';


var wsite = require('./wsite');
var consult = require('../server/consult.js');
var account = require('../server/account.js');
module.exports = function(app) {
    app.post('/wsite/login', account.login);
    app.get('/wsite/getConsultList', consult.getConsults);
    app.get('/wsite/exportExcel',consult.exportExcel);
    app.post('/wsite/addConsult', consult.addConsult);
    app.put('/wsite/editConsult',consult.editConsult);
    app.get('/wsite/*', wsite.routeCallback.pageApp);
    app.get('/*', wsite.routeCallback.toIndex)
};



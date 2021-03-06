'use strict';


var wsite = require('./wsite');
var consult = require('../server/consult.js');
var account = require('../server/account.js');
var information = require('../server/information.js');
var franchiseeAccount = require('../server/franchiseeAccount.js');
module.exports = function(app) {
    app.post('/wsite/login', account.login);
    app.post('/wsite/franchiseeLogin',franchiseeAccount.login);
    app.get('/wsite/getInformationList',information.getInformation);
    app.post('/wsite/addInformation',information.addInformation);
    app.post('/wsite/upload',information.upload);
    app.delete('/wsite/deleteInformation',information.deleteInformation);
    app.get('/wsite/getConsultList', consult.getConsults);
    app.get('/wsite/exportExcel',consult.exportExcel);
    app.post('/wsite/addConsult', consult.addConsult);
    app.put('/wsite/editConsult',consult.editConsult);
    app.get('/wsite/*', wsite.routeCallback.pageApp);
    app.get('/*', wsite.routeCallback.toIndex);
};



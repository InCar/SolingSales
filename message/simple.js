/**
 * Created by LM on 14-8-26.
 */
/*
var sp = require('serialport');
var dataManager = require('./src/dataManager');
var SerialPort = sp.SerialPort;
var serialPort = new SerialPort("COM4", {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1
}, false);
serialPort.open(function() {
    console.log("端口打开");
    dataManager.init(new Buffer(19),0);
    dataManager.writeString("SMS18086620891#LD");
    dataManager.setOffset(dataManager.getOffset()-1);//消息不带0x00
    dataManager.writeWord(0x1621);
    var data=dataManager.getBuffer();
    serialPort.write(data, function(err, results) {
        if(err){
            console.log(err + '\n');
        }
        serialPort.drain(function(){
            console.log("写入数据(" + results + '字节)：\n'+data.slice(0,17)+toString0X(data.slice(17,results)));
        });
    });
});
function toString0X(dataBuffer){
    var dataString='';
    for(var i=0;i<dataBuffer.length;i++){
        var intVal=dataBuffer.readUInt8(i);
        if(intVal<0x10){
            dataString+='0'+intVal+' ';
        }
        else{
            dataString+=intVal.toString(16).toUpperCase()+" ";
        }
    }
    return dataString;
}*/

function getDateTimeStamp(time) {
    var date = time?time:new Date(Date.parse(time));
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec;
}

function changeDate_1(date)
{
    if(date == "0000-00-00 00:00:00" || date == null) return null;
    var year = new Date(Date.parse(date)).getFullYear();
    var month = (new Date(Date.parse(date)).getMonth()) + 1;
    var day = new Date(Date.parse(date)).getDate();
    var hour = new Date(Date.parse(date)).getHours();
    var minute = new Date(Date.parse(date)).getMinutes();
    if(month < 10) month= "0" + month;
    if(day < 10) day= "0" + day;
    if(hour < 10) hour = "0" + hour;
    if(minute < 10) minute= "0" + minute;

    return (year+"-"+month+"-"+day+" "+hour+":"+minute);
}
console.log(getDateTimeStamp(new Date()));
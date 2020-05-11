
var mysqlConf = require('./configDB.js').mysql_pool;
var query = "INSERT INTO `user` (`email`, `username`, `password`) VALUES ('1@uno-com', 'Ajeet Kumar', MD5('Allahabad'))";  
mysqlConf.getConnection(function (err, connection) {
    connection.query(query ,function (err, rows) {
        connection.release();   //---> don't forget the connection release.
    });
});


funcion 
// 
// con.query(sql, function (err, result) {  
// if (err) throw err;  
// console.log("1 record inserted");  
// }); 


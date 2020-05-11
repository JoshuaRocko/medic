var mysql = require('mysql');  
var con;

con = {
    mysql_pool : mysql.createPool({
        host: "localhost",  
        user: "root",  
        password: "root",  
        database: "medics" 
    })
};
module.exports = con;


// var sql = "INSERT INTO `user` (`email`, `username`, `password`) VALUES ('1@uno-com', 'Ajeet Kumar', MD5('Allahabad'))";  
// con.query(sql, function (err, result) {  
// if (err) throw err;  
// console.log("1 record inserted");  
// }); 


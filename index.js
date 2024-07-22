const express = require("express");
const mysql = require("mysql2/promise");
const app = express();
app.use(express.json());
let connection=null;


async function main(){
    connection = await mysql.createConnection({
      host:"192.168.100.240",
      port: "3306",
      user: "pqr",
      password: "",
      database: "db_user",
    });

    app.listen(8000,() =>{
      console.log('Server is Running on port 8000...');
  });
  }
  main();


  app.use('/login_', async(req, res)=>{
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  console.log(password);
  const [rows] = await connection.query("SELECT * FROM t_user where username=? and password=?",
  [username, password]);

  if(rows==''){
    console.log(rows);
    console.log('Login Fail...');
    res.json({ResponseFromNodeJs:"Response from NodeJs... Login Fail..."});
  }
  else if(rows!=''){
    console.log(rows);
    console.log('Login Success...');
    res.json({ResponseFromNodeJs:"Response from NodeJs... Login Success..."});
  }
});

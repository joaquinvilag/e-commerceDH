const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const userControllers = {
    showLoginForm: (req,res,next)=>{
        res.render("formLogin");
    },
    processLoginForm: (req,res,next)=>{

    let usuariosJSON = fs.readFileSync('./data/users.JSON')
    let usuariosJS;

    if(usuariosJSON == ""){
        usuariosJS = [];
    } else {
        usuariosJS = JSON.parse(usuariosJSON);
    };
    for ( let i= 0; i < usuariosJS.length; i++){
        if( req.body.email == usuariosJS[i].email && bcrypt.compareSync( req.body.password, usuariosJS[i].password)){
            res.send("Éxito!");
        }else{
            res.send("F");
        };
    };        
    },
    showRegisterForm: (req,res,next)=>{
        res.render("formRegister");
    },
    processRegisterForm: (req,res,next)=>{   
        
    let usuariosJSON = fs.readFileSync("./data/users.JSON");
    let usuariosJS = JSON.parse(usuariosJSON);
    

    let password = bcrypt.hashSync(req.body.password,10);
    let usuario = {
        name: req.body.name,
        password: password,
        email: req.body.email
    };
    console.log(usuario)
    
    usuariosJS.push(usuario);
    usuariosJSON = JSON.stringify(usuariosJS);
    fs.writeFileSync("./data/users.JSON", usuariosJSON);

    console.log("No lo sé, tu dime!")
    }
}


module.exports = userControllers;
const fs = require('fs');

function recordameMiddleware(req, res, next){
    next();

    if(req.cookies.recordame != undefined && req.session.usuarioLogueado == undefined){
        let usersJSON = fs.readFileSync('./data/users.json', {encoding: 'utf-8'});
        let usersJS;
        let usuarioALoguearse;
        if(usersJSON == ""){
            usersJS = [];
        } else {
            usersJS = JSON.parse(usersJSON);
        };

        for(let i = 0; i < usersJS.length; i++){
            if(usersJS[i].email == req.cookies.recordame){
                usuarioALoguearse = usersJS[i];
                break;
            };
        };
        req.session.usuarioLogueado = usuarioALoguearse;
    }

    
}

module.exports = recordameMiddleware;
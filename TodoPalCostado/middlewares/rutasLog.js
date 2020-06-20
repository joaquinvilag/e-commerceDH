function rutasLog(req,res,next){
    if(req.session.usuarioLogueado != undefined){
        next();
    }else{
        res.render('/users')
    }
}
module.exports = rutasLog;
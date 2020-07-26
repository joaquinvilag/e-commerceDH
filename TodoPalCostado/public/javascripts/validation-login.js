window.addEventListener("load",()=>{
    let form = document.querySelector("form.div-form-register")

    form.addEventListener("submit", (e) =>{
        let errors = [];
        let inputFieldEmail = document.querySelector("input#email");
        let inputFieldPw = document.querySelector("input#pw");
        if(inputFieldEmail.value === ""){
            errors.push("Email inválido");
        }else if(inputFieldEmail.value.length < 6){
            errors.push("Email inválido")
        }
        if(inputFieldPw.value === ""){
            errors.push("Contraseña incorrecta")
        }else if(inputFieldPw.value.length < 6){
            errors.push("Contraseña incorrecta")
        }

        if(errors.length > 0){
            e.preventDefault();
            let ulErrors = document.querySelector("div.errors");
            ulErrors.innerHTML = "";
            for(let i = 0; i < errors.length; i++){
                ulErrors.innerHTML +="<p>"+ errors[i]+"</p>";
            }
        }
    });


});
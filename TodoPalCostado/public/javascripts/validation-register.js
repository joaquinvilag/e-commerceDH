window.addEventListener("load",()=>{
    let form = document.querySelector("form.form_register_date");

    form.addEventListener("submit",(e)=>{
        let errors = [];
        let inputFieldName = document.querySelector("input#name");
        let inputFieldLastName = document.querySelector("input#last_name");
        let inputFieldEmail = document.querySelector("input#email");
        let inputFieldPw = document.querySelector("input#pw");
        let inputFieldCPw = document.querySelector("input#Cpw")
        let inputFieldImg = document.querySelector("input#img");

        if(inputFieldName.value === ""){
            errors.push("El campo nombre no puede estar vacío")
        }
        if(inputFieldLastName.value ===""){
            errors.push("El campo apellido no puede estar vacío");
        }
        if(inputFieldEmail.value === ""){
            errors.push("El campo Email no puede estar vacío");
        }
        if(inputFieldPw.value === ""){
            errors.push("Este campo no puede estar vacío");
        }
        if(inputFieldCPw.value === ""){
            errors.push("El campo confirmar contraseña no puede estar vacío");
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
})
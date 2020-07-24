window.addEventListener("load",()=>{
    let form = document.querySelector("form.div-form-register")

    form.addEventListener("submit", (e) =>{
        let errors = [];
        let inputField = document.querySelectorAll("input.field_form_register");
        if(inputField.value == ""){
            errors.push("Credenciales inválidas, este campo no puede estar vacío");
        }else if(inputField.value.length < 8){
            errors.push("Credenciales inválidas, como mínimo 8 carácteres.")
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
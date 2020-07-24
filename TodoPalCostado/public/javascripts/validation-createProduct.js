window.addEventListener("onload",()=>{
    let form = document.querySelector("form.form-add-product")

    form.addEventListener("submit", (e)=>{
        let errors = [];
        let inputFieldName = document.querySelector("input.name");
        let inputFieldPrice = document.querySelector("input.price");
        let inputFieldCategory = document.querySelector("select.category");
        let inputFieldDetail = document.querySelector("select.detail");
        let inputFieldDescr = document.querySelector("textarea.descr")
        let inputFieldImg = document.querySelector("input.img")









        if(inputFieldName === ""){
            errors.push("El campo nombre no puede estar vacío.");
        }
        if(inputFieldPrice === ""){
            errors.push("El campo precio no puede estar vacío")
        }
        if(inputFieldCategory === ""){
            errors.push("Selecciona una categoria")
        }
        if(inputFieldDetail){
            errors.push("Selecciona una opción");
        }
        if(inputFieldDescr.value.length < 8)
            errors.push("La descripción del producto no puede estar vacía. Mínimo 8 caracteres.")
        // if(inputFieldImg){

        // }
        if(errors.length > 0){
            e.preventDefault();
            let ulErrors = document.querySelector("div.errors");
            ulErrors.innerHTML = "";
            for(let i = 0; i < errors.length; i++){
                ulErrors.innerHTML +="<p>"+ errors[i]+"</p>";
            }
        }






    })



    
})
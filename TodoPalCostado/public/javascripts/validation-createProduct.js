window.addEventListener("load",()=>{
    let form = document.querySelector("form.form-add-product")
    
    form.addEventListener("submit", function(e){
       
        let errors = [];
        let inputFieldName = document.querySelector("input.name");
        let inputFieldPrice = document.querySelector("input.price");
        let inputFieldCategory = document.querySelector("select.category");
        let inputFieldDetail = document.querySelector("select.detail");
        let inputFieldDescr = document.querySelector("textarea.descr")
        let inputFieldImg = document.querySelector("input.img")









        if(inputFieldName.value === ""){
            errors.push("El campo de nombre no puede estar vacío.");
        }else if(inputFieldName < 3){
            errors.push("Nombre es es demasiado corto")
        }
        if(inputFieldPrice.value === ""){
            errors.push("El campo precio no puede estar vacío")
        }
        if(inputFieldCategory.value === ""){
            errors.push("Selecciona una categoria")
        }
        if(inputFieldDetail === ""){
            errors.push("Selecciona una opción de detalle");
        }
        if(inputFieldDescr.value.length < 8){
            errors.push("La descripción del producto no puede estar vacía. Mínimo 8 caracteres. front")
        }
        
        
        if(errors.length > 0){
            e.preventDefault();
            
            let frontErrors = document.querySelector("div.errors");
            frontErrors.innerHTML = "";
            for(let i = 0; i < errors.length; i++){
                frontErrors.innerHTML +="<p>"+ errors[i]+"</p>";
            }
        }






    })



    
})
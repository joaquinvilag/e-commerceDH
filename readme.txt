CRUD PRODUCTOS:

/PRODUCTS (GET): Listado de todos los productos terminado, solo falta estetica.

/PRODUCTS/:id (GET): Detalle de producto terminado, si bien agregue dos botones de edición y eliminación, hay que trabajar en hacer que solo cuandp ingrese el ADMIN aparezcan esos botones, de ser solo usuario deberian desaparecer.

/PRODUCTS/CREATE/ADMIN (GET): Formulario de creación terminado, falta agregar opción para agregar imagen, lo estare trabajando en estos dias. 

/PRODUCTS/CREATE (POST): Si bien carga perfectamente el nuevo dato, al hacer redirect ya sea a /products o al detalle del nuevo producto tira error, solo se puede redireccionar al home, pero que vuelva a leer la lista modificada hay que volver a hacer NPM START.

/PRODUCTS/:ID/EDIT (GET): Formulario de edicion terminado, lo mismo que CREATE falta agregar la opción de agregar imagen (conservar normalmente la imagen ya establecida).

/PRODUCTS/:ID (PUT): Si bien edita perfectamente el producto seleccionado, tenemos el mismo error de redirect que CREATE.

/PRODUCTS/:ID/DELETE (DELETE): Elimina perfectamente el elemento. Mismo problema de redireccionamiento.


Las modificaciones se hacen perfectamente, el único problema esta en el redireccionamiento, vuelven hacer NPM START y veran los cambios aplicados sin problemas, si alguno tiene la solución del redireccionamiento no dude en resolverlo. 


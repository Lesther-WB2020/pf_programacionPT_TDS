//variable que almacenará los valores actuales del producto
let argsProduct;

//traer las categorias disponibles, por si el usuario decide cambiar la categoria del producto
//al terminar de cargar los elementos de la página, quiero que me llene automaticamente la tabla con la data de la DB
//se ejecuta una vez cargada la ventana.
window.onload = getCategorys();

async function getCategorys(){
    window.comunication.getCategorysFromDB();
}

document.getElementById('formUpdate').addEventListener('submit',(event)=>{
    event.preventDefault();
         //valores que requiere el query para el update.
         let args = new Array();
             let nameP = document.getElementById('nameP').value; args.push(nameP);
             let description_ = document.getElementById('descriptionP').value; args.push(description_);
             let stocksP = document.getElementById('stocksP').value; args.push(stocksP);
             //setear el idCategory de la categoria seleccionada
             let idCategory = document.getElementById("optionsCategorys").value; args.push(idCategory);
             let idProduct = document.getElementById('idProduct').value; args.push(idProduct);
                 //console.log(args)
                    let actionConfirmed = confirm('PRESIONA "OK" O "ACEPTAR" PARA GUARDAR LOS CAMBIOS');
                        if(actionConfirmed){
                            window.comunication.updateThis(args);
                        }
});

document.getElementById('btnUndoChanges').addEventListener('click',(event)=>{
    event.preventDefault();
     let actionConfirmed = confirm('¿ESTAS SEGUR@ QUE DESEAS DESHACER LOS CAMBIOS?')
         if(actionConfirmed){
            setCurrentValues(argsProduct);
         }
});

//esto se ejecuta al momento de crearce la ventana.
window.comunication.replyMain('updateThis',(event,args)=>{
    argsProduct = args;
    console.log(argsProduct);
    setCurrentValues(argsProduct);
});

async function setCurrentValues(args){
    //[idp,namep,description_,stocks,category,currentUser,idc]
    console.log(`function setcurrentvalues ->  ${argsProduct[6]}`)
    document.getElementById('idProduct').value = args[0];
    document.getElementById('nameP').value = args[1];
    document.getElementById('descriptionP').value = args[2];
    document.getElementById('stocksP').value = args[3];
    document.ready = document.getElementById("optionsCategorys").value = argsProduct[6];
    document.getElementById('currentUser').innerHTML = args[5];
}

//repuesta hacia la peticion de la lista de categorias al momento de crear la vetanna
window.comunication.replyMain('replyGetCategorysList',(event,args)=>{
    //console.log(args);
    //obtengo el select
    let select = document.getElementById('optionsCategorys');
    let nElementos = args.length;
        for(let i=0;i<nElementos;i++){
            //creo un option por cada categoria
            let option = document.createElement('option');
            option.setAttribute('value',args[i]['idCategory']);
            option.innerHTML =  args[i]['name_'];
                //eventualmente los agrego al select.
                select.appendChild(option); 
        }
});

window.comunication.replyMain('replyQueryUpdate',(event,args)=>{
    // En este caso, sé con certeza que podría dispararse un error porque el nombre del producto ya existe
    // aunque también podriá ser por factores ajenos
    if(args=='error'){
        alert('YA HAY UN PRODUCTO CON EL MISMO NOMBRE, VALIDALO CON UN ADMINISTRADOR.');
    }else if(args=='succes'){
        let backOtherWindow = confirm('ACTUALIZACIÓN EFECTUADA CON ÉXITO')
            if((backOtherWindow)||(!backOtherWindow)){
                window.comunication.backAfterUpdateAnItem();
            }
    }
});

//funcion que convierte a mayuscula el input cuyo value es el nombre del producto
function mayus(letter){
    letter.value = letter.value.toUpperCase();
}
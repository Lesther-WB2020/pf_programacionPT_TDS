//variable que almanecará la data necesaria para registrar el pedido
let argsOrder;
//funcion que trae la lista de proveedores con base al id del producto.
async function getProviders(idProductToOrder){
        window.comunication.getProvidersFromDB(idProductToOrder);
}

document.getElementById('makeAnOrder').addEventListener('submit',(event)=>{
    event.preventDefault();
         argsOrder = new Array();
         let actionConfirmed = confirm('PRECIONA "OK" O "ACEPTAR" PARA CONFIRMAR EL PEDIDO');
             if(actionConfirmed){
                 let idProduct = document.getElementById('idProduct').value; argsOrder.push(idProduct);
                 let idProvider = document.getElementById('optionsProviders').value; argsOrder.push(idProvider);
                 let quantityP = document.getElementById('quantityP').value; argsOrder.push(quantityP);
                     //console.log(argsOrder);
                     window.comunication.makeAnOrderOfThis(argsOrder);
             }
});

//se ejecuta al momento de crear la ventana.
window.comunication.replyMain('makeAnOrderOfThis',(event,args)=>{
    //args-> [idp,namep,currentUser]
    //llenar inputs.
    document.getElementById('idProduct').value = args[0];
    getProviders(args[0]);
    document.getElementById('namep').value = args[1]
    //set h1 value current user
    document.getElementById('currentUser').innerHTML = args[2];
});

window.comunication.replyMain('replyGetProvidersList',(event,args)=>{
    if(args=='errorGetData'){
        alert('HUBO UN ERROR AL CARGAR LOS PROVEEDORES, CIERRA LA VENTANA PARA EVITAR MÁS INCONVENIENTES.');
    }else{
        //console.log(`estos son los proveedores -> ${args}`);
        //lleno el select con los args=providers
        let select = document.getElementById('optionsProviders');
        let nElementos = args.length;
            for(let i=0;i<nElementos;i++){
                //creo un option por cada categoria
                let option = document.createElement('option');
                option.setAttribute('value',args[i]['idProv']);
                option.innerHTML =  args[i]['nameProvider'];
                    //eventualmente lo agrego al select.
                    select.appendChild(option); 
            }
        }

});

window.comunication.replyMain('replyMakingAnOrderOfThis',(event,args) => {
     if(args=='alreadyExistsOrder'){
        alert('YA EXISTE UN PEDIDO DEL MISMO PRODUCTO, CON EL MISMO PROVEEDOR.');
     }else if(args=='errorValidateOrder'){
        alert('HUBO UN ERROR AL VALIDAR LA EXISTENCIA DEL PEDIDO, CIERRA LA VENTANA E INTENTALO DE NUEVO O COMUNICATE CON UN ADMINISTRADOR.');
     }else if(args=='ErrorRegisterOrder'){
        alert('HUBO UN ERROR AL REGITRAR EL PEDIDO, CIERRA ESTA VENTANA E INGRESA OTRA VEZ O CUMUNICATE CON UN ADMINISTRADOR.');
     }else{
        let actionConfirmed = confirm('PEDIDO REGISTRADO CON ÉXITO');
            if((actionConfirmed)||(!actionConfirmed)){
                window.comunication.backAfterMakeAnOrder();
            }
     }
});
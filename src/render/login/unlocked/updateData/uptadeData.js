document.getElementById('btnUpdateData_').addEventListener('click',()=>{
    let idProductToUpdating = document.getElementById('idProduct').innerHTML;
    let currentUser = document.getElementById('currentUser').innerHTML;
    console.log(idProductToUpdating);
    let actionConfirmed = confirm('PRESIONA "OK" O "ACEPTAR" PARA GUARDAR LOS CAMBIOS');
        if(actionConfirmed){
            window.comunication.updateThis([idProductToUpdating,currentUser]);
        }
})


window.comunication.replyMain('updateThis',(event,args)=>{
    document.getElementById('idProduct').innerHTML = args[0];
    document.getElementById('currentUser').innerHTML = args[1];
});
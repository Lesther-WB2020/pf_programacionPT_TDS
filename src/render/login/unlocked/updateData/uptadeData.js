/*document.getElementById('btnUpdateData_').addEventListener('click',()=>{
    let idProductToUpdating = document.getElementById('idProduct').innerHTML;
    let currentUser = document.getElementById('currentUser').innerHTML;
    console.log(idProductToUpdating);
    let actionConfirmed = confirm('PRESIONA "OK" O "ACEPTAR" PARA GUARDAR LOS CAMBIOS');
        if(actionConfirmed){
            window.comunication.updateThis([idProductToUpdating,currentUser]);
        }
})*/


window.comunication.replyMain('updateThis',(event,args)=>{
    document.getElementById('idProduct').value = args[0];
    document.getElementById('currentUser').innerHTML = args[1];
});
/*
<div id="containerInputsToEdit">
            <table id="tableUpdatingData" class="table table-dark table-hover table-striped">
                    <tbody id="tbodyUpdatingData">    
                        <thead>
                            <td class="labelInputEdit"><img id="iconImage" src="../../../../assets/img/updateData.png" alt="icon update data"></td>
                            <td class="inputEdit">EDITANDO INFORMACIÓN</td>
                        </thead>
                        <tr>
                            <td class="labelInputEdit">ID PRODUCTO</td>
                            <td class="inputEdit"><input type="text" name="" id="idProduct"></td>
                        </tr> 
                        <tr>
                            <td>
                                <button id="btnUndoChanges" class="btn btn-primary">DESHACER CAMBIOS</button>
                            </td>
                            <td>
                                <button id="btnUpdateData_" class="btn btn-primary">GUARDAR CAMBIOS</button>
                            </td>
                        </tr>         
                    </tbody>
             </table>
        </div>*/
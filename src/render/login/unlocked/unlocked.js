let tbody_ = document.getElementById('tbodyProducts');

//al terminar de cargar los elementos de la página, quiero que me llene automaticamente la tabla con la data de la DB
window.onload = loadData();

async function loadData(){
    window.comunication.loadDataFromDB();
}

// esto se ejecuta después de haber iniciado sesión.
window.comunication.replyMain('welcomeData',(event,args)=>{
    document.getElementById('currentUser').innerHTML = args;
});

window.comunication.replyMain('replyLoadInfo',(event,args)=>{
    if(args=='errorGetData'){
        alert('HUBO UN ERROR AL OBTENER LOS DATOS, INICIA SESIÓN DENUEVO PARA EVITAR ERRORES MAYORES O COMUNICATE CON UN ADMINSITRADOR');
    }else{
        let nElementos = args.length;
        //console.log(nElementos);
        //console.log(args[0]['namep']);
        //console.log(args[0]);
        let idp = '';
        let namep = '';
        let description_ = '';  
        let stocks = 0;
        let category = '';
        for(let i=0;i<nElementos;i++){
            idp = args[i]['idp'];
            namep = args[i]['namep'];
            description_ = args[i]['description_'];
            stocks = args[i]['stocks'];
            category = args[i]['category']
                putDataInTable(idp,namep,description_,stocks,category);
        }
    }
});

async function putDataInTable(idp,namep,description_,stocks,category){
    //creacion del boton para gestionar actualizacion de cada producto
    let btnUpdateData = document.createElement('input');
    
    btnUpdateData.setAttribute('id',idp);
    btnUpdateData.setAttribute('value','ACTUALIZAR');
    btnUpdateData.setAttribute('class','btn btn-primary');
        
        btnUpdateData.addEventListener('click',(event)=>{
            console.log('updatingData since render');
            let currentUser = document.getElementById('currentUser').innerHTML;
            let actionConfirmed = confirm('¿Quieres actualizar los datos de este producto?')
                if(actionConfirmed){
                    window.comunication.updateData([btnUpdateData.id,currentUser]);
                }
        });

    //creacion del boton para gestionar el pedido de cada producto.
    let btnMakeAnOrder = document.createElement('input');
    btnMakeAnOrder.setAttribute('id',idp);
    btnMakeAnOrder.setAttribute('value','PEDIR MÁS');
    btnMakeAnOrder.setAttribute('class','btn btn-primary');

        btnMakeAnOrder.addEventListener('click',(event)=>{
            console.log('makeAnOrder since render');
            let currentUser = document.getElementById('currentUser').innerHTML;
            let actionConfirmed = confirm('¿Quieres realizar un pedido de este producto?')
                if(actionConfirmed){    
                    window.comunication.makeAnOrder([btnUpdateData.id,currentUser]);
                }
        });       

    //creo una fila que contendra el item actual    
    let row_ = document.createElement('tr');
    row_.setAttribute('scope','row');
    row_.setAttribute('rowspan','2');
    row_.innerHTML =
     `<td class=\"nameP\">${namep}</td>
      <td class=\"descriptionP\">${description_}</td>
      <td class=\"stocksP\">${stocks}</td>
      <td class=\"categoryP\">${category}</td>`

     //eventualmente creo otro 'td' al cual le agregaré los dos botones y un br intermediandolos para separarlos verticalmente.
     let tdOptions = document.createElement('td');
     let skipLine_ = document.createElement('p'); 
     tdOptions.setAttribute('class','optionsP')
     tdOptions.appendChild(btnUpdateData);
     tdOptions.appendChild(skipLine_);
     tdOptions.appendChild(btnMakeAnOrder);
     
        //a esa misma fila le agrego el tdOptions
            row_.appendChild(tdOptions);
            //finalmente agrego la fila al tbody.
                tbody_.appendChild(row_);
}




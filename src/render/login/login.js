let form = document.getElementById('formLogIn');

let tableLogin = document.getElementById('tableLogin');

form.addEventListener('submit', (event)=>{
    event.preventDefault(); 
         let userInput = document.getElementById('userInput').value;
         let userPass = document.getElementById('userPass').value;
        //envia datos al Main, el Main los valida en la DB y si son correctos
        //deja entrar al usuario de lo contrario le indica si desea crear una cuenta.
         window.comunication.sendDataToMain([userInput,userPass]);
}); 

window.comunication.replyMain('replyValidateData',(event,args)=>{
    let message = args[0];
    let user = args[1];
        //pdt: en este caso, si la contraseña fuese correcta, se enviaría directamente a la siguiente
        //ventana y ya no se tendría contacto con esta.
        if(message=='incorrectPassword'){
             alert('LA CONTRASEÑA ES INCORRECTA');
        }else{
            let toRegister = confirm(`EL USUARIO '${user}' NO ESTÁ REGISTRADO, ¿DESEAS REGISTRARLO?`)
                if(toRegister){
                     window.comunication.makeARegister(user);
                }
        }
});


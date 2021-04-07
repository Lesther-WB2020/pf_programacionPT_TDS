document.getElementById('formRegister').addEventListener('submit',(event)=>{
    event.preventDefault();
        //campos a registrar
            let user_ = document.getElementById('userInput').value;
            let pass_ = document.getElementById('passInput').value;
            let dataRegister = new Date();
            let name_ = document.getElementById('nameInput').value;
            let fSurname = document.getElementById('fSurnameInput').value;
            let sSurname = document.getElementById('sSurnameInput').value;
            let securityCode = document.getElementById('securityCode').value;
                window.comunication.sendDataToMainForRegister([user_,pass_,dataRegister,name_,fSurname,sSurname,securityCode]);
})

function mayus(letter){
    letter.value = letter.value.toUpperCase();
}

window.comunication.replyMain('replyRegister',(event,args)=>{
    if(args == 'alreadyExists'){
        alert('EL USUARIO YA EXISTE');
    }else if(args=='validArguments'){
        let read = confirm('USUARIO REGISTRADO EXITOSAMENTE');
            //esto solamente para cuando el usuario haya seleccionado 'ok' o 'cancelar', se cambie al contenido del login.
            if((read)||(!read)){ 
                window.comunication.changeContentToLogin();
            }
    }else if(args=='invalidSecurityCode'){
        alert('CÓDIGO DE SEGURIDAD INVÁLIDO, CONSULTA CON UN ADMINISTRADOR.')
    }else{
        alert('HUBO UN ERROR EN EL REGISTRO, INTENTALO OTRA VEZ.');
    }
});

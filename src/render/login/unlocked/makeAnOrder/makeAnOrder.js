document.getElementById('btnMakeAnOrder_').addEventListener('click',()=>{
    let idProductToMakeAnOrder = document.getElementById('idProductToMakeAnOrder').innerHTML;
    let currentUser = document.getElementById('currentUser').innerHTML;
        window.comunication.makeAnOrderOfThis([idProductToMakeAnOrder,currentUser]);
});

window.comunication.replyMain('makeAnOrderOfThis',(event,args)=>{
    document.getElementById('idProductToMakeAnOrder').innerHTML = args[0];
    document.getElementById('currentUser').innerHTML = args[1];
});
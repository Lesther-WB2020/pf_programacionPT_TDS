const {ipcRenderer,contextBridge} = require('electron');

contextBridge.exposeInMainWorld(
    'comunication',
    {
        //para validar los datos de inicio de sesion
        sendDataToMain:
        (objectData) => {ipcRenderer.send('validateData',objectData)}
        ,
        //para cambiar el contenido de la ventana.
        makeARegister:
        (objectData) => {ipcRenderer.send('registerData',objectData)}      
        ,
        //para registrar al nuevo usuario
        sendDataToMainForRegister:
        (objectData) => {ipcRenderer.send('registerWorker',objectData)}
        ,
        //se emplea cuando se registra un usuario y eventualmente se devuelve el contenido del login.
        changeContentToLogin:
        () => {ipcRenderer.send('changeToLogin')}
        ,
        //para manejar la funcion de actualizacion -> creacion de ventana
        updateData:
        (objectData) => {ipcRenderer.send('updateData',objectData)}
        ,
        //para manejar la funcion de pedidos -> creacion de ventana
        makeAnOrder:
        (objectData) => {ipcRenderer.send('makeAnOrder',objectData)}
        ,
        // para actualizar dentro de la vetana updateWindow
        updateThis:
        (objectData) => {ipcRenderer.send('updateThis',objectData)}
        ,
        // para realizar la orden del producto, dentro de la ventana realizar producto
        makeAnOrderOfThis:
        (objectData) => {ipcRenderer.send('makeAnOrderOfThis',objectData)}
        ,
        //decirle al main que me cargue la data en el table de unlocked.html
        loadDataFromDB:
        () => {ipcRenderer.send('loadInfoPlease')}
        ,
        getCategorysFromDB:
        () => {ipcRenderer.send('getCategorysDB')}
        ,
        backAfterUpdateAnItem:
        () => {ipcRenderer.send('backAfterUpdateAnItem')}
        ,
        //para manejar las respuestas, de cualquier canal, con cualquier argumento. ya que no se especifica explicitamente
        //el canal de comunicacion ni algun argumento en especifico.
        replyMain: 
        (channel,callback) => {ipcRenderer.on(channel,callback)}
    }
);
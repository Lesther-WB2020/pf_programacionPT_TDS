const{app, BrowserWindow} = require('electron');
// para comunicarnos con el render-preload
const {ipcMain} = require('electron');
// para encriptar textos planos.
const bcrypt = require("bcrypt");
// empleado sql-mysql en el código
const mysql = require('mysql2');
// preload-path
const path = require('path');
// para cerrar las ventanas
const remote = require('electron').remote;

// datos de conexion a la DB
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'xitumul',
    password: 'galileo2021',
    database: 'stocktaking'
}); 

//ventanas
let loginWindow;
function createMainWindow(){
    loginWindow = new BrowserWindow({
        center:true,
        resizable:false,
        icon: path.join(app.getAppPath(),'/src/assets/img/iconSystem.png'),
        width: 1000,
        height: 950,
        webPreferences:{
            preload: path.join(app.getAppPath(),'/src/render/preload.js')
        }
    })
    loginWindow.loadFile('./src/render/login/login.html');
}
app.whenReady().then(createMainWindow);

let systemUnlockedWindow;
function createUnlockedWindow(){
    systemUnlockedWindow = new BrowserWindow({
        center:true,
        resizable:false,
        icon: path.join(app.getAppPath(),'/src/assets/img/iconSystem.png'),
        width: 1000,
        height: 950,
        webPreferences:{
            preload: path.join(app.getAppPath(),'/src/render/preload.js')
        }
    })
    systemUnlockedWindow.loadFile('./src/render/login/unlocked/unlocked.html');
}

let makeAnOrderWindow;
function createMakeAnOrderWindow(){
    makeAnOrderWindow = new BrowserWindow({
        center:true,
        resizable:false,
        icon: path.join(app.getAppPath(),'/src/assets/img/iconSystem.png'),
        width: 1000,
        height: 950,
        webPreferences:{
            preload: path.join(app.getAppPath(),'/src/render/preload.js')
        }
    })
    makeAnOrderWindow.loadFile('./src/render/login/unlocked/makeAnOrder/makeAnOrder.html');
}

let updateDataWindow;
function createUpdateDataWindow(){
    updateDataWindow = new BrowserWindow({
        center:true,
        resizable:false,
        icon: path.join(app.getAppPath(),'/src/assets/img/iconSystem.png'),
        width: 1000,
        height: 950,
        webPreferences:{
            preload: path.join(app.getAppPath(),'/src/render/preload.js')
        }
    })
    updateDataWindow.loadFile('./src/render/login/unlocked/updateData/updateData.html');
}

//cargar la data al table del documento unlocked.html automaticamente
ipcMain.on('loadInfoPlease',(event,args)=>{
    let queryString = 
     `SELECT p.idProduct AS 'idp', p.name_ AS 'namep',p.description_,p.stocks,c.name_ AS 'category'
      FROM products AS p
      INNER JOIN categorys AS c ON p.idCategory=c.idCategory ORDER BY(p.idProduct)`
         connection.promise().query(queryString)
         .then((results)=>{
             let data = results[0];
                 systemUnlockedWindow.send('replyLoadInfo',data);
         }).catch((err)=>{
             console.log(err);
             systemUnlockedWindow.send('replyLoadInfo','errorGetData');
         });
});

// creacion de ventana - actualizar producto
ipcMain.on('updateData',(event,args)=>{
    createUpdateDataWindow();
         updateDataWindow.webContents.on('did-finish-load',()=>{
             systemUnlockedWindow.hide();
                 console.log(`enviando para actualizar -> ${args}`)
                 updateDataWindow.webContents.send('updateThis',args);
         });
});

//obtener categorias para setearlos en la ventana actualizacion producto
ipcMain.on('getCategorysDB',(event,args)=>{
    let queryString = 
    `SELECT * FROM stocktaking.categorys ORDER BY (idCategory)`
    connection.promise().query(queryString)
    .then((results)=>{
        let answer = results[0];
        console.log(answer);
             updateDataWindow.send('replyGetCategorysList',answer);
    }).catch((err)=>{
        console.log(err);
             updateDataWindow.send('replyGetCategorysList','errorGetData');
    });
});

//gestionar actualizacion
ipcMain.on('updateThis',(event,args)=>{
    //proceso de actualizacion
    console.log(`setting new values -> ${args}`)
        let queryString = 
        `UPDATE products SET name_=?,description_=?,stocks=?,idCategory=?
         WHERE idProduct =?`
        let filter = [args[0],args[1],args[2],args[3],args[4],args[5]];
             connection.promise().query({
                 sql:queryString,
                 timeout:500
             },filter).then(([results,fields])=>{
                 console.log(results);
                 updateDataWindow.send('replyQueryUpdate','succes');
             }).catch((err)=>{
                 console.log(err);
                 updateDataWindow.send('replyQueryUpdate','error')
             })
});

ipcMain.on('backAfterUpdateAnItem',(event,args) =>{
     updateDataWindow.close();
         systemUnlockedWindow.loadFile('./src/render/login/unlocked/unlocked.html');
             systemUnlockedWindow.show();
})

//creacion de ventana - realizar pedido producto
ipcMain.on('makeAnOrder',(event,args)=>{
    createMakeAnOrderWindow();
         makeAnOrderWindow.webContents.on('did-finish-load',()=>{
            systemUnlockedWindow.hide();
                console.log(`enviando para hacer pedido -> ${args}`)
                    makeAnOrderWindow.webContents.send('makeAnOrderOfThis',args);
         });
});

ipcMain.on('makeAnOrderOfThis',(event,args)=>{
    //proceso de actualizacion
    console.log(`updatin this -> ${args}`);
            makeAnOrderWindow.close();
                systemUnlockedWindow.show();
})

// todo acerca de -> login-register
ipcMain.on('validateData',(event, args)=>{
    let queryString = 'SELECT * FROM workers WHERE user_=?';
    let user = args[0];
    let pass = args[1];
        //variable contenedora de los valores -> '?' del queryString (en ese caso sólo user)
        let filter = [user];
            connection.promise().query({
                sql: queryString,
                timeout:1000
            },filter).then(([results,fields]) => {
                let completeName = `${results[0]['name_']} ${results[0]['firstSurname']} ${results[0]['secondSurname']}`;
                let userDB = results[0];
                        let pass_hash = userDB.pass;
                            bcrypt.compare(pass,pass_hash,function(err,same){
                                if(err){
                                    console.log(err);
                                } else if(same){ 
                                    //pasar a la siguiente ventana {restringida}
                                    let currentUser = `USUARIO ACTUAL:  ${completeName}`;
                                    console.log(currentUser);
                                        createUnlockedWindow();
                                        systemUnlockedWindow.webContents.on('did-finish-load',()=>{
                                            loginWindow.hide();
                                            systemUnlockedWindow.webContents.send('welcomeData',currentUser);
                                        });
                                }else{
                                    loginWindow.webContents.send('replyValidateData',['incorrectPassword',userDB]);
                                }
                            })
            }).catch( (err) =>  {
                loginWindow.webContents.send('replyValidateData',['not registered',user]);
            })        
});

ipcMain.on('registerData',(event,args) => {
     loginWindow.loadFile('./src/render/register/register.html');
});

ipcMain.on('changeToLogin',(event,args)=>{
    loginWindow.loadFile('./src/render/login/login.html');
})

ipcMain.on('registerWorker',(event,args)=>{
    //corroborar código de seguridad, en este caso asumo que hay otro sistema en el cual se generen dichos
    //códigos y que eventualmente solo los administradores tengan acceso a ellos para que un empleado cualquiera
    //no pueda crear varias cuentas, a menos que sea con una supervisión de un administrador.
    let queryString_ = 'SELECT count(*) FROM securitycodes WHERE securityCode =?';
        filter = [args[6]]
                connection.promise().query({
                    sql: queryString_,
                    timeout:500,
                },filter).then(([results,fields])=>{
                    let nAnswers = results[0]['count(*)'];
                    if(nAnswers == 0){
                        loginWindow.webContents.send('replyRegister','invalidSecurityCode');
                    }else{
                            let pass_ = args[1]
                            //encripto la contraseña con ayuda del método hash de brypt
                            bcrypt.hash( pass_, 10, (err, hash) =>{
                                let queryString = 'INSERT INTO workers(user_,pass,dateRegister,name_,firstSurname,secondSurname) VALUES(?,?,?,?,?,?)';
                                let filters = [args[0],hash,args[2],args[3],args[4],args[5]];
                                    let query = connection.query({
                                        sql: queryString,
                                        timeout:500,
                                    },filters)
                                        //se tiene la certeza de que el query lanzará {error} cuando el usuario ya esté registrado
                                        //debido a que dicho campo en la base de datos es de tipo {unique}
                                        query.on('error',(err) => {
                                            //console.log(err);
                                            loginWindow.webContents.send('replyRegister','alreadyExists');   
                                        })
                                            query.on('result', (row) =>{
                                                //console.log(row);
                                                loginWindow.webContents.send('replyRegister','validArguments');  
                                            })
                            });
                     }    
                }).catch((err) =>{
                    //console.log(err);
                    loginWindow.webContents.send('replyRegister','error');
                });
})


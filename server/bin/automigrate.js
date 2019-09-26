/* eslint-disable */
'use strict';

var app = require('../server');

var modelList = [
    'Client',
    'AccessToken',
    'ACL',
    'RoleMapping',
    'Role'
];
var ds = app.datasources.mysql;
/*
ds.automigrate(modelList,function(err){
    if(err){
        console.log("Failed to automigrate the tables :",err);
        return process.exit(1);
    }

    //insert default default client

    console.log("The following tables was successfully created:");
    console.log(modelList);
    process.exit(0);
})
*/
//==================== Promisify Callback =========================
function createTables(ds,tables){
    return new Promise((resolve,reject)=>{
        ds.automigrate(tables,(err)=>{
            if(err){return reject(err)}
            resolve(tables);
        })
    })
}

function insertDefaultClient(app,username,email,password){
    var Client = app.models.Client;
    return new Promise((resolve,reject)=>{
        Client.create({
            'username':username,
            'email':email,
            'password':password
        },(err,res)=>{
            if(err){return reject(err)}
            resolve(res)
        })
    })
}
//================================================================
async function migrate(){
    try{
        console.log("Creating the tables ....");

        let tables = await createTables(ds,modelList);
        console.log("Success:",tables);

        console.log("Creating user 1 ...");
        let user1 = await insertDefaultClient(app,"admin","admin@system.com","1234567");
        console.log("User 1 created:",user1);

        console.log("Creating user 2 ...");
        let user2 = await insertDefaultClient(app,"user","user@system.com","1234567");
        console.log("User 2 created:",user2);

        process.exit(0);
    }catch(err){
        console.log("Failed : ",err);
        process.exit(1);
    }
}

migrate();
/* eslint-enable */

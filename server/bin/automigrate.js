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
var roleList = [
    'admin',
    'officer',
    'user',
    'guest'
];
var ds = app.datasources.mysql;
//==================== Promisify Callback =========================
function createTables(ds,tables){
    return new Promise((resolve,reject)=>{
        ds.automigrate(tables,(err)=>{
            if(err){return reject(err)}
            resolve(tables);
        })
    })
}
function createRole(app,role){
    var Role = app.models.Role;
    return new Promise((resolve,reject)=>{
        Role.create({"name":role},(err,res)=>{
            if(err){return reject(err);}
            resolve(res);
        });
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

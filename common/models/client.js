'use strict';
/* eslint-disable */
module.exports = function(Client) {
    disableUnusedRemotes(Client);

    var app;
    Client.on('attached',a=>{
        app = a;
    });
    Client.beforeRemote("create",function(ctx,model,next){
        // 1 check role field
        // 2 check role valid
        // read registrator role
        // valid authorization
        

        console.log("before remote create (ctx.args.data)", ctx.args.data);
        var userinfo = ctx.args.data;
        if(userinfo.role){
            sanitizeRegistration(app,ctx,next);
        }else{
            next({
                "name":"Bad Request",
                "status":"404",
                "message":"Please provide the user role information"
            });
        }
    });
    Client.afterRemote("create", function(ctx,model,next){
        console.log("after remote create :",model);
        ctx.args.data.role.principals.create({principalType:"User",principalId:model.id},next);
    });
};

function disableUnusedRemotes(Client){
    //Client.disableRemoteMethodByName('create');
    Client.disableRemoteMethodByName('replaceOrCreate');
    Client.disableRemoteMethodByName('replaceById');
    Client.disableRemoteMethodByName('prototype.verify');
    Client.disableRemoteMethodByName('changePassword');
    //Client.disableRemoteMethodByName('login');
    //Client.disableRemoteMethodByName('logout');
    Client.disableRemoteMethodByName('setPassword');
    Client.disableRemoteMethodByName('upsert');
    Client.disableRemoteMethodByName('upsertWithWhere');
    //Client.disableRemoteMethodByName('createChangeStream');
    Client.disableRemoteMethodByName('updateAll');
    Client.disableRemoteMethodByName('prototype.updateAttributes');

    Client.disableRemoteMethodByName('find');
    Client.disableRemoteMethodByName('findById');
    Client.disableRemoteMethodByName('findOne');

    Client.disableRemoteMethodByName('deleteById');

    Client.disableRemoteMethodByName('confirm');
    Client.disableRemoteMethodByName('count');
    Client.disableRemoteMethodByName('exists');
    Client.disableRemoteMethodByName('resetPassword');

    Client.disableRemoteMethodByName('prototype.__count__accessTokens');
    Client.disableRemoteMethodByName('prototype.__create__accessTokens');
    Client.disableRemoteMethodByName('prototype.__delete__accessTokens');
    Client.disableRemoteMethodByName('prototype.__destroyById__accessTokens');
    Client.disableRemoteMethodByName('prototype.__findById__accessTokens');
    Client.disableRemoteMethodByName('prototype.__get__accessTokens');
    Client.disableRemoteMethodByName('prototype.__updateById__accessTokens');
}
//========================================================================
async function sanitizeRegistration(app,ctx,next){
    var appliedRole = ctx.args.data.role;
    try{
        var role = await _findOne(app.models.Role,{where:{name:appliedRole}});
        console.log("Role found :",role);
        if(role){
            ctx.args.data.role = role;
            next();
        }else{
            next({
                "name":"Role not found",
                "status":404,
                "message":"The requested role do not exist"
            });
        }
    }catch(err){
        next(err);
    }
}

//================ Promises ==============================================
function _findOne(model,filter){
    return new Promise((resolve,reject)=>{
        model.findOne(filter,(err,res)=>{
            if(err){return reject(err)}
            resolve(res);
        })
    })
}
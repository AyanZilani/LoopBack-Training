'use strict';
/* eslint-disable */
module.exports = function(Client) {
    disableUnusedRemotes(Client);
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
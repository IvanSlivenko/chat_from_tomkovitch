const { trimStr } = require('./utils')
let users = [];

const findUser = (user) => {
    console.log(users, 'users');
    

    const userName = trimStr(user.name);
    const userLastName = trimStr(user.lastname);
    const userRoom = trimStr(user.room);
    
    

    return users.find(
        (u)=> trimStr(u.name) === userName && trimStr(u.lastname) === userLastName && trimStr(u.room) === userRoom );
     
}



const addUser = (user) => {


    const isExist = findUser(user);

    
    

    !isExist && users.push(user);

    const currentUser = isExist || user;

    return { isExist: !!isExist, user: currentUser }

};

const getRoomUsers = (room) => users.filter((u) => u.room === room )

const removeUser = (user) =>{ 
    const found = findUser(user);

    if(found){
        users = users.filter(({ room, name, lastname }) => room === found.room && name !== found.name && lastname !== found.lastname )

    };
    return found;
};



module.exports = { addUser, findUser, getRoomUsers, removeUser}




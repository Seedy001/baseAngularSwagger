const User = require("./../db/users")

async function addUser(userModel) {
    
    let user = new User({
        ...userModel
    });
    await user.save();
    return user.toObject();
}
async function getUsers() {
    const users = await User.find();
    return users.map(user => user.toObject()); // Appel de la méthode toObject() correctement
}

async function getUserById(id) {
    const user = await User.findById(id);
    return user.toObject();
}

async function updateUser(id,userModel) {
    const filter = {_id:id};
    await User.findOneAndUpdate(filter,userModel);
}

async function deleteUser(id) {
  await User.findByIdAndDelete(id);
}

module.exports={addUser,getUsers,getUserById,updateUser,deleteUser};
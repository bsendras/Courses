var mongoose = require('mongoose');
var userSchema =require('./user');

var User = mongoose.model('User', userSchema);

var u = new User({
  profile: {username: 'vkarpov15'}
});

modifyUserProfile(u, {
  picture: 'http://pbs.twimg.com/profile_images/550304223036854272/Wwmwuh2t.png'
});

// modify user data **Only** modify
// user.profile, not user.data
function modifyUserProfile(user, profile, callback) {
  user.profile = profile;
  user.save(function (error, user) {
    // Handle result
  });
}

// con esta funcion modifyUserProfile no hay forma de que el usuario modifique el campo Oauth o el carrito
// sin embargo si fuesemos a agregar campos al subdocumento profile, por ejemplo el puesto de trabajo, esta funcion deberia tener que cambiar.
// PROBAR!!!!
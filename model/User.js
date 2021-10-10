const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an Email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter an valid email']
    },  
    password: {
        type: String,
        required: [true, 'Please enter an password'],
        minlength: [6, 'Minimum password is 6 character']
    }
});

// hash password before save in server
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// static function login
userSchema.statics.login = async function(email, password) {
    const user = this.findOne({email});
    if(user){
        const auth = bcrypt.compare(password, user.password);
        if(auth){
            return user;
        } 
        throw Error('Incorrect password');
    }
    throw Error('Incorrect Email');
}



const User = mongoose.model('user', userSchema);

module.exports = User;
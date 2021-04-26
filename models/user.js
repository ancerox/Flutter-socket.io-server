const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    name: {
        type: String,
        require: true
    },

    email: {
        type: String,
        require: true,
        unique: true
    },

    pass: {
        type: String,
        require: true
    },

    online: {
        type: Boolean,
        default: false
    },

});


UserSchema.method('toJSON', function( ){

    const { __v, _id, pass, ...object } = this.toObject();

    object.uid = this._id;
    return object;

});


module.exports = model('Usuario', UserSchema);
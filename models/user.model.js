const { Schema, model } = require('mongoose');

const userSchema = Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    img: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    google: {
        type: Boolean,
        default: false
    },
    role: {
        type: Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    plan: {
        type: Schema.Types.ObjectId,
        ref: 'Plan',
        required: true
    }
});

// custom methods

// method to remove __v and password from the user obj after save it
userSchema.methods.toJSON = function () {
    const { _id, __v, password, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

// model('name-for-collection' , schema-to-export )
module.exports = model('User', userSchema);
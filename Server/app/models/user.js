import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        default: null,
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });


userSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

userSchema.virtual("profile").get(function () {
    return {
        id: this._id,
        email: this.email,
    };
});

userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user.password;
    delete user.refreshToken;
    delete user.__v;
    return user;
};

const User = mongoose.model("User", userSchema);
export default User;
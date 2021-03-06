import bcryptjs from 'bcryptjs'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId, ref: "Post"
    }],
    hashedPassword: {
        type: String,
        required: true,
    },
    profilePicture: {
        url: { type: String, default: 'https://res.cloudinary.com/jethrosama/image/upload/v1651059504/newposthub/profile_pictures/images_ufarco.png' },
        publicId: { type: String, default: 'default-profile-picture' },
        height: { type: Number, default: 200 },
        width: { type: Number, default: 200 },
    },
    role: {
        type: String,
        default: "user",
    },

},
    { timestamps: true })

userSchema
    .virtual('password')
    .set(function(password) {
        // generates the hashed password
        this.hashedPassword = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10))
    }).get()
// adds a method to userschema to validate password
// so can use User.validpassword() method 
userSchema.methods.validPassword = function(password) {
    return bcryptjs.compareSync(password, this.hashedPassword)
}

export default mongoose.models.User || mongoose.model('User', userSchema)

import mongoose,{Schema} from "mongoose"
import pkg from "jsonwebtoken";
const { sign, verify } = pkg;  // destructure what you need

import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username:
        {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
            lowercase: true

        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            //match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
            
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index:true
        },
        avatar:
        {
            type: String,
            required:true
        },
        coverImage:
        {
            type:String

        },
        watchHistory:
        {
            type: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Video"
                }
            ],
            default: []
        },
        password:
        {
            type: String,
            required: [true,'password is required'],
            select: false,
            minlength: 8
        },
        refreshtoken:
        {
            type:String
        }



    },
    {
        timestamps:true
    }
)

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

userSchema.methods.isPasswordCorrect= async function (password)
{
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken= function()
{
   return jwt.sign(
        {
            _id : this._id,
            username: this.username,
            fullname: this.fullname,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken=function()
{
    return jwt.sign(
        {
            _id : this._id
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


export const user = mongoose.model("User", userSchema)
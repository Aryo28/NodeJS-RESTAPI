import {Schema, model, Document} from 'mongoose';
import Joi, {ObjectSchema, ValidationOptions} from 'joi'
import bcrypt from 'bcrypt';


export interface IUserData{
    userId:string,
    username:string
}


export interface IUser extends Document{
    username:string,
    password:string
    comparePassword:(password:string) => Promise<Boolean>
}


const userSchema:Schema = new Schema({
    username:{
        type: String,
        required: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true
    }
},{
    timestamps:true
})


userSchema.pre<IUser>('save', async function (next) {
    const user = this;

    if(!user.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next();
});


const optionsJoi:ValidationOptions ={
    stripUnknown: true
}

userSchema.methods.comparePassword = async function(password: string):Promise<Boolean>{
   return await bcrypt.compare(password, this.password)
}

export const UserSchema: ObjectSchema = Joi.object({
    userId: Joi.string().optional(),
    username: Joi.string().required(),
    password: Joi.string().optional(),
}).options(optionsJoi);

export default model('User', userSchema);

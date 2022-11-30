import {Request, ResponseObject, ResponseToolkit} from '@hapi/hapi';
import User from '../../models/users/users'
import { logger } from '../../utils/logger';
import {IUserData} from '../../models/users/users'


export async function createUsers(r:Request, h: ResponseToolkit): Promise<ResponseObject>{
    try {
        const user = new User(r.payload);
        const newUser = await user.save();
        return h.response(newUser);
    } catch (error) {
        logger.error(error);
        return null;
    }
}

export async function getUsers(r:Request, h: ResponseToolkit): Promise<ResponseObject>{
    try {
        const existingUsers = await User.find();
        return h.response(existingUsers);
    } catch (error) {
        logger.error(error);
        return null;
    }
}

export async function getUserById(r:Request, h: ResponseToolkit): Promise<ResponseObject>{
    try {
        const userById = await User.findById(r.params.userId);
        return h.response(userById);
    } catch (error) {
        logger.error(error);
        return null;
    }
}

export async function updateUserById(r:Request, h: ResponseToolkit): Promise<ResponseObject>{
    try {
        const data:IUserData = r.payload as IUserData;
        if(data){
            const userId: string = data.userId;
            const newUsername:string= data.username
            const userUpdated = await User.findByIdAndUpdate(userId, {username:newUsername}, {new:true});
            const userModified = userUpdated ? h.response(userUpdated) : null;
            return userModified;
        }
    } catch (error) {
        logger.error(error);
        return null;
    }
}

export async function deleteUserById(r:Request, h: ResponseToolkit): Promise<ResponseObject>{
    try {
        const userDeleted = await User.findByIdAndDelete(r.params.userId);
        if(userDeleted){
            return h.response(userDeleted);
        }else{
            throw('No user found with id ' + r.params.userId);
        }
    } catch (error) {
        logger.error(error);
        return null;
    }
}


import { defaultCallback } from './controllers.utils';
import { User } from './../models/user.model';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import {databaseSecret} from '../../environment';

const generateAuthToken= async (user: any) => {
    // Generate an auth token for the user
    const token = jwt.sign({ _id: user._id }, databaseSecret);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};

const findByCredentials = async (username: string, password: string) => {
    // Search for a user by email and password.
    const user = await User.findOne({ username });
    if (!user) {
        throw new Error('Invalid login credentials' );
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        throw new Error('Invalid login credentials' );
    }
    return user;
};

const findByUsername = async (username: string) => {
    // Search for a user by email and password.
    const user = await User.findOne({ username });
    if (!user) {
        return null;
    }
    return user;
};

export const registerUser = async (req: any, res: any) => {
    try{
        const data = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password
        };

        const isValid = await findByUsername(data.username);

        if(isValid != null ){
            return res.status(403).send('Username already Exists');
        }
        if(data.password.length < 6) {
            res.status(400).send('AUTH_PASS_LENGTH');
        } else {
            data.password = await bcrypt.hash(data.password, 8);
            const user = new User(data);
            const token = await generateAuthToken(user);
            user.save()
            res.status(201).send({user, token});
        }
    } catch (error) {
        if(error.code == 11000) {
            res.status(400).send('AUTH_USERNAME');
        } else {
            res.status(400).send('OTHER_ERROR');
        }
    }
};

export const getLoggedInUser = async (req: any, res: any) => {
    try{
        res.send(req.user);
    } catch (error) {
        console.log('Error getting logout post');
        res.status(500).send(error);
    }
};

export const loginUser = async (req: any, res: any) => {
    // Login a registered user
    try {
        const {username, password} = req.body;
        const user = await findByCredentials(username, password);
        if (!user) {
        return res.status(400).send('AUTH_FAIL');
        }
        const token = await generateAuthToken(user);
        console.log("Login Worked");
        res.send({user, token});
    } catch (error) {
        res.status(400).send('AUTH_FAIL');
    }
};

export const logoutUser = async (req: any, res: any) => {
    // Logout from ONE device. Just current device.
    try {
        console.log("Inside logoutUser");
        req.user.tokens = req.user.tokens.filter((token: any) => {
        return token.token !== req.token;
        });
        await req.user.save();
        console.log("Logout Worked");
        res.send({success: true});
    } catch (error) {
        res.status(500).send(error);
    }
};

export const logoutAllUser = async (req: any, res: any) => {
    try {
        console.log("Inside logoutAllUser");
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        console.log("logoutAllUser Worked");
        res.send({success: true});
    } catch (error) {
        res.status(500).send(error);
    }
};

export const updateUser = async (req: any, res: any) => {
    const newData = {} as User;

    if (req.body.password) {
        newData['password'] = req.body.password;
        if (newData['password'].length < 6) {
        return res.status(400).send('AUTH_PASS_LENGTH');
        } else {
        newData['password'] = await bcrypt.hash(newData['password'], 8);
        }
    }
    if (req.body.firstName) {
        newData['firstName'] = req.body.firstName;
    }
    if (req.body.lastName) {
        newData['lastName'] = req.body.lastName;
    }
    User.findByIdAndUpdate(req.user._id, {
        $set: newData
        }, (error: any, data: any) => {
        if (error) {
            res.status(500).send('UPDATE_FAIL');
        } else {
            res.send(data);
        }
        }
    );
};

export const getAllUsers = (req: any, res: any) => {
    User.find({}, (err, data) => {
        if(err) {
            res.send(err);
        }
        res.json(data);
    });
};
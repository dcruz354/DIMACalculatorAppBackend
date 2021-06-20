 
import * as express from 'express';
import { auth } from '../middleware/auth.middleware';
import { 
    registerUser, 
    loginUser, 
    getLoggedInUser, 
    logoutAllUser, 
    logoutUser, 
    updateUser,
    getAllUsers } from '../controllers/user.controller';

export const userRoutes = express.Router();

// Register User
userRoutes.post('/register', registerUser);

// Get logged in user information
userRoutes.get('/me', auth, getLoggedInUser);
//userRoutes.get('/me', getLoggedInUser);

// Get all users
userRoutes.get('/getAllUsers', getAllUsers);

// Update User. Slightly adapted to only work with password and isAuthor field.
userRoutes.put('/me/update', auth, updateUser);

// No Delete User function at this time.

// Login User
userRoutes.post('/login', loginUser);

// User logs out from CURRENT device
userRoutes.post('/logout', auth, logoutUser);

// User logs out from ALL devices
userRoutes.post('/logoutAll', auth, logoutAllUser);


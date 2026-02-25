import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import { AppError } from '../utils/errorHandler.util';

export const signInUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) throw new AppError(404, 'Email not found');

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) throw new AppError(401, 'Invalid password');

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || '', {
      expiresIn: '1d',
    });

    res.status(200).json({ status: true, message: 'Login successful', token, data: user });
  } catch (error) {
    next(error);
  }
};

export const initiateAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) throw new AppError(400, 'Name, email, and password are required');

    const count = await User.countDocuments();

    if (count > 0)
      throw new AppError(
        400,
        'We can only have 1 admin user. If you want to create new admin user. Please delete the existing admin user in database.'
      );

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ status: 'Success', message: 'Admin user created successfully', data: user });
  } catch (error) {
    next(error);
  }
};

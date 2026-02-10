import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ status: false, message: 'Email not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(401).json({ status: false, message: 'Invalid password' });

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || '', {
      expiresIn: '1d',
    });

    res.status(200).json({ status: true, message: 'Login successful', token, data: user });
  } catch (error) {
    console.error('Signin Error', error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};

export const initiateAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      res.status(400).json({ status: false, message: 'Name, email, and password are required' });

    const count = await User.countDocuments();

    if (count > 0) {
      return res.status(400).json({
        status: false,
        message:
          'We can only have 1 admin user. If you want to create new admin user. Please delete the existing admin user in database.',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ success: true, message: 'Admin user created successfully', data: user });
  } catch (error) {
    console.error('Initiate Admin Error', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

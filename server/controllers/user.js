/* eslint-disable no-use-before-define */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import UserModel from '../models/user';

const User = {
  signUp(req, res) {
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(401).json({ error: error.details[0].message });
    }
    const emailExist = UserModel.findOne(req.body.email);
    if (emailExist) {
      return res.status(401).json({
        error: 'Email already exist!',
      });
    }
    const user = UserModel.signUp(req.body);
    return res.status(201).send(user);
  },

  signIn(req, res) {
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(401).json({ error: error.details[0].message });
    }
    const user = UserModel.findOne(req.body.email);
    if (!user) {
      return res.status(401).json({
        error: 'User not found!',
      });
    }
    const valid = bcrypt.compareSync(req.body.password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Incorrect password!' });
    }
    const token = jwt.sign({ userId: user.id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
    return res.status(200).json({
      userId: user.id,
      token,
    });
  },
};


function validateUser(user) {
  const schema = {
    first_name: Joi.string().min(2).max(30).required(),
    last_name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().min(2).max(30)
      .required(),
    password: Joi.string().min(6).max(15).required(),
    phone: Joi.string().min(10).max(12),
    address: Joi.string().min(2).max(30),
  };
  return Joi.validate(user, schema);
}

function validateLogin(user) {
  const schema = {
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(15).required(),
  };
  return Joi.validate(user, schema);
}


export default User;

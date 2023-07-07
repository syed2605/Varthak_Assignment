import { UserModel } from '../models/user.model';
import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";


dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
console.log(JWT_SECRET_KEY,"keeeeeeeeeeeeeeeeeeeeeeeeeeeyyyyyyyyyyyyyyyyy");


async function register(name: string, email: string, password: string, role:[string]) {
  console.log(email);
  let existing = await UserModel.findOne({
    email,
  });
  console.log(existing, "xx");
  if (existing) {
    throw new Error("User already exists with this email");
  }
  try{
    let user = await UserModel.create({
        name,
        email,
        password,
        role
      });
      console.log(user, "controller user");
      user = user.toJSON();
      delete user.password;
      console.log(user, "controller user 2");
      return user;
  }catch(err){
    throw new Error(err.message);
  }
}

async function login(email: string, password: string) {
  let user = await UserModel.findOne({
    email,
  });
  if (!user) {
    throw new Error('User does not exist with the given email');
  }
  if (password !== user.password) {
    throw new Error('Password is incorrect');
  }
  user = user.toJSON();
  delete user.password;
  const token = jwt.sign(user, JWT_SECRET_KEY);
  console.log(token);
  return { token, user };
}

async function loggedUserAuth(token: string) {
  let user = jwt.verify(token, JWT_SECRET_KEY);
  return user;
}

export {
  register,
  login,
  loggedUserAuth
};

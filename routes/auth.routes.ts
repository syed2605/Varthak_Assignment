import express, { Request, Response } from 'express';
import {
  register,
  login
} from '../controllers/auth.controller';


const authRouter = express.Router();

authRouter.post('/register', async (req: Request, res: Response) => {
  try {
    const {name,email,password,role}= req.body;

    const user = await register(name, email, password, role);

    return res.send({
      data: user,
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      error: err.message || 'Something went wrong',
    });
  }
});

authRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const {email,password} = req.body;
    const { user, token } = await login(email, password);
    return res.send({
      data: {
        token,
        user,
      },
    });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({
      error: err.message || 'Something went wrong',
    });
  }
});


export default authRouter;

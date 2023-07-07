import { Request, Response, NextFunction } from 'express';
import { loggedUserAuth } from '../controllers/auth.controller';

async function auth( req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const headers = req.headers;
    const authHeader = headers.authorization;
    console.log(authHeader,"authhhhhhhhHaederrr");
    if (authHeader) {
      const [prefix, token] = authHeader.split(" ");
      if (prefix === "Bearer" && token) {
        try {
          const user = await loggedUserAuth(token);
          req.body.user = user;
          next();
        }catch (err) {
          return res.status(400).send({
            error: "Bad token",
          });
        }
      } else {
        return res.status(400).send({
          error: "Unidentified token provided",
        });
      }
    } else {
      return res.status(400).send({
        error: "Token not present",
      });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
}

export default auth;

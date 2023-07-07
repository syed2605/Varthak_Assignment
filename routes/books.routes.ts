import express, { Request, Response } from 'express';
import auth from '../middlewares/auth.middleware';
import { BookModel } from '../models/book.model';
const bookRouter = express.Router();

bookRouter.post('/books',auth,async (req: Request, res: Response) => {
      try {
        console.log(req.body,"reqqqqqqqqboooooooodyyyyyyyyyyy");
        const { title, author, user } = req.body;
        console.log(user,"userrrrrrrrrrrrrrr");
        const roles =user.role;
        const checkrole=["CREATOR"]
        if (!roles || !checkrole.some((role) => roles.includes(role))) {
            return res.status(400).json({ message: 'Unauthorized' });
        }
        else{
            console.log(user._id, "userIDDDDDDDDDDDDDDDDDD");
            const book = new BookModel({ title, author, user_id:user._id });
            await book.save();
            res.status(200).json(book);
        }
      } catch (error) {
        console.error('Error creating book', error);
        res.status(500).json({ error: error.message || 'Server error'});
      }
    }
  );
bookRouter.get('/books', auth, async (req: Request, res: Response) => {
    try {
      const user = req.body.user;
      const { old } = req.query;
      const createdAtFilter = old==='1' ? { $lte: new Date(Date.now() - 600000) } : req.query.new==='1' ? { $gt: new Date(Date.now() - 600000) } : {};    
      const checkrole=["VIEWER","VIEW_ALL"];
      const roles =user.role;
        if (!roles || !checkrole.some((role) => roles.includes(role))) {
            return res.status(400).json({ message: 'Unauthorized' });
        }else{
            const checkrole1=["VIEW_ALL"];
            if (!(Object.keys(createdAtFilter).length===0)){
                if (!roles ||!checkrole.some((role) => roles.includes(role))) {
                    const books = await BookModel.find({ createdAt: createdAtFilter, user_id:user._id });
                    return res.status(200).json(books);
                }else{
                    const books = await BookModel.find({ createdAt: createdAtFilter });
                    return res.status(200).json(books);
                }
            }else{
                const books = await BookModel.find();
                return res.status(200).json(books);
            }    
            
        }
            
      
      
    } catch (err) {
      console.error(err.message);
      return res.status(500).send({
        error: 'Something went wrong',
      });
    }
});

export default bookRouter;
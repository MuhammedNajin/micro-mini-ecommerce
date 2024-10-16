import express, { Request, Response} from 'express'
import { User } from '../models/user.model';

const router = express();


router.get('/api/v1/user/profile',
  async (req: Request, res: Response) => {
        console.log('req', req.query);
        
        const { id } = req.query;

       const user = await User.findById(id);
      
       if(!user) {
          throw new Error();
       }
       res.status(200).json({ user });
    }
)

export { router as getUserProfile }
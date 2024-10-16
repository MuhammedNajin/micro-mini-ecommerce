import express, { Request, Response} from 'express'
import RegisterService from '../service/register';
import {  token as Token } from '../service/token';
import { UserRegisteredPublisher } from '../event/publishers/user-resgistered-publishers';
import { kafkaWrapper } from '../kafka-wrapper';
import { User } from '../models/auth.model';
import Password from '../service/password';

const register = new RegisterService();
const router = express.Router();


router.post('/api/v1/auth/login',
  async (req: Request, res: Response) => {
        console.log('req', req.body);
        const { email, password } = req.body;

       const user = await User.findOne({ email: email });
       
       if(!user) {
          throw new Error();
       }

       const compare = Password.compare(user?.password as string, password);

       if(!compare) {
        throw new Error();
       }

        const token = await Token.generate(user);

       res.status(200).json({ user, token });
    }
)

export { router as login}
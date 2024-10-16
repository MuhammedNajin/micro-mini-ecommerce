import express, { Request, Response} from 'express'
import RegisterService from '../service/register';
import {  token as Token } from '../service/token';
import { UserRegisteredPublisher } from '../event/publishers/user-resgistered-publishers';
import { kafkaWrapper } from '../kafka-wrapper';

const register = new RegisterService();
const router = express.Router();


router.post('/api/v1/auth/signup',
  async (req: Request, res: Response) => {
        console.log('req', req.body);
        const { name, email, password} = req.body;
       const user = await register.signup(name, email, password);
       console.log('user', user);
       const token = await Token.generate(user)
                  
       const userRegisteredPublisher = new UserRegisteredPublisher(kafkaWrapper.producer);
       await userRegisteredPublisher.publish({
         userId: user._id as string,
         email: user.email,
         name: user.name,
       });

       res.status(201).json({ user, token });
    }
)

export { router as signup}
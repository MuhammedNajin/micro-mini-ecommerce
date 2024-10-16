

import express, { Request, Response} from 'express'
import { User } from '../models/user.model';
import { ProfileUpdatedPublisher } from '../events/publishers/profile-updated-event';
import { kafkaWrapper } from '../kafka-wrapper';



const router = express.Router();


router.post('/api/v1/user/profile/:id',
  async (req: Request, res: Response) => {
        console.log('req', req.body);
        const { id } = req.params;
        const { image, address } = req.body;

        const user = await User.findByIdAndUpdate(id, req.body,  {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });


        if(user) {
            

           await user.save();
            
           await new ProfileUpdatedPublisher(kafkaWrapper.producer).publish({
             userId: user._id as string,
             address: user.address,
             image: user.image,
           }) 

           res.status(201).json({ user });
        } else {
            throw new Error();
        }

       
    }
)

export { router as login}
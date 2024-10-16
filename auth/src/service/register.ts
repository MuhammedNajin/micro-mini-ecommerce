import { User as UserModel } from "../models/auth.model";

export default class RegisterService {
      
    constructor(){}

    public async signup(username: string, email: string, password: string) {
         
        const user = await new UserModel({
            name: username,
            email: email,
            password: password,
        })

         await user.save();
         return user;
    }
}

import jwt from 'jsonwebtoken'

class Token {
    constructor() {}

  public async generate(user: any) {
        return jwt.sign({ user }, 'najinjif', { expiresIn: '1h' });
    }
}

export const token = new Token();
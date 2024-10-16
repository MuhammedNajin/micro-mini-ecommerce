import bcrypt from 'bcryptjs';

class Password {
    constructor() {}

    // Hash the password
    public async hash(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    public async compare(oldPass: string, newPass: string): Promise<boolean> {
        return bcrypt.compare(newPass, oldPass);
    }
}

export default new Password();

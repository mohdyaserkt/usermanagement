
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
export enum Genders {
    NOT_SPECIFIED = 0,
    FEMALE = 1,
    MALE = 2
}

export class User {
    id?: string;
    name: string | null;
    password:  string | null;
    emailId:  string | null;
    gender: Genders;

    constructor({ id, name = null, emailId = null, gender = Genders.NOT_SPECIFIED, password = null }: { id?: string, name?: string | null, emailId?: string | null, gender?: Genders, password?:string | null }) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.emailId = emailId;
        this.gender = gender;
       
    }
}

export const userConstants = {
    genders: Genders
};




export const comparePasswords = async (password: string, hashedPassword: string): Promise<boolean|object> => {
    try {
        const isMatch: boolean = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        return error as object;
    }
};


interface JwtPayload {
    _id: string;
    name: string;
    password: string;
    emailId: string;
    count: number;
    gender: string;
    lastLoginDate: string; 
    __v: 0;
}

export const generateToken = (payload: JwtPayload): string => {
    console.log(typeof(payload),"iam slll");
    
    return jwt.sign(payload , process.env.SECRET_KEY as string, { expiresIn: '1h' });
};
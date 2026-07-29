import jwt from 'jsonwebtoken';
import config from '../app/config';

export const userIdFromJwt = (token: string): string => {

    const payload = jwt.verify(token, config.jwtAccessSecret) as { sub: string };
    if (!payload.sub) {
        throw new Error('JWT payload missing sub');
    }

    return payload.sub;
};


export default userIdFromJwt();

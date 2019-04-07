import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

const client = jwksClient({
  jwksUri: 'https://zhammer.auth0.com/.well-known/jwks.json'
});

function getKey(header: any, cb: any) {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.publicKey || key.rsaPublicKey;
    cb(null, signingKey);
  });
}

const jwtOptions = {
  audience: 'https://zhammer.auth0.com/api/v2/',
  issuer: 'https://zhammer.auth0.com/',
  algorithms: ['RS256']
};

export async function parseJWT(authorization: string): Promise<{ sub: string }> {
  return await new Promise((resolve, reject) => {
    jwt.verify(authorization!, getKey, jwtOptions, (err, decoded) => {
      if (err) {
        return reject(err);
      }
      resolve(decoded as { sub: string });
    });
  });
}

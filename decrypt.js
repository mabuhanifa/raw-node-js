const jwt = require("jsonwebtoken");

const { privateKey, publicKey } = require("./index");
const { privateDecrypt, publicEncrypt } = require("crypto");
const { log } = console;

const passphrase = "yourPrivateKeyPassphraseHere";

const message = "hello from the other side";

const encryptedData = publicEncrypt(publicKey, Buffer.from(message));

const decryptedData = privateDecrypt(privateKey, encryptedData);

const signJWT = (payload, privateKey, options) => {
  return jwt.sign(payload, privateKey, { algorithm: "RS256", ...options });
};

const verifyJWT = (token, publicKey, options) => {
  return jwt.verify(token, publicKey, { algorithm: "RS256", ...options });
};

const payload = { userId: 123, username: "john.doe" };
const signingOptions = { expiresIn: "1h" };

const token = signJWT(payload, privateKey, signingOptions);
console.log("Generated JWT:", token);

const decodedPayload = verifyJWT(token, publicKey);
console.log("Decoded payload:", decodedPayload);

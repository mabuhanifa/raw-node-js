const { log } = console;
const { generateKeyPairSync } = require("crypto");

const { privateKey, publicKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
    // cipher: "aes-256-cbc",
    // passphrase: "top secret",
  },
});

module.exports = {
  privateKey,
  publicKey,
};

log(privateKey, publicKey);

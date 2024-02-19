const { privateKey, publicKey } = require("./index");
const { privateDecrypt, publicEncrypt } = require("crypto");
const { log } = console;

const message = "hello from the other side";

const encryptedData = publicEncrypt(publicKey, Buffer.from(message));

const decryptedData = privateDecrypt(privateKey, encryptedData);

log(decryptedData.toString("utf-8"));

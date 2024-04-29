// encryption.service.js

const CryptoJS = require('crypto-js');

function encrypt(data, key) {
    const encryptedText = CryptoJS.AES.encrypt(data, key).toString();
    return encryptedText;
}

function decrypt(ciphertext, key) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = { encrypt, decrypt };

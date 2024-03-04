import CryptoJS from "crypto-js";

const password = `Valantis_${new Date().toISOString().slice(0, 10).split("-").join("")}`;
export const auth = CryptoJS.MD5(password).toString();

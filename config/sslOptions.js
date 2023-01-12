import fs from "fs";

let key = fs.readFileSync("./sslCreds/localhost-key.pem");
let cert = fs.readFileSync("./sslCreds/localhost.pem");
let options = {
  key: key,
  cert: cert,
};

export { options };

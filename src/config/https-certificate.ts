import * as fs from 'fs';
import * as path from 'path';

const httpsCertificate: any = () => {
  const isProduction = process.env.PRODUCTION === 'true';
  if (!isProduction) {
    return null;
  }

  const httpsOptions = {
    key: fs.readFileSync(
      path.join('/etc/letsencrypt/live/atmosfera-soltec.com/privkey.pem'),
    ),
    cert: fs.readFileSync(
      path.join('/etc/letsencrypt/live/atmosfera-soltec.com/fullchain.pem'),
    ),
  };
  return httpsOptions;
};

export { httpsCertificate };

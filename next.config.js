// eslint-disable-next-line @typescript-eslint/no-var-requires
const withImages = require('next-images');
module.exports = {
  ...withImages(),
  env: {
    BACKEND_URL: process.env.BACKEND_URL
  }
};

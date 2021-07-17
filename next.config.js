// eslint-disable-next-line @typescript-eslint/no-var-requires
const withImages = require('next-images');
module.exports = {
  ...withImages(),
  env: {
    BACKEND_URL: 'http://localhost:3000'
  }
};

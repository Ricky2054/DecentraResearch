const { create } = require('ipfs-http-client');
const config = require('config');

const auth = 'Basic ' + Buffer.from(
  config.get('infuraProjectId') + ':' + config.get('infuraProjectSecret')
).toString('base64');

const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth
  }
});

const uploadToIPFS = async (file) => {
  try {
    const added = await client.add(file);
    return added.path;
  } catch (err) {
    console.error('Error uploading to IPFS:', err);
    throw err;
  }
};

module.exports = {
  uploadToIPFS
};
module.exports = {
  webpack: (config) => {
    // pull every 300ms
    config.watchOptions.poll = 300;
    return config;
  }
};

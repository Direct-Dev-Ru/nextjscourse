const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
      env: {
        PORT: '4000',
      },
    };
  }

  return {
    /* config options for all phases except development here */
    env: {
      PORT: '8080',
    },
  };
};

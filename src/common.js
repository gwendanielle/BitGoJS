var bitcoin = require('bitcoinjs-lib');

exports.Environments = {
  prod: {
    uri: 'https://www.bitgo.com',
    networks: {
      btc: bitcoin.networks.bitcoin
    },
    network: 'bitcoin',
    ethNetwork: 'ethereum',
    signingAddress: '1BitGo3gxRZ6mQSEH52dvCKSUgVCAH4Rja',
    serverXpub: 'xpub661MyMwAqRbcEtUgu9HF8ai4ipuVKKHBzUqks4jSFypW8dwwQL1zygLgQx99NmC7zJJznSiwKG6RQfVjAKMtCsx8VjR6kQW8x7HrkXFZdnQ'
  },
  staging: {
    uri: 'https://staging.bitgo.com',
    networks: {
      btc: bitcoin.networks.bitcoin
    },
    network: 'bitcoin',
    ethNetwork: 'ethereum',
    signingAddress: '1BitGo3gxRZ6mQSEH52dvCKSUgVCAH4Rja',
    serverXpub: 'xpub661MyMwAqRbcEtUgu9HF8ai4ipuVKKHBzUqks4jSFypW8dwwQL1zygLgQx99NmC7zJJznSiwKG6RQfVjAKMtCsx8VjR6kQW8x7HrkXFZdnQ'
  },
  test: {
    uri: 'https://test.bitgo.com',
    networks: {
      tbtc: bitcoin.networks.testnet
    },
    network: 'testnet',
    ethNetwork: 'ethereum',
    signingAddress: 'msignBdFXteehDEgB6DNm7npRt7AcEZJP3',
    serverXpub: 'xpub661MyMwAqRbcErFqVXGiUFv9YeoPbhN72UiNCUdj9nj3T6M8h7iKNmbCYpMVWVZP7LA2ma3HWcPngz1gRTm4FPdtm9mHfrNvU93MCoszsGL'
  },
  dev: {
    uri: 'https://webdev.bitgo.com',
    networks: {
      tbtc: bitcoin.networks.testnet
    },
    network: 'testnet',
    ethNetwork: 'ethereum',
    signingAddress: 'msignBdFXteehDEgB6DNm7npRt7AcEZJP3',
    serverXpub: 'xpub661MyMwAqRbcErFqVXGiUFv9YeoPbhN72UiNCUdj9nj3T6M8h7iKNmbCYpMVWVZP7LA2ma3HWcPngz1gRTm4FPdtm9mHfrNvU93MCoszsGL'
  },
  local: {
    uri: 'http://localhost:3000',
    networks: {
      tbtc: bitcoin.networks.testnet
    },
    network: 'testnet',
    ethNetwork: 'ethereum',
    signingAddress: 'msignBdFXteehDEgB6DNm7npRt7AcEZJP3',
    serverXpub: 'xpub661MyMwAqRbcErFqVXGiUFv9YeoPbhN72UiNCUdj9nj3T6M8h7iKNmbCYpMVWVZP7LA2ma3HWcPngz1gRTm4FPdtm9mHfrNvU93MCoszsGL'
  },
  custom: {
    uri: process.env.BITGO_CUSTOM_ROOT_URI,
    networks: {
      btc: bitcoin.networks.bitcoin,
      tbtc: bitcoin.networks.testnet,
    },
    network: process.env.BITGO_CUSTOM_BITCOIN_NETWORK || 'bitcoin',
    ethNetwork: process.env.BITGO_CUSTOM_ETHEREUM_NETWORK || 'ethereum',
    signingAddress: '1BitGo3gxRZ6mQSEH52dvCKSUgVCAH4Rja',
    serverXpub: 'xpub661MyMwAqRbcEtUgu9HF8ai4ipuVKKHBzUqks4jSFypW8dwwQL1zygLgQx99NmC7zJJznSiwKG6RQfVjAKMtCsx8VjR6kQW8x7HrkXFZdnQ'
  }
};

var bitcoinNetwork;
var ethereumNetwork;

exports.setNetwork = function(network) {
  if (network == 'bitcoin') {
    bitcoinNetwork = 'bitcoin';
  } else {
    // test network
    bitcoinNetwork = 'testnet';
  }
};

exports.getNetwork = function() {
  return bitcoinNetwork;
};

exports.setEthNetwork = function(network) {
  ethereumNetwork = 'ethereum';
};

exports.getEthNetwork = function() {
  return ethereumNetwork;
};

/**
 * Helper function to validate the input parameters to an SDK method.
 * Only validates for strings - if parameter is different, check that manually
 *
 * @param params {Object} dictionary of parameter key-value pairs
 * @param expectedParams {string[]} list of expected string parameters
 * @param optionalParams {string[]} list of optional string parameters
 * @param optionalCallback {Function} if callback provided, must be a function
 * @returns {boolean} true if validated, throws with reason otherwise
 */
exports.validateParams = function(params, expectedParams, optionalParams, optionalCallback) {
  if (typeof(params) != 'object') {
    throw new Error('Must pass in parameters dictionary');
  }
  
  expectedParams = expectedParams || [];
  
  expectedParams.forEach(function(expectedParam) {
    if (!params[expectedParam]) {
      throw new Error('Missing parameter: ' + expectedParam);
    }
    if (typeof(params[expectedParam]) != 'string') {
      throw new Error('Expecting parameter string: ' + expectedParam + ' but found ' + typeof(params[expectedParam]));
    }
  });
  
  optionalParams = optionalParams || [];
  optionalParams.forEach(function(optionalParam) {
    if (params[optionalParam] && typeof(params[optionalParam]) != 'string') {
      throw new Error('Expecting parameter string: ' + optionalParam + ' but found ' + typeof(params[optionalParam]));
    }
  });
  
  if (optionalCallback && typeof(optionalCallback) != 'function') {
    throw new Error('illegal callback argument');
  }
  
  return true;
};

// This file is based on https://github.com/mzabriskie/axios/blob/master/lib/helpers/buildURL.js

const assert = require('power-assert');
const R = require('ramda');

// This is to replace the various files the original code was using.
// You can remove this if you replace the existing utils with your own.
const utils = require('./end-of-day-one-utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      }

      if (!utils.isArray(val)) {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

const testParams = {
  query: [
    { id: 1 },
    { id: 2 }
  ],
  timestamp: new Date(Date.UTC(2001, 0, 1, 0 ,0, 0))
};

describe('buildURL function', () => {
  it('uses the params to build an escaped URL', () => {
    assert.equal(
      buildURL('google.com', testParams),
      'google.com?query[]=%7B%22id%22:1%7D&query[]=%7B%22id%22:2%7D&timestamp=2001-01-01T00:00:00.000Z'
    );
  })
});

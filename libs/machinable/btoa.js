// A helper that returns Base64 characters and their indices.
var chars = {
  ascii: function () {
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  },
  indices: function () {
    if (!this.cache) {
      this.cache = {};
      var ascii = chars.ascii();

      for (var c = 0; c < ascii.length; c++) {
        var chr = ascii[c];
        this.cache[chr] = c;
      }
    }
    return this.cache;
  },
};

/**
 * Binary to ASCII (encode data to Base64)
 * @param {String} data
 * @returns {String}
 */
function btoa(data) {
  var ascii = chars.ascii(),
    len = data.length - 1,
    i = -1,
    b64 = "";

  while (i < len) {
    var code =
      (data.charCodeAt(++i) << 16) |
      (data.charCodeAt(++i) << 8) |
      data.charCodeAt(++i);
    b64 +=
      ascii[(code >>> 18) & 63] +
      ascii[(code >>> 12) & 63] +
      ascii[(code >>> 6) & 63] +
      ascii[code & 63];
  }

  var pads = data.length % 3;
  if (pads > 0) {
    b64 = b64.slice(0, pads - 3);

    while (b64.length % 4 !== 0) {
      b64 += "=";
    }
  }

  return b64;
}

export default btoa;

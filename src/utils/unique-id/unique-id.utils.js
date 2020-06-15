export const u = {
  lz: function (i, c) {
    if (
      typeof c != "number" ||
      c <= 0 ||
      (typeof i != "number" && typeof i != "string")
    ) {
      return i;
    }
    i += "";

    while (i.length < c) {
      i = "0" + i;
    }
    return i;
  },
  getHashCode: function (s) {
    var hash = 0,
      c = typeof s == "string" ? s.length : 0,
      i = 0;
    while (i < c) {
      hash = (hash << 5) - hash + s.charCodeAt(i++);
      //hash = hash & hash; // Convert to 32bit integer
    }

    return hash < 0 ? hash * -1 + 0xffffffff : hash; // convert to unsigned
  },
  uniqueId: function (s, bres) {
    if (s == undefined || typeof s != "string") {
      if (!u.___uqidc) {
        u.___uqidc = 0;
      } else {
        ++u.___uqidc;
      }
      var od = new Date(),
        i = (s = od.getTime() + "" + u.___uqidc);
    } else {
      var i = u.getHashCode(s);
    }
    return (
      (bres ? "res:" : "") +
      i.toString(32) +
      "-" +
      u.lz((s.length * 4).toString(16), 3)
    );
  },
};

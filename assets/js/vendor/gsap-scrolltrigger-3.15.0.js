// GSAP + CSSPlugin + Observer + ScrollTrigger 3.15.0.
// Código extraído do bundle capturado; apenas o invólucro expõe scripts clássicos.
// Licença e avisos: ../../licenses/GSAP-LICENSE.txt
(function () {
 'use strict';
function Pr(i) {
  if (i === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return i;
}
function dw(i, e) {
  (i.prototype = Object.create(e.prototype), i.prototype.constructor = i, i.__proto__ = e);
}
var gi = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, Mu = {
  duration: .5,
  overwrite: !1,
  delay: 0
}, v0, fn, ve, ki = 1e8, se = 1 / ki, wm = Math.PI * 2, az = wm / 4, sz = 0, pw = Math.sqrt, lz = Math.cos, oz = Math.sin, rn = function (e) {
  return typeof e == "string";
}, Me = function (e) {
  return typeof e == "function";
}, ta = function (e) {
  return typeof e == "number";
}, y0 = function (e) {
  return typeof e > "u";
}, br = function (e) {
  return typeof e == "object";
}, Qn = function (e) {
  return e !== !1;
}, _0 = function () {
  return typeof window < "u";
}, ff = function (e) {
  return Me(e) || rn(e);
}, mw = typeof ArrayBuffer == "function" && ArrayBuffer.isView || (function () {}), wn = Array.isArray, uz = /random\([^)]+\)/g, cz = /,\s*/g, L1 = /(?:-?\.?\d|\.)+/gi, gw = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, jl = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Fp = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, vw = /[+-]=-?[.\d]+/, fz = /[^,'"\[\]\s]+/gi, hz = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, Ee, fr, Tm, S0, vi = {}, If = {}, yw, _w = function (e) {
  return (If = Jl(e, vi)) && Jn;
}, b0 = function (e, r) {
  return console.warn("Invalid property", e, "set to", r, "Missing plugin? gsap.registerPlugin()");
}, zu = function (e, r) {
  return !r && console.warn(e);
}, Sw = function (e, r) {
  return e && (vi[e] = r) && If && (If[e] = r) || vi;
}, Du = function () {
  return 0;
}, dz = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, zf = {
  suppressEvents: !0,
  kill: !1
}, pz = {
  suppressEvents: !0
}, w0 = {}, qa = [], Em = {}, bw, ci = {}, Qp = {}, U1 = 30, Df = [], T0 = "", E0 = function (e) {
  var r = e[0], a, l;
  if ((br(r) || Me(r) || (e = [e]), !(a = (r._gsap || ({})).harness))) {
    for (l = Df.length; l-- && !Df[l].targetTest(r); ) ;
    a = Df[l];
  }
  for (l = e.length; l--; ) e[l] && (e[l]._gsap || (e[l]._gsap = new Pw(e[l], a))) || e.splice(l, 1);
  return e;
}, Rs = function (e) {
  return e._gsap || E0(qi(e))[0]._gsap;
}, ww = function (e, r, a) {
  return (a = e[r]) && Me(a) ? e[r]() : y0(a) && e.getAttribute && e.getAttribute(r) || a;
}, Kn = function (e, r) {
  return (e = e.split(",")).forEach(r) || e;
}, Ue = function (e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, Te = function (e) {
  return Math.round(e * 1e7) / 1e7 || 0;
}, Vl = function (e, r) {
  var a = r.charAt(0), l = parseFloat(r.substr(2));
  return (e = parseFloat(e), a === "+" ? e + l : a === "-" ? e - l : a === "*" ? e * l : e / l);
}, mz = function (e, r) {
  for (var a = r.length, l = 0; e.indexOf(r[l]) < 0 && ++l < a; ) ;
  return l < a;
}, Jf = function () {
  var e = qa.length, r = qa.slice(0), a, l;
  for ((Em = {}, qa.length = 0, a = 0); a < e; a++) (l = r[a], l && l._lazy && (l.render(l._lazy[0], l._lazy[1], !0)._lazy = 0));
}, x0 = function (e) {
  return !!(e._initted || e._startAt || e.add);
}, Tw = function (e, r, a, l) {
  (qa.length && !fn && Jf(), e.render(r, a, !!(fn && r < 0 && x0(e))), qa.length && !fn && Jf());
}, Ew = function (e) {
  var r = parseFloat(e);
  return (r || r === 0) && (e + "").match(fz).length < 2 ? r : rn(e) ? e.trim() : e;
}, xw = function (e) {
  return e;
}, yi = function (e, r) {
  for (var a in r) (a in e) || (e[a] = r[a]);
  return e;
}, gz = function (e) {
  return function (r, a) {
    for (var l in a) (l in r) || l === "duration" && e || l === "ease" || (r[l] = a[l]);
  };
}, Jl = function (e, r) {
  for (var a in r) e[a] = r[a];
  return e;
}, B1 = function i(e, r) {
  for (var a in r) a !== "__proto__" && a !== "constructor" && a !== "prototype" && (e[a] = br(r[a]) ? i(e[a] || (e[a] = {}), r[a]) : r[a]);
  return e;
}, Wf = function (e, r) {
  var a = {}, l;
  for (l in e) (l in r) || (a[l] = e[l]);
  return a;
}, uu = function (e) {
  var r = e.parent || Ee, a = e.keyframes ? gz(wn(e.keyframes)) : yi;
  if (Qn(e.inherit)) for (; r; ) (a(e, r.vars.defaults), r = r.parent || r._dp);
  return e;
}, vz = function (e, r) {
  for (var a = e.length, l = a === r.length; l && a-- && e[a] === r[a]; ) ;
  return a < 0;
}, Ow = function (e, r, a, l, u) {
  var c = e[l], f;
  if (u) for (f = r[u]; c && c[u] > f; ) c = c._prev;
  return (c ? (r._next = c._next, c._next = r) : (r._next = e[a], e[a] = r), r._next ? r._next._prev = r : e[l] = r, r._prev = c, r.parent = r._dp = e, r);
}, vh = function (e, r, a, l) {
  (a === void 0 && (a = "_first"), l === void 0 && (l = "_last"));
  var u = r._prev, c = r._next;
  (u ? u._next = c : e[a] === r && (e[a] = c), c ? c._prev = u : e[l] === r && (e[l] = u), r._next = r._prev = r.parent = null);
}, Fa = function (e, r) {
  (e.parent && (!r || e.parent.autoRemoveChildren) && e.parent.remove && e.parent.remove(e), e._act = 0);
}, Cs = function (e, r) {
  if (e && (!r || r._end > e._dur || r._start < 0)) for (var a = e; a; ) (a._dirty = 1, a = a.parent);
  return e;
}, yz = function (e) {
  for (var r = e.parent; r && r.parent; ) (r._dirty = 1, r.totalDuration(), r = r.parent);
  return e;
}, xm = function (e, r, a, l) {
  return e._startAt && (fn ? e._startAt.revert(zf) : e.vars.immediateRender && !e.vars.autoRevert || e._startAt.render(r, !0, l));
}, _z = function i(e) {
  return !e || e._ts && i(e.parent);
}, j1 = function (e) {
  return e._repeat ? Wl(e._tTime, e = e.duration() + e._rDelay) * e : 0;
}, Wl = function (e, r) {
  var a = Math.floor(e = Te(e / r));
  return e && a === e ? a - 1 : a;
}, $f = function (e, r) {
  return (e - r._start) * r._ts + (r._ts >= 0 ? 0 : r._dirty ? r.totalDuration() : r._tDur);
}, yh = function (e) {
  return e._end = Te(e._start + (e._tDur / Math.abs(e._ts || e._rts || se) || 0));
}, _h = function (e, r) {
  var a = e._dp;
  return (a && a.smoothChildTiming && e._ts && (e._start = Te(a._time - (e._ts > 0 ? r / e._ts : ((e._dirty ? e.totalDuration() : e._tDur) - r) / -e._ts)), yh(e), a._dirty || Cs(a, e)), e);
}, Aw = function (e, r) {
  var a;
  if (((r._time || !r._dur && r._initted || r._start < e._time && (r._dur || !r.add)) && (a = $f(e.rawTime(), r), (!r._dur || Gu(0, r.totalDuration(), a) - r._tTime > se) && r.render(a, !0)), Cs(e, r)._dp && e._initted && e._time >= e._dur && e._ts)) {
    if (e._dur < e.duration()) for (a = e; a._dp; ) (a.rawTime() >= 0 && a.totalTime(a._tTime), a = a._dp);
    e._zTime = -se;
  }
}, mr = function (e, r, a, l) {
  return (r.parent && Fa(r), r._start = Te((ta(a) ? a : a || e !== Ee ? Bi(e, a, r) : e._time) + r._delay), r._end = Te(r._start + (r.totalDuration() / Math.abs(r.timeScale()) || 0)), Ow(e, r, "_first", "_last", e._sort ? "_start" : 0), Om(r) || (e._recent = r), l || Aw(e, r), e._ts < 0 && _h(e, e._tTime), e);
}, Rw = function (e, r) {
  return (vi.ScrollTrigger || b0("scrollTrigger", r)) && vi.ScrollTrigger.create(r, e);
}, Cw = function (e, r, a, l, u) {
  if ((A0(e, r, u), !e._initted)) return 1;
  if (!a && e._pt && !fn && (e._dur && e.vars.lazy !== !1 || !e._dur && e.vars.lazy) && bw !== hi.frame) return (qa.push(e), e._lazy = [u, l], 1);
}, Sz = function i(e) {
  var r = e.parent;
  return r && r._ts && r._initted && !r._lock && (r.rawTime() < 0 || i(r));
}, Om = function (e) {
  var r = e.data;
  return r === "isFromStart" || r === "isStart";
}, bz = function (e, r, a, l) {
  var u = e.ratio, c = r < 0 || !r && (!e._start && Sz(e) && !(!e._initted && Om(e)) || (e._ts < 0 || e._dp._ts < 0) && !Om(e)) ? 0 : 1, f = e._rDelay, p = 0, m, g, v;
  if ((f && e._repeat && (p = Gu(0, e._tDur, r), g = Wl(p, f), e._yoyo && g & 1 && (c = 1 - c), g !== Wl(e._tTime, f) && (u = 1 - c, e.vars.repeatRefresh && e._initted && e.invalidate())), c !== u || fn || l || e._zTime === se || !r && e._zTime)) {
    if (!e._initted && Cw(e, r, l, a, p)) return;
    for ((v = e._zTime, e._zTime = r || (a ? se : 0), a || (a = r && !v), e.ratio = c, e._from && (c = 1 - c), e._time = 0, e._tTime = p, m = e._pt); m; ) (m.r(c, m.d), m = m._next);
    (r < 0 && xm(e, r, a, !0), e._onUpdate && !a && pi(e, "onUpdate"), p && e._repeat && !a && e.parent && pi(e, "onRepeat"), (r >= e._tDur || r < 0) && e.ratio === c && (c && Fa(e, 1), !a && !fn && (pi(e, c ? "onComplete" : "onReverseComplete", !0), e._prom && e._prom())));
  } else e._zTime || (e._zTime = r);
}, wz = function (e, r, a) {
  var l;
  if (a > r) for (l = e._first; l && l._start <= a; ) {
    if (l.data === "isPause" && l._start > r) return l;
    l = l._next;
  } else for (l = e._last; l && l._start >= a; ) {
    if (l.data === "isPause" && l._start < r) return l;
    l = l._prev;
  }
}, $l = function (e, r, a, l) {
  var u = e._repeat, c = Te(r) || 0, f = e._tTime / e._tDur;
  return (f && !l && (e._time *= c / e._dur), e._dur = c, e._tDur = u ? u < 0 ? 1e10 : Te(c * (u + 1) + e._rDelay * u) : c, f > 0 && !l && _h(e, e._tTime = e._tDur * f), e.parent && yh(e), a || Cs(e.parent, e), e);
}, H1 = function (e) {
  return e instanceof Fn ? Cs(e) : $l(e, e._dur);
}, Tz = {
  _start: 0,
  endTime: Du,
  totalDuration: Du
}, Bi = function i(e, r, a) {
  var l = e.labels, u = e._recent || Tz, c = e.duration() >= ki ? u.endTime(!1) : e._dur, f, p, m;
  return rn(r) && (isNaN(r) || (r in l)) ? (p = r.charAt(0), m = r.substr(-1) === "%", f = r.indexOf("="), p === "<" || p === ">" ? (f >= 0 && (r = r.replace(/=/, "")), (p === "<" ? u._start : u.endTime(u._repeat >= 0)) + (parseFloat(r.substr(1)) || 0) * (m ? (f < 0 ? u : a).totalDuration() / 100 : 1)) : f < 0 ? ((r in l) || (l[r] = c), l[r]) : (p = parseFloat(r.charAt(f - 1) + r.substr(f + 1)), m && a && (p = p / 100 * (wn(a) ? a[0] : a).totalDuration()), f > 1 ? i(e, r.substr(0, f - 1), a) + p : c + p)) : r == null ? c : +r;
}, cu = function (e, r, a) {
  var l = ta(r[1]), u = (l ? 2 : 1) + (e < 2 ? 0 : 1), c = r[u], f, p;
  if ((l && (c.duration = r[1]), c.parent = a, e)) {
    for ((f = c, p = a); p && !(("immediateRender" in f)); ) (f = p.vars.defaults || ({}), p = Qn(p.vars.inherit) && p.parent);
    (c.immediateRender = Qn(f.immediateRender), e < 2 ? c.runBackwards = 1 : c.startAt = r[u - 1]);
  }
  return new Ve(r[0], c, r[u + 1]);
}, Wa = function (e, r) {
  return e || e === 0 ? r(e) : r;
}, Gu = function (e, r, a) {
  return a < e ? e : a > r ? r : a;
}, _n = function (e, r) {
  return !rn(e) || !(r = hz.exec(e)) ? "" : r[1];
}, Ez = function (e, r, a) {
  return Wa(a, function (l) {
    return Gu(e, r, l);
  });
}, Am = [].slice, Mw = function (e, r) {
  return e && br(e) && ("length" in e) && (!r && !e.length || (e.length - 1 in e) && br(e[0])) && !e.nodeType && e !== fr;
}, xz = function (e, r, a) {
  return (a === void 0 && (a = []), e.forEach(function (l) {
    var u;
    return rn(l) && !r || Mw(l, 1) ? (u = a).push.apply(u, qi(l)) : a.push(l);
  }) || a);
}, qi = function (e, r, a) {
  return ve && !r && ve.selector ? ve.selector(e) : rn(e) && !a && (Tm || !to()) ? Am.call((r || S0).querySelectorAll(e), 0) : wn(e) ? xz(e, a) : Mw(e) ? Am.call(e, 0) : e ? [e] : [];
}, Rm = function (e) {
  return (e = qi(e)[0] || zu("Invalid scope") || ({}), function (r) {
    var a = e.current || e.nativeElement || e;
    return qi(r, a.querySelectorAll ? a : a === e ? zu("Invalid scope") || S0.createElement("div") : e);
  });
}, zw = function (e) {
  return e.sort(function () {
    return .5 - Math.random();
  });
}, Dw = function (e) {
  if (Me(e)) return e;
  var r = br(e) ? e : {
    each: e
  }, a = Ms(r.ease), l = r.from || 0, u = parseFloat(r.base) || 0, c = {}, f = l > 0 && l < 1, p = isNaN(l) || f, m = r.axis, g = l, v = l;
  return (rn(l) ? g = v = ({
    center: .5,
    edges: .5,
    end: 1
  })[l] || 0 : !f && p && (g = l[0], v = l[1]), function (y, _, w) {
    var b = (w || r).length, E = c[b], x, A, R, M, B, L, O, H, P;
    if (!E) {
      if ((P = r.grid === "auto" ? 0 : (r.grid || [1, ki])[1], !P)) {
        for (O = -ki; O < (O = w[P++].getBoundingClientRect().left) && P < b; ) ;
        P < b && P--;
      }
      for ((E = c[b] = [], x = p ? Math.min(P, b) * g - .5 : l % P, A = P === ki ? 0 : p ? b * v / P - .5 : l / P | 0, O = 0, H = ki, L = 0); L < b; L++) (R = L % P - x, M = A - (L / P | 0), E[L] = B = m ? Math.abs(m === "y" ? M : R) : pw(R * R + M * M), B > O && (O = B), B < H && (H = B));
      (l === "random" && zw(E), E.max = O - H, E.min = H, E.v = b = (parseFloat(r.amount) || parseFloat(r.each) * (P > b ? b - 1 : m ? m === "y" ? b / P : P : Math.max(P, b / P)) || 0) * (l === "edges" ? -1 : 1), E.b = b < 0 ? u - b : u, E.u = _n(r.amount || r.each) || 0, a = a && b < 0 ? Hz(a) : a);
    }
    return (b = (E[y] - E.min) / E.max || 0, Te(E.b + (a ? a(b) : b) * E.v) + E.u);
  });
}, Cm = function (e) {
  var r = Math.pow(10, ((e + "").split(".")[1] || "").length);
  return function (a) {
    var l = Te(Math.round(parseFloat(a) / e) * e * r);
    return (l - l % 1) / r + (ta(a) ? 0 : _n(a));
  };
}, Nw = function (e, r) {
  var a = wn(e), l, u;
  return (!a && br(e) && (l = a = e.radius || ki, e.values ? (e = qi(e.values), (u = !ta(e[0])) && (l *= l)) : e = Cm(e.increment)), Wa(r, a ? Me(e) ? function (c) {
    return (u = e(c), Math.abs(u - c) <= l ? u : c);
  } : function (c) {
    for (var f = parseFloat(u ? c.x : c), p = parseFloat(u ? c.y : 0), m = ki, g = 0, v = e.length, y, _; v--; ) (u ? (y = e[v].x - f, _ = e[v].y - p, y = y * y + _ * _) : y = Math.abs(e[v] - f), y < m && (m = y, g = v));
    return (g = !l || m <= l ? e[g] : c, u || g === c || ta(c) ? g : g + _n(c));
  } : Cm(e)));
}, Lw = function (e, r, a, l) {
  return Wa(wn(e) ? !r : a === !0 ? !!(a = 0) : !l, function () {
    return wn(e) ? e[~~(Math.random() * e.length)] : (a = a || 1e-5) && (l = a < 1 ? Math.pow(10, (a + "").length - 2) : 1) && Math.floor(Math.round((e - a / 2 + Math.random() * (r - e + a * .99)) / a) * a * l) / l;
  });
}, Oz = function () {
  for (var e = arguments.length, r = new Array(e), a = 0; a < e; a++) r[a] = arguments[a];
  return function (l) {
    return r.reduce(function (u, c) {
      return c(u);
    }, l);
  };
}, Az = function (e, r) {
  return function (a) {
    return e(parseFloat(a)) + (r || _n(a));
  };
}, Rz = function (e, r, a) {
  return Bw(e, r, 0, 1, a);
}, Uw = function (e, r, a) {
  return Wa(a, function (l) {
    return e[~~r(l)];
  });
}, Cz = function i(e, r, a) {
  var l = r - e;
  return wn(e) ? Uw(e, i(0, e.length), r) : Wa(a, function (u) {
    return (l + (u - e) % l) % l + e;
  });
}, Mz = function i(e, r, a) {
  var l = r - e, u = l * 2;
  return wn(e) ? Uw(e, i(0, e.length - 1), r) : Wa(a, function (c) {
    return (c = (u + (c - e) % u) % u || 0, e + (c > l ? u - c : c));
  });
}, Nu = function (e) {
  return e.replace(uz, function (r) {
    var a = r.indexOf("[") + 1, l = r.substring(a || 7, a ? r.indexOf("]") : r.length - 1).split(cz);
    return Lw(a ? l : +l[0], a ? 0 : +l[1], +l[2] || 1e-5);
  });
}, Bw = function (e, r, a, l, u) {
  var c = r - e, f = l - a;
  return Wa(u, function (p) {
    return a + ((p - e) / c * f || 0);
  });
}, zz = function i(e, r, a, l) {
  var u = isNaN(e + r) ? 0 : function (_) {
    return (1 - _) * e + _ * r;
  };
  if (!u) {
    var c = rn(e), f = {}, p, m, g, v, y;
    if ((a === !0 && (l = 1) && (a = null), c)) (e = {
      p: e
    }, r = {
      p: r
    }); else if (wn(e) && !wn(r)) {
      for ((g = [], v = e.length, y = v - 2, m = 1); m < v; m++) g.push(i(e[m - 1], e[m]));
      (v--, u = function (w) {
        w *= v;
        var b = Math.min(y, ~~w);
        return g[b](w - b);
      }, a = r);
    } else l || (e = Jl(wn(e) ? [] : {}, e));
    if (!g) {
      for (p in r) O0.call(f, e, p, "get", r[p]);
      u = function (w) {
        return M0(w, f) || (c ? e.p : e);
      };
    }
  }
  return Wa(a, u);
}, k1 = function (e, r, a) {
  var l = e.labels, u = ki, c, f, p;
  for (c in l) (f = l[c] - r, f < 0 == !!a && f && u > (f = Math.abs(f)) && (p = c, u = f));
  return p;
}, pi = function (e, r, a) {
  var l = e.vars, u = l[r], c = ve, f = e._ctx, p, m, g;
  if (u) return (p = l[r + "Params"], m = l.callbackScope || e, a && qa.length && Jf(), f && (ve = f), g = p ? u.apply(m, p) : u.call(m), ve = c, g);
}, tu = function (e) {
  return (Fa(e), e.scrollTrigger && e.scrollTrigger.kill(!!fn), e.progress() < 1 && pi(e, "onInterrupt"), e);
}, Hl, jw = [], Hw = function (e) {
  if (e) if ((e = !e.name && e.default || e, _0() || e.headless)) {
    var r = e.name, a = Me(e), l = r && !a && e.init ? function () {
      this._props = [];
    } : e, u = {
      init: Du,
      render: M0,
      add: O0,
      kill: Kz,
      modifier: Qz,
      rawVars: 0
    }, c = {
      targetTest: 0,
      get: 0,
      getSetter: C0,
      aliases: {},
      register: 0
    };
    if ((to(), e !== l)) {
      if (ci[r]) return;
      (yi(l, yi(Wf(e, u), c)), Jl(l.prototype, Jl(u, Wf(e, c))), ci[l.prop = r] = l, e.targetTest && (Df.push(l), w0[r] = 1), r = (r === "css" ? "CSS" : r.charAt(0).toUpperCase() + r.substr(1)) + "Plugin");
    }
    (Sw(r, l), e.register && e.register(Jn, l, Zn));
  } else jw.push(e);
}, ae = 255, eu = {
  aqua: [0, ae, ae],
  lime: [0, ae, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, ae],
  navy: [0, 0, 128],
  white: [ae, ae, ae],
  olive: [128, 128, 0],
  yellow: [ae, ae, 0],
  orange: [ae, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [ae, 0, 0],
  pink: [ae, 192, 203],
  cyan: [0, ae, ae],
  transparent: [ae, ae, ae, 0]
}, Kp = function (e, r, a) {
  return (e += e < 0 ? 1 : e > 1 ? -1 : 0, (e * 6 < 1 ? r + (a - r) * e * 6 : e < .5 ? a : e * 3 < 2 ? r + (a - r) * (2 / 3 - e) * 6 : r) * ae + .5 | 0);
}, kw = function (e, r, a) {
  var l = e ? ta(e) ? [e >> 16, e >> 8 & ae, e & ae] : 0 : eu.black, u, c, f, p, m, g, v, y, _, w;
  if (!l) {
    if ((e.substr(-1) === "," && (e = e.substr(0, e.length - 1)), eu[e])) l = eu[e]; else if (e.charAt(0) === "#") {
      if ((e.length < 6 && (u = e.charAt(1), c = e.charAt(2), f = e.charAt(3), e = "#" + u + u + c + c + f + f + (e.length === 5 ? e.charAt(4) + e.charAt(4) : "")), e.length === 9)) return (l = parseInt(e.substr(1, 6), 16), [l >> 16, l >> 8 & ae, l & ae, parseInt(e.substr(7), 16) / 255]);
      (e = parseInt(e.substr(1), 16), l = [e >> 16, e >> 8 & ae, e & ae]);
    } else if (e.substr(0, 3) === "hsl") {
      if ((l = w = e.match(L1), !r)) (p = +l[0] % 360 / 360, m = +l[1] / 100, g = +l[2] / 100, c = g <= .5 ? g * (m + 1) : g + m - g * m, u = g * 2 - c, l.length > 3 && (l[3] *= 1), l[0] = Kp(p + 1 / 3, u, c), l[1] = Kp(p, u, c), l[2] = Kp(p - 1 / 3, u, c)); else if (~e.indexOf("=")) return (l = e.match(gw), a && l.length < 4 && (l[3] = 1), l);
    } else l = e.match(L1) || eu.transparent;
    l = l.map(Number);
  }
  return (r && !w && (u = l[0] / ae, c = l[1] / ae, f = l[2] / ae, v = Math.max(u, c, f), y = Math.min(u, c, f), g = (v + y) / 2, v === y ? p = m = 0 : (_ = v - y, m = g > .5 ? _ / (2 - v - y) : _ / (v + y), p = v === u ? (c - f) / _ + (c < f ? 6 : 0) : v === c ? (f - u) / _ + 2 : (u - c) / _ + 4, p *= 60), l[0] = ~~(p + .5), l[1] = ~~(m * 100 + .5), l[2] = ~~(g * 100 + .5)), a && l.length < 4 && (l[3] = 1), l);
}, qw = function (e) {
  var r = [], a = [], l = -1;
  return (e.split(Ya).forEach(function (u) {
    var c = u.match(jl) || [];
    (r.push.apply(r, c), a.push(l += c.length + 1));
  }), r.c = a, r);
}, q1 = function (e, r, a) {
  var l = "", u = (e + l).match(Ya), c = r ? "hsla(" : "rgba(", f = 0, p, m, g, v;
  if (!u) return e;
  if ((u = u.map(function (y) {
    return (y = kw(y, r, 1)) && c + (r ? y[0] + "," + y[1] + "%," + y[2] + "%," + y[3] : y.join(",")) + ")";
  }), a && (g = qw(e), p = a.c, p.join(l) !== g.c.join(l)))) for ((m = e.replace(Ya, "1").split(jl), v = m.length - 1); f < v; f++) l += m[f] + (~p.indexOf(f) ? u.shift() || c + "0,0,0,0)" : (g.length ? g : u.length ? u : a).shift());
  if (!m) for ((m = e.split(Ya), v = m.length - 1); f < v; f++) l += m[f] + u[f];
  return l + m[v];
}, Ya = (function () {
  var i = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", e;
  for (e in eu) i += "|" + e + "\\b";
  return new RegExp(i + ")", "gi");
})(), Dz = /hsl[a]?\(/, Yw = function (e) {
  var r = e.join(" "), a;
  if ((Ya.lastIndex = 0, Ya.test(r))) return (a = Dz.test(r), e[1] = q1(e[1], a), e[0] = q1(e[0], a, qw(e[1])), !0);
}, Lu, hi = (function () {
  var i = Date.now, e = 500, r = 33, a = i(), l = a, u = 1e3 / 240, c = u, f = [], p, m, g, v, y, _, w = function b(E) {
    var x = i() - l, A = E === !0, R, M, B, L;
    if (((x > e || x < 0) && (a += x - r), l += x, B = l - a, R = B - c, (R > 0 || A) && (L = ++v.frame, y = B - v.time * 1e3, v.time = B = B / 1e3, c += R + (R >= u ? 4 : u - R), M = 1), A || (p = m(b)), M)) for (_ = 0; _ < f.length; _++) f[_](B, y, L, E);
  };
  return (v = {
    time: 0,
    frame: 0,
    tick: function () {
      w(!0);
    },
    deltaRatio: function (E) {
      return y / (1e3 / (E || 60));
    },
    wake: function () {
      yw && (!Tm && _0() && (fr = Tm = window, S0 = fr.document || ({}), vi.gsap = Jn, (fr.gsapVersions || (fr.gsapVersions = [])).push(Jn.version), _w(If || fr.GreenSockGlobals || !fr.gsap && fr || ({})), jw.forEach(Hw)), g = typeof requestAnimationFrame < "u" && requestAnimationFrame, p && v.sleep(), m = g || (function (E) {
        return setTimeout(E, c - v.time * 1e3 + 1 | 0);
      }), Lu = 1, w(2));
    },
    sleep: function () {
      ((g ? cancelAnimationFrame : clearTimeout)(p), Lu = 0, m = Du);
    },
    lagSmoothing: function (E, x) {
      (e = E || 1 / 0, r = Math.min(x || 33, e));
    },
    fps: function (E) {
      (u = 1e3 / (E || 240), c = v.time * 1e3 + u);
    },
    add: function (E, x, A) {
      var R = x ? function (M, B, L, O) {
        (E(M, B, L, O), v.remove(R));
      } : E;
      return (v.remove(E), f[A ? "unshift" : "push"](R), to(), R);
    },
    remove: function (E, x) {
      ~(x = f.indexOf(E)) && f.splice(x, 1) && _ >= x && _--;
    },
    _listeners: f
  }, v);
})(), to = function () {
  return !Lu && hi.wake();
}, Gt = {}, Nz = /^[\d.\-M][\d.\-,\s]/, Lz = /["']/g, Uz = function (e) {
  for (var r = {}, a = e.substr(1, e.length - 3).split(":"), l = a[0], u = 1, c = a.length, f, p, m; u < c; u++) (p = a[u], f = u !== c - 1 ? p.lastIndexOf(",") : p.length, m = p.substr(0, f), r[l] = isNaN(m) ? m.replace(Lz, "").trim() : +m, l = p.substr(f + 1).trim());
  return r;
}, Bz = function (e) {
  var r = e.indexOf("(") + 1, a = e.indexOf(")"), l = e.indexOf("(", r);
  return e.substring(r, ~l && l < a ? e.indexOf(")", a + 1) : a);
}, jz = function (e) {
  var r = (e + "").split("("), a = Gt[r[0]];
  return a && r.length > 1 && a.config ? a.config.apply(null, ~e.indexOf("{") ? [Uz(r[1])] : Bz(e).split(",").map(Ew)) : Gt._CE && Nz.test(e) ? Gt._CE("", e) : a;
}, Hz = function (e) {
  return function (r) {
    return 1 - e(1 - r);
  };
}, Ms = function (e, r) {
  return e && (Me(e) ? e : Gt[e] || jz(e)) || r;
}, Gs = function (e, r, a, l) {
  (a === void 0 && (a = function (p) {
    return 1 - r(1 - p);
  }), l === void 0 && (l = function (p) {
    return p < .5 ? r(p * 2) / 2 : 1 - r((1 - p) * 2) / 2;
  }));
  var u = {
    easeIn: r,
    easeOut: a,
    easeInOut: l
  }, c;
  return (Kn(e, function (f) {
    (Gt[f] = vi[f] = u, Gt[c = f.toLowerCase()] = a);
    for (var p in u) Gt[c + (p === "easeIn" ? ".in" : p === "easeOut" ? ".out" : ".inOut")] = Gt[f + "." + p] = u[p];
  }), u);
}, Gw = function (e) {
  return function (r) {
    return r < .5 ? (1 - e(1 - r * 2)) / 2 : .5 + e((r - .5) * 2) / 2;
  };
}, Zp = function i(e, r, a) {
  var l = r >= 1 ? r : 1, u = (a || (e ? .3 : .45)) / (r < 1 ? r : 1), c = u / wm * (Math.asin(1 / l) || 0), f = function (g) {
    return g === 1 ? 1 : l * Math.pow(2, -10 * g) * oz((g - c) * u) + 1;
  }, p = e === "out" ? f : e === "in" ? function (m) {
    return 1 - f(1 - m);
  } : Gw(f);
  return (u = wm / u, p.config = function (m, g) {
    return i(e, m, g);
  }, p);
}, Ip = function i(e, r) {
  r === void 0 && (r = 1.70158);
  var a = function (c) {
    return c ? --c * c * ((r + 1) * c + r) + 1 : 0;
  }, l = e === "out" ? a : e === "in" ? function (u) {
    return 1 - a(1 - u);
  } : Gw(a);
  return (l.config = function (u) {
    return i(e, u);
  }, l);
};
Kn("Linear,Quad,Cubic,Quart,Quint,Strong", function (i, e) {
  var r = e < 5 ? e + 1 : e;
  Gs(i + ",Power" + (r - 1), e ? function (a) {
    return Math.pow(a, r);
  } : function (a) {
    return a;
  }, function (a) {
    return 1 - Math.pow(1 - a, r);
  }, function (a) {
    return a < .5 ? Math.pow(a * 2, r) / 2 : 1 - Math.pow((1 - a) * 2, r) / 2;
  });
});
Gt.Linear.easeNone = Gt.none = Gt.Linear.easeIn;
Gs("Elastic", Zp("in"), Zp("out"), Zp());
(function (i, e) {
  var r = 1 / e, a = 2 * r, l = 2.5 * r, u = function (f) {
    return f < r ? i * f * f : f < a ? i * Math.pow(f - 1.5 / e, 2) + .75 : f < l ? i * (f -= 2.25 / e) * f + .9375 : i * Math.pow(f - 2.625 / e, 2) + .984375;
  };
  Gs("Bounce", function (c) {
    return 1 - u(1 - c);
  }, u);
})(7.5625, 2.75);
Gs("Expo", function (i) {
  return Math.pow(2, 10 * (i - 1)) * i + i * i * i * i * i * i * (1 - i);
});
Gs("Circ", function (i) {
  return -(pw(1 - i * i) - 1);
});
Gs("Sine", function (i) {
  return i === 1 ? 1 : -lz(i * az) + 1;
});
Gs("Back", Ip("in"), Ip("out"), Ip());
Gt.SteppedEase = Gt.steps = vi.SteppedEase = {
  config: function (e, r) {
    e === void 0 && (e = 1);
    var a = 1 / e, l = e + (r ? 0 : 1), u = r ? 1 : 0, c = 1 - se;
    return function (f) {
      return ((l * Gu(0, c, f) | 0) + u) * a;
    };
  }
};
Mu.ease = Gt["quad.out"];
Kn("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function (i) {
  return T0 += i + "," + i + "Params,";
});
var Pw = function (e, r) {
  (this.id = sz++, e._gsap = this, this.target = e, this.harness = r, this.get = r ? r.get : ww, this.set = r ? r.getSetter : C0);
}, Uu = (function () {
  function i(r) {
    (this.vars = r, this._delay = +r.delay || 0, (this._repeat = r.repeat === 1 / 0 ? -2 : r.repeat || 0) && (this._rDelay = r.repeatDelay || 0, this._yoyo = !!r.yoyo || !!r.yoyoEase), this._ts = 1, $l(this, +r.duration, 1, 1), this.data = r.data, ve && (this._ctx = ve, ve.data.push(this)), Lu || hi.wake());
  }
  var e = i.prototype;
  return (e.delay = function (a) {
    return a || a === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + a - this._delay), this._delay = a, this) : this._delay;
  }, e.duration = function (a) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? a + (a + this._rDelay) * this._repeat : a) : this.totalDuration() && this._dur;
  }, e.totalDuration = function (a) {
    return arguments.length ? (this._dirty = 0, $l(this, this._repeat < 0 ? a : (a - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, e.totalTime = function (a, l) {
    if ((to(), !arguments.length)) return this._tTime;
    var u = this._dp;
    if (u && u.smoothChildTiming && this._ts) {
      for ((_h(this, a), !u._dp || u.parent || Aw(u, this)); u && u.parent; ) (u.parent._time !== u._start + (u._ts >= 0 ? u._tTime / u._ts : (u.totalDuration() - u._tTime) / -u._ts) && u.totalTime(u._tTime, !0), u = u.parent);
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && a < this._tDur || this._ts < 0 && a > 0 || !this._tDur && !a) && mr(this._dp, this, this._start - this._delay);
    }
    return ((this._tTime !== a || !this._dur && !l || this._initted && Math.abs(this._zTime) === se || !this._initted && this._dur && a || !a && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = a), Tw(this, a, l)), this);
  }, e.time = function (a, l) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), a + j1(this)) % (this._dur + this._rDelay) || (a ? this._dur : 0), l) : this._time;
  }, e.totalProgress = function (a, l) {
    return arguments.length ? this.totalTime(this.totalDuration() * a, l) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, e.progress = function (a, l) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - a : a) + j1(this), l) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, e.iteration = function (a, l) {
    var u = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (a - 1) * u, l) : this._repeat ? Wl(this._tTime, u) + 1 : 1;
  }, e.timeScale = function (a, l) {
    if (!arguments.length) return this._rts === -se ? 0 : this._rts;
    if (this._rts === a) return this;
    var u = this.parent && this._ts ? $f(this.parent._time, this) : this._tTime;
    return (this._rts = +a || 0, this._ts = this._ps || a === -se ? 0 : this._rts, this.totalTime(Gu(-Math.abs(this._delay), this.totalDuration(), u), l !== !1), yh(this), yz(this));
  }, e.paused = function (a) {
    return arguments.length ? (this._ps !== a && (this._ps = a, a ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (to(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, this.progress() === 1 && Math.abs(this._zTime) !== se && (this._tTime -= se)))), this) : this._ps;
  }, e.startTime = function (a) {
    if (arguments.length) {
      this._start = Te(a);
      var l = this.parent || this._dp;
      return (l && (l._sort || !this.parent) && mr(l, this, this._start - this._delay), this);
    }
    return this._start;
  }, e.endTime = function (a) {
    return this._start + (Qn(a) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, e.rawTime = function (a) {
    var l = this.parent || this._dp;
    return l ? a && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? $f(l.rawTime(a), this) : this._tTime : this._tTime;
  }, e.revert = function (a) {
    a === void 0 && (a = pz);
    var l = fn;
    return (fn = a, x0(this) && (this.timeline && this.timeline.revert(a), this.totalTime(-.01, a.suppressEvents)), this.data !== "nested" && a.kill !== !1 && this.kill(), fn = l, this);
  }, e.globalTime = function (a) {
    for (var l = this, u = arguments.length ? a : l.rawTime(); l; ) (u = l._start + u / (Math.abs(l._ts) || 1), l = l._dp);
    return !this.parent && this._sat ? this._sat.globalTime(a) : u;
  }, e.repeat = function (a) {
    return arguments.length ? (this._repeat = a === 1 / 0 ? -2 : a, H1(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, e.repeatDelay = function (a) {
    if (arguments.length) {
      var l = this._time;
      return (this._rDelay = a, H1(this), l ? this.time(l) : this);
    }
    return this._rDelay;
  }, e.yoyo = function (a) {
    return arguments.length ? (this._yoyo = a, this) : this._yoyo;
  }, e.seek = function (a, l) {
    return this.totalTime(Bi(this, a), Qn(l));
  }, e.restart = function (a, l) {
    return (this.play().totalTime(a ? -this._delay : 0, Qn(l)), this._dur || (this._zTime = -se), this);
  }, e.play = function (a, l) {
    return (a != null && this.seek(a, l), this.reversed(!1).paused(!1));
  }, e.reverse = function (a, l) {
    return (a != null && this.seek(a || this.totalDuration(), l), this.reversed(!0).paused(!1));
  }, e.pause = function (a, l) {
    return (a != null && this.seek(a, l), this.paused(!0));
  }, e.resume = function () {
    return this.paused(!1);
  }, e.reversed = function (a) {
    return arguments.length ? (!!a !== this.reversed() && this.timeScale(-this._rts || (a ? -se : 0)), this) : this._rts < 0;
  }, e.invalidate = function () {
    return (this._initted = this._act = 0, this._zTime = -se, this);
  }, e.isActive = function () {
    var a = this.parent || this._dp, l = this._start, u;
    return !!(!a || this._ts && this._initted && a.isActive() && (u = a.rawTime(!0)) >= l && u < this.endTime(!0) - se);
  }, e.eventCallback = function (a, l, u) {
    var c = this.vars;
    return arguments.length > 1 ? (l ? (c[a] = l, u && (c[a + "Params"] = u), a === "onUpdate" && (this._onUpdate = l)) : delete c[a], this) : c[a];
  }, e.then = function (a) {
    var l = this, u = l._prom;
    return new Promise(function (c) {
      var f = Me(a) ? a : xw, p = function () {
        var g = l.then;
        (l.then = null, u && u(), Me(f) && (f = f(l)) && (f.then || f === l) && (l.then = g), c(f), l.then = g);
      };
      l._initted && l.totalProgress() === 1 && l._ts >= 0 || !l._tTime && l._ts < 0 ? p() : l._prom = p;
    });
  }, e.kill = function () {
    tu(this);
  }, i);
})();
yi(Uu.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -se,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var Fn = (function (i) {
  dw(e, i);
  function e(a, l) {
    var u;
    return (a === void 0 && (a = {}), u = i.call(this, a) || this, u.labels = {}, u.smoothChildTiming = !!a.smoothChildTiming, u.autoRemoveChildren = !!a.autoRemoveChildren, u._sort = Qn(a.sortChildren), Ee && mr(a.parent || Ee, Pr(u), l), a.reversed && u.reverse(), a.paused && u.paused(!0), a.scrollTrigger && Rw(Pr(u), a.scrollTrigger), u);
  }
  var r = e.prototype;
  return (r.to = function (l, u, c) {
    return (cu(0, arguments, this), this);
  }, r.from = function (l, u, c) {
    return (cu(1, arguments, this), this);
  }, r.fromTo = function (l, u, c, f) {
    return (cu(2, arguments, this), this);
  }, r.set = function (l, u, c) {
    return (u.duration = 0, u.parent = this, uu(u).repeatDelay || (u.repeat = 0), u.immediateRender = !!u.immediateRender, new Ve(l, u, Bi(this, c), 1), this);
  }, r.call = function (l, u, c) {
    return mr(this, Ve.delayedCall(0, l, u), c);
  }, r.staggerTo = function (l, u, c, f, p, m, g) {
    return (c.duration = u, c.stagger = c.stagger || f, c.onComplete = m, c.onCompleteParams = g, c.parent = this, new Ve(l, c, Bi(this, p)), this);
  }, r.staggerFrom = function (l, u, c, f, p, m, g) {
    return (c.runBackwards = 1, uu(c).immediateRender = Qn(c.immediateRender), this.staggerTo(l, u, c, f, p, m, g));
  }, r.staggerFromTo = function (l, u, c, f, p, m, g, v) {
    return (f.startAt = c, uu(f).immediateRender = Qn(f.immediateRender), this.staggerTo(l, u, f, p, m, g, v));
  }, r.render = function (l, u, c) {
    var f = this._time, p = this._dirty ? this.totalDuration() : this._tDur, m = this._dur, g = l <= 0 ? 0 : Te(l), v = this._zTime < 0 != l < 0 && (this._initted || !m), y, _, w, b, E, x, A, R, M, B, L, O;
    if ((this !== Ee && g > p && l >= 0 && (g = p), g !== this._tTime || c || v)) {
      if ((f !== this._time && m && (g += this._time - f, l += this._time - f), y = g, M = this._start, R = this._ts, x = !R, v && (m || (f = this._zTime), (l || !u) && (this._zTime = l)), this._repeat)) {
        if ((L = this._yoyo, E = m + this._rDelay, this._repeat < -1 && l < 0)) return this.totalTime(E * 100 + l, u, c);
        if ((y = Te(g % E), g === p ? (b = this._repeat, y = m) : (B = Te(g / E), b = ~~B, b && b === B && (y = m, b--), y > m && (y = m)), B = Wl(this._tTime, E), !f && this._tTime && B !== b && this._tTime - B * E - this._dur <= 0 && (B = b), L && b & 1 && (y = m - y, O = 1), b !== B && !this._lock)) {
          var H = L && B & 1, P = H === (L && b & 1);
          if ((b < B && (H = !H), f = H ? 0 : g % m ? m : g, this._lock = 1, this.render(f || (O ? 0 : Te(b * E)), u, !m)._lock = 0, this._tTime = g, !u && this.parent && pi(this, "onRepeat"), this.vars.repeatRefresh && !O && (this.invalidate()._lock = 1, B = b), f && f !== this._time || x !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)) return this;
          if ((m = this._dur, p = this._tDur, P && (this._lock = 2, f = H ? m : -1e-4, this.render(f, !0), this.vars.repeatRefresh && !O && this.invalidate()), this._lock = 0, !this._ts && !x)) return this;
        }
      }
      if ((this._hasPause && !this._forcing && this._lock < 2 && (A = wz(this, Te(f), Te(y)), A && (g -= y - (y = A._start))), this._tTime = g, this._time = y, this._act = !!R, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = l, f = 0), !f && g && m && !u && !B && (pi(this, "onStart"), this._tTime !== g))) return this;
      if (y >= f && l >= 0) for (_ = this._first; _; ) {
        if ((w = _._next, (_._act || y >= _._start) && _._ts && A !== _)) {
          if (_.parent !== this) return this.render(l, u, c);
          if ((_.render(_._ts > 0 ? (y - _._start) * _._ts : (_._dirty ? _.totalDuration() : _._tDur) + (y - _._start) * _._ts, u, c), y !== this._time || !this._ts && !x)) {
            (A = 0, w && (g += this._zTime = -se));
            break;
          }
        }
        _ = w;
      } else {
        _ = this._last;
        for (var V = l < 0 ? l : y; _; ) {
          if ((w = _._prev, (_._act || V <= _._end) && _._ts && A !== _)) {
            if (_.parent !== this) return this.render(l, u, c);
            if ((_.render(_._ts > 0 ? (V - _._start) * _._ts : (_._dirty ? _.totalDuration() : _._tDur) + (V - _._start) * _._ts, u, c || fn && x0(_)), y !== this._time || !this._ts && !x)) {
              (A = 0, w && (g += this._zTime = V ? -se : se));
              break;
            }
          }
          _ = w;
        }
      }
      if (A && !u && (this.pause(), A.render(y >= f ? 0 : -se)._zTime = y >= f ? 1 : -1, this._ts)) return (this._start = M, yh(this), this.render(l, u, c));
      (this._onUpdate && !u && pi(this, "onUpdate", !0), (g === p && this._tTime >= this.totalDuration() || !g && f) && (M === this._start || Math.abs(R) !== Math.abs(this._ts)) && (this._lock || ((l || !m) && (g === p && this._ts > 0 || !g && this._ts < 0) && Fa(this, 1), !u && !(l < 0 && !f) && (g || f || !p) && (pi(this, g === p && l >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(g < p && this.timeScale() > 0) && this._prom()))));
    }
    return this;
  }, r.add = function (l, u) {
    var c = this;
    if ((ta(u) || (u = Bi(this, u, l)), !(l instanceof Uu))) {
      if (wn(l)) return (l.forEach(function (f) {
        return c.add(f, u);
      }), this);
      if (rn(l)) return this.addLabel(l, u);
      if (Me(l)) l = Ve.delayedCall(0, l); else return this;
    }
    return this !== l ? mr(this, l, u) : this;
  }, r.getChildren = function (l, u, c, f) {
    (l === void 0 && (l = !0), u === void 0 && (u = !0), c === void 0 && (c = !0), f === void 0 && (f = -ki));
    for (var p = [], m = this._first; m; ) (m._start >= f && (m instanceof Ve ? u && p.push(m) : (c && p.push(m), l && p.push.apply(p, m.getChildren(!0, u, c)))), m = m._next);
    return p;
  }, r.getById = function (l) {
    for (var u = this.getChildren(1, 1, 1), c = u.length; c--; ) if (u[c].vars.id === l) return u[c];
  }, r.remove = function (l) {
    return rn(l) ? this.removeLabel(l) : Me(l) ? this.killTweensOf(l) : (l.parent === this && vh(this, l), l === this._recent && (this._recent = this._last), Cs(this));
  }, r.totalTime = function (l, u) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = Te(hi.time - (this._ts > 0 ? l / this._ts : (this.totalDuration() - l) / -this._ts))), i.prototype.totalTime.call(this, l, u), this._forcing = 0, this) : this._tTime;
  }, r.addLabel = function (l, u) {
    return (this.labels[l] = Bi(this, u), this);
  }, r.removeLabel = function (l) {
    return (delete this.labels[l], this);
  }, r.addPause = function (l, u, c) {
    var f = Ve.delayedCall(0, u || Du, c);
    return (f.data = "isPause", this._hasPause = 1, mr(this, f, Bi(this, l)));
  }, r.removePause = function (l) {
    var u = this._first;
    for (l = Bi(this, l); u; ) (u._start === l && u.data === "isPause" && Fa(u), u = u._next);
  }, r.killTweensOf = function (l, u, c) {
    for (var f = this.getTweensOf(l, c), p = f.length; p--; ) Na !== f[p] && f[p].kill(l, u);
    return this;
  }, r.getTweensOf = function (l, u) {
    for (var c = [], f = qi(l), p = this._first, m = ta(u), g; p; ) (p instanceof Ve ? mz(p._targets, f) && (m ? (!Na || p._initted && p._ts) && p.globalTime(0) <= u && p.globalTime(p.totalDuration()) > u : !u || p.isActive()) && c.push(p) : (g = p.getTweensOf(f, u)).length && c.push.apply(c, g), p = p._next);
    return c;
  }, r.tweenTo = function (l, u) {
    u = u || ({});
    var c = this, f = Bi(c, l), p = u, m = p.startAt, g = p.onStart, v = p.onStartParams, y = p.immediateRender, _, w = Ve.to(c, yi({
      ease: u.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: f,
      overwrite: "auto",
      duration: u.duration || Math.abs((f - (m && ("time" in m) ? m.time : c._time)) / c.timeScale()) || se,
      onStart: function () {
        if ((c.pause(), !_)) {
          var E = u.duration || Math.abs((f - (m && ("time" in m) ? m.time : c._time)) / c.timeScale());
          (w._dur !== E && $l(w, E, 0, 1).render(w._time, !0, !0), _ = 1);
        }
        g && g.apply(w, v || []);
      }
    }, u));
    return y ? w.render(0) : w;
  }, r.tweenFromTo = function (l, u, c) {
    return this.tweenTo(u, yi({
      startAt: {
        time: Bi(this, l)
      }
    }, c));
  }, r.recent = function () {
    return this._recent;
  }, r.nextLabel = function (l) {
    return (l === void 0 && (l = this._time), k1(this, Bi(this, l)));
  }, r.previousLabel = function (l) {
    return (l === void 0 && (l = this._time), k1(this, Bi(this, l), 1));
  }, r.currentLabel = function (l) {
    return arguments.length ? this.seek(l, !0) : this.previousLabel(this._time + se);
  }, r.shiftChildren = function (l, u, c) {
    c === void 0 && (c = 0);
    var f = this._first, p = this.labels, m;
    for (l = Te(l); f; ) (f._start >= c && (f._start += l, f._end += l), f = f._next);
    if (u) for (m in p) p[m] >= c && (p[m] += l);
    return Cs(this);
  }, r.invalidate = function (l) {
    var u = this._first;
    for (this._lock = 0; u; ) (u.invalidate(l), u = u._next);
    return i.prototype.invalidate.call(this, l);
  }, r.clear = function (l) {
    l === void 0 && (l = !0);
    for (var u = this._first, c; u; ) (c = u._next, this.remove(u), u = c);
    return (this._dp && (this._time = this._tTime = this._pTime = 0), l && (this.labels = {}), Cs(this));
  }, r.totalDuration = function (l) {
    var u = 0, c = this, f = c._last, p = ki, m, g, v;
    if (arguments.length) return c.timeScale((c._repeat < 0 ? c.duration() : c.totalDuration()) / (c.reversed() ? -l : l));
    if (c._dirty) {
      for (v = c.parent; f; ) (m = f._prev, f._dirty && f.totalDuration(), g = f._start, g > p && c._sort && f._ts && !c._lock ? (c._lock = 1, mr(c, f, g - f._delay, 1)._lock = 0) : p = g, g < 0 && f._ts && (u -= g, (!v && !c._dp || v && v.smoothChildTiming) && (c._start += Te(g / c._ts), c._time -= g, c._tTime -= g), c.shiftChildren(-g, !1, -1 / 0), p = 0), f._end > u && f._ts && (u = f._end), f = m);
      ($l(c, c === Ee && c._time > u ? c._time : u, 1, 1), c._dirty = 0);
    }
    return c._tDur;
  }, e.updateRoot = function (l) {
    if ((Ee._ts && (Tw(Ee, $f(l, Ee)), bw = hi.frame), hi.frame >= U1)) {
      U1 += gi.autoSleep || 120;
      var u = Ee._first;
      if ((!u || !u._ts) && gi.autoSleep && hi._listeners.length < 2) {
        for (; u && !u._ts; ) u = u._next;
        u || hi.sleep();
      }
    }
  }, e);
})(Uu);
yi(Fn.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var kz = function (e, r, a, l, u, c, f) {
  var p = new Zn(this._pt, e, r, 0, 1, Zw, null, u), m = 0, g = 0, v, y, _, w, b, E, x, A;
  for ((p.b = a, p.e = l, a += "", l += "", (x = ~l.indexOf("random(")) && (l = Nu(l)), c && (A = [a, l], c(A, e, r), a = A[0], l = A[1]), y = a.match(Fp) || []); v = Fp.exec(l); ) (w = v[0], b = l.substring(m, v.index), _ ? _ = (_ + 1) % 5 : b.substr(-5) === "rgba(" && (_ = 1), w !== y[g++] && (E = parseFloat(y[g - 1]) || 0, p._pt = {
    _next: p._pt,
    p: b || g === 1 ? b : ",",
    s: E,
    c: w.charAt(1) === "=" ? Vl(E, w) - E : parseFloat(w) - E,
    m: _ && _ < 4 ? Math.round : 0
  }, m = Fp.lastIndex));
  return (p.c = m < l.length ? l.substring(m, l.length) : "", p.fp = f, (vw.test(l) || x) && (p.e = 0), this._pt = p, p);
}, O0 = function (e, r, a, l, u, c, f, p, m, g) {
  Me(l) && (l = l(u || 0, e, c));
  var v = e[r], y = a !== "get" ? a : Me(v) ? m ? e[r.indexOf("set") || !Me(e["get" + r.substr(3)]) ? r : "get" + r.substr(3)](m) : e[r]() : v, _ = Me(v) ? m ? Vz : Qw : R0, w;
  if ((rn(l) && (~l.indexOf("random(") && (l = Nu(l)), l.charAt(1) === "=" && (w = Vl(y, l) + (_n(y) || 0), (w || w === 0) && (l = w))), !g || y !== l || Mm)) return !isNaN(y * l) && l !== "" ? (w = new Zn(this._pt, e, r, +y || 0, l - (y || 0), typeof v == "boolean" ? Fz : Kw, 0, _), m && (w.fp = m), f && w.modifier(f, this, e), this._pt = w) : (!v && !((r in e)) && b0(r, l), kz.call(this, e, r, y, l, _, p || gi.stringFilter, m));
}, qz = function (e, r, a, l, u) {
  if ((Me(e) && (e = fu(e, u, r, a, l)), !br(e) || e.style && e.nodeType || wn(e) || mw(e))) return rn(e) ? fu(e, u, r, a, l) : e;
  var c = {}, f;
  for (f in e) c[f] = fu(e[f], u, r, a, l);
  return c;
}, Vw = function (e, r, a, l, u, c) {
  var f, p, m, g;
  if (ci[e] && (f = new ci[e]()).init(u, f.rawVars ? r[e] : qz(r[e], l, u, c, a), a, l, c) !== !1 && (a._pt = p = new Zn(a._pt, u, e, 0, 1, f.render, f, 0, f.priority), a !== Hl)) for ((m = a._ptLookup[a._targets.indexOf(u)], g = f._props.length); g--; ) m[f._props[g]] = p;
  return f;
}, Na, Mm, A0 = function i(e, r, a) {
  var l = e.vars, u = l.ease, c = l.startAt, f = l.immediateRender, p = l.lazy, m = l.onUpdate, g = l.runBackwards, v = l.yoyoEase, y = l.keyframes, _ = l.autoRevert, w = e._dur, b = e._startAt, E = e._targets, x = e.parent, A = x && x.data === "nested" ? x.vars.targets : E, R = e._overwrite === "auto" && !v0, M = e.timeline, B = l.easeReverse || v, L, O, H, P, V, X, k, $, it, nt, U, K, at;
  if ((M && (!y || !u) && (u = "none"), e._ease = Ms(u, Mu.ease), e._rEase = B && (Ms(B) || e._ease), e._from = !M && !!l.runBackwards, e._from && (e.ratio = 1), !M || y && !l.stagger)) {
    if (($ = E[0] ? Rs(E[0]).harness : 0, K = $ && l[$.prop], L = Wf(l, w0), b && (b._zTime < 0 && b.progress(1), r < 0 && g && f && !_ ? b.render(-1, !0) : b.revert(g && w ? zf : dz), b._lazy = 0), c)) {
      if ((Fa(e._startAt = Ve.set(E, yi({
        data: "isStart",
        overwrite: !1,
        parent: x,
        immediateRender: !0,
        lazy: !b && Qn(p),
        startAt: null,
        delay: 0,
        onUpdate: m && (function () {
          return pi(e, "onUpdate");
        }),
        stagger: 0
      }, c))), e._startAt._dp = 0, e._startAt._sat = e, r < 0 && (fn || !f && !_) && e._startAt.revert(zf), f && w && r <= 0 && a <= 0)) {
        r && (e._zTime = r);
        return;
      }
    } else if (g && w && !b) {
      if ((r && (f = !1), H = yi({
        overwrite: !1,
        data: "isFromStart",
        lazy: f && !b && Qn(p),
        immediateRender: f,
        stagger: 0,
        parent: x
      }, L), K && (H[$.prop] = K), Fa(e._startAt = Ve.set(E, H)), e._startAt._dp = 0, e._startAt._sat = e, r < 0 && (fn ? e._startAt.revert(zf) : e._startAt.render(-1, !0)), e._zTime = r, !f)) i(e._startAt, se, se); else if (!r) return;
    }
    for ((e._pt = e._ptCache = 0, p = w && Qn(p) || p && !w, O = 0); O < E.length; O++) {
      if ((V = E[O], k = V._gsap || E0(E)[O]._gsap, e._ptLookup[O] = nt = {}, Em[k.id] && qa.length && Jf(), U = A === E ? O : A.indexOf(V), $ && (it = new $()).init(V, K || L, e, U, A) !== !1 && (e._pt = P = new Zn(e._pt, V, it.name, 0, 1, it.render, it, 0, it.priority), it._props.forEach(function (dt) {
        nt[dt] = P;
      }), it.priority && (X = 1)), !$ || K)) for (H in L) ci[H] && (it = Vw(H, L, e, U, V, A)) ? it.priority && (X = 1) : nt[H] = P = O0.call(e, V, H, "get", L[H], U, A, 0, l.stringFilter);
      (e._op && e._op[O] && e.kill(V, e._op[O]), R && e._pt && (Na = e, Ee.killTweensOf(V, nt, e.globalTime(r)), at = !e.parent, Na = 0), e._pt && p && (Em[k.id] = 1));
    }
    (X && Iw(e), e._onInit && e._onInit(e));
  }
  (e._onUpdate = m, e._initted = (!e._op || e._pt) && !at, y && r <= 0 && M.render(ki, !0, !0));
}, Yz = function (e, r, a, l, u, c, f, p) {
  var m = (e._pt && e._ptCache || (e._ptCache = {}))[r], g, v, y, _;
  if (!m) for ((m = e._ptCache[r] = [], y = e._ptLookup, _ = e._targets.length); _--; ) {
    if ((g = y[_][r], g && g.d && g.d._pt)) for (g = g.d._pt; g && g.p !== r && g.fp !== r; ) g = g._next;
    if (!g) return (Mm = 1, e.vars[r] = "+=0", A0(e, f), Mm = 0, p ? zu(r + " not eligible for reset. Try splitting into individual properties") : 1);
    m.push(g);
  }
  for (_ = m.length; _--; ) (v = m[_], g = v._pt || v, g.s = (l || l === 0) && !u ? l : g.s + (l || 0) + c * g.c, g.c = a - g.s, v.e && (v.e = Ue(a) + _n(v.e)), v.b && (v.b = g.s + _n(v.b)));
}, Gz = function (e, r) {
  var a = e[0] ? Rs(e[0]).harness : 0, l = a && a.aliases, u, c, f, p;
  if (!l) return r;
  u = Jl({}, r);
  for (c in l) if ((c in u)) for ((p = l[c].split(","), f = p.length); f--; ) u[p[f]] = u[c];
  return u;
}, Pz = function (e, r, a, l) {
  var u = r.ease || l || "power1.inOut", c, f;
  if (wn(r)) (f = a[e] || (a[e] = []), r.forEach(function (p, m) {
    return f.push({
      t: m / (r.length - 1) * 100,
      v: p,
      e: u
    });
  })); else for (c in r) (f = a[c] || (a[c] = []), c === "ease" || f.push({
    t: parseFloat(e),
    v: r[c],
    e: u
  }));
}, fu = function (e, r, a, l, u) {
  return Me(e) ? e.call(r, a, l, u) : rn(e) && ~e.indexOf("random(") ? Nu(e) : e;
}, Xw = T0 + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert", Fw = {};
Kn(Xw + ",id,stagger,delay,duration,paused,scrollTrigger", function (i) {
  return Fw[i] = 1;
});
var Ve = (function (i) {
  dw(e, i);
  function e(a, l, u, c) {
    var f;
    (typeof l == "number" && (u.duration = l, l = u, u = null), f = i.call(this, c ? l : uu(l)) || this);
    var p = f.vars, m = p.duration, g = p.delay, v = p.immediateRender, y = p.stagger, _ = p.overwrite, w = p.keyframes, b = p.defaults, E = p.scrollTrigger, x = l.parent || Ee, A = (wn(a) || mw(a) ? ta(a[0]) : ("length" in l)) ? [a] : qi(a), R, M, B, L, O, H, P, V;
    if ((f._targets = A.length ? E0(A) : zu("GSAP target " + a + " not found. https://gsap.com", !gi.nullTargetWarn) || [], f._ptLookup = [], f._overwrite = _, w || y || ff(m) || ff(g))) {
      l = f.vars;
      var X = l.easeReverse || l.yoyoEase;
      if ((R = f.timeline = new Fn({
        data: "nested",
        defaults: b || ({}),
        targets: x && x.data === "nested" ? x.vars.targets : A
      }), R.kill(), R.parent = R._dp = Pr(f), R._start = 0, y || ff(m) || ff(g))) {
        if ((L = A.length, P = y && Dw(y), br(y))) for (O in y) ~Xw.indexOf(O) && (V || (V = {}), V[O] = y[O]);
        for (M = 0; M < L; M++) (B = Wf(l, Fw), B.stagger = 0, X && (B.easeReverse = X), V && Jl(B, V), H = A[M], B.duration = +fu(m, Pr(f), M, H, A), B.delay = (+fu(g, Pr(f), M, H, A) || 0) - f._delay, !y && L === 1 && B.delay && (f._delay = g = B.delay, f._start += g, B.delay = 0), R.to(H, B, P ? P(M, H, A) : 0), R._ease = Gt.none);
        R.duration() ? m = g = 0 : f.timeline = 0;
      } else if (w) {
        (uu(yi(R.vars.defaults, {
          ease: "none"
        })), R._ease = Ms(w.ease || l.ease || "none"));
        var k = 0, $, it, nt;
        if (wn(w)) (w.forEach(function (U) {
          return R.to(A, U, ">");
        }), R.duration()); else {
          B = {};
          for (O in w) O === "ease" || O === "easeEach" || Pz(O, w[O], B, w.easeEach);
          for (O in B) for (($ = B[O].sort(function (U, K) {
            return U.t - K.t;
          }), k = 0, M = 0); M < $.length; M++) (it = $[M], nt = {
            ease: it.e,
            duration: (it.t - (M ? $[M - 1].t : 0)) / 100 * m
          }, nt[O] = it.v, R.to(A, nt, k), k += nt.duration);
          R.duration() < m && R.to({}, {
            duration: m - R.duration()
          });
        }
      }
      m || f.duration(m = R.duration());
    } else f.timeline = 0;
    return (_ === !0 && !v0 && (Na = Pr(f), Ee.killTweensOf(A), Na = 0), mr(x, Pr(f), u), l.reversed && f.reverse(), l.paused && f.paused(!0), (v || !m && !w && f._start === Te(x._time) && Qn(v) && _z(Pr(f)) && x.data !== "nested") && (f._tTime = -se, f.render(Math.max(0, -g) || 0)), E && Rw(Pr(f), E), f);
  }
  var r = e.prototype;
  return (r.render = function (l, u, c) {
    var f = this._time, p = this._tDur, m = this._dur, g = l < 0, v = l > p - se && !g ? p : l < se ? 0 : l, y, _, w, b, E, x, A, R;
    if (!m) bz(this, l, u, c); else if (v !== this._tTime || !l || c || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== g || this._lazy) {
      if ((y = v, R = this.timeline, this._repeat)) {
        if ((b = m + this._rDelay, this._repeat < -1 && g)) return this.totalTime(b * 100 + l, u, c);
        if ((y = Te(v % b), v === p ? (w = this._repeat, y = m) : (E = Te(v / b), w = ~~E, w && w === E ? (y = m, w--) : y > m && (y = m)), x = this._yoyo && w & 1, x && (y = m - y), E = Wl(this._tTime, b), y === f && !c && this._initted && w === E)) return (this._tTime = v, this);
        w !== E && this.vars.repeatRefresh && !x && !this._lock && y !== b && this._initted && (this._lock = c = 1, this.render(Te(b * w), !0).invalidate()._lock = 0);
      }
      if (!this._initted) {
        if (Cw(this, g ? l : y, c, u, v)) return (this._tTime = 0, this);
        if (f !== this._time && !(c && this.vars.repeatRefresh && w !== E)) return this;
        if (m !== this._dur) return this.render(l, u, c);
      }
      if (this._rEase) {
        var M = y < f;
        if (M !== this._inv) {
          var B = M ? f : m - f;
          (this._inv = M, this._from && (this.ratio = 1 - this.ratio), this._invRatio = this.ratio, this._invTime = f, this._invRecip = B ? (M ? -1 : 1) / B : 0, this._invScale = M ? -this.ratio : 1 - this.ratio, this._invEase = M ? this._rEase : this._ease);
        }
        this.ratio = A = this._invRatio + this._invScale * this._invEase((y - this._invTime) * this._invRecip);
      } else this.ratio = A = this._ease(y / m);
      if ((this._from && (this.ratio = A = 1 - A), this._tTime = v, this._time = y, !this._act && this._ts && (this._act = 1, this._lazy = 0), !f && v && !u && !E && (pi(this, "onStart"), this._tTime !== v))) return this;
      for (_ = this._pt; _; ) (_.r(A, _.d), _ = _._next);
      (R && R.render(l < 0 ? l : R._dur * R._ease(y / this._dur), u, c) || this._startAt && (this._zTime = l), this._onUpdate && !u && (g && xm(this, l, u, c), pi(this, "onUpdate")), this._repeat && w !== E && this.vars.onRepeat && !u && this.parent && pi(this, "onRepeat"), (v === this._tDur || !v) && this._tTime === v && (g && !this._onUpdate && xm(this, l, !0, !0), (l || !m) && (v === this._tDur && this._ts > 0 || !v && this._ts < 0) && Fa(this, 1), !u && !(g && !f) && (v || f || x) && (pi(this, v === p ? "onComplete" : "onReverseComplete", !0), this._prom && !(v < p && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, r.targets = function () {
    return this._targets;
  }, r.invalidate = function (l) {
    return ((!l || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(l), i.prototype.invalidate.call(this, l));
  }, r.resetTo = function (l, u, c, f, p) {
    (Lu || hi.wake(), this._ts || this.play());
    var m = Math.min(this._dur, (this._dp._time - this._start) * this._ts), g;
    return (this._initted || A0(this, m), g = this._ease(m / this._dur), Yz(this, l, u, c, f, g, m, p) ? this.resetTo(l, u, c, f, 1) : (_h(this, 0), this.parent || Ow(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0)));
  }, r.kill = function (l, u) {
    if ((u === void 0 && (u = "all"), !l && (!u || u === "all"))) return (this._lazy = this._pt = 0, this.parent ? tu(this) : this.scrollTrigger && this.scrollTrigger.kill(!!fn), this);
    if (this.timeline) {
      var c = this.timeline.totalDuration();
      return (this.timeline.killTweensOf(l, u, Na && Na.vars.overwrite !== !0)._first || tu(this), this.parent && c !== this.timeline.totalDuration() && $l(this, this._dur * this.timeline._tDur / c, 0, 1), this);
    }
    var f = this._targets, p = l ? qi(l) : f, m = this._ptLookup, g = this._pt, v, y, _, w, b, E, x;
    if ((!u || u === "all") && vz(f, p)) return (u === "all" && (this._pt = 0), tu(this));
    for ((v = this._op = this._op || [], u !== "all" && (rn(u) && (b = {}, Kn(u, function (A) {
      return b[A] = 1;
    }), u = b), u = Gz(f, u)), x = f.length); x--; ) if (~p.indexOf(f[x])) {
      (y = m[x], u === "all" ? (v[x] = u, w = y, _ = {}) : (_ = v[x] = v[x] || ({}), w = u));
      for (b in w) (E = y && y[b], E && ((!(("kill" in E.d)) || E.d.kill(b) === !0) && vh(this, E, "_pt"), delete y[b]), _ !== "all" && (_[b] = 1));
    }
    return (this._initted && !this._pt && g && tu(this), this);
  }, e.to = function (l, u) {
    return new e(l, u, arguments[2]);
  }, e.from = function (l, u) {
    return cu(1, arguments);
  }, e.delayedCall = function (l, u, c, f) {
    return new e(u, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: l,
      onComplete: u,
      onReverseComplete: u,
      onCompleteParams: c,
      onReverseCompleteParams: c,
      callbackScope: f
    });
  }, e.fromTo = function (l, u, c) {
    return cu(2, arguments);
  }, e.set = function (l, u) {
    return (u.duration = 0, u.repeatDelay || (u.repeat = 0), new e(l, u));
  }, e.killTweensOf = function (l, u, c) {
    return Ee.killTweensOf(l, u, c);
  }, e);
})(Uu);
yi(Ve.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
Kn("staggerTo,staggerFrom,staggerFromTo", function (i) {
  Ve[i] = function () {
    var e = new Fn(), r = Am.call(arguments, 0);
    return (r.splice(i === "staggerFromTo" ? 5 : 4, 0, 0), e[i].apply(e, r));
  };
});
var R0 = function (e, r, a) {
  return e[r] = a;
}, Qw = function (e, r, a) {
  return e[r](a);
}, Vz = function (e, r, a, l) {
  return e[r](l.fp, a);
}, Xz = function (e, r, a) {
  return e.setAttribute(r, a);
}, C0 = function (e, r) {
  return Me(e[r]) ? Qw : y0(e[r]) && e.setAttribute ? Xz : R0;
}, Kw = function (e, r) {
  return r.set(r.t, r.p, Math.round((r.s + r.c * e) * 1e6) / 1e6, r);
}, Fz = function (e, r) {
  return r.set(r.t, r.p, !!(r.s + r.c * e), r);
}, Zw = function (e, r) {
  var a = r._pt, l = "";
  if (!e && r.b) l = r.b; else if (e === 1 && r.e) l = r.e; else {
    for (; a; ) (l = a.p + (a.m ? a.m(a.s + a.c * e) : Math.round((a.s + a.c * e) * 1e4) / 1e4) + l, a = a._next);
    l += r.c;
  }
  r.set(r.t, r.p, l, r);
}, M0 = function (e, r) {
  for (var a = r._pt; a; ) (a.r(e, a.d), a = a._next);
}, Qz = function (e, r, a, l) {
  for (var u = this._pt, c; u; ) (c = u._next, u.p === l && u.modifier(e, r, a), u = c);
}, Kz = function (e) {
  for (var r = this._pt, a, l; r; ) (l = r._next, r.p === e && !r.op || r.op === e ? vh(this, r, "_pt") : r.dep || (a = 1), r = l);
  return !a;
}, Zz = function (e, r, a, l) {
  l.mSet(e, r, l.m.call(l.tween, a, l.mt), l);
}, Iw = function (e) {
  for (var r = e._pt, a, l, u, c; r; ) {
    for ((a = r._next, l = u); l && l.pr > r.pr; ) l = l._next;
    ((r._prev = l ? l._prev : c) ? r._prev._next = r : u = r, (r._next = l) ? l._prev = r : c = r, r = a);
  }
  e._pt = u;
}, Zn = (function () {
  function i(r, a, l, u, c, f, p, m, g) {
    (this.t = a, this.s = u, this.c = c, this.p = l, this.r = f || Kw, this.d = p || this, this.set = m || R0, this.pr = g || 0, this._next = r, r && (r._prev = this));
  }
  var e = i.prototype;
  return (e.modifier = function (a, l, u) {
    (this.mSet = this.mSet || this.set, this.set = Zz, this.m = a, this.mt = u, this.tween = l);
  }, i);
})();
Kn(T0 + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse", function (i) {
  return w0[i] = 1;
});
vi.TweenMax = vi.TweenLite = Ve;
vi.TimelineLite = vi.TimelineMax = Fn;
Ee = new Fn({
  sortChildren: !1,
  defaults: Mu,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
gi.stringFilter = Yw;
var zs = [], Nf = {}, Iz = [], Y1 = 0, Jz = 0, Jp = function (e) {
  return (Nf[e] || Iz).map(function (r) {
    return r();
  });
}, zm = function () {
  var e = Date.now(), r = [];
  e - Y1 > 2 && (Jp("matchMediaInit"), zs.forEach(function (a) {
    var l = a.queries, u = a.conditions, c, f, p, m;
    for (f in l) (c = fr.matchMedia(l[f]).matches, c && (p = 1), c !== u[f] && (u[f] = c, m = 1));
    m && (a.revert(), p && r.push(a));
  }), Jp("matchMediaRevert"), r.forEach(function (a) {
    return a.onMatch(a, function (l) {
      return a.add(null, l);
    });
  }), Y1 = e, Jp("matchMedia"));
}, Jw = (function () {
  function i(r, a) {
    (this.selector = a && Rm(a), this.data = [], this._r = [], this.isReverted = !1, this.id = Jz++, r && this.add(r));
  }
  var e = i.prototype;
  return (e.add = function (a, l, u) {
    Me(a) && (u = l, l = a, a = Me);
    var c = this, f = function () {
      var m = ve, g = c.selector, v;
      return (m && m !== c && m.data.push(c), u && (c.selector = Rm(u)), ve = c, v = l.apply(c, arguments), Me(v) && c._r.push(v), ve = m, c.selector = g, c.isReverted = !1, v);
    };
    return (c.last = f, a === Me ? f(c, function (p) {
      return c.add(null, p);
    }) : a ? c[a] = f : f);
  }, e.ignore = function (a) {
    var l = ve;
    (ve = null, a(this), ve = l);
  }, e.getTweens = function () {
    var a = [];
    return (this.data.forEach(function (l) {
      return l instanceof i ? a.push.apply(a, l.getTweens()) : l instanceof Ve && !(l.parent && l.parent.data === "nested") && a.push(l);
    }), a);
  }, e.clear = function () {
    this._r.length = this.data.length = 0;
  }, e.kill = function (a, l) {
    var u = this;
    if ((a ? (function () {
      for (var f = u.getTweens(), p = u.data.length, m; p--; ) (m = u.data[p], m.data === "isFlip" && (m.revert(), m.getChildren(!0, !0, !1).forEach(function (g) {
        return f.splice(f.indexOf(g), 1);
      })));
      for ((f.map(function (g) {
        return {
          g: g._dur || g._delay || g._sat && !g._sat.vars.immediateRender ? g.globalTime(0) : -1 / 0,
          t: g
        };
      }).sort(function (g, v) {
        return v.g - g.g || -1 / 0;
      }).forEach(function (g) {
        return g.t.revert(a);
      }), p = u.data.length); p--; ) (m = u.data[p], m instanceof Fn ? m.data !== "nested" && (m.scrollTrigger && m.scrollTrigger.revert(), m.kill()) : !(m instanceof Ve) && m.revert && m.revert(a));
      (u._r.forEach(function (g) {
        return g(a, u);
      }), u.isReverted = !0);
    })() : this.data.forEach(function (f) {
      return f.kill && f.kill();
    }), this.clear(), l)) for (var c = zs.length; c--; ) zs[c].id === this.id && zs.splice(c, 1);
  }, e.revert = function (a) {
    this.kill(a || ({}));
  }, i);
})(), Wz = (function () {
  function i(r) {
    (this.contexts = [], this.scope = r, ve && ve.data.push(this));
  }
  var e = i.prototype;
  return (e.add = function (a, l, u) {
    br(a) || (a = {
      matches: a
    });
    var c = new Jw(0, u || this.scope), f = c.conditions = {}, p, m, g;
    (ve && !c.selector && (c.selector = ve.selector), this.contexts.push(c), l = c.add("onMatch", l), c.queries = a);
    for (m in a) m === "all" ? g = 1 : (p = fr.matchMedia(a[m]), p && (zs.indexOf(c) < 0 && zs.push(c), (f[m] = p.matches) && (g = 1), p.addListener ? p.addListener(zm) : p.addEventListener("change", zm)));
    return (g && l(c, function (v) {
      return c.add(null, v);
    }), this);
  }, e.revert = function (a) {
    this.kill(a || ({}));
  }, e.kill = function (a) {
    this.contexts.forEach(function (l) {
      return l.kill(a, !0);
    });
  }, i);
})(), th = {
  registerPlugin: function () {
    for (var e = arguments.length, r = new Array(e), a = 0; a < e; a++) r[a] = arguments[a];
    r.forEach(function (l) {
      return Hw(l);
    });
  },
  timeline: function (e) {
    return new Fn(e);
  },
  getTweensOf: function (e, r) {
    return Ee.getTweensOf(e, r);
  },
  getProperty: function (e, r, a, l) {
    rn(e) && (e = qi(e)[0]);
    var u = Rs(e || ({})).get, c = a ? xw : Ew;
    return (a === "native" && (a = ""), e && (r ? c((ci[r] && ci[r].get || u)(e, r, a, l)) : function (f, p, m) {
      return c((ci[f] && ci[f].get || u)(e, f, p, m));
    }));
  },
  quickSetter: function (e, r, a) {
    if ((e = qi(e), e.length > 1)) {
      var l = e.map(function (g) {
        return Jn.quickSetter(g, r, a);
      }), u = l.length;
      return function (g) {
        for (var v = u; v--; ) l[v](g);
      };
    }
    e = e[0] || ({});
    var c = ci[r], f = Rs(e), p = f.harness && (f.harness.aliases || ({}))[r] || r, m = c ? function (g) {
      var v = new c();
      (Hl._pt = 0, v.init(e, a ? g + a : g, Hl, 0, [e]), v.render(1, v), Hl._pt && M0(1, Hl));
    } : f.set(e, p);
    return c ? m : function (g) {
      return m(e, p, a ? g + a : g, f, 1);
    };
  },
  quickTo: function (e, r, a) {
    var l, u = Jn.to(e, yi((l = {}, l[r] = "+=0.1", l.paused = !0, l.stagger = 0, l), a || ({}))), c = function (p, m, g) {
      return u.resetTo(r, p, m, g);
    };
    return (c.tween = u, c);
  },
  isTweening: function (e) {
    return Ee.getTweensOf(e, !0).length > 0;
  },
  defaults: function (e) {
    return (e && e.ease && (e.ease = Ms(e.ease, Mu.ease)), B1(Mu, e || ({})));
  },
  config: function (e) {
    return B1(gi, e || ({}));
  },
  registerEffect: function (e) {
    var r = e.name, a = e.effect, l = e.plugins, u = e.defaults, c = e.extendTimeline;
    ((l || "").split(",").forEach(function (f) {
      return f && !ci[f] && !vi[f] && zu(r + " effect requires " + f + " plugin.");
    }), Qp[r] = function (f, p, m) {
      return a(qi(f), yi(p || ({}), u), m);
    }, c && (Fn.prototype[r] = function (f, p, m) {
      return this.add(Qp[r](f, br(p) ? p : (m = p) && ({}), this), m);
    }));
  },
  registerEase: function (e, r) {
    Gt[e] = Ms(r);
  },
  parseEase: function (e, r) {
    return arguments.length ? Ms(e, r) : Gt;
  },
  getById: function (e) {
    return Ee.getById(e);
  },
  exportRoot: function (e, r) {
    e === void 0 && (e = {});
    var a = new Fn(e), l, u;
    for ((a.smoothChildTiming = Qn(e.smoothChildTiming), Ee.remove(a), a._dp = 0, a._time = a._tTime = Ee._time, l = Ee._first); l; ) (u = l._next, (r || !(!l._dur && l instanceof Ve && l.vars.onComplete === l._targets[0])) && mr(a, l, l._start - l._delay), l = u);
    return (mr(Ee, a, 0), a);
  },
  context: function (e, r) {
    return e ? new Jw(e, r) : ve;
  },
  matchMedia: function (e) {
    return new Wz(e);
  },
  matchMediaRefresh: function () {
    return zs.forEach(function (e) {
      var r = e.conditions, a, l;
      for (l in r) r[l] && (r[l] = !1, a = 1);
      a && e.revert();
    }) || zm();
  },
  addEventListener: function (e, r) {
    var a = Nf[e] || (Nf[e] = []);
    ~a.indexOf(r) || a.push(r);
  },
  removeEventListener: function (e, r) {
    var a = Nf[e], l = a && a.indexOf(r);
    l >= 0 && a.splice(l, 1);
  },
  utils: {
    wrap: Cz,
    wrapYoyo: Mz,
    distribute: Dw,
    random: Lw,
    snap: Nw,
    normalize: Rz,
    getUnit: _n,
    clamp: Ez,
    splitColor: kw,
    toArray: qi,
    selector: Rm,
    mapRange: Bw,
    pipe: Oz,
    unitize: Az,
    interpolate: zz,
    shuffle: zw
  },
  install: _w,
  effects: Qp,
  ticker: hi,
  updateRoot: Fn.updateRoot,
  plugins: ci,
  globalTimeline: Ee,
  core: {
    PropTween: Zn,
    globals: Sw,
    Tween: Ve,
    Timeline: Fn,
    Animation: Uu,
    getCache: Rs,
    _removeLinkedListItem: vh,
    reverting: function () {
      return fn;
    },
    context: function (e) {
      return (e && ve && (ve.data.push(e), e._ctx = ve), ve);
    },
    suppressOverwrites: function (e) {
      return v0 = e;
    }
  }
};
Kn("to,from,fromTo,delayedCall,set,killTweensOf", function (i) {
  return th[i] = Ve[i];
});
hi.add(Fn.updateRoot);
Hl = th.to({}, {
  duration: 0
});
var $z = function (e, r) {
  for (var a = e._pt; a && a.p !== r && a.op !== r && a.fp !== r; ) a = a._next;
  return a;
}, tD = function (e, r) {
  var a = e._targets, l, u, c;
  for (l in r) for (u = a.length; u--; ) (c = e._ptLookup[u][l], c && (c = c.d) && (c._pt && (c = $z(c, l)), c && c.modifier && c.modifier(r[l], e, a[u], l)));
}, Wp = function (e, r) {
  return {
    name: e,
    headless: 1,
    rawVars: 1,
    init: function (l, u, c) {
      c._onInit = function (f) {
        var p, m;
        if ((rn(u) && (p = {}, Kn(u, function (g) {
          return p[g] = 1;
        }), u = p), r)) {
          p = {};
          for (m in u) p[m] = r(u[m]);
          u = p;
        }
        tD(f, u);
      };
    }
  };
}, Jn = th.registerPlugin({
  name: "attr",
  init: function (e, r, a, l, u) {
    var c, f, p;
    this.tween = a;
    for (c in r) (p = e.getAttribute(c) || "", f = this.add(e, "setAttribute", (p || 0) + "", r[c], l, u, 0, 0, c), f.op = c, f.b = p, this._props.push(c));
  },
  render: function (e, r) {
    for (var a = r._pt; a; ) (fn ? a.set(a.t, a.p, a.b, a) : a.r(e, a.d), a = a._next);
  }
}, {
  name: "endArray",
  headless: 1,
  init: function (e, r) {
    for (var a = r.length; a--; ) this.add(e, a, e[a] || 0, r[a], 0, 0, 0, 0, 0, 1);
  }
}, Wp("roundProps", Cm), Wp("modifiers"), Wp("snap", Nw)) || th;
Ve.version = Fn.version = Jn.version = "3.15.0";
yw = 1;
_0() && to();
Gt.Power0;
Gt.Power1;
Gt.Power2;
Gt.Power3;
Gt.Power4;
Gt.Linear;
Gt.Quad;
Gt.Cubic;
Gt.Quart;
Gt.Quint;
Gt.Strong;
Gt.Elastic;
Gt.Back;
Gt.SteppedEase;
Gt.Bounce;
Gt.Sine;
Gt.Expo;
Gt.Circ;
var G1, La, Xl, z0, Es, P1, D0, eD = function () {
  return typeof window < "u";
}, ea = {}, _s = 180 / Math.PI, Fl = Math.PI / 180, Al = Math.atan2, V1 = 1e8, N0 = /([A-Z])/g, nD = /(left|right|width|margin|padding|x)/i, iD = /[\s,\(]\S/, gr = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, Dm = function (e, r) {
  return r.set(r.t, r.p, Math.round((r.s + r.c * e) * 1e4) / 1e4 + r.u, r);
}, rD = function (e, r) {
  return r.set(r.t, r.p, e === 1 ? r.e : Math.round((r.s + r.c * e) * 1e4) / 1e4 + r.u, r);
}, aD = function (e, r) {
  return r.set(r.t, r.p, e ? Math.round((r.s + r.c * e) * 1e4) / 1e4 + r.u : r.b, r);
}, sD = function (e, r) {
  return r.set(r.t, r.p, e === 1 ? r.e : e ? Math.round((r.s + r.c * e) * 1e4) / 1e4 + r.u : r.b, r);
}, lD = function (e, r) {
  var a = r.s + r.c * e;
  r.set(r.t, r.p, ~~(a + (a < 0 ? -.5 : .5)) + r.u, r);
}, Ww = function (e, r) {
  return r.set(r.t, r.p, e ? r.e : r.b, r);
}, $w = function (e, r) {
  return r.set(r.t, r.p, e !== 1 ? r.b : r.e, r);
}, oD = function (e, r, a) {
  return e.style[r] = a;
}, uD = function (e, r, a) {
  return e.style.setProperty(r, a);
}, cD = function (e, r, a) {
  return e._gsap[r] = a;
}, fD = function (e, r, a) {
  return e._gsap.scaleX = e._gsap.scaleY = a;
}, hD = function (e, r, a, l, u) {
  var c = e._gsap;
  (c.scaleX = c.scaleY = a, c.renderTransform(u, c));
}, dD = function (e, r, a, l, u) {
  var c = e._gsap;
  (c[r] = a, c.renderTransform(u, c));
}, xe = "transform", In = xe + "Origin", pD = function i(e, r) {
  var a = this, l = this.target, u = l.style, c = l._gsap;
  if ((e in ea) && u) {
    if ((this.tfm = this.tfm || ({}), e !== "transform")) (e = gr[e] || e, ~e.indexOf(",") ? e.split(",").forEach(function (f) {
      return a.tfm[f] = Vr(l, f);
    }) : this.tfm[e] = c.x ? c[e] : Vr(l, e), e === In && (this.tfm.zOrigin = c.zOrigin)); else return gr.transform.split(",").forEach(function (f) {
      return i.call(a, f, r);
    });
    if (this.props.indexOf(xe) >= 0) return;
    (c.svg && (this.svgo = l.getAttribute("data-svg-origin"), this.props.push(In, r, "")), e = xe);
  }
  (u || r) && this.props.push(e, r, u[e]);
}, tT = function (e) {
  e.translate && (e.removeProperty("translate"), e.removeProperty("scale"), e.removeProperty("rotate"));
}, mD = function () {
  var e = this.props, r = this.target, a = r.style, l = r._gsap, u, c;
  for (u = 0; u < e.length; u += 3) e[u + 1] ? e[u + 1] === 2 ? r[e[u]](e[u + 2]) : r[e[u]] = e[u + 2] : e[u + 2] ? a[e[u]] = e[u + 2] : a.removeProperty(e[u].substr(0, 2) === "--" ? e[u] : e[u].replace(N0, "-$1").toLowerCase());
  if (this.tfm) {
    for (c in this.tfm) l[c] = this.tfm[c];
    (l.svg && (l.renderTransform(), r.setAttribute("data-svg-origin", this.svgo || "")), u = D0(), (!u || !u.isStart) && !a[xe] && (tT(a), l.zOrigin && a[In] && (a[In] += " " + l.zOrigin + "px", l.zOrigin = 0, l.renderTransform()), l.uncache = 1));
  }
}, eT = function (e, r) {
  var a = {
    target: e,
    props: [],
    revert: mD,
    save: pD
  };
  return (e._gsap || Jn.core.getCache(e), r && e.style && e.nodeType && r.split(",").forEach(function (l) {
    return a.save(l);
  }), a);
}, nT, Nm = function (e, r) {
  var a = La.createElementNS ? La.createElementNS((r || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : La.createElement(e);
  return a && a.style ? a : La.createElement(e);
}, mi = function i(e, r, a) {
  var l = getComputedStyle(e);
  return l[r] || l.getPropertyValue(r.replace(N0, "-$1").toLowerCase()) || l.getPropertyValue(r) || !a && i(e, eo(r) || r, 1) || "";
}, X1 = ("O,Moz,ms,Ms,Webkit").split(","), eo = function (e, r, a) {
  var l = r || Es, u = l.style, c = 5;
  if ((e in u) && !a) return e;
  for (e = e.charAt(0).toUpperCase() + e.substr(1); c-- && !((X1[c] + e in u)); ) ;
  return c < 0 ? null : (c === 3 ? "ms" : c >= 0 ? X1[c] : "") + e;
}, Lm = function () {
  eD() && window.document && (G1 = window, La = G1.document, Xl = La.documentElement, Es = Nm("div") || ({
    style: {}
  }), Nm("div"), xe = eo(xe), In = xe + "Origin", Es.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", nT = !!eo("perspective"), D0 = Jn.core.reverting, z0 = 1);
}, F1 = function (e) {
  var r = e.ownerSVGElement, a = Nm("svg", r && r.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), l = e.cloneNode(!0), u;
  (l.style.display = "block", a.appendChild(l), Xl.appendChild(a));
  try {
    u = l.getBBox();
  } catch {}
  return (a.removeChild(l), Xl.removeChild(a), u);
}, Q1 = function (e, r) {
  for (var a = r.length; a--; ) if (e.hasAttribute(r[a])) return e.getAttribute(r[a]);
}, iT = function (e) {
  var r, a;
  try {
    r = e.getBBox();
  } catch {
    (r = F1(e), a = 1);
  }
  return (r && (r.width || r.height) || a || (r = F1(e)), r && !r.width && !r.x && !r.y ? {
    x: +Q1(e, ["x", "cx", "x1"]) || 0,
    y: +Q1(e, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : r);
}, rT = function (e) {
  return !!(e.getCTM && (!e.parentNode || e.ownerSVGElement) && iT(e));
}, Qa = function (e, r) {
  if (r) {
    var a = e.style, l;
    ((r in ea) && r !== In && (r = xe), a.removeProperty ? (l = r.substr(0, 2), (l === "ms" || r.substr(0, 6) === "webkit") && (r = "-" + r), a.removeProperty(l === "--" ? r : r.replace(N0, "-$1").toLowerCase())) : a.removeAttribute(r));
  }
}, Ua = function (e, r, a, l, u, c) {
  var f = new Zn(e._pt, r, a, 0, 1, c ? $w : Ww);
  return (e._pt = f, f.b = l, f.e = u, e._props.push(a), f);
}, K1 = {
  deg: 1,
  rad: 1,
  turn: 1
}, gD = {
  grid: 1,
  flex: 1
}, Ka = function i(e, r, a, l) {
  var u = parseFloat(a) || 0, c = (a + "").trim().substr((u + "").length) || "px", f = Es.style, p = nD.test(r), m = e.tagName.toLowerCase() === "svg", g = (m ? "client" : "offset") + (p ? "Width" : "Height"), v = 100, y = l === "px", _ = l === "%", w, b, E, x;
  if (l === c || !u || K1[l] || K1[c]) return u;
  if ((c !== "px" && !y && (u = i(e, r, a, "px")), x = e.getCTM && rT(e), (_ || c === "%") && (ea[r] || ~r.indexOf("adius")))) return (w = x ? e.getBBox()[p ? "width" : "height"] : e[g], Ue(_ ? u / w * v : u / 100 * w));
  if ((f[p ? "width" : "height"] = v + (y ? c : l), b = l !== "rem" && ~r.indexOf("adius") || l === "em" && e.appendChild && !m ? e : e.parentNode, x && (b = (e.ownerSVGElement || ({})).parentNode), (!b || b === La || !b.appendChild) && (b = La.body), E = b._gsap, E && _ && E.width && p && E.time === hi.time && !E.uncache)) return Ue(u / E.width * v);
  if (_ && (r === "height" || r === "width")) {
    var A = e.style[r];
    (e.style[r] = v + l, w = e[g], A ? e.style[r] = A : Qa(e, r));
  } else ((_ || c === "%") && !gD[mi(b, "display")] && (f.position = mi(e, "position")), b === e && (f.position = "static"), b.appendChild(Es), w = Es[g], b.removeChild(Es), f.position = "absolute");
  return (p && _ && (E = Rs(b), E.time = hi.time, E.width = b[g]), Ue(y ? w * u / v : w && u ? v / w * u : 0));
}, Vr = function (e, r, a, l) {
  var u;
  return (z0 || Lm(), (r in gr) && r !== "transform" && (r = gr[r], ~r.indexOf(",") && (r = r.split(",")[0])), ea[r] && r !== "transform" ? (u = ju(e, l), u = r !== "transformOrigin" ? u[r] : u.svg ? u.origin : nh(mi(e, In)) + " " + u.zOrigin + "px") : (u = e.style[r], (!u || u === "auto" || l || ~(u + "").indexOf("calc(")) && (u = eh[r] && eh[r](e, r, a) || mi(e, r) || ww(e, r) || (r === "opacity" ? 1 : 0))), a && !~(u + "").trim().indexOf(" ") ? Ka(e, r, u, a) + a : u);
}, vD = function (e, r, a, l) {
  if (!a || a === "none") {
    var u = eo(r, e, 1), c = u && mi(e, u, 1);
    c && c !== a ? (r = u, a = c) : r === "borderColor" && (a = mi(e, "borderTopColor"));
  }
  var f = new Zn(this._pt, e.style, r, 0, 1, Zw), p = 0, m = 0, g, v, y, _, w, b, E, x, A, R, M, B;
  if ((f.b = a, f.e = l, a += "", l += "", l.substring(0, 6) === "var(--" && (l = mi(e, l.substring(4, l.indexOf(")")))), l === "auto" && (b = e.style[r], e.style[r] = l, l = mi(e, r) || l, b ? e.style[r] = b : Qa(e, r)), g = [a, l], Yw(g), a = g[0], l = g[1], y = a.match(jl) || [], B = l.match(jl) || [], B.length)) {
    for (; v = jl.exec(l); ) (E = v[0], A = l.substring(p, v.index), w ? w = (w + 1) % 5 : (A.substr(-5) === "rgba(" || A.substr(-5) === "hsla(") && (w = 1), E !== (b = y[m++] || "") && (_ = parseFloat(b) || 0, M = b.substr((_ + "").length), E.charAt(1) === "=" && (E = Vl(_, E) + M), x = parseFloat(E), R = E.substr((x + "").length), p = jl.lastIndex - R.length, R || (R = R || gi.units[r] || M, p === l.length && (l += R, f.e += R)), M !== R && (_ = Ka(e, r, b, R) || 0), f._pt = {
      _next: f._pt,
      p: A || m === 1 ? A : ",",
      s: _,
      c: x - _,
      m: w && w < 4 || r === "zIndex" ? Math.round : 0
    }));
    f.c = p < l.length ? l.substring(p, l.length) : "";
  } else f.r = r === "display" && l === "none" ? $w : Ww;
  return (vw.test(l) && (f.e = 0), this._pt = f, f);
}, Z1 = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, yD = function (e) {
  var r = e.split(" "), a = r[0], l = r[1] || "50%";
  return ((a === "top" || a === "bottom" || l === "left" || l === "right") && (e = a, a = l, l = e), r[0] = Z1[a] || a, r[1] = Z1[l] || l, r.join(" "));
}, _D = function (e, r) {
  if (r.tween && r.tween._time === r.tween._dur) {
    var a = r.t, l = a.style, u = r.u, c = a._gsap, f, p, m;
    if (u === "all" || u === !0) (l.cssText = "", p = 1); else for ((u = u.split(","), m = u.length); --m > -1; ) (f = u[m], ea[f] && (p = 1, f = f === "transformOrigin" ? In : xe), Qa(a, f));
    p && (Qa(a, xe), c && (c.svg && a.removeAttribute("transform"), l.scale = l.rotate = l.translate = "none", ju(a, 1), c.uncache = 1, tT(l)));
  }
}, eh = {
  clearProps: function (e, r, a, l, u) {
    if (u.data !== "isFromStart") {
      var c = e._pt = new Zn(e._pt, r, a, 0, 0, _D);
      return (c.u = l, c.pr = -10, c.tween = u, e._props.push(a), 1);
    }
  }
}, Bu = [1, 0, 0, 1, 0, 0], aT = {}, sT = function (e) {
  return e === "matrix(1, 0, 0, 1, 0, 0)" || e === "none" || !e;
}, I1 = function (e) {
  var r = mi(e, xe);
  return sT(r) ? Bu : r.substr(7).match(gw).map(Ue);
}, L0 = function (e, r) {
  var a = e._gsap || Rs(e), l = e.style, u = I1(e), c, f, p, m;
  return a.svg && e.getAttribute("transform") ? (p = e.transform.baseVal.consolidate().matrix, u = [p.a, p.b, p.c, p.d, p.e, p.f], u.join(",") === "1,0,0,1,0,0" ? Bu : u) : (u === Bu && !e.offsetParent && e !== Xl && !a.svg && (p = l.display, l.display = "block", c = e.parentNode, (!c || !e.offsetParent && !e.getBoundingClientRect().width) && (m = 1, f = e.nextElementSibling, Xl.appendChild(e)), u = I1(e), p ? l.display = p : Qa(e, "display"), m && (f ? c.insertBefore(e, f) : c ? c.appendChild(e) : Xl.removeChild(e))), r && u.length > 6 ? [u[0], u[1], u[4], u[5], u[12], u[13]] : u);
}, Um = function (e, r, a, l, u, c) {
  var f = e._gsap, p = u || L0(e, !0), m = f.xOrigin || 0, g = f.yOrigin || 0, v = f.xOffset || 0, y = f.yOffset || 0, _ = p[0], w = p[1], b = p[2], E = p[3], x = p[4], A = p[5], R = r.split(" "), M = parseFloat(R[0]) || 0, B = parseFloat(R[1]) || 0, L, O, H, P;
  (a ? p !== Bu && (O = _ * E - w * b) && (H = M * (E / O) + B * (-b / O) + (b * A - E * x) / O, P = M * (-w / O) + B * (_ / O) - (_ * A - w * x) / O, M = H, B = P) : (L = iT(e), M = L.x + (~R[0].indexOf("%") ? M / 100 * L.width : M), B = L.y + (~(R[1] || R[0]).indexOf("%") ? B / 100 * L.height : B)), l || l !== !1 && f.smooth ? (x = M - m, A = B - g, f.xOffset = v + (x * _ + A * b) - x, f.yOffset = y + (x * w + A * E) - A) : f.xOffset = f.yOffset = 0, f.xOrigin = M, f.yOrigin = B, f.smooth = !!l, f.origin = r, f.originIsAbsolute = !!a, e.style[In] = "0px 0px", c && (Ua(c, f, "xOrigin", m, M), Ua(c, f, "yOrigin", g, B), Ua(c, f, "xOffset", v, f.xOffset), Ua(c, f, "yOffset", y, f.yOffset)), e.setAttribute("data-svg-origin", M + " " + B));
}, ju = function (e, r) {
  var a = e._gsap || new Pw(e);
  if (("x" in a) && !r && !a.uncache) return a;
  var l = e.style, u = a.scaleX < 0, c = "px", f = "deg", p = getComputedStyle(e), m = mi(e, In) || "0", g, v, y, _, w, b, E, x, A, R, M, B, L, O, H, P, V, X, k, $, it, nt, U, K, at, dt, D, z, Z, tt, rt, ft;
  return (g = v = y = b = E = x = A = R = M = 0, _ = w = 1, a.svg = !!(e.getCTM && rT(e)), p.translate && ((p.translate !== "none" || p.scale !== "none" || p.rotate !== "none") && (l[xe] = (p.translate !== "none" ? "translate3d(" + (p.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (p.rotate !== "none" ? "rotate(" + p.rotate + ") " : "") + (p.scale !== "none" ? "scale(" + p.scale.split(" ").join(",") + ") " : "") + (p[xe] !== "none" ? p[xe] : "")), l.scale = l.rotate = l.translate = "none"), O = L0(e, a.svg), a.svg && (a.uncache ? (at = e.getBBox(), m = a.xOrigin - at.x + "px " + (a.yOrigin - at.y) + "px", K = "") : K = !r && e.getAttribute("data-svg-origin"), Um(e, K || m, !!K || a.originIsAbsolute, a.smooth !== !1, O)), B = a.xOrigin || 0, L = a.yOrigin || 0, O !== Bu && (X = O[0], k = O[1], $ = O[2], it = O[3], g = nt = O[4], v = U = O[5], O.length === 6 ? (_ = Math.sqrt(X * X + k * k), w = Math.sqrt(it * it + $ * $), b = X || k ? Al(k, X) * _s : 0, A = $ || it ? Al($, it) * _s + b : 0, A && (w *= Math.abs(Math.cos(A * Fl))), a.svg && (g -= B - (B * X + L * $), v -= L - (B * k + L * it))) : (ft = O[6], tt = O[7], D = O[8], z = O[9], Z = O[10], rt = O[11], g = O[12], v = O[13], y = O[14], H = Al(ft, Z), E = H * _s, H && (P = Math.cos(-H), V = Math.sin(-H), K = nt * P + D * V, at = U * P + z * V, dt = ft * P + Z * V, D = nt * -V + D * P, z = U * -V + z * P, Z = ft * -V + Z * P, rt = tt * -V + rt * P, nt = K, U = at, ft = dt), H = Al(-$, Z), x = H * _s, H && (P = Math.cos(-H), V = Math.sin(-H), K = X * P - D * V, at = k * P - z * V, dt = $ * P - Z * V, rt = it * V + rt * P, X = K, k = at, $ = dt), H = Al(k, X), b = H * _s, H && (P = Math.cos(H), V = Math.sin(H), K = X * P + k * V, at = nt * P + U * V, k = k * P - X * V, U = U * P - nt * V, X = K, nt = at), E && Math.abs(E) + Math.abs(b) > 359.9 && (E = b = 0, x = 180 - x), _ = Ue(Math.sqrt(X * X + k * k + $ * $)), w = Ue(Math.sqrt(U * U + ft * ft)), H = Al(nt, U), A = Math.abs(H) > 2e-4 ? H * _s : 0, M = rt ? 1 / (rt < 0 ? -rt : rt) : 0), a.svg && (K = e.getAttribute("transform"), a.forceCSS = e.setAttribute("transform", "") || !sT(mi(e, xe)), K && e.setAttribute("transform", K))), Math.abs(A) > 90 && Math.abs(A) < 270 && (u ? (_ *= -1, A += b <= 0 ? 180 : -180, b += b <= 0 ? 180 : -180) : (w *= -1, A += A <= 0 ? 180 : -180)), r = r || a.uncache, a.x = g - ((a.xPercent = g && (!r && a.xPercent || (Math.round(e.offsetWidth / 2) === Math.round(-g) ? -50 : 0))) ? e.offsetWidth * a.xPercent / 100 : 0) + c, a.y = v - ((a.yPercent = v && (!r && a.yPercent || (Math.round(e.offsetHeight / 2) === Math.round(-v) ? -50 : 0))) ? e.offsetHeight * a.yPercent / 100 : 0) + c, a.z = y + c, a.scaleX = Ue(_), a.scaleY = Ue(w), a.rotation = Ue(b) + f, a.rotationX = Ue(E) + f, a.rotationY = Ue(x) + f, a.skewX = A + f, a.skewY = R + f, a.transformPerspective = M + c, (a.zOrigin = parseFloat(m.split(" ")[2]) || !r && a.zOrigin || 0) && (l[In] = nh(m)), a.xOffset = a.yOffset = 0, a.force3D = gi.force3D, a.renderTransform = a.svg ? bD : nT ? lT : SD, a.uncache = 0, a);
}, nh = function (e) {
  return (e = e.split(" "))[0] + " " + e[1];
}, $p = function (e, r, a) {
  var l = _n(r);
  return Ue(parseFloat(r) + parseFloat(Ka(e, "x", a + "px", l))) + l;
}, SD = function (e, r) {
  (r.z = "0px", r.rotationY = r.rotationX = "0deg", r.force3D = 0, lT(e, r));
}, vs = "0deg", Jo = "0px", ys = ") ", lT = function (e, r) {
  var a = r || this, l = a.xPercent, u = a.yPercent, c = a.x, f = a.y, p = a.z, m = a.rotation, g = a.rotationY, v = a.rotationX, y = a.skewX, _ = a.skewY, w = a.scaleX, b = a.scaleY, E = a.transformPerspective, x = a.force3D, A = a.target, R = a.zOrigin, M = "", B = x === "auto" && e && e !== 1 || x === !0;
  if (R && (v !== vs || g !== vs)) {
    var L = parseFloat(g) * Fl, O = Math.sin(L), H = Math.cos(L), P;
    (L = parseFloat(v) * Fl, P = Math.cos(L), c = $p(A, c, O * P * -R), f = $p(A, f, -Math.sin(L) * -R), p = $p(A, p, H * P * -R + R));
  }
  (E !== Jo && (M += "perspective(" + E + ys), (l || u) && (M += "translate(" + l + "%, " + u + "%) "), (B || c !== Jo || f !== Jo || p !== Jo) && (M += p !== Jo || B ? "translate3d(" + c + ", " + f + ", " + p + ") " : "translate(" + c + ", " + f + ys), m !== vs && (M += "rotate(" + m + ys), g !== vs && (M += "rotateY(" + g + ys), v !== vs && (M += "rotateX(" + v + ys), (y !== vs || _ !== vs) && (M += "skew(" + y + ", " + _ + ys), (w !== 1 || b !== 1) && (M += "scale(" + w + ", " + b + ys), A.style[xe] = M || "translate(0, 0)");
}, bD = function (e, r) {
  var a = r || this, l = a.xPercent, u = a.yPercent, c = a.x, f = a.y, p = a.rotation, m = a.skewX, g = a.skewY, v = a.scaleX, y = a.scaleY, _ = a.target, w = a.xOrigin, b = a.yOrigin, E = a.xOffset, x = a.yOffset, A = a.forceCSS, R = parseFloat(c), M = parseFloat(f), B, L, O, H, P;
  (p = parseFloat(p), m = parseFloat(m), g = parseFloat(g), g && (g = parseFloat(g), m += g, p += g), p || m ? (p *= Fl, m *= Fl, B = Math.cos(p) * v, L = Math.sin(p) * v, O = Math.sin(p - m) * -y, H = Math.cos(p - m) * y, m && (g *= Fl, P = Math.tan(m - g), P = Math.sqrt(1 + P * P), O *= P, H *= P, g && (P = Math.tan(g), P = Math.sqrt(1 + P * P), B *= P, L *= P)), B = Ue(B), L = Ue(L), O = Ue(O), H = Ue(H)) : (B = v, H = y, L = O = 0), (R && !~(c + "").indexOf("px") || M && !~(f + "").indexOf("px")) && (R = Ka(_, "x", c, "px"), M = Ka(_, "y", f, "px")), (w || b || E || x) && (R = Ue(R + w - (w * B + b * O) + E), M = Ue(M + b - (w * L + b * H) + x)), (l || u) && (P = _.getBBox(), R = Ue(R + l / 100 * P.width), M = Ue(M + u / 100 * P.height)), P = "matrix(" + B + "," + L + "," + O + "," + H + "," + R + "," + M + ")", _.setAttribute("transform", P), A && (_.style[xe] = P));
}, wD = function (e, r, a, l, u) {
  var c = 360, f = rn(u), p = parseFloat(u) * (f && ~u.indexOf("rad") ? _s : 1), m = p - l, g = l + m + "deg", v, y;
  return (f && (v = u.split("_")[1], v === "short" && (m %= c, m !== m % (c / 2) && (m += m < 0 ? c : -c)), v === "cw" && m < 0 ? m = (m + c * V1) % c - ~~(m / c) * c : v === "ccw" && m > 0 && (m = (m - c * V1) % c - ~~(m / c) * c)), e._pt = y = new Zn(e._pt, r, a, l, m, rD), y.e = g, y.u = "deg", e._props.push(a), y);
}, J1 = function (e, r) {
  for (var a in r) e[a] = r[a];
  return e;
}, TD = function (e, r, a) {
  var l = J1({}, a._gsap), u = "perspective,force3D,transformOrigin,svgOrigin", c = a.style, f, p, m, g, v, y, _, w;
  l.svg ? (m = a.getAttribute("transform"), a.setAttribute("transform", ""), c[xe] = r, f = ju(a, 1), Qa(a, xe), a.setAttribute("transform", m)) : (m = getComputedStyle(a)[xe], c[xe] = r, f = ju(a, 1), c[xe] = m);
  for (p in ea) (m = l[p], g = f[p], m !== g && u.indexOf(p) < 0 && (_ = _n(m), w = _n(g), v = _ !== w ? Ka(a, p, m, w) : parseFloat(m), y = parseFloat(g), e._pt = new Zn(e._pt, f, p, v, y - v, Dm), e._pt.u = w || 0, e._props.push(p)));
  J1(f, l);
};
Kn("padding,margin,Width,Radius", function (i, e) {
  var r = "Top", a = "Right", l = "Bottom", u = "Left", c = (e < 3 ? [r, a, l, u] : [r + u, r + a, l + a, l + u]).map(function (f) {
    return e < 2 ? i + f : "border" + f + i;
  });
  eh[e > 1 ? "border" + i : i] = function (f, p, m, g, v) {
    var y, _;
    if (arguments.length < 4) return (y = c.map(function (w) {
      return Vr(f, w, m);
    }), _ = y.join(" "), _.split(y[0]).length === 5 ? y[0] : _);
    (y = (g + "").split(" "), _ = {}, c.forEach(function (w, b) {
      return _[w] = y[b] = y[b] || y[(b - 1) / 2 | 0];
    }), f.init(p, _, v));
  };
});
var oT = {
  name: "css",
  register: Lm,
  targetTest: function (e) {
    return e.style && e.nodeType;
  },
  init: function (e, r, a, l, u) {
    var c = this._props, f = e.style, p = a.vars.startAt, m, g, v, y, _, w, b, E, x, A, R, M, B, L, O, H, P;
    (z0 || Lm(), this.styles = this.styles || eT(e), H = this.styles.props, this.tween = a);
    for (b in r) if (b !== "autoRound" && (g = r[b], !(ci[b] && Vw(b, r, a, l, e, u)))) {
      if ((_ = typeof g, w = eh[b], _ === "function" && (g = g.call(a, l, e, u), _ = typeof g), _ === "string" && ~g.indexOf("random(") && (g = Nu(g)), w)) w(this, e, b, g, a) && (O = 1); else if (b.substr(0, 2) === "--") (m = (getComputedStyle(e).getPropertyValue(b) + "").trim(), g += "", Ya.lastIndex = 0, Ya.test(m) || (E = _n(m), x = _n(g), x ? E !== x && (m = Ka(e, b, m, x) + x) : E && (g += E)), this.add(f, "setProperty", m, g, l, u, 0, 0, b), c.push(b), H.push(b, 0, f[b])); else if (_ !== "undefined") {
        if ((p && (b in p) ? (m = typeof p[b] == "function" ? p[b].call(a, l, e, u) : p[b], rn(m) && ~m.indexOf("random(") && (m = Nu(m)), _n(m + "") || m === "auto" || (m += gi.units[b] || _n(Vr(e, b)) || ""), (m + "").charAt(1) === "=" && (m = Vr(e, b))) : m = Vr(e, b), y = parseFloat(m), A = _ === "string" && g.charAt(1) === "=" && g.substr(0, 2), A && (g = g.substr(2)), v = parseFloat(g), (b in gr) && (b === "autoAlpha" && (y === 1 && Vr(e, "visibility") === "hidden" && v && (y = 0), H.push("visibility", 0, f.visibility), Ua(this, f, "visibility", y ? "inherit" : "hidden", v ? "inherit" : "hidden", !v)), b !== "scale" && b !== "transform" && (b = gr[b], ~b.indexOf(",") && (b = b.split(",")[0]))), R = (b in ea), R)) {
          if ((this.styles.save(b), P = g, _ === "string" && g.substring(0, 6) === "var(--")) {
            if ((g = mi(e, g.substring(4, g.indexOf(")"))), g.substring(0, 5) === "calc(")) {
              var V = e.style.perspective;
              (e.style.perspective = g, g = mi(e, "perspective"), V ? e.style.perspective = V : Qa(e, "perspective"));
            }
            v = parseFloat(g);
          }
          if ((M || (B = e._gsap, B.renderTransform && !r.parseTransform || ju(e, r.parseTransform), L = r.smoothOrigin !== !1 && B.smooth, M = this._pt = new Zn(this._pt, f, xe, 0, 1, B.renderTransform, B, 0, -1), M.dep = 1), b === "scale")) (this._pt = new Zn(this._pt, B, "scaleY", B.scaleY, (A ? Vl(B.scaleY, A + v) : v) - B.scaleY || 0, Dm), this._pt.u = 0, c.push("scaleY", b), b += "X"); else if (b === "transformOrigin") {
            (H.push(In, 0, f[In]), g = yD(g), B.svg ? Um(e, g, 0, L, 0, this) : (x = parseFloat(g.split(" ")[2]) || 0, x !== B.zOrigin && Ua(this, B, "zOrigin", B.zOrigin, x), Ua(this, f, b, nh(m), nh(g))));
            continue;
          } else if (b === "svgOrigin") {
            Um(e, g, 1, L, 0, this);
            continue;
          } else if ((b in aT)) {
            wD(this, B, b, y, A ? Vl(y, A + g) : g);
            continue;
          } else if (b === "smoothOrigin") {
            Ua(this, B, "smooth", B.smooth, g);
            continue;
          } else if (b === "force3D") {
            B[b] = g;
            continue;
          } else if (b === "transform") {
            TD(this, g, e);
            continue;
          }
        } else (b in f) || (b = eo(b) || b);
        if (R || (v || v === 0) && (y || y === 0) && !iD.test(g) && (b in f)) (E = (m + "").substr((y + "").length), v || (v = 0), x = _n(g) || ((b in gi.units) ? gi.units[b] : E), E !== x && (y = Ka(e, b, m, x)), this._pt = new Zn(this._pt, R ? B : f, b, y, (A ? Vl(y, A + v) : v) - y, !R && (x === "px" || b === "zIndex") && r.autoRound !== !1 ? lD : Dm), this._pt.u = x || 0, R && P !== g ? (this._pt.b = m, this._pt.e = P, this._pt.r = sD) : E !== x && x !== "%" && (this._pt.b = m, this._pt.r = aD)); else if ((b in f)) vD.call(this, e, b, m, A ? A + g : g); else if ((b in e)) this.add(e, b, m || e[b], A ? A + g : g, l, u); else if (b !== "parseTransform") {
          b0(b, g);
          continue;
        }
        (R || ((b in f) ? H.push(b, 0, f[b]) : typeof e[b] == "function" ? H.push(b, 2, e[b]()) : H.push(b, 1, m || e[b])), c.push(b));
      }
    }
    O && Iw(this);
  },
  render: function (e, r) {
    if (r.tween._time || !D0()) for (var a = r._pt; a; ) (a.r(e, a.d), a = a._next); else r.styles.revert();
  },
  get: Vr,
  aliases: gr,
  getSetter: function (e, r, a) {
    var l = gr[r];
    return (l && l.indexOf(",") < 0 && (r = l), (r in ea) && r !== In && (e._gsap.x || Vr(e, "x")) ? a && P1 === a ? r === "scale" ? fD : cD : (P1 = a || ({})) && (r === "scale" ? hD : dD) : e.style && !y0(e.style[r]) ? oD : ~r.indexOf("-") ? uD : C0(e, r));
  },
  core: {
    _removeProperty: Qa,
    _getMatrix: L0
  }
};
Jn.utils.checkPrefix = eo;
Jn.core.getStyleSaver = eT;
(function (i, e, r, a) {
  var l = Kn(i + "," + e + "," + r, function (u) {
    ea[u] = 1;
  });
  (Kn(e, function (u) {
    (gi.units[u] = "deg", aT[u] = 1);
  }), gr[l[13]] = i + "," + e, Kn(a, function (u) {
    var c = u.split(":");
    gr[c[1]] = l[c[0]];
  }));
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
Kn("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function (i) {
  gi.units[i] = "px";
});
Jn.registerPlugin(oT);
var xs = Jn.registerPlugin(oT) || Jn;
xs.core.Tween;
function ED(i, e) {
  for (var r = 0; r < e.length; r++) {
    var a = e[r];
    (a.enumerable = a.enumerable || !1, a.configurable = !0, ("value" in a) && (a.writable = !0), Object.defineProperty(i, a.key, a));
  }
}
function xD(i, e, r) {
  return (e && ED(i.prototype, e), i);
}
var cn, Lf, di, Ba, ja, Ql, uT, Ss, Kl, cT, Qr, Zi, fT, hT = function () {
  return cn || typeof window < "u" && (cn = window.gsap) && cn.registerPlugin && cn;
}, dT = 1, kl = [], Ut = [], _r = [], hu = Date.now, Bm = function (e, r) {
  return r;
}, OD = function () {
  var e = Kl.core, r = e.bridge || ({}), a = e._scrollers, l = e._proxies;
  (a.push.apply(a, Ut), l.push.apply(l, _r), Ut = a, _r = l, Bm = function (c, f) {
    return r[c](f);
  });
}, Ga = function (e, r) {
  return ~_r.indexOf(e) && _r[_r.indexOf(e) + 1][r];
}, du = function (e) {
  return !!~cT.indexOf(e);
}, Rn = function (e, r, a, l, u) {
  return e.addEventListener(r, a, {
    passive: l !== !1,
    capture: !!u
  });
}, An = function (e, r, a, l) {
  return e.removeEventListener(r, a, !!l);
}, hf = "scrollLeft", df = "scrollTop", jm = function () {
  return Qr && Qr.isPressed || Ut.cache++;
}, ih = function (e, r) {
  var a = function l(u) {
    if (u || u === 0) {
      dT && (di.history.scrollRestoration = "manual");
      var c = Qr && Qr.isPressed;
      (u = l.v = Math.round(u) || (Qr && Qr.iOS ? 1 : 0), e(u), l.cacheID = Ut.cache, c && Bm("ss", u));
    } else (r || Ut.cache !== l.cacheID || Bm("ref")) && (l.cacheID = Ut.cache, l.v = e());
    return l.v + l.offset;
  };
  return (a.offset = 0, e && a);
}, Ln = {
  s: hf,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: ih(function (i) {
    return arguments.length ? di.scrollTo(i, Ie.sc()) : di.pageXOffset || Ba[hf] || ja[hf] || Ql[hf] || 0;
  })
}, Ie = {
  s: df,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: Ln,
  sc: ih(function (i) {
    return arguments.length ? di.scrollTo(Ln.sc(), i) : di.pageYOffset || Ba[df] || ja[df] || Ql[df] || 0;
  })
}, Xn = function (e, r) {
  return (r && r._ctx && r._ctx.selector || cn.utils.toArray)(e)[0] || (typeof e == "string" && cn.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
}, AD = function (e, r) {
  for (var a = r.length; a--; ) if (r[a] === e || r[a].contains(e)) return !0;
  return !1;
}, Za = function (e, r) {
  var a = r.s, l = r.sc;
  du(e) && (e = Ba.scrollingElement || ja);
  var u = Ut.indexOf(e), c = l === Ie.sc ? 1 : 2;
  (!~u && (u = Ut.push(e) - 1), Ut[u + c] || Rn(e, "scroll", jm));
  var f = Ut[u + c], p = f || (Ut[u + c] = ih(Ga(e, a), !0) || (du(e) ? l : ih(function (m) {
    return arguments.length ? e[a] = m : e[a];
  })));
  return (p.target = e, f || (p.smooth = cn.getProperty(e, "scrollBehavior") === "smooth"), p);
}, Hm = function (e, r, a) {
  var l = e, u = e, c = hu(), f = c, p = r || 50, m = Math.max(500, p * 3), g = function (w, b) {
    var E = hu();
    b || E - c > p ? (u = l, l = w, f = c, c = E) : a ? l += w : l = u + (w - u) / (E - f) * (c - f);
  }, v = function () {
    (u = l = a ? 0 : l, f = c = 0);
  }, y = function (w) {
    var b = f, E = u, x = hu();
    return ((w || w === 0) && w !== l && g(w), c === f || x - f > m ? 0 : (l + (a ? E : -E)) / ((a ? x : c) - b) * 1e3);
  };
  return {
    update: g,
    reset: v,
    getVelocity: y
  };
}, Wo = function (e, r) {
  return (r && !e._gsapAllow && e.cancelable !== !1 && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e);
}, W1 = function (e) {
  var r = Math.max.apply(Math, e), a = Math.min.apply(Math, e);
  return Math.abs(r) >= Math.abs(a) ? r : a;
}, pT = function () {
  (Kl = cn.core.globals().ScrollTrigger, Kl && Kl.core && OD());
}, mT = function (e) {
  return (cn = e || hT(), !Lf && cn && typeof document < "u" && document.body && (di = window, Ba = document, ja = Ba.documentElement, Ql = Ba.body, cT = [di, Ba, ja, Ql], cn.utils.clamp, fT = cn.core.context || (function () {}), Ss = ("onpointerenter" in Ql) ? "pointer" : "mouse", uT = Be.isTouch = di.matchMedia && di.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : ("ontouchstart" in di) || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Zi = Be.eventTypes = (("ontouchstart" in ja) ? "touchstart,touchmove,touchcancel,touchend" : ("onpointerdown" in ja) ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function () {
    return dT = 0;
  }, 500), Lf = 1), Kl || pT(), Lf);
};
Ln.op = Ie;
Ut.cache = 0;
var Be = (function () {
  function i(r) {
    this.init(r);
  }
  var e = i.prototype;
  return (e.init = function (a) {
    (Lf || mT(cn) || console.warn("Please gsap.registerPlugin(Observer)"), Kl || pT());
    var l = a.tolerance, u = a.dragMinimum, c = a.type, f = a.target, p = a.lineHeight, m = a.debounce, g = a.preventDefault, v = a.onStop, y = a.onStopDelay, _ = a.ignore, w = a.wheelSpeed, b = a.event, E = a.onDragStart, x = a.onDragEnd, A = a.onDrag, R = a.onPress, M = a.onRelease, B = a.onRight, L = a.onLeft, O = a.onUp, H = a.onDown, P = a.onChangeX, V = a.onChangeY, X = a.onChange, k = a.onToggleX, $ = a.onToggleY, it = a.onHover, nt = a.onHoverEnd, U = a.onMove, K = a.ignoreCheck, at = a.isNormalizer, dt = a.onGestureStart, D = a.onGestureEnd, z = a.onWheel, Z = a.onEnable, tt = a.onDisable, rt = a.onClick, ft = a.scrollSpeed, pt = a.capture, lt = a.allowClicks, _t = a.lockAxis, Et = a.onLockAxis;
    (this.target = f = Xn(f) || ja, this.vars = a, _ && (_ = cn.utils.toArray(_)), l = l || 1e-9, u = u || 0, w = w || 1, ft = ft || 1, c = c || "wheel,touch,pointer", m = m !== !1, p || (p = parseFloat(di.getComputedStyle(Ql).lineHeight) || 22));
    var Fe, ye, ue, Ht, It, We, an, Q = this, hn = 0, Wn = 0, _i = a.passive || !g && a.passive !== !1, le = Za(f, Ln), Gi = Za(f, Ie), tr = le(), ze = Gi(), je = ~c.indexOf("touch") && !~c.indexOf("pointer") && Zi[0] === "pointerdown", Pi = du(f), pe = f.ownerDocument || Ba, dn = [0, 0, 0], jn = [0, 0, 0], Si = 0, $a = function () {
      return Si = hu();
    }, Oe = function (mt, Vt) {
      return (Q.event = mt) && _ && AD(mt.target, _) || Vt && je && mt.pointerType !== "touch" || K && K(mt, Vt);
    }, er = function () {
      (Q._vx.reset(), Q._vy.reset(), ye.pause(), v && v(Q));
    }, _e = function () {
      var mt = Q.deltaX = W1(dn), Vt = Q.deltaY = W1(jn), st = Math.abs(mt) >= l, wt = Math.abs(Vt) >= l;
      (X && (st || wt) && X(Q, mt, Vt, dn, jn), st && (B && Q.deltaX > 0 && B(Q), L && Q.deltaX < 0 && L(Q), P && P(Q), k && Q.deltaX < 0 != hn < 0 && k(Q), hn = Q.deltaX, dn[0] = dn[1] = dn[2] = 0), wt && (H && Q.deltaY > 0 && H(Q), O && Q.deltaY < 0 && O(Q), V && V(Q), $ && Q.deltaY < 0 != Wn < 0 && $(Q), Wn = Q.deltaY, jn[0] = jn[1] = jn[2] = 0), (Ht || ue) && (U && U(Q), ue && (E && ue === 1 && E(Q), A && A(Q), ue = 0), Ht = !1), We && !(We = !1) && Et && Et(Q), It && (z(Q), It = !1), Fe = 0);
    }, Tn = function (mt, Vt, st) {
      (dn[st] += mt, jn[st] += Vt, Q._vx.update(mt), Q._vy.update(Vt), m ? Fe || (Fe = requestAnimationFrame(_e)) : _e());
    }, He = function (mt, Vt) {
      (_t && !an && (Q.axis = an = Math.abs(mt) > Math.abs(Vt) ? "x" : "y", We = !0), an !== "y" && (dn[2] += mt, Q._vx.update(mt, !0)), an !== "x" && (jn[2] += Vt, Q._vy.update(Vt, !0)), m ? Fe || (Fe = requestAnimationFrame(_e)) : _e());
    }, nr = function (mt) {
      if (!Oe(mt, 1)) {
        mt = Wo(mt, g);
        var Vt = mt.clientX, st = mt.clientY, wt = Vt - Q.x, gt = st - Q.y, St = Q.isDragging;
        (Q.x = Vt, Q.y = st, (St || (wt || gt) && (Math.abs(Q.startX - Vt) >= u || Math.abs(Q.startY - st) >= u)) && (ue || (ue = St ? 2 : 1), St || (Q.isDragging = !0), He(wt, gt)));
      }
    }, wr = Q.onPress = function (bt) {
      Oe(bt, 1) || bt && bt.button || (Q.axis = an = null, ye.pause(), Q.isPressed = !0, bt = Wo(bt), hn = Wn = 0, Q.startX = Q.x = bt.clientX, Q.startY = Q.y = bt.clientY, Q._vx.reset(), Q._vy.reset(), Rn(at ? f : pe, Zi[1], nr, _i, !0), Q.deltaX = Q.deltaY = 0, R && R(Q));
    }, Rt = Q.onRelease = function (bt) {
      if (!Oe(bt, 1)) {
        An(at ? f : pe, Zi[1], nr, !0);
        var mt = !isNaN(Q.y - Q.startY), Vt = Q.isDragging, st = Vt && (Math.abs(Q.x - Q.startX) > 3 || Math.abs(Q.y - Q.startY) > 3), wt = Wo(bt);
        (!st && mt && (Q._vx.reset(), Q._vy.reset(), g && lt && cn.delayedCall(.08, function () {
          if (hu() - Si > 300 && !bt.defaultPrevented) {
            if (bt.target.click) bt.target.click(); else if (pe.createEvent) {
              var gt = pe.createEvent("MouseEvents");
              (gt.initMouseEvent("click", !0, !0, di, 1, wt.screenX, wt.screenY, wt.clientX, wt.clientY, !1, !1, !1, !1, 0, null), bt.target.dispatchEvent(gt));
            }
          }
        })), Q.isDragging = Q.isGesturing = Q.isPressed = !1, v && Vt && !at && ye.restart(!0), ue && _e(), x && Vt && x(Q), M && M(Q, st));
      }
    }, bi = function (mt) {
      return mt.touches && mt.touches.length > 1 && (Q.isGesturing = !0) && dt(mt, Q.isDragging);
    }, pn = function () {
      return (Q.isGesturing = !1) || D(Q);
    }, mn = function (mt) {
      if (!Oe(mt)) {
        var Vt = le(), st = Gi();
        (Tn((Vt - tr) * ft, (st - ze) * ft, 1), tr = Vt, ze = st, v && ye.restart(!0));
      }
    }, Qe = function (mt) {
      if (!Oe(mt)) {
        (mt = Wo(mt, g), z && (It = !0));
        var Vt = (mt.deltaMode === 1 ? p : mt.deltaMode === 2 ? di.innerHeight : 1) * w;
        (Tn(mt.deltaX * Vt, mt.deltaY * Vt, 0), v && !at && ye.restart(!0));
      }
    }, wi = function (mt) {
      if (!Oe(mt)) {
        var Vt = mt.clientX, st = mt.clientY, wt = Vt - Q.x, gt = st - Q.y;
        (Q.x = Vt, Q.y = st, Ht = !0, v && ye.restart(!0), (wt || gt) && He(wt, gt));
      }
    }, Ti = function (mt) {
      (Q.event = mt, it(Q));
    }, Vi = function (mt) {
      (Q.event = mt, nt(Q));
    }, ia = function (mt) {
      return Oe(mt) || Wo(mt, g) && rt(Q);
    };
    (ye = Q._dc = cn.delayedCall(y || .25, er).pause(), Q.deltaX = Q.deltaY = 0, Q._vx = Hm(0, 50, !0), Q._vy = Hm(0, 50, !0), Q.scrollX = le, Q.scrollY = Gi, Q.isDragging = Q.isGesturing = Q.isPressed = !1, fT(this), Q.enable = function (bt) {
      return (Q.isEnabled || (Rn(Pi ? pe : f, "scroll", jm), c.indexOf("scroll") >= 0 && Rn(Pi ? pe : f, "scroll", mn, _i, pt), c.indexOf("wheel") >= 0 && Rn(f, "wheel", Qe, _i, pt), (c.indexOf("touch") >= 0 && uT || c.indexOf("pointer") >= 0) && (Rn(f, Zi[0], wr, _i, pt), Rn(pe, Zi[2], Rt), Rn(pe, Zi[3], Rt), lt && Rn(f, "click", $a, !0, !0), rt && Rn(f, "click", ia), dt && Rn(pe, "gesturestart", bi), D && Rn(pe, "gestureend", pn), it && Rn(f, Ss + "enter", Ti), nt && Rn(f, Ss + "leave", Vi), U && Rn(f, Ss + "move", wi)), Q.isEnabled = !0, Q.isDragging = Q.isGesturing = Q.isPressed = Ht = ue = !1, Q._vx.reset(), Q._vy.reset(), tr = le(), ze = Gi(), bt && bt.type && wr(bt), Z && Z(Q)), Q);
    }, Q.disable = function () {
      Q.isEnabled && (kl.filter(function (bt) {
        return bt !== Q && du(bt.target);
      }).length || An(Pi ? pe : f, "scroll", jm), Q.isPressed && (Q._vx.reset(), Q._vy.reset(), An(at ? f : pe, Zi[1], nr, !0)), An(Pi ? pe : f, "scroll", mn, pt), An(f, "wheel", Qe, pt), An(f, Zi[0], wr, pt), An(pe, Zi[2], Rt), An(pe, Zi[3], Rt), An(f, "click", $a, !0), An(f, "click", ia), An(pe, "gesturestart", bi), An(pe, "gestureend", pn), An(f, Ss + "enter", Ti), An(f, Ss + "leave", Vi), An(f, Ss + "move", wi), Q.isEnabled = Q.isPressed = Q.isDragging = !1, tt && tt(Q));
    }, Q.kill = Q.revert = function () {
      Q.disable();
      var bt = kl.indexOf(Q);
      (bt >= 0 && kl.splice(bt, 1), Qr === Q && (Qr = 0));
    }, kl.push(Q), at && du(f) && (Qr = Q), Q.enable(b));
  }, xD(i, [{
    key: "velocityX",
    get: function () {
      return this._vx.getVelocity();
    }
  }, {
    key: "velocityY",
    get: function () {
      return this._vy.getVelocity();
    }
  }]), i);
})();
Be.version = "3.15.0";
Be.create = function (i) {
  return new Be(i);
};
Be.register = mT;
Be.getAll = function () {
  return kl.slice();
};
Be.getById = function (i) {
  return kl.filter(function (e) {
    return e.vars.id === i;
  })[0];
};
hT() && cn.registerPlugin(Be);
var ut, zl, Lt, $t, fi, Zt, U0, rh, Hu, pu, nu, pf, vn, Sh, km, zn, $1, tS, Dl, gT, tm, vT, Mn, qm, yT, _T, Ma, Ym, B0, Zl, j0, mu, Gm, em, mf = 1, yn = Date.now, nm = yn(), Yi = 0, iu = 0, eS = function (e, r, a) {
  var l = ui(e) && (e.substr(0, 6) === "clamp(" || e.indexOf("max") > -1);
  return (a["_" + r + "Clamp"] = l, l ? e.substr(6, e.length - 7) : e);
}, nS = function (e, r) {
  return r && (!ui(e) || e.substr(0, 6) !== "clamp(") ? "clamp(" + e + ")" : e;
}, RD = function i() {
  return iu && requestAnimationFrame(i);
}, iS = function () {
  return Sh = 1;
}, rS = function () {
  return Sh = 0;
}, hr = function (e) {
  return e;
}, ru = function (e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, ST = function () {
  return typeof window < "u";
}, bT = function () {
  return ut || ST() && (ut = window.gsap) && ut.registerPlugin && ut;
}, Bs = function (e) {
  return !!~U0.indexOf(e);
}, wT = function (e) {
  return (e === "Height" ? j0 : Lt["inner" + e]) || fi["client" + e] || Zt["client" + e];
}, TT = function (e) {
  return Ga(e, "getBoundingClientRect") || (Bs(e) ? function () {
    return (kf.width = Lt.innerWidth, kf.height = j0, kf);
  } : function () {
    return Xr(e);
  });
}, CD = function (e, r, a) {
  var l = a.d, u = a.d2, c = a.a;
  return (c = Ga(e, "getBoundingClientRect")) ? function () {
    return c()[l];
  } : function () {
    return (r ? wT(u) : e["client" + u]) || 0;
  };
}, MD = function (e, r) {
  return !r || ~_r.indexOf(e) ? TT(e) : function () {
    return kf;
  };
}, vr = function (e, r) {
  var a = r.s, l = r.d2, u = r.d, c = r.a;
  return Math.max(0, (a = "scroll" + l) && (c = Ga(e, a)) ? c() - TT(e)()[u] : Bs(e) ? (fi[a] || Zt[a]) - wT(l) : e[a] - e["offset" + l]);
}, gf = function (e, r) {
  for (var a = 0; a < Dl.length; a += 3) (!r || ~r.indexOf(Dl[a + 1])) && e(Dl[a], Dl[a + 1], Dl[a + 2]);
}, ui = function (e) {
  return typeof e == "string";
}, Sn = function (e) {
  return typeof e == "function";
}, au = function (e) {
  return typeof e == "number";
}, bs = function (e) {
  return typeof e == "object";
}, $o = function (e, r, a) {
  return e && e.progress(r ? 0 : 1) && a && e.pause();
}, Rl = function (e, r, a) {
  if (e.enabled) {
    var l = e._ctx ? e._ctx.add(function () {
      return r(e, a);
    }) : r(e, a);
    l && l.totalTime && (e.callbackAnimation = l);
  }
}, Cl = Math.abs, ET = "left", xT = "top", H0 = "right", k0 = "bottom", Ds = "width", Ns = "height", gu = "Right", vu = "Left", yu = "Top", _u = "Bottom", Pe = "padding", ji = "margin", no = "Width", q0 = "Height", Ze = "px", Hi = function (e) {
  return Lt.getComputedStyle(e.nodeType === Node.DOCUMENT_NODE ? e.scrollingElement : e);
}, zD = function (e) {
  var r = Hi(e).position;
  e.style.position = r === "absolute" || r === "fixed" ? r : "relative";
}, aS = function (e, r) {
  for (var a in r) (a in e) || (e[a] = r[a]);
  return e;
}, Xr = function (e, r) {
  var a = r && Hi(e)[km] !== "matrix(1, 0, 0, 1, 0, 0)" && ut.to(e, {
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    rotation: 0,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0
  }).progress(1), l = e.getBoundingClientRect ? e.getBoundingClientRect() : e.scrollingElement.getBoundingClientRect();
  return (a && a.progress(0).kill(), l);
}, ah = function (e, r) {
  var a = r.d2;
  return e["offset" + a] || e["client" + a] || 0;
}, OT = function (e) {
  var r = [], a = e.labels, l = e.duration(), u;
  for (u in a) r.push(a[u] / l);
  return r;
}, DD = function (e) {
  return function (r) {
    return ut.utils.snap(OT(e), r);
  };
}, Y0 = function (e) {
  var r = ut.utils.snap(e), a = Array.isArray(e) && e.slice(0).sort(function (l, u) {
    return l - u;
  });
  return a ? function (l, u, c) {
    c === void 0 && (c = .001);
    var f;
    if (!u) return r(l);
    if (u > 0) {
      for ((l -= c, f = 0); f < a.length; f++) if (a[f] >= l) return a[f];
      return a[f - 1];
    } else for ((f = a.length, l += c); f--; ) if (a[f] <= l) return a[f];
    return a[0];
  } : function (l, u, c) {
    c === void 0 && (c = .001);
    var f = r(l);
    return !u || Math.abs(f - l) < c || f - l < 0 == u < 0 ? f : r(u < 0 ? l - e : l + e);
  };
}, ND = function (e) {
  return function (r, a) {
    return Y0(OT(e))(r, a.direction);
  };
}, vf = function (e, r, a, l) {
  return a.split(",").forEach(function (u) {
    return e(r, u, l);
  });
}, en = function (e, r, a, l, u) {
  return e.addEventListener(r, a, {
    passive: !l,
    capture: !!u
  });
}, tn = function (e, r, a, l) {
  return e.removeEventListener(r, a, !!l);
}, yf = function (e, r, a) {
  (a = a && a.wheelHandler, a && (e(r, "wheel", a), e(r, "touchmove", a)));
}, sS = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, _f = {
  toggleActions: "play",
  anticipatePin: 0
}, sh = {
  top: 0,
  left: 0,
  center: .5,
  bottom: 1,
  right: 1
}, Uf = function (e, r) {
  if (ui(e)) {
    var a = e.indexOf("="), l = ~a ? +(e.charAt(a - 1) + 1) * parseFloat(e.substr(a + 1)) : 0;
    (~a && (e.indexOf("%") > a && (l *= r / 100), e = e.substr(0, a - 1)), e = l + ((e in sh) ? sh[e] * r : ~e.indexOf("%") ? parseFloat(e) * r / 100 : parseFloat(e) || 0));
  }
  return e;
}, Sf = function (e, r, a, l, u, c, f, p) {
  var m = u.startColor, g = u.endColor, v = u.fontSize, y = u.indent, _ = u.fontWeight, w = $t.createElement("div"), b = Bs(a) || Ga(a, "pinType") === "fixed", E = e.indexOf("scroller") !== -1, x = b ? Zt : a.tagName === "IFRAME" ? a.contentDocument.body : a, A = e.indexOf("start") !== -1, R = A ? m : g, M = "border-color:" + R + ";font-size:" + v + ";color:" + R + ";font-weight:" + _ + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return (M += "position:" + ((E || p) && b ? "fixed;" : "absolute;"), (E || p || !b) && (M += (l === Ie ? H0 : k0) + ":" + (c + parseFloat(y)) + "px;"), f && (M += "box-sizing:border-box;text-align:left;width:" + f.offsetWidth + "px;"), w._isStart = A, w.setAttribute("class", "gsap-marker-" + e + (r ? " marker-" + r : "")), w.style.cssText = M, w.innerText = r || r === 0 ? e + "-" + r : e, x.children[0] ? x.insertBefore(w, x.children[0]) : x.appendChild(w), w._offset = w["offset" + l.op.d2], Bf(w, 0, l, A), w);
}, Bf = function (e, r, a, l) {
  var u = {
    display: "block"
  }, c = a[l ? "os2" : "p2"], f = a[l ? "p2" : "os2"];
  (e._isFlipped = l, u[a.a + "Percent"] = l ? -100 : 0, u[a.a] = l ? "1px" : 0, u["border" + c + no] = 1, u["border" + f + no] = 0, u[a.p] = r + "px", ut.set(e, u));
}, Mt = [], Pm = {}, ku, lS = function () {
  return yn() - Yi > 34 && (ku || (ku = requestAnimationFrame(Ir)));
}, Ml = function () {
  (!Mn || !Mn.isPressed || Mn.startX > Zt.clientWidth) && (Ut.cache++, Mn ? ku || (ku = requestAnimationFrame(Ir)) : Ir(), Yi || Hs("scrollStart"), Yi = yn());
}, im = function () {
  (_T = Lt.innerWidth, yT = Lt.innerHeight);
}, su = function (e) {
  (Ut.cache++, (e === !0 || !vn && !vT && !$t.fullscreenElement && !$t.webkitFullscreenElement && (!qm || _T !== Lt.innerWidth || Math.abs(Lt.innerHeight - yT) > Lt.innerHeight * .25)) && rh.restart(!0));
}, js = {}, LD = [], AT = function i() {
  return tn(zt, "scrollEnd", i) || Os(!0);
}, Hs = function (e) {
  return js[e] && js[e].map(function (r) {
    return r();
  }) || LD;
}, oi = [], RT = function (e) {
  for (var r = 0; r < oi.length; r += 5) (!e || oi[r + 4] && oi[r + 4].query === e) && (oi[r].style.cssText = oi[r + 1], oi[r].getBBox && oi[r].setAttribute("transform", oi[r + 2] || ""), oi[r + 3].uncache = 1);
}, CT = function () {
  return Ut.forEach(function (e) {
    return Sn(e) && ++e.cacheID && (e.rec = e());
  });
}, G0 = function (e, r) {
  var a;
  for (zn = 0; zn < Mt.length; zn++) (a = Mt[zn], a && (!r || a._ctx === r) && (e ? a.kill(1) : a.revert(!0, !0)));
  (mu = !0, r && RT(r), r || Hs("revert"));
}, MT = function (e, r) {
  (Ut.cache++, (r || !Dn) && Ut.forEach(function (a) {
    return Sn(a) && a.cacheID++ && (a.rec = 0);
  }), ui(e) && (Lt.history.scrollRestoration = B0 = e));
}, Dn, Ls = 0, oS, UD = function () {
  if (oS !== Ls) {
    var e = oS = Ls;
    requestAnimationFrame(function () {
      return e === Ls && Os(!0);
    });
  }
}, zT = function () {
  (Zt.appendChild(Zl), j0 = !Mn && Zl.offsetHeight || Lt.innerHeight, Zt.removeChild(Zl));
}, uS = function (e) {
  return Hu(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function (r) {
    return r.style.display = e ? "none" : "block";
  });
}, Os = function (e, r) {
  if ((fi = $t.documentElement, Zt = $t.body, U0 = [Lt, $t, fi, Zt], Yi && !e && !mu)) {
    en(zt, "scrollEnd", AT);
    return;
  }
  (zT(), Dn = zt.isRefreshing = !0, mu || CT());
  var a = Hs("refreshInit");
  (gT && zt.sort(), r || G0(), Ut.forEach(function (l) {
    Sn(l) && (l.smooth && (l.target.style.scrollBehavior = "auto"), l(0));
  }), Mt.slice(0).forEach(function (l) {
    return l.refresh();
  }), mu = !1, Mt.forEach(function (l) {
    if (l._subPinOffset && l.pin) {
      var u = l.vars.horizontal ? "offsetWidth" : "offsetHeight", c = l.pin[u];
      (l.revert(!0, 1), l.adjustPinSpacing(l.pin[u] - c), l.refresh());
    }
  }), Gm = 1, uS(!0), Mt.forEach(function (l) {
    var u = vr(l.scroller, l._dir), c = l.vars.end === "max" || l._endClamp && l.end > u, f = l._startClamp && l.start >= u;
    (c || f) && l.setPositions(f ? u - 1 : l.start, c ? Math.max(f ? u : l.start + 1, u) : l.end, !0);
  }), uS(!1), Gm = 0, a.forEach(function (l) {
    return l && l.render && l.render(-1);
  }), Ut.forEach(function (l) {
    Sn(l) && (l.smooth && requestAnimationFrame(function () {
      return l.target.style.scrollBehavior = "smooth";
    }), l.rec && l(l.rec));
  }), MT(B0, 1), rh.pause(), Ls++, Dn = 2, Ir(2), Mt.forEach(function (l) {
    return Sn(l.vars.onRefresh) && l.vars.onRefresh(l);
  }), Dn = zt.isRefreshing = !1, Hs("refresh"));
}, Vm = 0, jf = 1, Su, Ir = function (e) {
  if (e === 2 || !Dn && !mu) {
    (zt.isUpdating = !0, Su && Su.update(0));
    var r = Mt.length, a = yn(), l = a - nm >= 50, u = r && Mt[0].scroll();
    if ((jf = Vm > u ? -1 : 1, Dn || (Vm = u), l && (Yi && !Sh && a - Yi > 200 && (Yi = 0, Hs("scrollEnd")), nu = nm, nm = a), jf < 0)) {
      for (zn = r; zn-- > 0; ) Mt[zn] && Mt[zn].update(0, l);
      jf = 1;
    } else for (zn = 0; zn < r; zn++) Mt[zn] && Mt[zn].update(0, l);
    zt.isUpdating = !1;
  }
  ku = 0;
}, Xm = [ET, xT, k0, H0, ji + _u, ji + gu, ji + yu, ji + vu, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], Hf = Xm.concat([Ds, Ns, "boxSizing", "max" + no, "max" + q0, "position", ji, Pe, Pe + yu, Pe + gu, Pe + _u, Pe + vu]), BD = function (e, r, a) {
  Il(a);
  var l = e._gsap;
  if (l.spacerIsNative) Il(l.spacerState); else if (e._gsap.swappedIn) {
    var u = r.parentNode;
    u && (u.insertBefore(e, r), u.removeChild(r));
  }
  e._gsap.swappedIn = !1;
}, rm = function (e, r, a, l) {
  if (!e._gsap.swappedIn) {
    for (var u = Xm.length, c = r.style, f = e.style, p; u--; ) (p = Xm[u], c[p] = a[p]);
    (c.position = a.position === "absolute" ? "absolute" : "relative", a.display === "inline" && (c.display = "inline-block"), f[k0] = f[H0] = "auto", c.flexBasis = a.flexBasis || "auto", c.overflow = "visible", c.boxSizing = "border-box", c[Ds] = ah(e, Ln) + Ze, c[Ns] = ah(e, Ie) + Ze, c[Pe] = f[ji] = f[xT] = f[ET] = "0", Il(l), f[Ds] = f["max" + no] = a[Ds], f[Ns] = f["max" + q0] = a[Ns], f[Pe] = a[Pe], e.parentNode !== r && (e.parentNode.insertBefore(r, e), r.appendChild(e)), e._gsap.swappedIn = !0);
  }
}, jD = /([A-Z])/g, Il = function (e) {
  if (e) {
    var r = e.t.style, a = e.length, l = 0, u, c;
    for ((e.t._gsap || ut.core.getCache(e.t)).uncache = 1; l < a; l += 2) (c = e[l + 1], u = e[l], c ? r[u] = c : r[u] && r.removeProperty(u.replace(jD, "-$1").toLowerCase()));
  }
}, bf = function (e) {
  for (var r = Hf.length, a = e.style, l = [], u = 0; u < r; u++) l.push(Hf[u], a[Hf[u]]);
  return (l.t = e, l);
}, HD = function (e, r, a) {
  for (var l = [], u = e.length, c = a ? 8 : 0, f; c < u; c += 2) (f = e[c], l.push(f, (f in r) ? r[f] : e[c + 1]));
  return (l.t = e.t, l);
}, kf = {
  left: 0,
  top: 0
}, cS = function (e, r, a, l, u, c, f, p, m, g, v, y, _, w) {
  (Sn(e) && (e = e(p)), ui(e) && e.substr(0, 3) === "max" && (e = y + (e.charAt(4) === "=" ? Uf("0" + e.substr(3), a) : 0)));
  var b = _ ? _.time() : 0, E, x, A;
  if ((_ && _.seek(0), isNaN(e) || (e = +e), au(e))) (_ && (e = ut.utils.mapRange(_.scrollTrigger.start, _.scrollTrigger.end, 0, y, e)), f && Bf(f, a, l, !0)); else {
    Sn(r) && (r = r(p));
    var R = (e || "0").split(" "), M, B, L, O;
    (A = Xn(r, p) || Zt, M = Xr(A) || ({}), (!M || !M.left && !M.top) && Hi(A).display === "none" && (O = A.style.display, A.style.display = "block", M = Xr(A), O ? A.style.display = O : A.style.removeProperty("display")), B = Uf(R[0], M[l.d]), L = Uf(R[1] || "0", a), e = M[l.p] - m[l.p] - g + B + u - L, f && Bf(f, L, l, a - L < 20 || f._isStart && L > 20), a -= a - L);
  }
  if ((w && (p[w] = e || -.001, e < 0 && (e = 0)), c)) {
    var H = e + a, P = c._isStart;
    (E = "scroll" + l.d2, Bf(c, H, l, P && H > 20 || !P && (v ? Math.max(Zt[E], fi[E]) : c.parentNode[E]) <= H + 1), v && (m = Xr(f), v && (c.style[l.op.p] = m[l.op.p] - l.op.m - c._offset + Ze)));
  }
  return (_ && A && (E = Xr(A), _.seek(y), x = Xr(A), _._caScrollDist = E[l.p] - x[l.p], e = e / _._caScrollDist * y), _ && _.seek(b), _ ? e : Math.round(e));
}, kD = /(webkit|moz|length|cssText|inset)/i, fS = function (e, r, a, l) {
  if (e.parentNode !== r) {
    var u = e.style, c, f;
    if (r === Zt) {
      (e._stOrig = u.cssText, f = Hi(e));
      for (c in f) !+c && !kD.test(c) && f[c] && typeof u[c] == "string" && c !== "0" && (u[c] = f[c]);
      (u.top = a, u.left = l);
    } else u.cssText = e._stOrig;
    (ut.core.getCache(e).uncache = 1, r.appendChild(e));
  }
}, DT = function (e, r, a) {
  var l = r, u = l;
  return function (c) {
    var f = Math.round(e());
    return (f !== l && f !== u && Math.abs(f - l) > 3 && Math.abs(f - u) > 3 && (c = f, a && a()), u = l, l = Math.round(c), l);
  };
}, wf = function (e, r, a) {
  var l = {};
  (l[r.p] = "+=" + a, ut.set(e, l));
}, hS = function (e, r) {
  var a = Za(e, r), l = "_scroll" + r.p2, u = function c(f, p, m, g, v) {
    var y = c.tween, _ = p.onComplete, w = {};
    m = m || a();
    var b = DT(a, m, function () {
      (y.kill(), c.tween = 0);
    });
    return (v = g && v || 0, g = g || f - m, y && y.kill(), p[l] = f, p.inherit = !1, p.modifiers = w, w[l] = function () {
      return b(m + g * y.ratio + v * y.ratio * y.ratio);
    }, p.onUpdate = function () {
      (Ut.cache++, c.tween && Ir());
    }, p.onComplete = function () {
      (c.tween = 0, _ && _.call(y));
    }, y = c.tween = ut.to(e, p), y);
  };
  return (e[l] = a, a.wheelHandler = function () {
    return u.tween && u.tween.kill() && (u.tween = 0);
  }, en(e, "wheel", a.wheelHandler), zt.isTouch && en(e, "touchmove", a.wheelHandler), u);
}, zt = (function () {
  function i(r, a) {
    (zl || i.register(ut) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), Ym(this), this.init(r, a));
  }
  var e = i.prototype;
  return (e.init = function (a, l) {
    if ((this.progress = this.start = 0, this.vars && this.kill(!0, !0), !iu)) {
      this.update = this.refresh = this.kill = hr;
      return;
    }
    a = aS(ui(a) || au(a) || a.nodeType ? {
      trigger: a
    } : a, _f);
    var u = a, c = u.onUpdate, f = u.toggleClass, p = u.id, m = u.onToggle, g = u.onRefresh, v = u.scrub, y = u.trigger, _ = u.pin, w = u.pinSpacing, b = u.invalidateOnRefresh, E = u.anticipatePin, x = u.onScrubComplete, A = u.onSnapComplete, R = u.once, M = u.snap, B = u.pinReparent, L = u.pinSpacer, O = u.containerAnimation, H = u.fastScrollEnd, P = u.preventOverlaps, V = a.horizontal || a.containerAnimation && a.horizontal !== !1 ? Ln : Ie, X = !v && v !== 0, k = Xn(a.scroller || Lt), $ = ut.core.getCache(k), it = Bs(k), nt = (("pinType" in a) ? a.pinType : Ga(k, "pinType") || it && "fixed") === "fixed", U = [a.onEnter, a.onLeave, a.onEnterBack, a.onLeaveBack], K = X && a.toggleActions.split(" "), at = ("markers" in a) ? a.markers : _f.markers, dt = it ? 0 : parseFloat(Hi(k)["border" + V.p2 + no]) || 0, D = this, z = a.onRefreshInit && (function () {
      return a.onRefreshInit(D);
    }), Z = CD(k, it, V), tt = MD(k, it), rt = 0, ft = 0, pt = 0, lt = Za(k, V), _t, Et, Fe, ye, ue, Ht, It, We, an, Q, hn, Wn, _i, le, Gi, tr, ze, je, Pi, pe, dn, jn, Si, $a, Oe, er, _e, Tn, He, nr, wr, Rt, bi, pn, mn, Qe, wi, Ti, Vi;
    if ((D._startClamp = D._endClamp = !1, D._dir = V, E *= 45, D.scroller = k, D.scroll = O ? O.time.bind(O) : lt, ye = lt(), D.vars = a, l = l || a.animation, ("refreshPriority" in a) && (gT = 1, a.refreshPriority === -9999 && (Su = D)), $.tweenScroll = $.tweenScroll || ({
      top: hS(k, Ie),
      left: hS(k, Ln)
    }), D.tweenTo = _t = $.tweenScroll[V.p], D.scrubDuration = function (st) {
      (bi = au(st) && st, bi ? Rt ? Rt.duration(st) : Rt = ut.to(l, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: bi,
        paused: !0,
        onComplete: function () {
          return x && x(D);
        }
      }) : (Rt && Rt.progress(1).kill(), Rt = 0));
    }, l && (l.vars.lazy = !1, l._initted && !D.isReverted || l.vars.immediateRender !== !1 && a.immediateRender !== !1 && l.duration() && l.render(0, !0, !0), D.animation = l.pause(), l.scrollTrigger = D, D.scrubDuration(v), nr = 0, p || (p = l.vars.id)), M && ((!bs(M) || M.push) && (M = {
      snapTo: M
    }), ("scrollBehavior" in Zt.style) && ut.set(it ? [Zt, fi] : k, {
      scrollBehavior: "auto"
    }), Ut.forEach(function (st) {
      return Sn(st) && st.target === (it ? $t.scrollingElement || fi : k) && (st.smooth = !1);
    }), Fe = Sn(M.snapTo) ? M.snapTo : M.snapTo === "labels" ? DD(l) : M.snapTo === "labelsDirectional" ? ND(l) : M.directional !== !1 ? function (st, wt) {
      return Y0(M.snapTo)(st, yn() - ft < 500 ? 0 : wt.direction);
    } : ut.utils.snap(M.snapTo), pn = M.duration || ({
      min: .1,
      max: 2
    }), pn = bs(pn) ? pu(pn.min, pn.max) : pu(pn, pn), mn = ut.delayedCall(M.delay || bi / 2 || .1, function () {
      var st = lt(), wt = yn() - ft < 500, gt = _t.tween;
      if ((wt || Math.abs(D.getVelocity()) < 10) && !gt && !Sh && rt !== st) {
        var St = (st - Ht) / le, Ae = l && !X ? l.totalProgress() : St, Dt = wt ? 0 : (Ae - wr) / (yn() - nu) * 1e3 || 0, me = ut.utils.clamp(-St, 1 - St, Cl(Dt / 2) * Dt / .185), ce = St + (M.inertia === !1 ? 0 : me), At, Ct, Pt = M, En = Pt.onStart, fe = Pt.onInterrupt, xn = Pt.onComplete;
        if ((At = Fe(ce, D), au(At) || (At = ce), Ct = Math.max(0, Math.round(Ht + At * le)), st <= It && st >= Ht && Ct !== st)) {
          if (gt && !gt._initted && gt.data <= Cl(Ct - st)) return;
          (M.inertia === !1 && (me = At - St), _t(Ct, {
            duration: pn(Cl(Math.max(Cl(ce - Ae), Cl(At - Ae)) * .185 / Dt / .05 || 0)),
            ease: M.ease || "power3",
            data: Cl(Ct - st),
            onInterrupt: function () {
              return mn.restart(!0) && fe && Rl(D, fe);
            },
            onComplete: function () {
              (D.update(), rt = lt(), l && !X && (Rt ? Rt.resetTo("totalProgress", At, l._tTime / l._tDur) : l.progress(At)), nr = wr = l && !X ? l.totalProgress() : D.progress, A && A(D), xn && Rl(D, xn));
            }
          }, st, me * le, Ct - st - me * le), En && Rl(D, En, _t.tween));
        }
      } else D.isActive && rt !== st && mn.restart(!0);
    }).pause()), p && (Pm[p] = D), y = D.trigger = Xn(y || _ !== !0 && _), Vi = y && y._gsap && y._gsap.stRevert, Vi && (Vi = Vi(D)), _ = _ === !0 ? y : Xn(_), ui(f) && (f = {
      targets: y,
      className: f
    }), _ && (w === !1 || w === ji || (w = !w && _.parentNode && _.parentNode.style && Hi(_.parentNode).display === "flex" ? !1 : Pe), D.pin = _, Et = ut.core.getCache(_), Et.spacer ? Gi = Et.pinState : (L && (L = Xn(L), L && !L.nodeType && (L = L.current || L.nativeElement), Et.spacerIsNative = !!L, L && (Et.spacerState = bf(L))), Et.spacer = je = L || $t.createElement("div"), je.classList.add("pin-spacer"), p && je.classList.add("pin-spacer-" + p), Et.pinState = Gi = bf(_)), a.force3D !== !1 && ut.set(_, {
      force3D: !0
    }), D.spacer = je = Et.spacer, He = Hi(_), $a = He[w + V.os2], pe = ut.getProperty(_), dn = ut.quickSetter(_, V.a, Ze), rm(_, je, He), ze = bf(_)), at)) {
      (Wn = bs(at) ? aS(at, sS) : sS, Q = Sf("scroller-start", p, k, V, Wn, 0), hn = Sf("scroller-end", p, k, V, Wn, 0, Q), Pi = Q["offset" + V.op.d2]);
      var ia = Xn(Ga(k, "content") || k);
      (We = this.markerStart = Sf("start", p, ia, V, Wn, Pi, 0, O), an = this.markerEnd = Sf("end", p, ia, V, Wn, Pi, 0, O), O && (Ti = ut.quickSetter([We, an], V.a, Ze)), !nt && !(_r.length && Ga(k, "fixedMarkers") === !0) && (zD(it ? Zt : k), ut.set([Q, hn], {
        force3D: !0
      }), er = ut.quickSetter(Q, V.a, Ze), Tn = ut.quickSetter(hn, V.a, Ze)));
    }
    if (O) {
      var bt = O.vars.onUpdate, mt = O.vars.onUpdateParams;
      O.eventCallback("onUpdate", function () {
        (D.update(0, 0, 1), bt && bt.apply(O, mt || []));
      });
    }
    if ((D.previous = function () {
      return Mt[Mt.indexOf(D) - 1];
    }, D.next = function () {
      return Mt[Mt.indexOf(D) + 1];
    }, D.revert = function (st, wt) {
      if (!wt) return D.kill(!0);
      var gt = st !== !1 || !D.enabled, St = vn;
      gt !== D.isReverted && (gt && (Qe = Math.max(lt(), D.scroll.rec || 0), pt = D.progress, wi = l && l.progress()), We && [We, an, Q, hn].forEach(function (Ae) {
        return Ae.style.display = gt ? "none" : "block";
      }), gt && (vn = D, D.update(gt)), _ && (!B || !D.isActive) && (gt ? BD(_, je, Gi) : rm(_, je, Hi(_), Oe)), gt || D.update(gt), vn = St, D.isReverted = gt);
    }, D.refresh = function (st, wt, gt, St) {
      if (!((vn || !D.enabled) && !wt)) {
        if (_ && st && Yi) {
          en(i, "scrollEnd", AT);
          return;
        }
        (!Dn && z && z(D), vn = D, _t.tween && !gt && (_t.tween.kill(), _t.tween = 0), Rt && Rt.pause(), b && l && (l.revert({
          kill: !1
        }).invalidate(), l.getChildren ? l.getChildren(!0, !0, !1).forEach(function (ar) {
          return ar.vars.immediateRender && ar.render(0, !0, !0);
        }) : l.vars.immediateRender && l.render(0, !0, !0)), D.isReverted || D.revert(!0, !0), D._subPinOffset = !1);
        var Ae = Z(), Dt = tt(), me = O ? O.duration() : vr(k, V), ce = le <= .01 || !le, At = 0, Ct = St || 0, Pt = bs(gt) ? gt.end : a.end, En = a.endTrigger || y, fe = bs(gt) ? gt.start : a.start || (a.start === 0 || !y ? 0 : _ ? "0 0" : "0 100%"), xn = D.pinnedContainer = a.pinnedContainer && Xn(a.pinnedContainer, D), $n = y && Math.max(0, Mt.indexOf(D)) || 0, Se = $n, De, be, Hn, ir, we, Nt, ti, Ps, rr, Ei, xi, ra, ts;
        for (at && bs(gt) && (ra = ut.getProperty(Q, V.p), ts = ut.getProperty(hn, V.p)); Se-- > 0; ) (Nt = Mt[Se], Nt.end || Nt.refresh(0, 1) || (vn = D), ti = Nt.pin, ti && (ti === y || ti === _ || ti === xn) && !Nt.isReverted && (Ei || (Ei = []), Ei.unshift(Nt), Nt.revert(!0, !0)), Nt !== Mt[Se] && ($n--, Se--));
        for ((Sn(fe) && (fe = fe(D)), fe = eS(fe, "start", D), Ht = cS(fe, y, Ae, V, lt(), We, Q, D, Dt, dt, nt, me, O, D._startClamp && "_startClamp") || (_ ? -.001 : 0), Sn(Pt) && (Pt = Pt(D)), ui(Pt) && !Pt.indexOf("+=") && (~Pt.indexOf(" ") ? Pt = (ui(fe) ? fe.split(" ")[0] : "") + Pt : (At = Uf(Pt.substr(2), Ae), Pt = ui(fe) ? fe : (O ? ut.utils.mapRange(0, O.duration(), O.scrollTrigger.start, O.scrollTrigger.end, Ht) : Ht) + At, En = y)), Pt = eS(Pt, "end", D), It = Math.max(Ht, cS(Pt || (En ? "100% 0" : me), En, Ae, V, lt() + At, an, hn, D, Dt, dt, nt, me, O, D._endClamp && "_endClamp")) || -.001, At = 0, Se = $n); Se--; ) (Nt = Mt[Se] || ({}), ti = Nt.pin, ti && Nt.start - Nt._pinPush <= Ht && !O && Nt.end > 0 && (De = Nt.end - (D._startClamp ? Math.max(0, Nt.start) : Nt.start), (ti === y && Nt.start - Nt._pinPush < Ht || ti === xn) && isNaN(fe) && (At += De * (1 - Nt.progress)), ti === _ && (Ct += De)));
        if ((Ht += At, It += At, D._startClamp && (D._startClamp += At), D._endClamp && !Dn && (D._endClamp = It || -.001, It = Math.min(It, vr(k, V))), le = It - Ht || (Ht -= .01) && .001, ce && (pt = ut.utils.clamp(0, 1, ut.utils.normalize(Ht, It, Qe))), D._pinPush = Ct, We && At && (De = {}, De[V.a] = "+=" + At, xn && (De[V.p] = "-=" + lt()), ut.set([We, an], De)), _ && !(Gm && D.end >= vr(k, V)))) (De = Hi(_), ir = V === Ie, Hn = lt(), jn = parseFloat(pe(V.a)) + Ct, !me && It > 1 && (xi = (it ? $t.scrollingElement || fi : k).style, xi = {
          style: xi,
          value: xi["overflow" + V.a.toUpperCase()]
        }, it && Hi(Zt)["overflow" + V.a.toUpperCase()] !== "scroll" && (xi.style["overflow" + V.a.toUpperCase()] = "scroll")), rm(_, je, De), ze = bf(_), be = Xr(_, !0), Ps = nt && Za(k, ir ? Ln : Ie)(), w ? (Oe = [w + V.os2, le + Ct + Ze], Oe.t = je, Se = w === Pe ? ah(_, V) + le + Ct : 0, Se && (Oe.push(V.d, Se + Ze), je.style.flexBasis !== "auto" && (je.style.flexBasis = Se + Ze)), Il(Oe), xn && Mt.forEach(function (ar) {
          ar.pin === xn && ar.vars.pinSpacing !== !1 && (ar._subPinOffset = !0);
        }), nt && lt(Qe)) : (Se = ah(_, V), Se && je.style.flexBasis !== "auto" && (je.style.flexBasis = Se + Ze)), nt && (we = {
          top: be.top + (ir ? Hn - Ht : Ps) + Ze,
          left: be.left + (ir ? Ps : Hn - Ht) + Ze,
          boxSizing: "border-box",
          position: "fixed"
        }, we[Ds] = we["max" + no] = Math.ceil(be.width) + Ze, we[Ns] = we["max" + q0] = Math.ceil(be.height) + Ze, we[ji] = we[ji + yu] = we[ji + gu] = we[ji + _u] = we[ji + vu] = "0", we[Pe] = De[Pe], we[Pe + yu] = De[Pe + yu], we[Pe + gu] = De[Pe + gu], we[Pe + _u] = De[Pe + _u], we[Pe + vu] = De[Pe + vu], tr = HD(Gi, we, B), Dn && lt(0)), l ? (rr = l._initted, tm(1), l.render(l.duration(), !0, !0), Si = pe(V.a) - jn + le + Ct, _e = Math.abs(le - Si) > 1, nt && _e && tr.splice(tr.length - 2, 2), l.render(0, !0, !0), rr || l.invalidate(!0), l.parent || l.totalTime(l.totalTime()), tm(0)) : Si = le, xi && (xi.value ? xi.style["overflow" + V.a.toUpperCase()] = xi.value : xi.style.removeProperty("overflow-" + V.a))); else if (y && lt() && !O) for (be = y.parentNode; be && be !== Zt; ) (be._pinOffset && (Ht -= be._pinOffset, It -= be._pinOffset), be = be.parentNode);
        (Ei && Ei.forEach(function (ar) {
          return ar.revert(!1, !0);
        }), D.start = Ht, D.end = It, ye = ue = Dn ? Qe : lt(), !O && !Dn && (ye < Qe && lt(Qe), D.scroll.rec = 0), D.revert(!1, !0), ft = yn(), mn && (rt = -1, mn.restart(!0)), vn = 0, l && X && (l._initted || wi) && l.progress() !== wi && l.progress(wi || 0, !0).render(l.time(), !0, !0), (ce || pt !== D.progress || O || b || l && !l._initted) && (l && !X && (l._initted || pt || l.vars.immediateRender !== !1) && l.totalProgress(O && Ht < -.001 && !pt ? ut.utils.normalize(Ht, It, 0) : pt, !0), D.progress = ce || (ye - Ht) / le === pt ? 0 : pt), _ && w && (je._pinOffset = Math.round(D.progress * Si)), Rt && Rt.invalidate(), isNaN(ra) || (ra -= ut.getProperty(Q, V.p), ts -= ut.getProperty(hn, V.p), wf(Q, V, ra), wf(We, V, ra - (St || 0)), wf(hn, V, ts), wf(an, V, ts - (St || 0))), ce && !Dn && D.update(), g && !Dn && !_i && (_i = !0, g(D), _i = !1));
      }
    }, D.getVelocity = function () {
      return (lt() - ue) / (yn() - nu) * 1e3 || 0;
    }, D.endAnimation = function () {
      ($o(D.callbackAnimation), l && (Rt ? Rt.progress(1) : l.paused() ? X || $o(l, D.direction < 0, 1) : $o(l, l.reversed())));
    }, D.labelToScroll = function (st) {
      return l && l.labels && (Ht || D.refresh() || Ht) + l.labels[st] / l.duration() * le || 0;
    }, D.getTrailing = function (st) {
      var wt = Mt.indexOf(D), gt = D.direction > 0 ? Mt.slice(0, wt).reverse() : Mt.slice(wt + 1);
      return (ui(st) ? gt.filter(function (St) {
        return St.vars.preventOverlaps === st;
      }) : gt).filter(function (St) {
        return D.direction > 0 ? St.end <= Ht : St.start >= It;
      });
    }, D.update = function (st, wt, gt) {
      if (!(O && !gt && !st)) {
        var St = Dn === !0 ? Qe : D.scroll(), Ae = st ? 0 : (St - Ht) / le, Dt = Ae < 0 ? 0 : Ae > 1 ? 1 : Ae || 0, me = D.progress, ce, At, Ct, Pt, En, fe, xn, $n;
        if ((wt && (ue = ye, ye = O ? lt() : St, M && (wr = nr, nr = l && !X ? l.totalProgress() : Dt)), E && _ && !vn && !mf && Yi && (!Dt && Ht < St + (St - ue) / (yn() - nu) * E ? Dt = 1e-4 : Dt === 1 && It > St + (St - ue) / (yn() - nu) * E && (Dt = .9999)), Dt !== me && D.enabled)) {
          if ((ce = D.isActive = !!Dt && Dt < 1, At = !!me && me < 1, fe = ce !== At, En = fe || !!Dt != !!me, D.direction = Dt > me ? 1 : -1, D.progress = Dt, En && !vn && (Ct = Dt && !me ? 0 : Dt === 1 ? 1 : me === 1 ? 2 : 3, X && (Pt = !fe && K[Ct + 1] !== "none" && K[Ct + 1] || K[Ct], $n = l && (Pt === "complete" || Pt === "reset" || (Pt in l)))), P && (fe || $n) && ($n || v || !l) && (Sn(P) ? P(D) : D.getTrailing(P).forEach(function (Hn) {
            return Hn.endAnimation();
          })), X || (Rt && !vn && !mf ? (Rt._dp._time - Rt._start !== Rt._time && Rt.render(Rt._dp._time - Rt._start), Rt.resetTo ? Rt.resetTo("totalProgress", Dt, l._tTime / l._tDur) : (Rt.vars.totalProgress = Dt, Rt.invalidate().restart())) : l && l.totalProgress(Dt, !!(vn && (ft || st)))), _)) {
            if ((st && w && (je.style[w + V.os2] = $a), !nt)) dn(ru(jn + Si * Dt)); else if (En) {
              if ((xn = !st && Dt > me && It + 1 > St && St + 1 >= vr(k, V), B)) if (!st && (ce || xn)) {
                var Se = Xr(_, !0), De = St - Ht;
                fS(_, Zt, Se.top + (V === Ie ? De : 0) + Ze, Se.left + (V === Ie ? 0 : De) + Ze);
              } else fS(_, je);
              (Il(ce || xn ? tr : ze), _e && Dt < 1 && ce || dn(jn + (Dt === 1 && !xn ? Si : 0)));
            }
          }
          (M && !_t.tween && !vn && !mf && mn.restart(!0), f && (fe || R && Dt && (Dt < 1 || !em)) && Hu(f.targets).forEach(function (Hn) {
            return Hn.classList[ce || R ? "add" : "remove"](f.className);
          }), c && !X && !st && c(D), En && !vn ? (X && ($n && (Pt === "complete" ? l.pause().totalProgress(1) : Pt === "reset" ? l.restart(!0).pause() : Pt === "restart" ? l.restart(!0) : l[Pt]()), c && c(D)), (fe || !em) && (m && fe && Rl(D, m), U[Ct] && Rl(D, U[Ct]), R && (Dt === 1 ? D.kill(!1, 1) : U[Ct] = 0), fe || (Ct = Dt === 1 ? 1 : 3, U[Ct] && Rl(D, U[Ct]))), H && !ce && Math.abs(D.getVelocity()) > (au(H) ? H : 2500) && ($o(D.callbackAnimation), Rt ? Rt.progress(1) : $o(l, Pt === "reverse" ? 1 : !Dt, 1))) : X && c && !vn && c(D));
        }
        if (Tn) {
          var be = O ? St / O.duration() * (O._caScrollDist || 0) : St;
          (er(be + (Q._isFlipped ? 1 : 0)), Tn(be));
        }
        Ti && Ti(-St / O.duration() * (O._caScrollDist || 0));
      }
    }, D.enable = function (st, wt) {
      D.enabled || (D.enabled = !0, en(k, "resize", su), it || en(k, "scroll", Ml), z && en(i, "refreshInit", z), st !== !1 && (D.progress = pt = 0, ye = ue = rt = lt()), wt !== !1 && D.refresh());
    }, D.getTween = function (st) {
      return st && _t ? _t.tween : Rt;
    }, D.setPositions = function (st, wt, gt, St) {
      if (O) {
        var Ae = O.scrollTrigger, Dt = O.duration(), me = Ae.end - Ae.start;
        (st = Ae.start + me * st / Dt, wt = Ae.start + me * wt / Dt);
      }
      (D.refresh(!1, !1, {
        start: nS(st, gt && !!D._startClamp),
        end: nS(wt, gt && !!D._endClamp)
      }, St), D.update());
    }, D.adjustPinSpacing = function (st) {
      if (Oe && st) {
        var wt = Oe.indexOf(V.d) + 1;
        (Oe[wt] = parseFloat(Oe[wt]) + st + Ze, Oe[1] = parseFloat(Oe[1]) + st + Ze, Il(Oe));
      }
    }, D.disable = function (st, wt) {
      if ((st !== !1 && D.revert(!0, !0), D.enabled && (D.enabled = D.isActive = !1, wt || Rt && Rt.pause(), Qe = 0, Et && (Et.uncache = 1), z && tn(i, "refreshInit", z), mn && (mn.pause(), _t.tween && _t.tween.kill() && (_t.tween = 0)), !it))) {
        for (var gt = Mt.length; gt--; ) if (Mt[gt].scroller === k && Mt[gt] !== D) return;
        (tn(k, "resize", su), it || tn(k, "scroll", Ml));
      }
    }, D.kill = function (st, wt) {
      (D.disable(st, wt), Rt && !wt && Rt.kill(), p && delete Pm[p]);
      var gt = Mt.indexOf(D);
      (gt >= 0 && Mt.splice(gt, 1), gt === zn && jf > 0 && zn--, gt = 0, Mt.forEach(function (St) {
        return St.scroller === D.scroller && (gt = 1);
      }), gt || Dn || (D.scroll.rec = 0), l && (l.scrollTrigger = null, st && l.revert({
        kill: !1
      }), wt || l.kill()), We && [We, an, Q, hn].forEach(function (St) {
        return St.parentNode && St.parentNode.removeChild(St);
      }), Su === D && (Su = 0), _ && (Et && (Et.uncache = 1), gt = 0, Mt.forEach(function (St) {
        return St.pin === _ && gt++;
      }), gt || (Et.spacer = 0)), a.onKill && a.onKill(D));
    }, Mt.push(D), D.enable(!1, !1), Vi && Vi(D), l && l.add && !le)) {
      var Vt = D.update;
      (D.update = function () {
        (D.update = Vt, Ut.cache++, Ht || It || D.refresh());
      }, ut.delayedCall(.01, D.update), le = .01, Ht = It = 0);
    } else D.refresh();
    _ && UD();
  }, i.register = function (a) {
    return (zl || (ut = a || bT(), ST() && window.document && i.enable(), zl = iu), zl);
  }, i.defaults = function (a) {
    if (a) for (var l in a) _f[l] = a[l];
    return _f;
  }, i.disable = function (a, l) {
    (iu = 0, Mt.forEach(function (c) {
      return c[l ? "kill" : "disable"](a);
    }), tn(Lt, "wheel", Ml), tn($t, "scroll", Ml), clearInterval(pf), tn($t, "touchcancel", hr), tn(Zt, "touchstart", hr), vf(tn, $t, "pointerdown,touchstart,mousedown", iS), vf(tn, $t, "pointerup,touchend,mouseup", rS), rh.kill(), gf(tn));
    for (var u = 0; u < Ut.length; u += 3) (yf(tn, Ut[u], Ut[u + 1]), yf(tn, Ut[u], Ut[u + 2]));
  }, i.enable = function () {
    if ((Lt = window, $t = document, fi = $t.documentElement, Zt = $t.body, ut)) {
      if ((Hu = ut.utils.toArray, pu = ut.utils.clamp, Ym = ut.core.context || hr, tm = ut.core.suppressOverwrites || hr, B0 = Lt.history.scrollRestoration || "auto", Vm = Lt.pageYOffset || 0, ut.core.globals("ScrollTrigger", i), Zt)) {
        (iu = 1, Zl = document.createElement("div"), Zl.style.height = "100vh", Zl.style.position = "absolute", zT(), RD(), Be.register(ut), i.isTouch = Be.isTouch, Ma = Be.isTouch && (/(iPad|iPhone|iPod|Mac)/g).test(navigator.userAgent), qm = Be.isTouch === 1, en(Lt, "wheel", Ml), U0 = [Lt, $t, fi, Zt], ut.matchMedia ? (i.matchMedia = function (g) {
          var v = ut.matchMedia(), y;
          for (y in g) v.add(y, g[y]);
          return v;
        }, ut.addEventListener("matchMediaInit", function () {
          (CT(), G0());
        }), ut.addEventListener("matchMediaRevert", function () {
          return RT();
        }), ut.addEventListener("matchMedia", function () {
          (Os(0, 1), Hs("matchMedia"));
        }), ut.matchMedia().add("(orientation: portrait)", function () {
          return (im(), im);
        })) : console.warn("Requires GSAP 3.11.0 or later"), im(), en($t, "scroll", Ml));
        var a = Zt.hasAttribute("style"), l = Zt.style, u = l.borderTopStyle, c = ut.core.Animation.prototype, f, p;
        for ((c.revert || Object.defineProperty(c, "revert", {
          value: function () {
            return this.time(-.01, !0);
          }
        }), l.borderTopStyle = "solid", f = Xr(Zt), Ie.m = Math.round(f.top + Ie.sc()) || 0, Ln.m = Math.round(f.left + Ln.sc()) || 0, u ? l.borderTopStyle = u : l.removeProperty("border-top-style"), a || (Zt.setAttribute("style", ""), Zt.removeAttribute("style")), pf = setInterval(lS, 250), ut.delayedCall(.5, function () {
          return mf = 0;
        }), en($t, "touchcancel", hr), en(Zt, "touchstart", hr), vf(en, $t, "pointerdown,touchstart,mousedown", iS), vf(en, $t, "pointerup,touchend,mouseup", rS), km = ut.utils.checkPrefix("transform"), Hf.push(km), zl = yn(), rh = ut.delayedCall(.2, Os).pause(), Dl = [$t, "visibilitychange", function () {
          var g = Lt.innerWidth, v = Lt.innerHeight;
          $t.hidden ? ($1 = g, tS = v) : ($1 !== g || tS !== v) && su();
        }, $t, "DOMContentLoaded", Os, Lt, "load", Os, Lt, "resize", su], gf(en), Mt.forEach(function (g) {
          return g.enable(0, 1);
        }), p = 0); p < Ut.length; p += 3) (yf(tn, Ut[p], Ut[p + 1]), yf(tn, Ut[p], Ut[p + 2]));
      } else if ($t) {
        var m = function g() {
          (i.enable(), $t.removeEventListener("DOMContentLoaded", g));
        };
        $t.addEventListener("DOMContentLoaded", m);
      }
    }
  }, i.config = function (a) {
    ("limitCallbacks" in a) && (em = !!a.limitCallbacks);
    var l = a.syncInterval;
    (l && clearInterval(pf) || (pf = l) && setInterval(lS, l), ("ignoreMobileResize" in a) && (qm = i.isTouch === 1 && a.ignoreMobileResize), ("autoRefreshEvents" in a) && (gf(tn) || gf(en, a.autoRefreshEvents || "none"), vT = (a.autoRefreshEvents + "").indexOf("resize") === -1));
  }, i.scrollerProxy = function (a, l) {
    var u = Xn(a), c = Ut.indexOf(u), f = Bs(u);
    (~c && Ut.splice(c, f ? 6 : 2), l && (f ? _r.unshift(Lt, l, Zt, l, fi, l) : _r.unshift(u, l)));
  }, i.clearMatchMedia = function (a) {
    Mt.forEach(function (l) {
      return l._ctx && l._ctx.query === a && l._ctx.kill(!0, !0);
    });
  }, i.isInViewport = function (a, l, u) {
    var c = (ui(a) ? Xn(a) : a).getBoundingClientRect(), f = c[u ? Ds : Ns] * l || 0;
    return u ? c.right - f > 0 && c.left + f < Lt.innerWidth : c.bottom - f > 0 && c.top + f < Lt.innerHeight;
  }, i.positionInViewport = function (a, l, u) {
    ui(a) && (a = Xn(a));
    var c = a.getBoundingClientRect(), f = c[u ? Ds : Ns], p = l == null ? f / 2 : (l in sh) ? sh[l] * f : ~l.indexOf("%") ? parseFloat(l) * f / 100 : parseFloat(l) || 0;
    return u ? (c.left + p) / Lt.innerWidth : (c.top + p) / Lt.innerHeight;
  }, i.killAll = function (a) {
    if ((Mt.slice(0).forEach(function (u) {
      return u.vars.id !== "ScrollSmoother" && u.kill();
    }), a !== !0)) {
      var l = js.killAll || [];
      (js = {}, l.forEach(function (u) {
        return u();
      }));
    }
  }, i);
})();
zt.version = "3.15.0";
zt.saveStyles = function (i) {
  return i ? Hu(i).forEach(function (e) {
    if (e && e.style) {
      var r = oi.indexOf(e);
      (r >= 0 && oi.splice(r, 5), oi.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), ut.core.getCache(e), Ym()));
    }
  }) : oi;
};
zt.revert = function (i, e) {
  return G0(!i, e);
};
zt.create = function (i, e) {
  return new zt(i, e);
};
zt.refresh = function (i) {
  return i ? su(!0) : (zl || zt.register()) && Os(!0);
};
zt.update = function (i) {
  return ++Ut.cache && Ir(i === !0 ? 2 : 0);
};
zt.clearScrollMemory = MT;
zt.maxScroll = function (i, e) {
  return vr(i, e ? Ln : Ie);
};
zt.getScrollFunc = function (i, e) {
  return Za(Xn(i), e ? Ln : Ie);
};
zt.getById = function (i) {
  return Pm[i];
};
zt.getAll = function () {
  return Mt.filter(function (i) {
    return i.vars.id !== "ScrollSmoother";
  });
};
zt.isScrolling = function () {
  return !!Yi;
};
zt.snapDirectional = Y0;
zt.addEventListener = function (i, e) {
  var r = js[i] || (js[i] = []);
  ~r.indexOf(e) || r.push(e);
};
zt.removeEventListener = function (i, e) {
  var r = js[i], a = r && r.indexOf(e);
  a >= 0 && r.splice(a, 1);
};
zt.batch = function (i, e) {
  var r = [], a = {}, l = e.interval || .016, u = e.batchMax || 1e9, c = function (m, g) {
    var v = [], y = [], _ = ut.delayedCall(l, function () {
      (g(v, y), v = [], y = []);
    }).pause();
    return function (w) {
      (v.length || _.restart(!0), v.push(w.trigger), y.push(w), u <= v.length && _.progress(1));
    };
  }, f;
  for (f in e) a[f] = f.substr(0, 2) === "on" && Sn(e[f]) && f !== "onRefreshInit" ? c(f, e[f]) : e[f];
  return (Sn(u) && (u = u(), en(zt, "refresh", function () {
    return u = e.batchMax();
  })), Hu(i).forEach(function (p) {
    var m = {};
    for (f in a) m[f] = a[f];
    (m.trigger = p, r.push(zt.create(m)));
  }), r);
};
var dS = function (e, r, a, l) {
  return (r > l ? e(l) : r < 0 && e(0), a > l ? (l - r) / (a - r) : a < 0 ? r / (r - a) : 1);
}, am = function i(e, r) {
  (r === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = r === !0 ? "auto" : r ? "pan-" + r + (Be.isTouch ? " pinch-zoom" : "") : "none", e === fi && i(Zt, r));
}, Tf = {
  auto: 1,
  scroll: 1
}, qD = function (e) {
  var r = e.event, a = e.target, l = e.axis, u = (r.changedTouches ? r.changedTouches[0] : r).target, c = u._gsap || ut.core.getCache(u), f = yn(), p;
  if (!c._isScrollT || f - c._isScrollT > 2e3) {
    for (; u && u !== Zt && (u.scrollHeight <= u.clientHeight && u.scrollWidth <= u.clientWidth || !(Tf[(p = Hi(u)).overflowY] || Tf[p.overflowX])); ) u = u.parentNode;
    (c._isScroll = u && u !== a && !Bs(u) && (Tf[(p = Hi(u)).overflowY] || Tf[p.overflowX]), c._isScrollT = f);
  }
  (c._isScroll || l === "x") && (r.stopPropagation(), r._gsapAllow = !0);
}, NT = function (e, r, a, l) {
  return Be.create({
    target: e,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: r,
    onWheel: l = l && qD,
    onPress: l,
    onDrag: l,
    onScroll: l,
    onEnable: function () {
      return a && en($t, Be.eventTypes[0], mS, !1, !0);
    },
    onDisable: function () {
      return tn($t, Be.eventTypes[0], mS, !0);
    }
  });
}, YD = /(input|label|select|textarea)/i, pS, mS = function (e) {
  var r = YD.test(e.target.tagName);
  (r || pS) && (e._gsapAllow = !0, pS = r);
}, GD = function (e) {
  (bs(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer");
  var r = e, a = r.normalizeScrollX, l = r.momentum, u = r.allowNestedScroll, c = r.onRelease, f, p, m = Xn(e.target) || fi, g = ut.core.globals().ScrollSmoother, v = g && g.get(), y = Ma && (e.content && Xn(e.content) || v && e.content !== !1 && !v.smooth() && v.content()), _ = Za(m, Ie), w = Za(m, Ln), b = 1, E = (Be.isTouch && Lt.visualViewport ? Lt.visualViewport.scale * Lt.visualViewport.width : Lt.outerWidth) / Lt.innerWidth, x = 0, A = Sn(l) ? function () {
    return l(f);
  } : function () {
    return l || 2.8;
  }, R, M, B = NT(m, e.type, !0, u), L = function () {
    return M = !1;
  }, O = hr, H = hr, P = function () {
    (p = vr(m, Ie), H = pu(Ma ? 1 : 0, p), a && (O = pu(0, vr(m, Ln))), R = Ls);
  }, V = function () {
    (y._gsap.y = ru(parseFloat(y._gsap.y) + _.offset) + "px", y.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(y._gsap.y) + ", 0, 1)", _.offset = _.cacheID = 0);
  }, X = function () {
    if (M) {
      requestAnimationFrame(L);
      var at = ru(f.deltaY / 2), dt = H(_.v - at);
      if (y && dt !== _.v + _.offset) {
        _.offset = dt - _.v;
        var D = ru((parseFloat(y && y._gsap.y) || 0) - _.offset);
        (y.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + D + ", 0, 1)", y._gsap.y = D + "px", _.cacheID = Ut.cache, Ir());
      }
      return !0;
    }
    (_.offset && V(), M = !0);
  }, k, $, it, nt, U = function () {
    (P(), k.isActive() && k.vars.scrollY > p && (_() > p ? k.progress(1) && _(p) : k.resetTo("scrollY", p)));
  };
  return (y && ut.set(y, {
    y: "+=0"
  }), e.ignoreCheck = function (K) {
    return Ma && K.type === "touchmove" && X() || b > 1.05 && K.type !== "touchstart" || f.isGesturing || K.touches && K.touches.length > 1;
  }, e.onPress = function () {
    M = !1;
    var K = b;
    (b = ru((Lt.visualViewport && Lt.visualViewport.scale || 1) / E), k.pause(), K !== b && am(m, b > 1.01 ? !0 : a ? !1 : "x"), $ = w(), it = _(), P(), R = Ls);
  }, e.onRelease = e.onGestureStart = function (K, at) {
    if ((_.offset && V(), !at)) nt.restart(!0); else {
      Ut.cache++;
      var dt = A(), D, z;
      (a && (D = w(), z = D + dt * .05 * -K.velocityX / .227, dt *= dS(w, D, z, vr(m, Ln)), k.vars.scrollX = O(z)), D = _(), z = D + dt * .05 * -K.velocityY / .227, dt *= dS(_, D, z, vr(m, Ie)), k.vars.scrollY = H(z), k.invalidate().duration(dt).play(.01), (Ma && k.vars.scrollY >= p || D >= p - 1) && ut.to({}, {
        onUpdate: U,
        duration: dt
      }));
    }
    c && c(K);
  }, e.onWheel = function () {
    (k._ts && k.pause(), yn() - x > 1e3 && (R = 0, x = yn()));
  }, e.onChange = function (K, at, dt, D, z) {
    if ((Ls !== R && P(), at && a && w(O(D[2] === at ? $ + (K.startX - K.x) : w() + at - D[1])), dt)) {
      _.offset && V();
      var Z = z[2] === dt, tt = Z ? it + K.startY - K.y : _() + dt - z[1], rt = H(tt);
      (Z && tt !== rt && (it += rt - tt), _(rt));
    }
    (dt || at) && Ir();
  }, e.onEnable = function () {
    (am(m, a ? !1 : "x"), zt.addEventListener("refresh", U), en(Lt, "resize", U), _.smooth && (_.target.style.scrollBehavior = "auto", _.smooth = w.smooth = !1), B.enable());
  }, e.onDisable = function () {
    (am(m, !0), tn(Lt, "resize", U), zt.removeEventListener("refresh", U), B.kill());
  }, e.lockAxis = e.lockAxis !== !1, f = new Be(e), f.iOS = Ma, Ma && !_() && _(1), Ma && ut.ticker.add(hr), nt = f._dc, k = ut.to(f, {
    ease: "power4",
    paused: !0,
    inherit: !1,
    scrollX: a ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: DT(_, _(), function () {
        return k.pause();
      })
    },
    onUpdate: Ir,
    onComplete: nt.vars.onComplete
  }), f);
};
zt.sort = function (i) {
  if (Sn(i)) return Mt.sort(i);
  var e = Lt.pageYOffset || 0;
  return (zt.getAll().forEach(function (r) {
    return r._sortY = r.trigger ? e + r.trigger.getBoundingClientRect().top : r.start + Lt.innerHeight;
  }), Mt.sort(i || (function (r, a) {
    return (r.vars.refreshPriority || 0) * -1e6 + (r.vars.containerAnimation ? 1e6 : r._sortY) - ((a.vars.containerAnimation ? 1e6 : a._sortY) + (a.vars.refreshPriority || 0) * -1e6);
  })));
};
zt.observe = function (i) {
  return new Be(i);
};
zt.normalizeScroll = function (i) {
  if (typeof i > "u") return Mn;
  if (i === !0 && Mn) return Mn.enable();
  if (i === !1) {
    (Mn && Mn.kill(), Mn = i);
    return;
  }
  var e = i instanceof Be ? i : GD(i);
  return (Mn && Mn.target === e.target && Mn.kill(), Bs(e.target) && (Mn = e), e);
};
zt.core = {
  _getVelocityProp: Hm,
  _inputObserver: NT,
  _scrollers: Ut,
  _proxies: _r,
  bridge: {
    ss: function () {
      (Yi || Hs("scrollStart"), Yi = yn());
    },
    ref: function () {
      return vn;
    }
  }
};
bT() && ut.registerPlugin(zt);
xs.registerPlugin(zt);

Object.assign(window.SiteModules ||= {}, { gsap: xs, ScrollTrigger: zt });
})();

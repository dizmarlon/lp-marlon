// Lenis 1.3.26 — código capturado; apenas o invólucro usa script clássico.
// Licença MIT: ../../licenses/LENIS-LICENSE.txt
(function () {
 'use strict';
const z1 = "1.3.26";
function fw(i, e, r) {
  return Math.max(i, Math.min(e, r));
}
function IM(i, e, r) {
  return (1 - r) * i + r * e;
}
function JM(i, e, r, a) {
  return IM(i, e, 1 - Math.exp(-r * a));
}
function WM(i, e) {
  return (i % e + e) % e;
}
var $M = class {
  isRunning = !1;
  value = 0;
  from = 0;
  to = 0;
  currentTime = 0;
  lerp;
  duration;
  easing;
  onUpdate;
  advance(i) {
    if (!this.isRunning) return;
    let e = !1;
    if (this.duration && this.easing) {
      this.currentTime += i;
      const r = fw(0, this.currentTime / this.duration, 1);
      e = r >= 1;
      const a = e ? 1 : this.easing(r);
      this.value = this.from + (this.to - this.from) * a;
    } else this.lerp ? (this.value = JM(this.value, this.to, this.lerp * 60, i), Math.round(this.value) === Math.round(this.to) && (this.value = this.to, e = !0)) : (this.value = this.to, e = !0);
    (e && this.stop(), this.onUpdate?.(this.value, e));
  }
  stop() {
    this.isRunning = !1;
  }
  fromTo(i, e, {lerp: r, duration: a, easing: l, onStart: u, onUpdate: c}) {
    (this.from = this.value = i, this.to = e, this.lerp = r, this.duration = a, this.easing = l, this.currentTime = 0, this.isRunning = !0, u?.(), this.onUpdate = c);
  }
};
function tz(i, e) {
  let r;
  return function (...a) {
    (clearTimeout(r), r = setTimeout(() => {
      (r = void 0, i.apply(this, a));
    }, e));
  };
}
var ez = class {
  width = 0;
  height = 0;
  scrollHeight = 0;
  scrollWidth = 0;
  debouncedResize;
  wrapperResizeObserver;
  contentResizeObserver;
  constructor(i, e, {autoResize: r = !0, debounce: a = 250} = {}) {
    (this.wrapper = i, this.content = e, r && (this.debouncedResize = tz(this.resize, a), this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize());
  }
  destroy() {
    (this.wrapperResizeObserver?.disconnect(), this.contentResizeObserver?.disconnect(), this.wrapper === window && this.debouncedResize && window.removeEventListener("resize", this.debouncedResize));
  }
  resize = () => {
    (this.onWrapperResize(), this.onContentResize());
  };
  onWrapperResize = () => {
    this.wrapper instanceof Window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
  };
  onContentResize = () => {
    this.wrapper instanceof Window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth);
  };
  get limit() {
    return {
      x: this.scrollWidth - this.width,
      y: this.scrollHeight - this.height
    };
  }
}, hw = class {
  events = {};
  emit(i, ...e) {
    const r = this.events[i] || [];
    for (let a = 0, l = r.length; a < l; a++) r[a]?.(...e);
  }
  on(i, e) {
    return (this.events[i] ? this.events[i].push(e) : this.events[i] = [e], () => {
      this.events[i] = this.events[i]?.filter(r => e !== r);
    });
  }
  off(i, e) {
    this.events[i] = this.events[i]?.filter(r => e !== r);
  }
  destroy() {
    this.events = {};
  }
};
const nz = 100 / 6, Ca = {
  passive: !1
};
function D1(i, e) {
  return i === 1 ? nz : i === 2 ? e : 1;
}
var iz = class {
  touchStart = {
    x: 0,
    y: 0
  };
  lastDelta = {
    x: 0,
    y: 0
  };
  window = {
    width: 0,
    height: 0
  };
  emitter = new hw();
  constructor(i, e = {
    wheelMultiplier: 1,
    touchMultiplier: 1
  }) {
    (this.element = i, this.options = e, window.addEventListener("resize", this.onWindowResize), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, Ca), this.element.addEventListener("touchstart", this.onTouchStart, Ca), this.element.addEventListener("touchmove", this.onTouchMove, Ca), this.element.addEventListener("touchend", this.onTouchEnd, Ca));
  }
  on(i, e) {
    return this.emitter.on(i, e);
  }
  destroy() {
    (this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize), this.element.removeEventListener("wheel", this.onWheel, Ca), this.element.removeEventListener("touchstart", this.onTouchStart, Ca), this.element.removeEventListener("touchmove", this.onTouchMove, Ca), this.element.removeEventListener("touchend", this.onTouchEnd, Ca));
  }
  onTouchStart = i => {
    const {clientX: e, clientY: r} = i.targetTouches ? i.targetTouches[0] : i;
    (this.touchStart.x = e, this.touchStart.y = r, this.lastDelta = {
      x: 0,
      y: 0
    }, this.emitter.emit("scroll", {
      deltaX: 0,
      deltaY: 0,
      event: i
    }));
  };
  onTouchMove = i => {
    const {clientX: e, clientY: r} = i.targetTouches ? i.targetTouches[0] : i, a = -(e - this.touchStart.x) * this.options.touchMultiplier, l = -(r - this.touchStart.y) * this.options.touchMultiplier;
    (this.touchStart.x = e, this.touchStart.y = r, this.lastDelta = {
      x: a,
      y: l
    }, this.emitter.emit("scroll", {
      deltaX: a,
      deltaY: l,
      event: i
    }));
  };
  onTouchEnd = i => {
    this.emitter.emit("scroll", {
      deltaX: this.lastDelta.x,
      deltaY: this.lastDelta.y,
      event: i
    });
  };
  onWheel = i => {
    let {deltaX: e, deltaY: r, deltaMode: a} = i;
    const l = D1(a, this.window.width), u = D1(a, this.window.height);
    (e *= l, r *= u, e *= this.options.wheelMultiplier, r *= this.options.wheelMultiplier, this.emitter.emit("scroll", {
      deltaX: e,
      deltaY: r,
      event: i
    }));
  };
  onWindowResize = () => {
    this.window = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  };
};
const N1 = i => Math.min(1, 1.001 - 2 ** (-10 * i));
var rz = class {
  _isScrolling = !1;
  _isStopped = !1;
  _isLocked = !1;
  _preventNextNativeScrollEvent = !1;
  _resetVelocityTimeout = null;
  _rafId = null;
  _isDraggingSelection = !1;
  reducedMotionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  isTouching;
  isIos;
  time = 0;
  userData = {};
  lastVelocity = 0;
  velocity = 0;
  direction = 0;
  options;
  targetScroll;
  animatedScroll;
  animate = new $M();
  emitter = new hw();
  dimensions;
  virtualScroll;
  constructor({wrapper: i = window, content: e = document.documentElement, eventsTarget: r = i, smoothWheel: a = !0, syncTouch: l = !1, syncTouchLerp: u = .075, touchInertiaExponent: c = 1.7, duration: f, easing: p, lerp: m = .1, infinite: g = !1, orientation: v = "vertical", gestureOrientation: y = v === "horizontal" ? "both" : "vertical", touchMultiplier: _ = 1, wheelMultiplier: w = 1, autoResize: b = !0, prevent: E, virtualScroll: x, overscroll: A = !0, autoRaf: R = !1, anchors: M = !1, autoToggle: B = !1, allowNestedScroll: L = !1, __experimental__naiveDimensions: O = !1, naiveDimensions: H = O, stopInertiaOnNavigate: P = !1, respectReducedMotion: V = !0} = {}) {
    (window.lenisVersion = z1, window.lenis || (window.lenis = {}), window.lenis.version = z1, v === "horizontal" && (window.lenis.horizontal = !0), l === !0 && (window.lenis.touch = !0), this.isIos = (/(iPad|iPhone|iPod)/g).test(navigator.userAgent), (!i || i === document.documentElement) && (i = window), typeof f == "number" && typeof p != "function" ? p = N1 : typeof p == "function" && typeof f != "number" && (f = 1), this.options = {
      wrapper: i,
      content: e,
      eventsTarget: r,
      smoothWheel: a,
      syncTouch: l,
      syncTouchLerp: u,
      touchInertiaExponent: c,
      duration: f,
      easing: p,
      lerp: m,
      infinite: g,
      gestureOrientation: y,
      orientation: v,
      touchMultiplier: _,
      wheelMultiplier: w,
      autoResize: b,
      prevent: E,
      virtualScroll: x,
      overscroll: A,
      autoRaf: R,
      anchors: M,
      autoToggle: B,
      allowNestedScroll: L,
      naiveDimensions: H,
      stopInertiaOnNavigate: P,
      respectReducedMotion: V
    }, this.dimensions = new ez(i, e, {
      autoResize: b
    }), this.updateClassName(), this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll), this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, {
      capture: !0
    }), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.addEventListener("click", this.onClick), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown), this.virtualScroll = new iz(r, {
      touchMultiplier: _,
      wheelMultiplier: w
    }), this.virtualScroll.on("scroll", this.onVirtualScroll), this.options.autoToggle && (this.checkOverflow(), this.rootElement.addEventListener("transitionend", this.onTransitionEnd)), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf)));
  }
  destroy() {
    (this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll), this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, {
      capture: !0
    }), this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.removeEventListener("click", this.onClick), this.virtualScroll.destroy(), this.dimensions.destroy(), this.cleanUpClassName(), this._rafId && cancelAnimationFrame(this._rafId));
  }
  on(i, e) {
    return this.emitter.on(i, e);
  }
  off(i, e) {
    return this.emitter.off(i, e);
  }
  onScrollEnd = i => {
    i instanceof CustomEvent || (this.isScrolling === "smooth" || this.isScrolling === !1) && i.stopPropagation();
  };
  dispatchScrollendEvent = () => {
    this.options.wrapper.dispatchEvent(new CustomEvent("scrollend", {
      bubbles: this.options.wrapper === window,
      detail: {
        lenisScrollEnd: !0
      }
    }));
  };
  get overflow() {
    const i = this.isHorizontal ? "overflow-x" : "overflow-y";
    return getComputedStyle(this.rootElement)[i];
  }
  checkOverflow() {
    ["hidden", "clip"].includes(this.overflow) ? this.internalStop() : this.internalStart();
  }
  onTransitionEnd = i => {
    i.propertyName?.includes("overflow") && i.target === this.rootElement && this.checkOverflow();
  };
  setScroll(i) {
    this.isHorizontal ? this.options.wrapper.scrollTo({
      left: i,
      behavior: "instant"
    }) : this.options.wrapper.scrollTo({
      top: i,
      behavior: "instant"
    });
  }
  onClick = i => {
    const e = i.composedPath().filter(a => a instanceof HTMLAnchorElement && a.href).map(a => new URL(a.href)), r = new URL(window.location.href);
    if (this.options.anchors) {
      const a = e.find(l => r.host === l.host && r.pathname === l.pathname && l.hash);
      if (a) {
        const l = typeof this.options.anchors == "object" && this.options.anchors ? this.options.anchors : void 0, u = decodeURIComponent(a.hash);
        this.scrollTo(u, l);
        return;
      }
    }
    if (this.options.stopInertiaOnNavigate && e.some(a => r.host === a.host && r.pathname !== a.pathname)) {
      this.reset();
      return;
    }
  };
  onPointerDown = i => {
    i.button === 1 && this.reset();
  };
  isTouchOnSelectionHandle(i) {
    const e = window.getSelection();
    if (!e || e.isCollapsed || e.rangeCount === 0) return !1;
    const r = i.targetTouches[0] ?? i.changedTouches[0];
    if (!r) return !1;
    const a = e.getRangeAt(0).getClientRects();
    if (a.length === 0) return !1;
    const l = a[0], u = a[a.length - 1], c = 40, f = Math.hypot(r.clientX - l.left, r.clientY - l.top) <= c, p = Math.hypot(r.clientX - u.right, r.clientY - u.bottom) <= c;
    return f || p;
  }
  onVirtualScroll = i => {
    if (typeof this.options.virtualScroll == "function" && this.options.virtualScroll(i) === !1) return;
    const {deltaX: e, deltaY: r, event: a} = i;
    if ((this.emitter.emit("virtual-scroll", {
      deltaX: e,
      deltaY: r,
      event: a
    }), a.ctrlKey || a.lenisStopPropagation)) return;
    const l = a.type.includes("touch"), u = a.type.includes("wheel");
    if (l && this.isIos && (a.type === "touchstart" && (this._isDraggingSelection = this.isTouchOnSelectionHandle(a)), this._isDraggingSelection)) {
      a.type === "touchend" && (this._isDraggingSelection = !1);
      return;
    }
    this.isTouching = a.type === "touchstart" || a.type === "touchmove";
    const c = e === 0 && r === 0;
    if (this.options.syncTouch && l && a.type === "touchstart" && c && !this.isStopped && !this.isLocked) {
      this.reset();
      return;
    }
    const f = this.options.gestureOrientation === "vertical" && r === 0 || this.options.gestureOrientation === "horizontal" && e === 0;
    if (c || f) return;
    let p = a.composedPath();
    p = p.slice(0, p.indexOf(this.rootElement));
    const m = this.options.prevent, g = Math.abs(e) >= Math.abs(r) ? "horizontal" : "vertical";
    if (p.find(w => w instanceof HTMLElement && (typeof m == "function" && m?.(w) || w.hasAttribute?.("data-lenis-prevent") || g === "vertical" && w.hasAttribute?.("data-lenis-prevent-vertical") || g === "horizontal" && w.hasAttribute?.("data-lenis-prevent-horizontal") || l && w.hasAttribute?.("data-lenis-prevent-touch") || u && w.hasAttribute?.("data-lenis-prevent-wheel") || this.options.allowNestedScroll && this.hasNestedScroll(w, {
      deltaX: e,
      deltaY: r
    })))) return;
    if (this.isStopped || this.isLocked) {
      a.cancelable && a.preventDefault();
      return;
    }
    if (!(this.options.syncTouch && l || this.options.smoothWheel && u)) {
      (this.isScrolling = "native", this.animate.stop(), a.lenisStopPropagation = !0);
      return;
    }
    let v = r;
    (this.options.gestureOrientation === "both" ? v = Math.abs(r) > Math.abs(e) ? r : e : this.options.gestureOrientation === "horizontal" && (v = e), (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && this.limit > 0 && (this.animatedScroll > 0 && this.animatedScroll < this.limit || this.animatedScroll === 0 && r > 0 || this.animatedScroll === this.limit && r < 0)) && (a.lenisStopPropagation = !0), a.cancelable && a.preventDefault());
    const y = l && this.options.syncTouch, _ = l && a.type === "touchend";
    (_ && (v = Math.sign(v) * Math.abs(this.velocity) ** this.options.touchInertiaExponent), this.scrollTo(this.targetScroll + v, {
      programmatic: !1,
      ...y ? {
        lerp: _ ? this.options.syncTouchLerp : 1
      } : {
        lerp: this.options.lerp,
        duration: this.options.duration,
        easing: this.options.easing
      }
    }));
  };
  resize() {
    (this.dimensions.resize(), this.animatedScroll = this.targetScroll = this.actualScroll, this.emit());
  }
  emit() {
    this.emitter.emit("scroll", this);
  }
  onNativeScroll = () => {
    if ((this._resetVelocityTimeout !== null && (clearTimeout(this._resetVelocityTimeout), this._resetVelocityTimeout = null), this._preventNextNativeScrollEvent)) {
      this._preventNextNativeScrollEvent = !1;
      return;
    }
    if (this.isScrolling === !1 || this.isScrolling === "native") {
      const i = this.animatedScroll;
      (this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - i, this.direction = Math.sign(this.animatedScroll - i), this.isStopped || (this.isScrolling = "native"), this.emit(), this.velocity !== 0 && (this._resetVelocityTimeout = setTimeout(() => {
        (this.lastVelocity = this.velocity, this.velocity = 0, this.isScrolling = !1, this.emit());
      }, 400)));
    }
  };
  reset() {
    (this.isLocked = !1, this.isScrolling = !1, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop());
  }
  start() {
    if (this.isStopped) {
      if (this.options.autoToggle) {
        this.rootElement.style.removeProperty("overflow");
        return;
      }
      this.internalStart();
    }
  }
  internalStart() {
    this.isStopped && (this.reset(), this.isStopped = !1, this.emit());
  }
  stop() {
    if (!this.isStopped) {
      if (this.options.autoToggle) {
        this.rootElement.style.setProperty("overflow", "clip");
        return;
      }
      this.internalStop();
    }
  }
  internalStop() {
    this.isStopped || (this.reset(), this.isStopped = !0, this.emit());
  }
  raf = i => {
    const e = i - (this.time || i);
    (this.time = i, this.animate.advance(e * .001), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf)));
  };
  scrollTo(i, {offset: e = 0, immediate: r = !1, lock: a = !1, programmatic: l = !0, lerp: u = l ? this.options.lerp : void 0, duration: c = l ? this.options.duration : void 0, easing: f = l ? this.options.easing : void 0, onStart: p, onComplete: m, force: g = !1, userData: v} = {}) {
    if ((this.prefersReducedMotion && (l ? r = !0 : (u = 1, c = void 0, f = void 0)), (this.isStopped || this.isLocked) && !g)) return;
    let y = i, _ = e;
    if (typeof y == "string" && ["top", "left", "start", "#"].includes(y)) y = 0; else if (typeof y == "string" && ["bottom", "right", "end"].includes(y)) y = this.limit; else {
      let w = null;
      if ((typeof y == "string" ? (w = y.startsWith("#") ? document.getElementById(y.slice(1)) : document.querySelector(y), w || (y === "#top" ? y = 0 : console.warn("Lenis: Target not found", y))) : y instanceof HTMLElement && y?.nodeType && (w = y), w)) {
        if (this.options.wrapper !== window) {
          const M = this.rootElement.getBoundingClientRect();
          _ -= this.isHorizontal ? M.left : M.top;
        }
        const b = w.getBoundingClientRect(), E = getComputedStyle(w), x = this.isHorizontal ? Number.parseFloat(E.scrollMarginLeft) : Number.parseFloat(E.scrollMarginTop), A = getComputedStyle(this.rootElement), R = this.isHorizontal ? Number.parseFloat(A.scrollPaddingLeft) : Number.parseFloat(A.scrollPaddingTop);
        y = (this.isHorizontal ? b.left : b.top) + this.animatedScroll - (Number.isNaN(x) ? 0 : x) - (Number.isNaN(R) ? 0 : R);
      }
    }
    if (typeof y == "number") {
      if ((y += _, this.options.infinite)) {
        if (l) {
          this.targetScroll = this.animatedScroll = this.scroll;
          const w = y - this.animatedScroll;
          w > this.limit / 2 ? y -= this.limit : w < -this.limit / 2 && (y += this.limit);
        }
      } else y = fw(0, y, this.limit);
      if (y === this.targetScroll) {
        (p?.(this), m?.(this));
        return;
      }
      if ((this.userData = v ?? ({}), r)) {
        (this.animatedScroll = this.targetScroll = y, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), m?.(this), this.userData = {}, requestAnimationFrame(() => {
          this.dispatchScrollendEvent();
        }));
        return;
      }
      (l || (this.targetScroll = y), typeof c == "number" && typeof f != "function" ? f = N1 : typeof f == "function" && typeof c != "number" && (c = 1), this.animate.fromTo(this.animatedScroll, y, {
        duration: c,
        easing: f,
        lerp: u,
        onStart: () => {
          (a && (this.isLocked = !0), this.isScrolling = "smooth", p?.(this));
        },
        onUpdate: (w, b) => {
          (this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = w - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = w, this.setScroll(this.scroll), l && (this.targetScroll = w), b || this.emit(), b && (this.reset(), this.emit(), m?.(this), this.userData = {}, requestAnimationFrame(() => {
            this.dispatchScrollendEvent();
          }), this.preventNextNativeScrollEvent()));
        }
      }));
    }
  }
  preventNextNativeScrollEvent() {
    (this._preventNextNativeScrollEvent = !0, requestAnimationFrame(() => {
      this._preventNextNativeScrollEvent = !1;
    }));
  }
  hasNestedScroll(i, {deltaX: e, deltaY: r}) {
    const a = Date.now();
    i._lenis || (i._lenis = {});
    const l = i._lenis;
    let u, c, f, p, m, g, v, y, _, w;
    if (a - (l.time ?? 0) > 2e3) {
      l.time = Date.now();
      const L = window.getComputedStyle(i);
      if ((l.computedStyle = L, u = ["auto", "overlay", "scroll"].includes(L.overflowX), c = ["auto", "overlay", "scroll"].includes(L.overflowY), m = ["auto"].includes(L.overscrollBehaviorX), g = ["auto"].includes(L.overscrollBehaviorY), l.hasOverflowX = u, l.hasOverflowY = c, !(u || c))) return !1;
      (v = i.scrollWidth, y = i.scrollHeight, _ = i.clientWidth, w = i.clientHeight, f = v > _, p = y > w, l.isScrollableX = f, l.isScrollableY = p, l.scrollWidth = v, l.scrollHeight = y, l.clientWidth = _, l.clientHeight = w, l.hasOverscrollBehaviorX = m, l.hasOverscrollBehaviorY = g);
    } else (f = l.isScrollableX, p = l.isScrollableY, u = l.hasOverflowX, c = l.hasOverflowY, v = l.scrollWidth, y = l.scrollHeight, _ = l.clientWidth, w = l.clientHeight, m = l.hasOverscrollBehaviorX, g = l.hasOverscrollBehaviorY);
    if (!(u && f || c && p)) return !1;
    const b = Math.abs(e) >= Math.abs(r) ? "horizontal" : "vertical";
    let E, x, A, R, M, B;
    if (b === "horizontal") (E = Math.round(i.scrollLeft), x = v - _, A = e, R = u, M = f, B = m); else if (b === "vertical") (E = Math.round(i.scrollTop), x = y - w, A = r, R = c, M = p, B = g); else return !1;
    return !B && (E >= x || E <= 0) ? !0 : (A > 0 ? E < x : E > 0) && R && M;
  }
  get rootElement() {
    return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
  }
  get limit() {
    return this.options.naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
  }
  get isHorizontal() {
    return this.options.orientation === "horizontal";
  }
  get actualScroll() {
    const i = this.options.wrapper;
    return this.isHorizontal ? i.scrollX ?? i.scrollLeft : i.scrollY ?? i.scrollTop;
  }
  get scroll() {
    return this.options.infinite ? WM(this.animatedScroll, this.limit) : this.animatedScroll;
  }
  get progress() {
    return this.limit === 0 ? 1 : this.scroll / this.limit;
  }
  get isScrolling() {
    return this._isScrolling;
  }
  set isScrolling(i) {
    this._isScrolling !== i && (this._isScrolling = i, this.updateClassName());
  }
  get isStopped() {
    return this._isStopped;
  }
  set isStopped(i) {
    this._isStopped !== i && (this._isStopped = i, this.updateClassName());
  }
  get isLocked() {
    return this._isLocked;
  }
  set isLocked(i) {
    this._isLocked !== i && (this._isLocked = i, this.updateClassName());
  }
  get isSmooth() {
    return this.isScrolling === "smooth";
  }
  get prefersReducedMotion() {
    return this.options.respectReducedMotion && this.reducedMotionMediaQuery.matches;
  }
  get className() {
    let i = "lenis";
    return (this.options.autoToggle && (i += " lenis-autoToggle"), this.isStopped && (i += " lenis-stopped"), this.isLocked && (i += " lenis-locked"), this.isScrolling && (i += " lenis-scrolling"), this.isScrolling === "smooth" && (i += " lenis-smooth"), i);
  }
  updateClassName() {
    (this.cleanUpClassName(), this.className.split(" ").forEach(i => {
      this.rootElement.classList.add(i);
    }));
  }
  cleanUpClassName() {
    for (const i of Array.from(this.rootElement.classList)) (i === "lenis" || i.startsWith("lenis-")) && this.rootElement.classList.remove(i);
  }
};

Object.assign(window.SiteModules ||= {}, { Lenis: rz });
})();

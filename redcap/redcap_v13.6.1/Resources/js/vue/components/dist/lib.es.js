var ba = Object.defineProperty;
var wa = (e, t, n) => t in e ? ba(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var K = (e, t, n) => (wa(e, typeof t != "symbol" ? t + "" : t, n), n), fo = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
};
var Kt = (e, t, n) => (fo(e, t, "read from private field"), n ? n.call(e) : t.get(e)), _n = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, po = (e, t, n, s) => (fo(e, t, "write to private field"), s ? s.call(e, n) : t.set(e, n), n);
var Sr = (e, t, n) => (fo(e, t, "access private method"), n);
function Bt(e, t) {
  const n = /* @__PURE__ */ Object.create(null), s = e.split(",");
  for (let o = 0; o < s.length; o++)
    n[s[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
function ls(e) {
  if (G(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n], o = ke(s) ? xa(s) : ls(s);
      if (o)
        for (const r in o)
          t[r] = o[r];
    }
    return t;
  } else {
    if (ke(e))
      return e;
    if (he(e))
      return e;
  }
}
const Na = /;(?![^(]*\))/g, Oa = /:([^]+)/, ka = /\/\*.*?\*\//gs;
function xa(e) {
  const t = {};
  return e.replace(ka, "").split(Na).forEach((n) => {
    if (n) {
      const s = n.split(Oa);
      s.length > 1 && (t[s[0].trim()] = s[1].trim());
    }
  }), t;
}
function Se(e) {
  let t = "";
  if (ke(e))
    t = e;
  else if (G(e))
    for (let n = 0; n < e.length; n++) {
      const s = Se(e[n]);
      s && (t += s + " ");
    }
  else if (he(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
const $a = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot", Ca = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view", Sa = /* @__PURE__ */ Bt($a), Da = /* @__PURE__ */ Bt(Ca), Ta = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Pa = /* @__PURE__ */ Bt(Ta);
function Li(e) {
  return !!e || e === "";
}
function Aa(e, t) {
  if (e.length !== t.length)
    return !1;
  let n = !0;
  for (let s = 0; n && s < e.length; s++)
    n = qs(e[s], t[s]);
  return n;
}
function qs(e, t) {
  if (e === t)
    return !0;
  let n = Dr(e), s = Dr(t);
  if (n || s)
    return n && s ? e.getTime() === t.getTime() : !1;
  if (n = Qn(e), s = Qn(t), n || s)
    return e === t;
  if (n = G(e), s = G(t), n || s)
    return n && s ? Aa(e, t) : !1;
  if (n = he(e), s = he(t), n || s) {
    if (!n || !s)
      return !1;
    const o = Object.keys(e).length, r = Object.keys(t).length;
    if (o !== r)
      return !1;
    for (const i in e) {
      const a = e.hasOwnProperty(i), l = t.hasOwnProperty(i);
      if (a && !l || !a && l || !qs(e[i], t[i]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function ji(e, t) {
  return e.findIndex((n) => qs(n, t));
}
const oe = (e) => ke(e) ? e : e == null ? "" : G(e) || he(e) && (e.toString === Hi || !q(e.toString)) ? JSON.stringify(e, Ui, 2) : String(e), Ui = (e, t) => t && t.__v_isRef ? Ui(e, t.value) : en(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [s, o]) => (n[`${s} =>`] = o, n), {})
} : zs(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : he(t) && !G(t) && !Bi(t) ? String(t) : t, me = {}.NODE_ENV !== "production" ? Object.freeze({}) : {}, On = {}.NODE_ENV !== "production" ? Object.freeze([]) : [], Me = () => {
}, Fi = () => !1, Ia = /^on[^a-z]/, as = (e) => Ia.test(e), Ps = (e) => e.startsWith("onUpdate:"), De = Object.assign, tr = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Va = Object.prototype.hasOwnProperty, se = (e, t) => Va.call(e, t), G = Array.isArray, en = (e) => cs(e) === "[object Map]", zs = (e) => cs(e) === "[object Set]", Dr = (e) => cs(e) === "[object Date]", q = (e) => typeof e == "function", ke = (e) => typeof e == "string", Qn = (e) => typeof e == "symbol", he = (e) => e !== null && typeof e == "object", nr = (e) => he(e) && q(e.then) && q(e.catch), Hi = Object.prototype.toString, cs = (e) => Hi.call(e), sr = (e) => cs(e).slice(8, -1), Bi = (e) => cs(e) === "[object Object]", or = (e) => ke(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, ks = /* @__PURE__ */ Bt(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ra = /* @__PURE__ */ Bt("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo"), Qs = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Ma = /-(\w)/g, mt = Qs((e) => e.replace(Ma, (t, n) => n ? n.toUpperCase() : "")), La = /\B([A-Z])/g, $t = Qs((e) => e.replace(La, "-$1").toLowerCase()), an = Qs((e) => e.charAt(0).toUpperCase() + e.slice(1)), zt = Qs((e) => e ? `on${an(e)}` : ""), Jn = (e, t) => !Object.is(e, t), vn = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, As = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Is = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Tr;
const Gi = () => Tr || (Tr = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function xo(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let ut;
class ja {
  constructor(t = !1) {
    this.detached = t, this.active = !0, this.effects = [], this.cleanups = [], this.parent = ut, !t && ut && (this.index = (ut.scopes || (ut.scopes = [])).push(this) - 1);
  }
  run(t) {
    if (this.active) {
      const n = ut;
      try {
        return ut = this, t();
      } finally {
        ut = n;
      }
    } else
      ({}).NODE_ENV !== "production" && xo("cannot run an inactive effect scope.");
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ut = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    ut = this.parent;
  }
  stop(t) {
    if (this.active) {
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++)
        this.effects[n].stop();
      for (n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (this.scopes)
        for (n = 0, s = this.scopes.length; n < s; n++)
          this.scopes[n].stop(!0);
      if (!this.detached && this.parent && !t) {
        const o = this.parent.scopes.pop();
        o && o !== this && (this.parent.scopes[this.index] = o, o.index = this.index);
      }
      this.parent = void 0, this.active = !1;
    }
  }
}
function Ua(e, t = ut) {
  t && t.active && t.effects.push(e);
}
const Yn = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Ki = (e) => (e.w & jt) > 0, Wi = (e) => (e.n & jt) > 0, Fa = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= jt;
}, Ha = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let s = 0; s < t.length; s++) {
      const o = t[s];
      Ki(o) && !Wi(o) ? o.delete(e) : t[n++] = o, o.w &= ~jt, o.n &= ~jt;
    }
    t.length = n;
  }
}, $o = /* @__PURE__ */ new WeakMap();
let Un = 0, jt = 1;
const Co = 30;
let He;
const tn = Symbol({}.NODE_ENV !== "production" ? "iterate" : ""), So = Symbol({}.NODE_ENV !== "production" ? "Map key iterate" : "");
class rr {
  constructor(t, n = null, s) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Ua(this, s);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = He, n = Mt;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = He, He = this, Mt = !0, jt = 1 << ++Un, Un <= Co ? Fa(this) : Pr(this), this.fn();
    } finally {
      Un <= Co && Ha(this), jt = 1 << --Un, He = this.parent, Mt = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    He === this ? this.deferStop = !0 : this.active && (Pr(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Pr(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let Mt = !0;
const qi = [];
function un() {
  qi.push(Mt), Mt = !1;
}
function dn() {
  const e = qi.pop();
  Mt = e === void 0 ? !0 : e;
}
function ze(e, t, n) {
  if (Mt && He) {
    let s = $o.get(e);
    s || $o.set(e, s = /* @__PURE__ */ new Map());
    let o = s.get(n);
    o || s.set(n, o = Yn());
    const r = {}.NODE_ENV !== "production" ? { effect: He, target: e, type: t, key: n } : void 0;
    Do(o, r);
  }
}
function Do(e, t) {
  let n = !1;
  Un <= Co ? Wi(e) || (e.n |= jt, n = !Ki(e)) : n = !e.has(He), n && (e.add(He), He.deps.push(e), {}.NODE_ENV !== "production" && He.onTrack && He.onTrack(Object.assign({ effect: He }, t)));
}
function Ct(e, t, n, s, o, r) {
  const i = $o.get(e);
  if (!i)
    return;
  let a = [];
  if (t === "clear")
    a = [...i.values()];
  else if (n === "length" && G(e)) {
    const u = Is(s);
    i.forEach((d, c) => {
      (c === "length" || c >= u) && a.push(d);
    });
  } else
    switch (n !== void 0 && a.push(i.get(n)), t) {
      case "add":
        G(e) ? or(n) && a.push(i.get("length")) : (a.push(i.get(tn)), en(e) && a.push(i.get(So)));
        break;
      case "delete":
        G(e) || (a.push(i.get(tn)), en(e) && a.push(i.get(So)));
        break;
      case "set":
        en(e) && a.push(i.get(tn));
        break;
    }
  const l = {}.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: s, oldValue: o, oldTarget: r } : void 0;
  if (a.length === 1)
    a[0] && ({}.NODE_ENV !== "production" ? bn(a[0], l) : bn(a[0]));
  else {
    const u = [];
    for (const d of a)
      d && u.push(...d);
    ({}).NODE_ENV !== "production" ? bn(Yn(u), l) : bn(Yn(u));
  }
}
function bn(e, t) {
  const n = G(e) ? e : [...e];
  for (const s of n)
    s.computed && Ar(s, t);
  for (const s of n)
    s.computed || Ar(s, t);
}
function Ar(e, t) {
  (e !== He || e.allowRecurse) && ({}.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(De({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const Ba = /* @__PURE__ */ Bt("__proto__,__v_isRef,__isVue"), zi = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Qn)
), Ga = /* @__PURE__ */ Js(), Ka = /* @__PURE__ */ Js(!1, !0), Wa = /* @__PURE__ */ Js(!0), qa = /* @__PURE__ */ Js(!0, !0), Ir = /* @__PURE__ */ za();
function za() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const s = Z(this);
      for (let r = 0, i = this.length; r < i; r++)
        ze(s, "get", r + "");
      const o = s[t](...n);
      return o === -1 || o === !1 ? s[t](...n.map(Z)) : o;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      un();
      const s = Z(this)[t].apply(this, n);
      return dn(), s;
    };
  }), e;
}
function Js(e = !1, t = !1) {
  return function(s, o, r) {
    if (o === "__v_isReactive")
      return !e;
    if (o === "__v_isReadonly")
      return e;
    if (o === "__v_isShallow")
      return t;
    if (o === "__v_raw" && r === (e ? t ? nl : tl : t ? el : Zi).get(s))
      return s;
    const i = G(s);
    if (!e && i && se(Ir, o))
      return Reflect.get(Ir, o, r);
    const a = Reflect.get(s, o, r);
    return (Qn(o) ? zi.has(o) : Ba(o)) || (e || ze(s, "get", o), t) ? a : we(a) ? i && or(o) ? a : a.value : he(a) ? e ? sl(a) : Gt(a) : a;
  };
}
const Qa = /* @__PURE__ */ Qi(), Ja = /* @__PURE__ */ Qi(!0);
function Qi(e = !1) {
  return function(n, s, o, r) {
    let i = n[s];
    if (Ut(i) && we(i) && !we(o))
      return !1;
    if (!e && (!Vs(o) && !Ut(o) && (i = Z(i), o = Z(o)), !G(n) && we(i) && !we(o)))
      return i.value = o, !0;
    const a = G(n) && or(s) ? Number(s) < n.length : se(n, s), l = Reflect.set(n, s, o, r);
    return n === Z(r) && (a ? Jn(o, i) && Ct(n, "set", s, o, i) : Ct(n, "add", s, o)), l;
  };
}
function Ya(e, t) {
  const n = se(e, t), s = e[t], o = Reflect.deleteProperty(e, t);
  return o && n && Ct(e, "delete", t, void 0, s), o;
}
function Xa(e, t) {
  const n = Reflect.has(e, t);
  return (!Qn(t) || !zi.has(t)) && ze(e, "has", t), n;
}
function Za(e) {
  return ze(e, "iterate", G(e) ? "length" : tn), Reflect.ownKeys(e);
}
const Ji = {
  get: Ga,
  set: Qa,
  deleteProperty: Ya,
  has: Xa,
  ownKeys: Za
}, Yi = {
  get: Wa,
  set(e, t) {
    return {}.NODE_ENV !== "production" && xo(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return {}.NODE_ENV !== "production" && xo(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
}, ec = /* @__PURE__ */ De({}, Ji, {
  get: Ka,
  set: Ja
}), tc = /* @__PURE__ */ De({}, Yi, {
  get: qa
}), ir = (e) => e, Ys = (e) => Reflect.getPrototypeOf(e);
function gs(e, t, n = !1, s = !1) {
  e = e.__v_raw;
  const o = Z(e), r = Z(t);
  n || (t !== r && ze(o, "get", t), ze(o, "get", r));
  const { has: i } = Ys(o), a = s ? ir : n ? lr : Xn;
  if (i.call(o, t))
    return a(e.get(t));
  if (i.call(o, r))
    return a(e.get(r));
  e !== o && e.get(t);
}
function ys(e, t = !1) {
  const n = this.__v_raw, s = Z(n), o = Z(e);
  return t || (e !== o && ze(s, "has", e), ze(s, "has", o)), e === o ? n.has(e) : n.has(e) || n.has(o);
}
function vs(e, t = !1) {
  return e = e.__v_raw, !t && ze(Z(e), "iterate", tn), Reflect.get(e, "size", e);
}
function Vr(e) {
  e = Z(e);
  const t = Z(this);
  return Ys(t).has.call(t, e) || (t.add(e), Ct(t, "add", e, e)), this;
}
function Rr(e, t) {
  t = Z(t);
  const n = Z(this), { has: s, get: o } = Ys(n);
  let r = s.call(n, e);
  r ? {}.NODE_ENV !== "production" && Xi(n, s, e) : (e = Z(e), r = s.call(n, e));
  const i = o.call(n, e);
  return n.set(e, t), r ? Jn(t, i) && Ct(n, "set", e, t, i) : Ct(n, "add", e, t), this;
}
function Mr(e) {
  const t = Z(this), { has: n, get: s } = Ys(t);
  let o = n.call(t, e);
  o ? {}.NODE_ENV !== "production" && Xi(t, n, e) : (e = Z(e), o = n.call(t, e));
  const r = s ? s.call(t, e) : void 0, i = t.delete(e);
  return o && Ct(t, "delete", e, void 0, r), i;
}
function Lr() {
  const e = Z(this), t = e.size !== 0, n = {}.NODE_ENV !== "production" ? en(e) ? new Map(e) : new Set(e) : void 0, s = e.clear();
  return t && Ct(e, "clear", void 0, void 0, n), s;
}
function Es(e, t) {
  return function(s, o) {
    const r = this, i = r.__v_raw, a = Z(i), l = t ? ir : e ? lr : Xn;
    return !e && ze(a, "iterate", tn), i.forEach((u, d) => s.call(o, l(u), l(d), r));
  };
}
function bs(e, t, n) {
  return function(...s) {
    const o = this.__v_raw, r = Z(o), i = en(r), a = e === "entries" || e === Symbol.iterator && i, l = e === "keys" && i, u = o[e](...s), d = n ? ir : t ? lr : Xn;
    return !t && ze(r, "iterate", l ? So : tn), {
      // iterator protocol
      next() {
        const { value: c, done: p } = u.next();
        return p ? { value: c, done: p } : {
          value: a ? [d(c[0]), d(c[1])] : d(c),
          done: p
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Dt(e) {
  return function(...t) {
    if ({}.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${an(e)} operation ${n}failed: target is readonly.`, Z(this));
    }
    return e === "delete" ? !1 : this;
  };
}
function nc() {
  const e = {
    get(r) {
      return gs(this, r);
    },
    get size() {
      return vs(this);
    },
    has: ys,
    add: Vr,
    set: Rr,
    delete: Mr,
    clear: Lr,
    forEach: Es(!1, !1)
  }, t = {
    get(r) {
      return gs(this, r, !1, !0);
    },
    get size() {
      return vs(this);
    },
    has: ys,
    add: Vr,
    set: Rr,
    delete: Mr,
    clear: Lr,
    forEach: Es(!1, !0)
  }, n = {
    get(r) {
      return gs(this, r, !0);
    },
    get size() {
      return vs(this, !0);
    },
    has(r) {
      return ys.call(this, r, !0);
    },
    add: Dt(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Dt(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Dt(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Dt(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: Es(!0, !1)
  }, s = {
    get(r) {
      return gs(this, r, !0, !0);
    },
    get size() {
      return vs(this, !0);
    },
    has(r) {
      return ys.call(this, r, !0);
    },
    add: Dt(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: Dt(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: Dt(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: Dt(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: Es(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
    e[r] = bs(r, !1, !1), n[r] = bs(r, !0, !1), t[r] = bs(r, !1, !0), s[r] = bs(r, !0, !0);
  }), [
    e,
    n,
    t,
    s
  ];
}
const [sc, oc, rc, ic] = /* @__PURE__ */ nc();
function Xs(e, t) {
  const n = t ? e ? ic : rc : e ? oc : sc;
  return (s, o, r) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? s : Reflect.get(se(n, o) && o in s ? n : s, o, r);
}
const lc = {
  get: /* @__PURE__ */ Xs(!1, !1)
}, ac = {
  get: /* @__PURE__ */ Xs(!1, !0)
}, cc = {
  get: /* @__PURE__ */ Xs(!0, !1)
}, uc = {
  get: /* @__PURE__ */ Xs(!0, !0)
};
function Xi(e, t, n) {
  const s = Z(n);
  if (s !== n && t.call(e, s)) {
    const o = sr(e);
    console.warn(`Reactive ${o} contains both the raw and reactive versions of the same object${o === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const Zi = /* @__PURE__ */ new WeakMap(), el = /* @__PURE__ */ new WeakMap(), tl = /* @__PURE__ */ new WeakMap(), nl = /* @__PURE__ */ new WeakMap();
function dc(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function fc(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : dc(sr(e));
}
function Gt(e) {
  return Ut(e) ? e : Zs(e, !1, Ji, lc, Zi);
}
function pc(e) {
  return Zs(e, !1, ec, ac, el);
}
function sl(e) {
  return Zs(e, !0, Yi, cc, tl);
}
function wn(e) {
  return Zs(e, !0, tc, uc, nl);
}
function Zs(e, t, n, s, o) {
  if (!he(e))
    return {}.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const r = o.get(e);
  if (r)
    return r;
  const i = fc(e);
  if (i === 0)
    return e;
  const a = new Proxy(e, i === 2 ? s : n);
  return o.set(e, a), a;
}
function nn(e) {
  return Ut(e) ? nn(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Ut(e) {
  return !!(e && e.__v_isReadonly);
}
function Vs(e) {
  return !!(e && e.__v_isShallow);
}
function Rs(e) {
  return nn(e) || Ut(e);
}
function Z(e) {
  const t = e && e.__v_raw;
  return t ? Z(t) : e;
}
function ol(e) {
  return As(e, "__v_skip", !0), e;
}
const Xn = (e) => he(e) ? Gt(e) : e, lr = (e) => he(e) ? sl(e) : e;
function rl(e) {
  Mt && He && (e = Z(e), {}.NODE_ENV !== "production" ? Do(e.dep || (e.dep = Yn()), {
    target: e,
    type: "get",
    key: "value"
  }) : Do(e.dep || (e.dep = Yn())));
}
function il(e, t) {
  e = Z(e), e.dep && ({}.NODE_ENV !== "production" ? bn(e.dep, {
    target: e,
    type: "set",
    key: "value",
    newValue: t
  }) : bn(e.dep));
}
function we(e) {
  return !!(e && e.__v_isRef === !0);
}
function Ce(e) {
  return ll(e, !1);
}
function hc(e) {
  return ll(e, !0);
}
function ll(e, t) {
  return we(e) ? e : new _c(e, t);
}
class _c {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : Z(t), this._value = n ? t : Xn(t);
  }
  get value() {
    return rl(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Vs(t) || Ut(t);
    t = n ? t : Z(t), Jn(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : Xn(t), il(this, t));
  }
}
function L(e) {
  return we(e) ? e.value : e;
}
const mc = {
  get: (e, t, n) => L(Reflect.get(e, t, n)),
  set: (e, t, n, s) => {
    const o = e[t];
    return we(o) && !we(n) ? (o.value = n, !0) : Reflect.set(e, t, n, s);
  }
};
function al(e) {
  return nn(e) ? e : new Proxy(e, mc);
}
function us(e) {
  ({}).NODE_ENV !== "production" && !Rs(e) && console.warn("toRefs() expects a reactive object but received a plain one.");
  const t = G(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = yc(e, n);
  return t;
}
class gc {
  constructor(t, n, s) {
    this._object = t, this._key = n, this._defaultValue = s, this.__v_isRef = !0;
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
}
function yc(e, t, n) {
  const s = e[t];
  return we(s) ? s : new gc(e, t, n);
}
var cl;
class vc {
  constructor(t, n, s, o) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this[cl] = !1, this._dirty = !0, this.effect = new rr(t, () => {
      this._dirty || (this._dirty = !0, il(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = s;
  }
  get value() {
    const t = Z(this);
    return rl(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
cl = "__v_isReadonly";
function Ec(e, t, n = !1) {
  let s, o;
  const r = q(e);
  r ? (s = e, o = {}.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : Me) : (s = e.get, o = e.set);
  const i = new vc(s, o, r || !o, n);
  return {}.NODE_ENV !== "production" && t && !n && (i.effect.onTrack = t.onTrack, i.effect.onTrigger = t.onTrigger), i;
}
const sn = [];
function xs(e) {
  sn.push(e);
}
function $s() {
  sn.pop();
}
function $(e, ...t) {
  if ({}.NODE_ENV === "production")
    return;
  un();
  const n = sn.length ? sn[sn.length - 1].component : null, s = n && n.appContext.config.warnHandler, o = bc();
  if (s)
    Ot(s, n, 11, [
      e + t.join(""),
      n && n.proxy,
      o.map(({ vnode: r }) => `at <${lo(n, r.type)}>`).join(`
`),
      o
    ]);
  else {
    const r = [`[Vue warn]: ${e}`, ...t];
    o.length && r.push(`
`, ...wc(o)), console.warn(...r);
  }
  dn();
}
function bc() {
  let e = sn[sn.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const s = e.component && e.component.parent;
    e = s && s.vnode;
  }
  return t;
}
function wc(e) {
  const t = [];
  return e.forEach((n, s) => {
    t.push(...s === 0 ? [] : [`
`], ...Nc(n));
  }), t;
}
function Nc({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", s = e.component ? e.component.parent == null : !1, o = ` at <${lo(e.component, e.type, s)}`, r = ">" + n;
  return e.props ? [o, ...Oc(e.props), r] : [o + r];
}
function Oc(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((s) => {
    t.push(...ul(s, e[s]));
  }), n.length > 3 && t.push(" ..."), t;
}
function ul(e, t, n) {
  return ke(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : we(t) ? (t = ul(e, Z(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : q(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = Z(t), n ? t : [`${e}=`, t]);
}
const ar = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  [
    0
    /* ErrorCodes.SETUP_FUNCTION */
  ]: "setup function",
  [
    1
    /* ErrorCodes.RENDER_FUNCTION */
  ]: "render function",
  [
    2
    /* ErrorCodes.WATCH_GETTER */
  ]: "watcher getter",
  [
    3
    /* ErrorCodes.WATCH_CALLBACK */
  ]: "watcher callback",
  [
    4
    /* ErrorCodes.WATCH_CLEANUP */
  ]: "watcher cleanup function",
  [
    5
    /* ErrorCodes.NATIVE_EVENT_HANDLER */
  ]: "native event handler",
  [
    6
    /* ErrorCodes.COMPONENT_EVENT_HANDLER */
  ]: "component event handler",
  [
    7
    /* ErrorCodes.VNODE_HOOK */
  ]: "vnode hook",
  [
    8
    /* ErrorCodes.DIRECTIVE_HOOK */
  ]: "directive hook",
  [
    9
    /* ErrorCodes.TRANSITION_HOOK */
  ]: "transition hook",
  [
    10
    /* ErrorCodes.APP_ERROR_HANDLER */
  ]: "app errorHandler",
  [
    11
    /* ErrorCodes.APP_WARN_HANDLER */
  ]: "app warnHandler",
  [
    12
    /* ErrorCodes.FUNCTION_REF */
  ]: "ref function",
  [
    13
    /* ErrorCodes.ASYNC_COMPONENT_LOADER */
  ]: "async component loader",
  [
    14
    /* ErrorCodes.SCHEDULER */
  ]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function Ot(e, t, n, s) {
  let o;
  try {
    o = s ? e(...s) : e();
  } catch (r) {
    eo(r, t, n);
  }
  return o;
}
function rt(e, t, n, s) {
  if (q(e)) {
    const r = Ot(e, t, n, s);
    return r && nr(r) && r.catch((i) => {
      eo(i, t, n);
    }), r;
  }
  const o = [];
  for (let r = 0; r < e.length; r++)
    o.push(rt(e[r], t, n, s));
  return o;
}
function eo(e, t, n, s = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let r = t.parent;
    const i = t.proxy, a = {}.NODE_ENV !== "production" ? ar[n] : n;
    for (; r; ) {
      const u = r.ec;
      if (u) {
        for (let d = 0; d < u.length; d++)
          if (u[d](e, i, a) === !1)
            return;
      }
      r = r.parent;
    }
    const l = t.appContext.config.errorHandler;
    if (l) {
      Ot(l, null, 10, [e, i, a]);
      return;
    }
  }
  kc(e, n, o, s);
}
function kc(e, t, n, s = !0) {
  if ({}.NODE_ENV !== "production") {
    const o = ar[t];
    if (n && xs(n), $(`Unhandled error${o ? ` during execution of ${o}` : ""}`), n && $s(), s)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let Zn = !1, To = !1;
const Le = [];
let pt = 0;
const kn = [];
let dt = null, Pt = 0;
const dl = /* @__PURE__ */ Promise.resolve();
let cr = null;
const xc = 100;
function fl(e) {
  const t = cr || dl;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function $c(e) {
  let t = pt + 1, n = Le.length;
  for (; t < n; ) {
    const s = t + n >>> 1;
    es(Le[s]) < e ? t = s + 1 : n = s;
  }
  return t;
}
function to(e) {
  (!Le.length || !Le.includes(e, Zn && e.allowRecurse ? pt + 1 : pt)) && (e.id == null ? Le.push(e) : Le.splice($c(e.id), 0, e), pl());
}
function pl() {
  !Zn && !To && (To = !0, cr = dl.then(ml));
}
function Cc(e) {
  const t = Le.indexOf(e);
  t > pt && Le.splice(t, 1);
}
function hl(e) {
  G(e) ? kn.push(...e) : (!dt || !dt.includes(e, e.allowRecurse ? Pt + 1 : Pt)) && kn.push(e), pl();
}
function jr(e, t = Zn ? pt + 1 : 0) {
  for ({}.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()); t < Le.length; t++) {
    const n = Le[t];
    if (n && n.pre) {
      if ({}.NODE_ENV !== "production" && ur(e, n))
        continue;
      Le.splice(t, 1), t--, n();
    }
  }
}
function _l(e) {
  if (kn.length) {
    const t = [...new Set(kn)];
    if (kn.length = 0, dt) {
      dt.push(...t);
      return;
    }
    for (dt = t, {}.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), dt.sort((n, s) => es(n) - es(s)), Pt = 0; Pt < dt.length; Pt++)
      ({}).NODE_ENV !== "production" && ur(e, dt[Pt]) || dt[Pt]();
    dt = null, Pt = 0;
  }
}
const es = (e) => e.id == null ? 1 / 0 : e.id, Sc = (e, t) => {
  const n = es(e) - es(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function ml(e) {
  To = !1, Zn = !0, {}.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), Le.sort(Sc);
  const t = {}.NODE_ENV !== "production" ? (n) => ur(e, n) : Me;
  try {
    for (pt = 0; pt < Le.length; pt++) {
      const n = Le[pt];
      if (n && n.active !== !1) {
        if ({}.NODE_ENV !== "production" && t(n))
          continue;
        Ot(
          n,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    pt = 0, Le.length = 0, _l(e), Zn = !1, cr = null, (Le.length || kn.length) && ml(e);
  }
}
function ur(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > xc) {
      const s = t.ownerInstance, o = s && vr(s.type);
      return $(`Maximum recursive updates exceeded${o ? ` in component <${o}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      e.set(t, n + 1);
  }
}
let on = !1;
const En = /* @__PURE__ */ new Set();
({}).NODE_ENV !== "production" && (Gi().__VUE_HMR_RUNTIME__ = {
  createRecord: ho(gl),
  rerender: ho(Pc),
  reload: ho(Ac)
});
const cn = /* @__PURE__ */ new Map();
function Dc(e) {
  const t = e.type.__hmrId;
  let n = cn.get(t);
  n || (gl(t, e.type), n = cn.get(t)), n.instances.add(e);
}
function Tc(e) {
  cn.get(e.type.__hmrId).instances.delete(e);
}
function gl(e, t) {
  return cn.has(e) ? !1 : (cn.set(e, {
    initialDef: Hn(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Hn(e) {
  return ql(e) ? e.__vccOpts : e;
}
function Pc(e, t) {
  const n = cn.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((s) => {
    t && (s.render = t, Hn(s.type).render = t), s.renderCache = [], on = !0, s.update(), on = !1;
  }));
}
function Ac(e, t) {
  const n = cn.get(e);
  if (!n)
    return;
  t = Hn(t), Ur(n.initialDef, t);
  const s = [...n.instances];
  for (const o of s) {
    const r = Hn(o.type);
    En.has(r) || (r !== n.initialDef && Ur(r, t), En.add(r)), o.appContext.optionsCache.delete(o.type), o.ceReload ? (En.add(r), o.ceReload(t.styles), En.delete(r)) : o.parent ? to(o.parent.update) : o.appContext.reload ? o.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
  }
  hl(() => {
    for (const o of s)
      En.delete(Hn(o.type));
  });
}
function Ur(e, t) {
  De(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function ho(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (s) {
      console.error(s), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
    }
  };
}
let ht, Fn = [], Po = !1;
function ds(e, ...t) {
  ht ? ht.emit(e, ...t) : Po || Fn.push({ event: e, args: t });
}
function yl(e, t) {
  var n, s;
  ht = e, ht ? (ht.enabled = !0, Fn.forEach(({ event: o, args: r }) => ht.emit(o, ...r)), Fn = []) : /* handle late devtools injection - only do this if we are in an actual */ /* browser environment to avoid the timer handle stalling test runner exit */ /* (#4815) */ typeof window < "u" && // some envs mock window but not fully
  window.HTMLElement && // also exclude jsdom
  !(!((s = (n = window.navigator) === null || n === void 0 ? void 0 : n.userAgent) === null || s === void 0) && s.includes("jsdom")) ? ((t.__VUE_DEVTOOLS_HOOK_REPLAY__ = t.__VUE_DEVTOOLS_HOOK_REPLAY__ || []).push((r) => {
    yl(r, t);
  }), setTimeout(() => {
    ht || (t.__VUE_DEVTOOLS_HOOK_REPLAY__ = null, Po = !0, Fn = []);
  }, 3e3)) : (Po = !0, Fn = []);
}
function Ic(e, t) {
  ds("app:init", e, t, {
    Fragment: de,
    Text: fs,
    Comment: qe,
    Static: Ds
  });
}
function Vc(e) {
  ds("app:unmount", e);
}
const Rc = /* @__PURE__ */ dr(
  "component:added"
  /* DevtoolsHooks.COMPONENT_ADDED */
), vl = /* @__PURE__ */ dr(
  "component:updated"
  /* DevtoolsHooks.COMPONENT_UPDATED */
), Mc = /* @__PURE__ */ dr(
  "component:removed"
  /* DevtoolsHooks.COMPONENT_REMOVED */
), Lc = (e) => {
  ht && typeof ht.cleanupBuffer == "function" && // remove the component if it wasn't buffered
  !ht.cleanupBuffer(e) && Mc(e);
};
function dr(e) {
  return (t) => {
    ds(e, t.appContext.app, t.uid, t.parent ? t.parent.uid : void 0, t);
  };
}
const jc = /* @__PURE__ */ El(
  "perf:start"
  /* DevtoolsHooks.PERFORMANCE_START */
), Uc = /* @__PURE__ */ El(
  "perf:end"
  /* DevtoolsHooks.PERFORMANCE_END */
);
function El(e) {
  return (t, n, s) => {
    ds(e, t.appContext.app, t.uid, t, n, s);
  };
}
function Fc(e, t, n) {
  ds("component:emit", e.appContext.app, e, t, n);
}
function Hc(e, t, ...n) {
  if (e.isUnmounted)
    return;
  const s = e.vnode.props || me;
  if ({}.NODE_ENV !== "production") {
    const { emitsOptions: d, propsOptions: [c] } = e;
    if (d)
      if (!(t in d))
        (!c || !(zt(t) in c)) && $(`Component emitted event "${t}" but it is neither declared in the emits option nor as an "${zt(t)}" prop.`);
      else {
        const p = d[t];
        q(p) && (p(...n) || $(`Invalid event arguments: event validation failed for event "${t}".`));
      }
  }
  let o = n;
  const r = t.startsWith("update:"), i = r && t.slice(7);
  if (i && i in s) {
    const d = `${i === "modelValue" ? "model" : i}Modifiers`, { number: c, trim: p } = s[d] || me;
    p && (o = n.map((m) => ke(m) ? m.trim() : m)), c && (o = n.map(Is));
  }
  if ({}.NODE_ENV !== "production" && Fc(e, t, o), {}.NODE_ENV !== "production") {
    const d = t.toLowerCase();
    d !== t && s[zt(d)] && $(`Event "${d}" is emitted in component ${lo(e, e.type)} but the handler is registered for "${t}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${$t(t)}" instead of "${t}".`);
  }
  let a, l = s[a = zt(t)] || // also try camelCase event handler (#2249)
  s[a = zt(mt(t))];
  !l && r && (l = s[a = zt($t(t))]), l && rt(l, e, 6, o);
  const u = s[a + "Once"];
  if (u) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[a])
      return;
    e.emitted[a] = !0, rt(u, e, 6, o);
  }
}
function bl(e, t, n = !1) {
  const s = t.emitsCache, o = s.get(e);
  if (o !== void 0)
    return o;
  const r = e.emits;
  let i = {}, a = !1;
  if (!q(e)) {
    const l = (u) => {
      const d = bl(u, t, !0);
      d && (a = !0, De(i, d));
    };
    !n && t.mixins.length && t.mixins.forEach(l), e.extends && l(e.extends), e.mixins && e.mixins.forEach(l);
  }
  return !r && !a ? (he(e) && s.set(e, null), null) : (G(r) ? r.forEach((l) => i[l] = null) : De(i, r), he(e) && s.set(e, i), i);
}
function no(e, t) {
  return !e || !as(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), se(e, t[0].toLowerCase() + t.slice(1)) || se(e, $t(t)) || se(e, t));
}
let Ae = null, so = null;
function Ms(e) {
  const t = Ae;
  return Ae = e, so = e && e.type.__scopeId || null, t;
}
function gt(e) {
  so = e;
}
function yt() {
  so = null;
}
function J(e, t = Ae, n) {
  if (!t || e._n)
    return e;
  const s = (...o) => {
    s._d && Yr(-1);
    const r = Ms(t);
    let i;
    try {
      i = e(...o);
    } finally {
      Ms(r), s._d && Yr(1);
    }
    return {}.NODE_ENV !== "production" && vl(t), i;
  };
  return s._n = !0, s._c = !0, s._d = !0, s;
}
let Ao = !1;
function Ls() {
  Ao = !0;
}
function _o(e) {
  const { type: t, vnode: n, proxy: s, withProxy: o, props: r, propsOptions: [i], slots: a, attrs: l, emit: u, render: d, renderCache: c, data: p, setupState: m, ctx: y, inheritAttrs: E } = e;
  let O, P;
  const U = Ms(e);
  ({}).NODE_ENV !== "production" && (Ao = !1);
  try {
    if (n.shapeFlag & 4) {
      const re = o || s;
      O = st(d.call(re, re, c, r, m, p, y)), P = l;
    } else {
      const re = t;
      ({}).NODE_ENV !== "production" && l === r && Ls(), O = st(re.length > 1 ? re(r, {}.NODE_ENV !== "production" ? {
        get attrs() {
          return Ls(), l;
        },
        slots: a,
        emit: u
      } : { attrs: l, slots: a, emit: u }) : re(
        r,
        null
        /* we know it doesn't need it */
      )), P = t.props ? l : Gc(l);
    }
  } catch (re) {
    Gn.length = 0, eo(
      re,
      e,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    ), O = N(qe);
  }
  let W = O, V;
  if ({}.NODE_ENV !== "production" && O.patchFlag > 0 && O.patchFlag & 2048 && ([W, V] = Bc(O)), P && E !== !1) {
    const re = Object.keys(P), { shapeFlag: Ne } = W;
    if (re.length) {
      if (Ne & 7)
        i && re.some(Ps) && (P = Kc(P, i)), W = Ft(W, P);
      else if ({}.NODE_ENV !== "production" && !Ao && W.type !== qe) {
        const Ve = Object.keys(l), je = [], X = [];
        for (let z = 0, xe = Ve.length; z < xe; z++) {
          const Oe = Ve[z];
          as(Oe) ? Ps(Oe) || je.push(Oe[2].toLowerCase() + Oe.slice(3)) : X.push(Oe);
        }
        X.length && $(`Extraneous non-props attributes (${X.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes.`), je.length && $(`Extraneous non-emits event listeners (${je.join(", ")}) were passed to component but could not be automatically inherited because component renders fragment or text root nodes. If the listener is intended to be a component custom event listener only, declare it using the "emits" option.`);
      }
    }
  }
  return n.dirs && ({}.NODE_ENV !== "production" && !Fr(W) && $("Runtime directive used on component with non-element root node. The directives will not function as intended."), W = Ft(W), W.dirs = W.dirs ? W.dirs.concat(n.dirs) : n.dirs), n.transition && ({}.NODE_ENV !== "production" && !Fr(W) && $("Component inside <Transition> renders non-element root node that cannot be animated."), W.transition = n.transition), {}.NODE_ENV !== "production" && V ? V(W) : O = W, Ms(U), O;
}
const Bc = (e) => {
  const t = e.children, n = e.dynamicChildren, s = wl(t);
  if (!s)
    return [e, void 0];
  const o = t.indexOf(s), r = n ? n.indexOf(s) : -1, i = (a) => {
    t[o] = a, n && (r > -1 ? n[r] = a : a.patchFlag > 0 && (e.dynamicChildren = [...n, a]));
  };
  return [st(s), i];
};
function wl(e) {
  let t;
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    if (xn(s)) {
      if (s.type !== qe || s.children === "v-if") {
        if (t)
          return;
        t = s;
      }
    } else
      return;
  }
  return t;
}
const Gc = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || as(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, Kc = (e, t) => {
  const n = {};
  for (const s in e)
    (!Ps(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
  return n;
}, Fr = (e) => e.shapeFlag & 7 || e.type === qe;
function Wc(e, t, n) {
  const { props: s, children: o, component: r } = e, { props: i, children: a, patchFlag: l } = t, u = r.emitsOptions;
  if ({}.NODE_ENV !== "production" && (o || a) && on || t.dirs || t.transition)
    return !0;
  if (n && l >= 0) {
    if (l & 1024)
      return !0;
    if (l & 16)
      return s ? Hr(s, i, u) : !!i;
    if (l & 8) {
      const d = t.dynamicProps;
      for (let c = 0; c < d.length; c++) {
        const p = d[c];
        if (i[p] !== s[p] && !no(u, p))
          return !0;
      }
    }
  } else
    return (o || a) && (!a || !a.$stable) ? !0 : s === i ? !1 : s ? i ? Hr(s, i, u) : !0 : !!i;
  return !1;
}
function Hr(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length)
    return !0;
  for (let o = 0; o < s.length; o++) {
    const r = s[o];
    if (t[r] !== e[r] && !no(n, r))
      return !0;
  }
  return !1;
}
function qc({ vnode: e, parent: t }, n) {
  for (; t && t.subTree === e; )
    (e = t.vnode).el = n, t = t.parent;
}
const zc = (e) => e.__isSuspense;
function Qc(e, t) {
  t && t.pendingBranch ? G(e) ? t.effects.push(...e) : t.effects.push(e) : hl(e);
}
function Cs(e, t) {
  if (!Pe)
    ({}).NODE_ENV !== "production" && $("provide() can only be used inside setup().");
  else {
    let n = Pe.provides;
    const s = Pe.parent && Pe.parent.provides;
    s === n && (n = Pe.provides = Object.create(s)), n[e] = t;
  }
}
function kt(e, t, n = !1) {
  const s = Pe || Ae;
  if (s) {
    const o = s.parent == null ? s.vnode.appContext && s.vnode.appContext.provides : s.parent.provides;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && q(t) ? t.call(s.proxy) : t;
    ({}).NODE_ENV !== "production" && $(`injection "${String(e)}" not found.`);
  } else
    ({}).NODE_ENV !== "production" && $("inject() can only be used inside setup() or functional components.");
}
function Jc(e, t) {
  return fr(e, null, t);
}
const ws = {};
function Lt(e, t, n) {
  return {}.NODE_ENV !== "production" && !q(t) && $("`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."), fr(e, t, n);
}
function fr(e, t, { immediate: n, deep: s, flush: o, onTrack: r, onTrigger: i } = me) {
  ({}).NODE_ENV !== "production" && !t && (n !== void 0 && $('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), s !== void 0 && $('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const a = (V) => {
    $("Invalid watch source: ", V, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, l = Pe;
  let u, d = !1, c = !1;
  if (we(e) ? (u = () => e.value, d = Vs(e)) : nn(e) ? (u = () => e, s = !0) : G(e) ? (c = !0, d = e.some((V) => nn(V) || Vs(V)), u = () => e.map((V) => {
    if (we(V))
      return V.value;
    if (nn(V))
      return Xt(V);
    if (q(V))
      return Ot(
        V,
        l,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    ({}).NODE_ENV !== "production" && a(V);
  })) : q(e) ? t ? u = () => Ot(
    e,
    l,
    2
    /* ErrorCodes.WATCH_GETTER */
  ) : u = () => {
    if (!(l && l.isUnmounted))
      return p && p(), rt(e, l, 3, [m]);
  } : (u = Me, {}.NODE_ENV !== "production" && a(e)), t && s) {
    const V = u;
    u = () => Xt(V());
  }
  let p, m = (V) => {
    p = U.onStop = () => {
      Ot(
        V,
        l,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  }, y;
  if (ns)
    if (m = Me, t ? n && rt(t, l, 3, [
      u(),
      c ? [] : void 0,
      m
    ]) : u(), o === "sync") {
      const V = Yu();
      y = V.__watcherHandles || (V.__watcherHandles = []);
    } else
      return Me;
  let E = c ? new Array(e.length).fill(ws) : ws;
  const O = () => {
    if (U.active)
      if (t) {
        const V = U.run();
        (s || d || (c ? V.some((re, Ne) => Jn(re, E[Ne])) : Jn(V, E))) && (p && p(), rt(t, l, 3, [
          V,
          // pass undefined as the old value when it's changed for the first time
          E === ws ? void 0 : c && E[0] === ws ? [] : E,
          m
        ]), E = V);
      } else
        U.run();
  };
  O.allowRecurse = !!t;
  let P;
  o === "sync" ? P = O : o === "post" ? P = () => We(O, l && l.suspense) : (O.pre = !0, l && (O.id = l.uid), P = () => to(O));
  const U = new rr(u, P);
  ({}).NODE_ENV !== "production" && (U.onTrack = r, U.onTrigger = i), t ? n ? O() : E = U.run() : o === "post" ? We(U.run.bind(U), l && l.suspense) : U.run();
  const W = () => {
    U.stop(), l && l.scope && tr(l.scope.effects, U);
  };
  return y && y.push(W), W;
}
function Yc(e, t, n) {
  const s = this.proxy, o = ke(e) ? e.includes(".") ? Nl(s, e) : () => s[e] : e.bind(s, s);
  let r;
  q(t) ? r = t : (r = t.handler, n = t);
  const i = Pe;
  $n(this);
  const a = fr(o, r.bind(s), n);
  return i ? $n(i) : ln(), a;
}
function Nl(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let o = 0; o < n.length && s; o++)
      s = s[n[o]];
    return s;
  };
}
function Xt(e, t) {
  if (!he(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), we(e))
    Xt(e.value, t);
  else if (G(e))
    for (let n = 0; n < e.length; n++)
      Xt(e[n], t);
  else if (zs(e) || en(e))
    e.forEach((n) => {
      Xt(n, t);
    });
  else if (Bi(e))
    for (const n in e)
      Xt(e[n], t);
  return e;
}
function Ol(e) {
  return q(e) ? { setup: e, name: e.name } : e;
}
const Bn = (e) => !!e.type.__asyncLoader, pr = (e) => e.type.__isKeepAlive;
function Xc(e, t) {
  kl(e, "a", t);
}
function Zc(e, t) {
  kl(e, "da", t);
}
function kl(e, t, n = Pe) {
  const s = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (oo(t, s, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      pr(o.parent.vnode) && eu(s, t, n, o), o = o.parent;
  }
}
function eu(e, t, n, s) {
  const o = oo(
    t,
    e,
    s,
    !0
    /* prepend */
  );
  Cl(() => {
    tr(s[t], o);
  }, n);
}
function oo(e, t, n = Pe, s = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), r = t.__weh || (t.__weh = (...i) => {
      if (n.isUnmounted)
        return;
      un(), $n(n);
      const a = rt(t, n, e, i);
      return ln(), dn(), a;
    });
    return s ? o.unshift(r) : o.push(r), r;
  } else if ({}.NODE_ENV !== "production") {
    const o = zt(ar[e].replace(/ hook$/, ""));
    $(`${o} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
  }
}
const St = (e) => (t, n = Pe) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!ns || e === "sp") && oo(e, (...s) => t(...s), n)
), xl = St(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
), $l = St(
  "m"
  /* LifecycleHooks.MOUNTED */
), tu = St(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
), nu = St(
  "u"
  /* LifecycleHooks.UPDATED */
), su = St(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
), Cl = St(
  "um"
  /* LifecycleHooks.UNMOUNTED */
), ou = St(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
), ru = St(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
), iu = St(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function lu(e, t = Pe) {
  oo("ec", e, t);
}
function Sl(e) {
  Ra(e) && $("Do not use built-in directive ids as custom directive id: " + e);
}
function Je(e, t) {
  const n = Ae;
  if (n === null)
    return {}.NODE_ENV !== "production" && $("withDirectives can only be used inside render functions."), e;
  const s = io(n) || n.proxy, o = e.dirs || (e.dirs = []);
  for (let r = 0; r < t.length; r++) {
    let [i, a, l, u = me] = t[r];
    i && (q(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Xt(a), o.push({
      dir: i,
      instance: s,
      value: a,
      oldValue: void 0,
      arg: l,
      modifiers: u
    }));
  }
  return e;
}
function Wt(e, t, n, s) {
  const o = e.dirs, r = t && t.dirs;
  for (let i = 0; i < o.length; i++) {
    const a = o[i];
    r && (a.oldValue = r[i].value);
    let l = a.dir[s];
    l && (un(), rt(l, n, 8, [
      e.el,
      a,
      e,
      t
    ]), dn());
  }
}
const Io = "components";
function Ee(e, t) {
  return cu(Io, e, !0, t) || e;
}
const au = Symbol();
function cu(e, t, n = !0, s = !1) {
  const o = Ae || Pe;
  if (o) {
    const r = o.type;
    if (e === Io) {
      const a = vr(
        r,
        !1
        /* do not include inferred name to avoid breaking existing code */
      );
      if (a && (a === t || a === mt(t) || a === an(mt(t))))
        return r;
    }
    const i = (
      // local registration
      // check instance[type] first which is resolved for options API
      Br(o[e] || r[e], t) || // global registration
      Br(o.appContext[e], t)
    );
    if (!i && s)
      return r;
    if ({}.NODE_ENV !== "production" && n && !i) {
      const a = e === Io ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : "";
      $(`Failed to resolve ${e.slice(0, -1)}: ${t}${a}`);
    }
    return i;
  } else
    ({}).NODE_ENV !== "production" && $(`resolve${an(e.slice(0, -1))} can only be used in render() or setup().`);
}
function Br(e, t) {
  return e && (e[t] || e[mt(t)] || e[an(mt(t))]);
}
function _t(e, t, n, s) {
  let o;
  const r = n && n[s];
  if (G(e) || ke(e)) {
    o = new Array(e.length);
    for (let i = 0, a = e.length; i < a; i++)
      o[i] = t(e[i], i, void 0, r && r[i]);
  } else if (typeof e == "number") {
    ({}).NODE_ENV !== "production" && !Number.isInteger(e) && $(`The v-for range expect an integer value but got ${e}.`), o = new Array(e);
    for (let i = 0; i < e; i++)
      o[i] = t(i + 1, i, void 0, r && r[i]);
  } else if (he(e))
    if (e[Symbol.iterator])
      o = Array.from(e, (i, a) => t(i, a, void 0, r && r[a]));
    else {
      const i = Object.keys(e);
      o = new Array(i.length);
      for (let a = 0, l = i.length; a < l; a++) {
        const u = i[a];
        o[a] = t(e[u], u, a, r && r[a]);
      }
    }
  else
    o = [];
  return n && (n[s] = o), o;
}
function Re(e, t, n = {}, s, o) {
  if (Ae.isCE || Ae.parent && Bn(Ae.parent) && Ae.parent.isCE)
    return t !== "default" && (n.name = t), N("slot", n, s && s());
  let r = e[t];
  ({}).NODE_ENV !== "production" && r && r.length > 1 && ($("SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."), r = () => []), r && r._c && (r._d = !1), S();
  const i = r && Dl(r(n)), a = it(
    de,
    {
      key: n.key || // slot content array of a dynamic conditional slot may have a branch
      // key attached in the `createSlots` helper, respect that
      i && i.key || `_${t}`
    },
    i || (s ? s() : []),
    i && e._ === 1 ? 64 : -2
    /* PatchFlags.BAIL */
  );
  return !o && a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]), r && r._c && (r._d = !0), a;
}
function Dl(e) {
  return e.some((t) => xn(t) ? !(t.type === qe || t.type === de && !Dl(t.children)) : !0) ? e : null;
}
const Vo = (e) => e ? Kl(e) ? io(e) || e.proxy : Vo(e.parent) : null, rn = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ De(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => ({}).NODE_ENV !== "production" ? wn(e.props) : e.props,
    $attrs: (e) => ({}).NODE_ENV !== "production" ? wn(e.attrs) : e.attrs,
    $slots: (e) => ({}).NODE_ENV !== "production" ? wn(e.slots) : e.slots,
    $refs: (e) => ({}).NODE_ENV !== "production" ? wn(e.refs) : e.refs,
    $parent: (e) => Vo(e.parent),
    $root: (e) => Vo(e.root),
    $emit: (e) => e.emit,
    $options: (e) => _r(e),
    $forceUpdate: (e) => e.f || (e.f = () => to(e.update)),
    $nextTick: (e) => e.n || (e.n = fl.bind(e.proxy)),
    $watch: (e) => Yc.bind(e)
  })
), hr = (e) => e === "_" || e === "$", mo = (e, t) => e !== me && !e.__isScriptSetup && se(e, t), Tl = {
  get({ _: e }, t) {
    const { ctx: n, setupState: s, data: o, props: r, accessCache: i, type: a, appContext: l } = e;
    if ({}.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let u;
    if (t[0] !== "$") {
      const m = i[t];
      if (m !== void 0)
        switch (m) {
          case 1:
            return s[t];
          case 2:
            return o[t];
          case 4:
            return n[t];
          case 3:
            return r[t];
        }
      else {
        if (mo(s, t))
          return i[t] = 1, s[t];
        if (o !== me && se(o, t))
          return i[t] = 2, o[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (u = e.propsOptions[0]) && se(u, t)
        )
          return i[t] = 3, r[t];
        if (n !== me && se(n, t))
          return i[t] = 4, n[t];
        Ro && (i[t] = 0);
      }
    }
    const d = rn[t];
    let c, p;
    if (d)
      return t === "$attrs" && (ze(e, "get", t), {}.NODE_ENV !== "production" && Ls()), d(e);
    if (
      // css module (injected by vue-loader)
      (c = a.__cssModules) && (c = c[t])
    )
      return c;
    if (n !== me && se(n, t))
      return i[t] = 4, n[t];
    if (
      // global properties
      p = l.config.globalProperties, se(p, t)
    )
      return p[t];
    ({}).NODE_ENV !== "production" && Ae && (!ke(t) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    t.indexOf("__v") !== 0) && (o !== me && hr(t[0]) && se(o, t) ? $(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : e === Ae && $(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`));
  },
  set({ _: e }, t, n) {
    const { data: s, setupState: o, ctx: r } = e;
    return mo(o, t) ? (o[t] = n, !0) : {}.NODE_ENV !== "production" && o.__isScriptSetup && se(o, t) ? ($(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : s !== me && se(s, t) ? (s[t] = n, !0) : se(e.props, t) ? ({}.NODE_ENV !== "production" && $(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? ({}.NODE_ENV !== "production" && $(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`), !1) : ({}.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(r, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : r[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: s, appContext: o, propsOptions: r } }, i) {
    let a;
    return !!n[i] || e !== me && se(e, i) || mo(t, i) || (a = r[0]) && se(a, i) || se(s, i) || se(rn, i) || se(o.config.globalProperties, i);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : se(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
({}).NODE_ENV !== "production" && (Tl.ownKeys = (e) => ($("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)));
function uu(e) {
  const t = {};
  return Object.defineProperty(t, "_", {
    configurable: !0,
    enumerable: !1,
    get: () => e
  }), Object.keys(rn).forEach((n) => {
    Object.defineProperty(t, n, {
      configurable: !0,
      enumerable: !1,
      get: () => rn[n](e),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: Me
    });
  }), t;
}
function du(e) {
  const { ctx: t, propsOptions: [n] } = e;
  n && Object.keys(n).forEach((s) => {
    Object.defineProperty(t, s, {
      enumerable: !0,
      configurable: !0,
      get: () => e.props[s],
      set: Me
    });
  });
}
function fu(e) {
  const { ctx: t, setupState: n } = e;
  Object.keys(Z(n)).forEach((s) => {
    if (!n.__isScriptSetup) {
      if (hr(s[0])) {
        $(`setup() return property ${JSON.stringify(s)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(t, s, {
        enumerable: !0,
        configurable: !0,
        get: () => n[s],
        set: Me
      });
    }
  });
}
function pu() {
  const e = /* @__PURE__ */ Object.create(null);
  return (t, n) => {
    e[n] ? $(`${t} property "${n}" is already defined in ${e[n]}.`) : e[n] = t;
  };
}
let Ro = !0;
function hu(e) {
  const t = _r(e), n = e.proxy, s = e.ctx;
  Ro = !1, t.beforeCreate && Gr(
    t.beforeCreate,
    e,
    "bc"
    /* LifecycleHooks.BEFORE_CREATE */
  );
  const {
    // state
    data: o,
    computed: r,
    methods: i,
    watch: a,
    provide: l,
    inject: u,
    // lifecycle
    created: d,
    beforeMount: c,
    mounted: p,
    beforeUpdate: m,
    updated: y,
    activated: E,
    deactivated: O,
    beforeDestroy: P,
    beforeUnmount: U,
    destroyed: W,
    unmounted: V,
    render: re,
    renderTracked: Ne,
    renderTriggered: Ve,
    errorCaptured: je,
    serverPrefetch: X,
    // public API
    expose: z,
    inheritAttrs: xe,
    // assets
    components: Oe,
    directives: Ze,
    filters: et
  } = t, tt = {}.NODE_ENV !== "production" ? pu() : null;
  if ({}.NODE_ENV !== "production") {
    const [ne] = e.propsOptions;
    if (ne)
      for (const ie in ne)
        tt("Props", ie);
  }
  if (u && _u(u, s, tt, e.appContext.config.unwrapInjectedRef), i)
    for (const ne in i) {
      const ie = i[ne];
      q(ie) ? ({}.NODE_ENV !== "production" ? Object.defineProperty(s, ne, {
        value: ie.bind(n),
        configurable: !0,
        enumerable: !0,
        writable: !0
      }) : s[ne] = ie.bind(n), {}.NODE_ENV !== "production" && tt("Methods", ne)) : {}.NODE_ENV !== "production" && $(`Method "${ne}" has type "${typeof ie}" in the component definition. Did you reference the function correctly?`);
    }
  if (o) {
    ({}).NODE_ENV !== "production" && !q(o) && $("The data option must be a function. Plain object usage is no longer supported.");
    const ne = o.call(n, n);
    if ({}.NODE_ENV !== "production" && nr(ne) && $("data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>."), !he(ne))
      ({}).NODE_ENV !== "production" && $("data() should return an object.");
    else if (e.data = Gt(ne), {}.NODE_ENV !== "production")
      for (const ie in ne)
        tt("Data", ie), hr(ie[0]) || Object.defineProperty(s, ie, {
          configurable: !0,
          enumerable: !0,
          get: () => ne[ie],
          set: Me
        });
  }
  if (Ro = !0, r)
    for (const ne in r) {
      const ie = r[ne], Ge = q(ie) ? ie.bind(n, n) : q(ie.get) ? ie.get.bind(n, n) : Me;
      ({}).NODE_ENV !== "production" && Ge === Me && $(`Computed property "${ne}" has no getter.`);
      const fn = !q(ie) && q(ie.set) ? ie.set.bind(n) : {}.NODE_ENV !== "production" ? () => {
        $(`Write operation failed: computed property "${ne}" is readonly.`);
      } : Me, vt = H({
        get: Ge,
        set: fn
      });
      Object.defineProperty(s, ne, {
        enumerable: !0,
        configurable: !0,
        get: () => vt.value,
        set: (lt) => vt.value = lt
      }), {}.NODE_ENV !== "production" && tt("Computed", ne);
    }
  if (a)
    for (const ne in a)
      Pl(a[ne], s, n, ne);
  if (l) {
    const ne = q(l) ? l.call(n) : l;
    Reflect.ownKeys(ne).forEach((ie) => {
      Cs(ie, ne[ie]);
    });
  }
  d && Gr(
    d,
    e,
    "c"
    /* LifecycleHooks.CREATED */
  );
  function Te(ne, ie) {
    G(ie) ? ie.forEach((Ge) => ne(Ge.bind(n))) : ie && ne(ie.bind(n));
  }
  if (Te(xl, c), Te($l, p), Te(tu, m), Te(nu, y), Te(Xc, E), Te(Zc, O), Te(lu, je), Te(iu, Ne), Te(ru, Ve), Te(su, U), Te(Cl, V), Te(ou, X), G(z))
    if (z.length) {
      const ne = e.exposed || (e.exposed = {});
      z.forEach((ie) => {
        Object.defineProperty(ne, ie, {
          get: () => n[ie],
          set: (Ge) => n[ie] = Ge
        });
      });
    } else
      e.exposed || (e.exposed = {});
  re && e.render === Me && (e.render = re), xe != null && (e.inheritAttrs = xe), Oe && (e.components = Oe), Ze && (e.directives = Ze);
}
function _u(e, t, n = Me, s = !1) {
  G(e) && (e = Mo(e));
  for (const o in e) {
    const r = e[o];
    let i;
    he(r) ? "default" in r ? i = kt(
      r.from || o,
      r.default,
      !0
      /* treat default function as factory */
    ) : i = kt(r.from || o) : i = kt(r), we(i) ? s ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (a) => i.value = a
    }) : ({}.NODE_ENV !== "production" && $(`injected property "${o}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`), t[o] = i) : t[o] = i, {}.NODE_ENV !== "production" && n("Inject", o);
  }
}
function Gr(e, t, n) {
  rt(G(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Pl(e, t, n, s) {
  const o = s.includes(".") ? Nl(n, s) : () => n[s];
  if (ke(e)) {
    const r = t[e];
    q(r) ? Lt(o, r) : {}.NODE_ENV !== "production" && $(`Invalid watch handler specified by key "${e}"`, r);
  } else if (q(e))
    Lt(o, e.bind(n));
  else if (he(e))
    if (G(e))
      e.forEach((r) => Pl(r, t, n, s));
    else {
      const r = q(e.handler) ? e.handler.bind(n) : t[e.handler];
      q(r) ? Lt(o, r, e) : {}.NODE_ENV !== "production" && $(`Invalid watch handler specified by key "${e.handler}"`, r);
    }
  else
    ({}).NODE_ENV !== "production" && $(`Invalid watch option: "${s}"`, e);
}
function _r(e) {
  const t = e.type, { mixins: n, extends: s } = t, { mixins: o, optionsCache: r, config: { optionMergeStrategies: i } } = e.appContext, a = r.get(t);
  let l;
  return a ? l = a : !o.length && !n && !s ? l = t : (l = {}, o.length && o.forEach((u) => js(l, u, i, !0)), js(l, t, i)), he(t) && r.set(t, l), l;
}
function js(e, t, n, s = !1) {
  const { mixins: o, extends: r } = t;
  r && js(e, r, n, !0), o && o.forEach((i) => js(e, i, n, !0));
  for (const i in t)
    if (s && i === "expose")
      ({}).NODE_ENV !== "production" && $('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const a = mu[i] || n && n[i];
      e[i] = a ? a(e[i], t[i]) : t[i];
    }
  return e;
}
const mu = {
  data: Kr,
  props: Qt,
  emits: Qt,
  // objects
  methods: Qt,
  computed: Qt,
  // lifecycle
  beforeCreate: Fe,
  created: Fe,
  beforeMount: Fe,
  mounted: Fe,
  beforeUpdate: Fe,
  updated: Fe,
  beforeDestroy: Fe,
  beforeUnmount: Fe,
  destroyed: Fe,
  unmounted: Fe,
  activated: Fe,
  deactivated: Fe,
  errorCaptured: Fe,
  serverPrefetch: Fe,
  // assets
  components: Qt,
  directives: Qt,
  // watch
  watch: yu,
  // provide / inject
  provide: Kr,
  inject: gu
};
function Kr(e, t) {
  return t ? e ? function() {
    return De(q(e) ? e.call(this, this) : e, q(t) ? t.call(this, this) : t);
  } : t : e;
}
function gu(e, t) {
  return Qt(Mo(e), Mo(t));
}
function Mo(e) {
  if (G(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Fe(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Qt(e, t) {
  return e ? De(De(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function yu(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = De(/* @__PURE__ */ Object.create(null), e);
  for (const s in t)
    n[s] = Fe(e[s], t[s]);
  return n;
}
function vu(e, t, n, s = !1) {
  const o = {}, r = {};
  As(r, ro, 1), e.propsDefaults = /* @__PURE__ */ Object.create(null), Al(e, t, o, r);
  for (const i in e.propsOptions[0])
    i in o || (o[i] = void 0);
  ({}).NODE_ENV !== "production" && Vl(t || {}, o, e), n ? e.props = s ? o : pc(o) : e.type.props ? e.props = o : e.props = r, e.attrs = r;
}
function Eu(e) {
  for (; e; ) {
    if (e.type.__hmrId)
      return !0;
    e = e.parent;
  }
}
function bu(e, t, n, s) {
  const { props: o, attrs: r, vnode: { patchFlag: i } } = e, a = Z(o), [l] = e.propsOptions;
  let u = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !({}.NODE_ENV !== "production" && Eu(e)) && (s || i > 0) && !(i & 16)
  ) {
    if (i & 8) {
      const d = e.vnode.dynamicProps;
      for (let c = 0; c < d.length; c++) {
        let p = d[c];
        if (no(e.emitsOptions, p))
          continue;
        const m = t[p];
        if (l)
          if (se(r, p))
            m !== r[p] && (r[p] = m, u = !0);
          else {
            const y = mt(p);
            o[y] = Lo(
              l,
              a,
              y,
              m,
              e,
              !1
              /* isAbsent */
            );
          }
        else
          m !== r[p] && (r[p] = m, u = !0);
      }
    }
  } else {
    Al(e, t, o, r) && (u = !0);
    let d;
    for (const c in a)
      (!t || // for camelCase
      !se(t, c) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = $t(c)) === c || !se(t, d))) && (l ? n && // for camelCase
      (n[c] !== void 0 || // for kebab-case
      n[d] !== void 0) && (o[c] = Lo(
        l,
        a,
        c,
        void 0,
        e,
        !0
        /* isAbsent */
      )) : delete o[c]);
    if (r !== a)
      for (const c in r)
        (!t || !se(t, c)) && (delete r[c], u = !0);
  }
  u && Ct(e, "set", "$attrs"), {}.NODE_ENV !== "production" && Vl(t || {}, o, e);
}
function Al(e, t, n, s) {
  const [o, r] = e.propsOptions;
  let i = !1, a;
  if (t)
    for (let l in t) {
      if (ks(l))
        continue;
      const u = t[l];
      let d;
      o && se(o, d = mt(l)) ? !r || !r.includes(d) ? n[d] = u : (a || (a = {}))[d] = u : no(e.emitsOptions, l) || (!(l in s) || u !== s[l]) && (s[l] = u, i = !0);
    }
  if (r) {
    const l = Z(n), u = a || me;
    for (let d = 0; d < r.length; d++) {
      const c = r[d];
      n[c] = Lo(o, l, c, u[c], e, !se(u, c));
    }
  }
  return i;
}
function Lo(e, t, n, s, o, r) {
  const i = e[n];
  if (i != null) {
    const a = se(i, "default");
    if (a && s === void 0) {
      const l = i.default;
      if (i.type !== Function && q(l)) {
        const { propsDefaults: u } = o;
        n in u ? s = u[n] : ($n(o), s = u[n] = l.call(null, t), ln());
      } else
        s = l;
    }
    i[
      0
      /* BooleanFlags.shouldCast */
    ] && (r && !a ? s = !1 : i[
      1
      /* BooleanFlags.shouldCastTrue */
    ] && (s === "" || s === $t(n)) && (s = !0));
  }
  return s;
}
function Il(e, t, n = !1) {
  const s = t.propsCache, o = s.get(e);
  if (o)
    return o;
  const r = e.props, i = {}, a = [];
  let l = !1;
  if (!q(e)) {
    const d = (c) => {
      l = !0;
      const [p, m] = Il(c, t, !0);
      De(i, p), m && a.push(...m);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!r && !l)
    return he(e) && s.set(e, On), On;
  if (G(r))
    for (let d = 0; d < r.length; d++) {
      ({}).NODE_ENV !== "production" && !ke(r[d]) && $("props must be strings when using array syntax.", r[d]);
      const c = mt(r[d]);
      Wr(c) && (i[c] = me);
    }
  else if (r) {
    ({}).NODE_ENV !== "production" && !he(r) && $("invalid props options", r);
    for (const d in r) {
      const c = mt(d);
      if (Wr(c)) {
        const p = r[d], m = i[c] = G(p) || q(p) ? { type: p } : Object.assign({}, p);
        if (m) {
          const y = zr(Boolean, m.type), E = zr(String, m.type);
          m[
            0
            /* BooleanFlags.shouldCast */
          ] = y > -1, m[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = E < 0 || y < E, (y > -1 || se(m, "default")) && a.push(c);
        }
      }
    }
  }
  const u = [i, a];
  return he(e) && s.set(e, u), u;
}
function Wr(e) {
  return e[0] !== "$" ? !0 : ({}.NODE_ENV !== "production" && $(`Invalid prop name: "${e}" is a reserved property.`), !1);
}
function jo(e) {
  const t = e && e.toString().match(/^\s*function (\w+)/);
  return t ? t[1] : e === null ? "null" : "";
}
function qr(e, t) {
  return jo(e) === jo(t);
}
function zr(e, t) {
  return G(t) ? t.findIndex((n) => qr(n, e)) : q(t) && qr(t, e) ? 0 : -1;
}
function Vl(e, t, n) {
  const s = Z(t), o = n.propsOptions[0];
  for (const r in o) {
    let i = o[r];
    i != null && wu(r, s[r], i, !se(e, r) && !se(e, $t(r)));
  }
}
function wu(e, t, n, s) {
  const { type: o, required: r, validator: i } = n;
  if (r && s) {
    $('Missing required prop: "' + e + '"');
    return;
  }
  if (!(t == null && !n.required)) {
    if (o != null && o !== !0) {
      let a = !1;
      const l = G(o) ? o : [o], u = [];
      for (let d = 0; d < l.length && !a; d++) {
        const { valid: c, expectedType: p } = Ou(t, l[d]);
        u.push(p || ""), a = c;
      }
      if (!a) {
        $(ku(e, t, u));
        return;
      }
    }
    i && !i(t) && $('Invalid prop: custom validator check failed for prop "' + e + '".');
  }
}
const Nu = /* @__PURE__ */ Bt("String,Number,Boolean,Function,Symbol,BigInt");
function Ou(e, t) {
  let n;
  const s = jo(t);
  if (Nu(s)) {
    const o = typeof e;
    n = o === s.toLowerCase(), !n && o === "object" && (n = e instanceof t);
  } else
    s === "Object" ? n = he(e) : s === "Array" ? n = G(e) : s === "null" ? n = e === null : n = e instanceof t;
  return {
    valid: n,
    expectedType: s
  };
}
function ku(e, t, n) {
  let s = `Invalid prop: type check failed for prop "${e}". Expected ${n.map(an).join(" | ")}`;
  const o = n[0], r = sr(t), i = Qr(t, o), a = Qr(t, r);
  return n.length === 1 && Jr(o) && !xu(o, r) && (s += ` with value ${i}`), s += `, got ${r} `, Jr(r) && (s += `with value ${a}.`), s;
}
function Qr(e, t) {
  return t === "String" ? `"${e}"` : t === "Number" ? `${Number(e)}` : `${e}`;
}
function Jr(e) {
  return ["string", "number", "boolean"].some((n) => e.toLowerCase() === n);
}
function xu(...e) {
  return e.some((t) => t.toLowerCase() === "boolean");
}
const Rl = (e) => e[0] === "_" || e === "$stable", mr = (e) => G(e) ? e.map(st) : [st(e)], $u = (e, t, n) => {
  if (t._n)
    return t;
  const s = J((...o) => ({}.NODE_ENV !== "production" && Pe && $(`Slot "${e}" invoked outside of the render function: this will not track dependencies used in the slot. Invoke the slot function inside the render function instead.`), mr(t(...o))), n);
  return s._c = !1, s;
}, Ml = (e, t, n) => {
  const s = e._ctx;
  for (const o in e) {
    if (Rl(o))
      continue;
    const r = e[o];
    if (q(r))
      t[o] = $u(o, r, s);
    else if (r != null) {
      ({}).NODE_ENV !== "production" && $(`Non-function value encountered for slot "${o}". Prefer function slots for better performance.`);
      const i = mr(r);
      t[o] = () => i;
    }
  }
}, Ll = (e, t) => {
  ({}).NODE_ENV !== "production" && !pr(e.vnode) && $("Non-function value encountered for default slot. Prefer function slots for better performance.");
  const n = mr(t);
  e.slots.default = () => n;
}, Cu = (e, t) => {
  if (e.vnode.shapeFlag & 32) {
    const n = t._;
    n ? (e.slots = Z(t), As(t, "_", n)) : Ml(t, e.slots = {});
  } else
    e.slots = {}, t && Ll(e, t);
  As(e.slots, ro, 1);
}, Su = (e, t, n) => {
  const { vnode: s, slots: o } = e;
  let r = !0, i = me;
  if (s.shapeFlag & 32) {
    const a = t._;
    a ? {}.NODE_ENV !== "production" && on ? De(o, t) : n && a === 1 ? r = !1 : (De(o, t), !n && a === 1 && delete o._) : (r = !t.$stable, Ml(t, o)), i = t;
  } else
    t && (Ll(e, t), i = { default: 1 });
  if (r)
    for (const a in o)
      !Rl(a) && !(a in i) && delete o[a];
};
function jl() {
  return {
    app: null,
    config: {
      isNativeTag: Fi,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let Du = 0;
function Tu(e, t) {
  return function(s, o = null) {
    q(s) || (s = Object.assign({}, s)), o != null && !he(o) && ({}.NODE_ENV !== "production" && $("root props passed to app.mount() must be an object."), o = null);
    const r = jl(), i = /* @__PURE__ */ new Set();
    let a = !1;
    const l = r.app = {
      _uid: Du++,
      _component: s,
      _props: o,
      _container: null,
      _context: r,
      _instance: null,
      version: ei,
      get config() {
        return r.config;
      },
      set config(u) {
        ({}).NODE_ENV !== "production" && $("app.config cannot be replaced. Modify individual options instead.");
      },
      use(u, ...d) {
        return i.has(u) ? {}.NODE_ENV !== "production" && $("Plugin has already been applied to target app.") : u && q(u.install) ? (i.add(u), u.install(l, ...d)) : q(u) ? (i.add(u), u(l, ...d)) : {}.NODE_ENV !== "production" && $('A plugin must either be a function or an object with an "install" function.'), l;
      },
      mixin(u) {
        return r.mixins.includes(u) ? {}.NODE_ENV !== "production" && $("Mixin has already been applied to target app" + (u.name ? `: ${u.name}` : "")) : r.mixins.push(u), l;
      },
      component(u, d) {
        return {}.NODE_ENV !== "production" && Fo(u, r.config), d ? ({}.NODE_ENV !== "production" && r.components[u] && $(`Component "${u}" has already been registered in target app.`), r.components[u] = d, l) : r.components[u];
      },
      directive(u, d) {
        return {}.NODE_ENV !== "production" && Sl(u), d ? ({}.NODE_ENV !== "production" && r.directives[u] && $(`Directive "${u}" has already been registered in target app.`), r.directives[u] = d, l) : r.directives[u];
      },
      mount(u, d, c) {
        if (a)
          ({}).NODE_ENV !== "production" && $("App has already been mounted.\nIf you want to remount the same app, move your app creation logic into a factory function and create fresh app instances for each mount - e.g. `const createMyApp = () => createApp(App)`");
        else {
          ({}).NODE_ENV !== "production" && u.__vue_app__ && $("There is already an app instance mounted on the host container.\n If you want to mount another app on the same host container, you need to unmount the previous app by calling `app.unmount()` first.");
          const p = N(s, o);
          return p.appContext = r, {}.NODE_ENV !== "production" && (r.reload = () => {
            e(Ft(p), u, c);
          }), d && t ? t(p, u) : e(p, u, c), a = !0, l._container = u, u.__vue_app__ = l, {}.NODE_ENV !== "production" && (l._instance = p.component, Ic(l, ei)), io(p.component) || p.component.proxy;
        }
      },
      unmount() {
        a ? (e(null, l._container), {}.NODE_ENV !== "production" && (l._instance = null, Vc(l)), delete l._container.__vue_app__) : {}.NODE_ENV !== "production" && $("Cannot unmount an app that is not mounted.");
      },
      provide(u, d) {
        return {}.NODE_ENV !== "production" && u in r.provides && $(`App already provides property with key "${String(u)}". It will be overwritten with the new value.`), r.provides[u] = d, l;
      }
    };
    return l;
  };
}
function Uo(e, t, n, s, o = !1) {
  if (G(e)) {
    e.forEach((p, m) => Uo(p, t && (G(t) ? t[m] : t), n, s, o));
    return;
  }
  if (Bn(s) && !o)
    return;
  const r = s.shapeFlag & 4 ? io(s.component) || s.component.proxy : s.el, i = o ? null : r, { i: a, r: l } = e;
  if ({}.NODE_ENV !== "production" && !a) {
    $("Missing ref owner context. ref cannot be used on hoisted vnodes. A vnode with ref must be created inside the render function.");
    return;
  }
  const u = t && t.r, d = a.refs === me ? a.refs = {} : a.refs, c = a.setupState;
  if (u != null && u !== l && (ke(u) ? (d[u] = null, se(c, u) && (c[u] = null)) : we(u) && (u.value = null)), q(l))
    Ot(l, a, 12, [i, d]);
  else {
    const p = ke(l), m = we(l);
    if (p || m) {
      const y = () => {
        if (e.f) {
          const E = p ? se(c, l) ? c[l] : d[l] : l.value;
          o ? G(E) && tr(E, r) : G(E) ? E.includes(r) || E.push(r) : p ? (d[l] = [r], se(c, l) && (c[l] = d[l])) : (l.value = [r], e.k && (d[e.k] = l.value));
        } else
          p ? (d[l] = i, se(c, l) && (c[l] = i)) : m ? (l.value = i, e.k && (d[e.k] = i)) : {}.NODE_ENV !== "production" && $("Invalid template ref type:", l, `(${typeof l})`);
      };
      i ? (y.id = -1, We(y, n)) : y();
    } else
      ({}).NODE_ENV !== "production" && $("Invalid template ref type:", l, `(${typeof l})`);
  }
}
let An, Rt;
function bt(e, t) {
  e.appContext.config.performance && Us() && Rt.mark(`vue-${t}-${e.uid}`), {}.NODE_ENV !== "production" && jc(e, t, Us() ? Rt.now() : Date.now());
}
function wt(e, t) {
  if (e.appContext.config.performance && Us()) {
    const n = `vue-${t}-${e.uid}`, s = n + ":end";
    Rt.mark(s), Rt.measure(`<${lo(e, e.type)}> ${t}`, n, s), Rt.clearMarks(n), Rt.clearMarks(s);
  }
  ({}).NODE_ENV !== "production" && Uc(e, t, Us() ? Rt.now() : Date.now());
}
function Us() {
  return An !== void 0 || (typeof window < "u" && window.performance ? (An = !0, Rt = window.performance) : An = !1), An;
}
function Pu() {
  const e = [];
  if ({}.NODE_ENV !== "production" && e.length) {
    const t = e.length > 1;
    console.warn(`Feature flag${t ? "s" : ""} ${e.join(", ")} ${t ? "are" : "is"} not explicitly defined. You are running the esm-bundler build of Vue, which expects these compile-time feature flags to be globally injected via the bundler config in order to get better tree-shaking in the production bundle.

For more details, see https://link.vuejs.org/feature-flags.`);
  }
}
const We = Qc;
function Au(e) {
  return Iu(e);
}
function Iu(e, t) {
  Pu();
  const n = Gi();
  n.__VUE__ = !0, {}.NODE_ENV !== "production" && yl(n.__VUE_DEVTOOLS_GLOBAL_HOOK__, n);
  const { insert: s, remove: o, patchProp: r, createElement: i, createText: a, createComment: l, setText: u, setElementText: d, parentNode: c, nextSibling: p, setScopeId: m = Me, insertStaticContent: y } = e, E = (f, _, g, w = null, b = null, C = null, A = !1, x = null, D = {}.NODE_ENV !== "production" && on ? !1 : !!_.dynamicChildren) => {
    if (f === _)
      return;
    f && !In(f, _) && (w = j(f), Xe(f, b, C, !0), f = null), _.patchFlag === -2 && (D = !1, _.dynamicChildren = null);
    const { type: k, ref: F, shapeFlag: M } = _;
    switch (k) {
      case fs:
        O(f, _, g, w);
        break;
      case qe:
        P(f, _, g, w);
        break;
      case Ds:
        f == null ? U(_, g, w, A) : {}.NODE_ENV !== "production" && W(f, _, g, A);
        break;
      case de:
        Ze(f, _, g, w, b, C, A, x, D);
        break;
      default:
        M & 1 ? Ne(f, _, g, w, b, C, A, x, D) : M & 6 ? et(f, _, g, w, b, C, A, x, D) : M & 64 || M & 128 ? k.process(f, _, g, w, b, C, A, x, D, ve) : {}.NODE_ENV !== "production" && $("Invalid VNode type:", k, `(${typeof k})`);
    }
    F != null && b && Uo(F, f && f.ref, C, _ || f, !_);
  }, O = (f, _, g, w) => {
    if (f == null)
      s(_.el = a(_.children), g, w);
    else {
      const b = _.el = f.el;
      _.children !== f.children && u(b, _.children);
    }
  }, P = (f, _, g, w) => {
    f == null ? s(_.el = l(_.children || ""), g, w) : _.el = f.el;
  }, U = (f, _, g, w) => {
    [f.el, f.anchor] = y(f.children, _, g, w, f.el, f.anchor);
  }, W = (f, _, g, w) => {
    if (_.children !== f.children) {
      const b = p(f.anchor);
      re(f), [_.el, _.anchor] = y(_.children, g, b, w);
    } else
      _.el = f.el, _.anchor = f.anchor;
  }, V = ({ el: f, anchor: _ }, g, w) => {
    let b;
    for (; f && f !== _; )
      b = p(f), s(f, g, w), f = b;
    s(_, g, w);
  }, re = ({ el: f, anchor: _ }) => {
    let g;
    for (; f && f !== _; )
      g = p(f), o(f), f = g;
    o(_);
  }, Ne = (f, _, g, w, b, C, A, x, D) => {
    A = A || _.type === "svg", f == null ? Ve(_, g, w, b, C, A, x, D) : z(f, _, b, C, A, x, D);
  }, Ve = (f, _, g, w, b, C, A, x) => {
    let D, k;
    const { type: F, props: M, shapeFlag: B, transition: Q, dirs: le } = f;
    if (D = f.el = i(f.type, C, M && M.is, M), B & 8 ? d(D, f.children) : B & 16 && X(f.children, D, null, w, b, C && F !== "foreignObject", A, x), le && Wt(f, null, w, "created"), M) {
      for (const _e in M)
        _e !== "value" && !ks(_e) && r(D, _e, null, M[_e], C, f.children, w, b, T);
      "value" in M && r(D, "value", null, M.value), (k = M.onVnodeBeforeMount) && ct(k, w, f);
    }
    je(D, f, f.scopeId, A, w), {}.NODE_ENV !== "production" && (Object.defineProperty(D, "__vnode", {
      value: f,
      enumerable: !1
    }), Object.defineProperty(D, "__vueParentComponent", {
      value: w,
      enumerable: !1
    })), le && Wt(f, null, w, "beforeMount");
    const ye = (!b || b && !b.pendingBranch) && Q && !Q.persisted;
    ye && Q.beforeEnter(D), s(D, _, g), ((k = M && M.onVnodeMounted) || ye || le) && We(() => {
      k && ct(k, w, f), ye && Q.enter(D), le && Wt(f, null, w, "mounted");
    }, b);
  }, je = (f, _, g, w, b) => {
    if (g && m(f, g), w)
      for (let C = 0; C < w.length; C++)
        m(f, w[C]);
    if (b) {
      let C = b.subTree;
      if ({}.NODE_ENV !== "production" && C.patchFlag > 0 && C.patchFlag & 2048 && (C = wl(C.children) || C), _ === C) {
        const A = b.vnode;
        je(f, A, A.scopeId, A.slotScopeIds, b.parent);
      }
    }
  }, X = (f, _, g, w, b, C, A, x, D = 0) => {
    for (let k = D; k < f.length; k++) {
      const F = f[k] = x ? At(f[k]) : st(f[k]);
      E(null, F, _, g, w, b, C, A, x);
    }
  }, z = (f, _, g, w, b, C, A) => {
    const x = _.el = f.el;
    let { patchFlag: D, dynamicChildren: k, dirs: F } = _;
    D |= f.patchFlag & 16;
    const M = f.props || me, B = _.props || me;
    let Q;
    g && qt(g, !1), (Q = B.onVnodeBeforeUpdate) && ct(Q, g, _, f), F && Wt(_, f, g, "beforeUpdate"), g && qt(g, !0), {}.NODE_ENV !== "production" && on && (D = 0, A = !1, k = null);
    const le = b && _.type !== "foreignObject";
    if (k ? (xe(f.dynamicChildren, k, x, g, w, le, C), {}.NODE_ENV !== "production" && g && g.type.__hmrId && Ss(f, _)) : A || Ge(f, _, x, null, g, w, le, C, !1), D > 0) {
      if (D & 16)
        Oe(x, _, M, B, g, w, b);
      else if (D & 2 && M.class !== B.class && r(x, "class", null, B.class, b), D & 4 && r(x, "style", M.style, B.style, b), D & 8) {
        const ye = _.dynamicProps;
        for (let _e = 0; _e < ye.length; _e++) {
          const $e = ye[_e], nt = M[$e], hn = B[$e];
          (hn !== nt || $e === "value") && r(x, $e, nt, hn, b, f.children, g, w, T);
        }
      }
      D & 1 && f.children !== _.children && d(x, _.children);
    } else
      !A && k == null && Oe(x, _, M, B, g, w, b);
    ((Q = B.onVnodeUpdated) || F) && We(() => {
      Q && ct(Q, g, _, f), F && Wt(_, f, g, "updated");
    }, w);
  }, xe = (f, _, g, w, b, C, A) => {
    for (let x = 0; x < _.length; x++) {
      const D = f[x], k = _[x], F = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        D.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (D.type === de || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !In(D, k) || // - In the case of a component, it could contain anything.
        D.shapeFlag & 70) ? c(D.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          g
        )
      );
      E(D, k, F, null, w, b, C, A, !0);
    }
  }, Oe = (f, _, g, w, b, C, A) => {
    if (g !== w) {
      if (g !== me)
        for (const x in g)
          !ks(x) && !(x in w) && r(f, x, g[x], null, A, _.children, b, C, T);
      for (const x in w) {
        if (ks(x))
          continue;
        const D = w[x], k = g[x];
        D !== k && x !== "value" && r(f, x, k, D, A, _.children, b, C, T);
      }
      "value" in w && r(f, "value", g.value, w.value);
    }
  }, Ze = (f, _, g, w, b, C, A, x, D) => {
    const k = _.el = f ? f.el : a(""), F = _.anchor = f ? f.anchor : a("");
    let { patchFlag: M, dynamicChildren: B, slotScopeIds: Q } = _;
    ({}).NODE_ENV !== "production" && // #5523 dev root fragment may inherit directives
    (on || M & 2048) && (M = 0, D = !1, B = null), Q && (x = x ? x.concat(Q) : Q), f == null ? (s(k, g, w), s(F, g, w), X(_.children, g, F, b, C, A, x, D)) : M > 0 && M & 64 && B && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    f.dynamicChildren ? (xe(f.dynamicChildren, B, g, b, C, A, x), {}.NODE_ENV !== "production" && b && b.type.__hmrId ? Ss(f, _) : (
      // #2080 if the stable fragment has a key, it's a <template v-for> that may
      //  get moved around. Make sure all root level vnodes inherit el.
      // #2134 or if it's a component root, it may also get moved around
      // as the component is being moved.
      (_.key != null || b && _ === b.subTree) && Ss(
        f,
        _,
        !0
        /* shallow */
      )
    )) : Ge(f, _, g, F, b, C, A, x, D);
  }, et = (f, _, g, w, b, C, A, x, D) => {
    _.slotScopeIds = x, f == null ? _.shapeFlag & 512 ? b.ctx.activate(_, g, w, A, D) : tt(_, g, w, b, C, A, D) : Te(f, _, D);
  }, tt = (f, _, g, w, b, C, A) => {
    const x = f.component = Hu(f, w, b);
    if ({}.NODE_ENV !== "production" && x.type.__hmrId && Dc(x), {}.NODE_ENV !== "production" && (xs(f), bt(x, "mount")), pr(f) && (x.ctx.renderer = ve), {}.NODE_ENV !== "production" && bt(x, "init"), Gu(x), {}.NODE_ENV !== "production" && wt(x, "init"), x.asyncDep) {
      if (b && b.registerDep(x, ne), !f.el) {
        const D = x.subTree = N(qe);
        P(null, D, _, g);
      }
      return;
    }
    ne(x, f, _, g, b, C, A), {}.NODE_ENV !== "production" && ($s(), wt(x, "mount"));
  }, Te = (f, _, g) => {
    const w = _.component = f.component;
    if (Wc(f, _, g))
      if (w.asyncDep && !w.asyncResolved) {
        ({}).NODE_ENV !== "production" && xs(_), ie(w, _, g), {}.NODE_ENV !== "production" && $s();
        return;
      } else
        w.next = _, Cc(w.update), w.update();
    else
      _.el = f.el, w.vnode = _;
  }, ne = (f, _, g, w, b, C, A) => {
    const x = () => {
      if (f.isMounted) {
        let { next: F, bu: M, u: B, parent: Q, vnode: le } = f, ye = F, _e;
        ({}).NODE_ENV !== "production" && xs(F || f.vnode), qt(f, !1), F ? (F.el = le.el, ie(f, F, A)) : F = le, M && vn(M), (_e = F.props && F.props.onVnodeBeforeUpdate) && ct(_e, Q, F, le), qt(f, !0), {}.NODE_ENV !== "production" && bt(f, "render");
        const $e = _o(f);
        ({}).NODE_ENV !== "production" && wt(f, "render");
        const nt = f.subTree;
        f.subTree = $e, {}.NODE_ENV !== "production" && bt(f, "patch"), E(
          nt,
          $e,
          // parent may have changed if it's in a teleport
          c(nt.el),
          // anchor may have changed if it's in a fragment
          j(nt),
          f,
          b,
          C
        ), {}.NODE_ENV !== "production" && wt(f, "patch"), F.el = $e.el, ye === null && qc(f, $e.el), B && We(B, b), (_e = F.props && F.props.onVnodeUpdated) && We(() => ct(_e, Q, F, le), b), {}.NODE_ENV !== "production" && vl(f), {}.NODE_ENV !== "production" && $s();
      } else {
        let F;
        const { el: M, props: B } = _, { bm: Q, m: le, parent: ye } = f, _e = Bn(_);
        if (qt(f, !1), Q && vn(Q), !_e && (F = B && B.onVnodeBeforeMount) && ct(F, ye, _), qt(f, !0), M && Y) {
          const $e = () => {
            ({}).NODE_ENV !== "production" && bt(f, "render"), f.subTree = _o(f), {}.NODE_ENV !== "production" && wt(f, "render"), {}.NODE_ENV !== "production" && bt(f, "hydrate"), Y(M, f.subTree, f, b, null), {}.NODE_ENV !== "production" && wt(f, "hydrate");
          };
          _e ? _.type.__asyncLoader().then(
            // note: we are moving the render call into an async callback,
            // which means it won't track dependencies - but it's ok because
            // a server-rendered async wrapper is already in resolved state
            // and it will never need to change.
            () => !f.isUnmounted && $e()
          ) : $e();
        } else {
          ({}).NODE_ENV !== "production" && bt(f, "render");
          const $e = f.subTree = _o(f);
          ({}).NODE_ENV !== "production" && wt(f, "render"), {}.NODE_ENV !== "production" && bt(f, "patch"), E(null, $e, g, w, f, b, C), {}.NODE_ENV !== "production" && wt(f, "patch"), _.el = $e.el;
        }
        if (le && We(le, b), !_e && (F = B && B.onVnodeMounted)) {
          const $e = _;
          We(() => ct(F, ye, $e), b);
        }
        (_.shapeFlag & 256 || ye && Bn(ye.vnode) && ye.vnode.shapeFlag & 256) && f.a && We(f.a, b), f.isMounted = !0, {}.NODE_ENV !== "production" && Rc(f), _ = g = w = null;
      }
    }, D = f.effect = new rr(
      x,
      () => to(k),
      f.scope
      // track it in component's effect scope
    ), k = f.update = () => D.run();
    k.id = f.uid, qt(f, !0), {}.NODE_ENV !== "production" && (D.onTrack = f.rtc ? (F) => vn(f.rtc, F) : void 0, D.onTrigger = f.rtg ? (F) => vn(f.rtg, F) : void 0, k.ownerInstance = f), k();
  }, ie = (f, _, g) => {
    _.component = f;
    const w = f.vnode.props;
    f.vnode = _, f.next = null, bu(f, _.props, w, g), Su(f, _.children, g), un(), jr(), dn();
  }, Ge = (f, _, g, w, b, C, A, x, D = !1) => {
    const k = f && f.children, F = f ? f.shapeFlag : 0, M = _.children, { patchFlag: B, shapeFlag: Q } = _;
    if (B > 0) {
      if (B & 128) {
        vt(k, M, g, w, b, C, A, x, D);
        return;
      } else if (B & 256) {
        fn(k, M, g, w, b, C, A, x, D);
        return;
      }
    }
    Q & 8 ? (F & 16 && T(k, b, C), M !== k && d(g, M)) : F & 16 ? Q & 16 ? vt(k, M, g, w, b, C, A, x, D) : T(k, b, C, !0) : (F & 8 && d(g, ""), Q & 16 && X(M, g, w, b, C, A, x, D));
  }, fn = (f, _, g, w, b, C, A, x, D) => {
    f = f || On, _ = _ || On;
    const k = f.length, F = _.length, M = Math.min(k, F);
    let B;
    for (B = 0; B < M; B++) {
      const Q = _[B] = D ? At(_[B]) : st(_[B]);
      E(f[B], Q, g, null, b, C, A, x, D);
    }
    k > F ? T(f, b, C, !0, !1, M) : X(_, g, w, b, C, A, x, D, M);
  }, vt = (f, _, g, w, b, C, A, x, D) => {
    let k = 0;
    const F = _.length;
    let M = f.length - 1, B = F - 1;
    for (; k <= M && k <= B; ) {
      const Q = f[k], le = _[k] = D ? At(_[k]) : st(_[k]);
      if (In(Q, le))
        E(Q, le, g, null, b, C, A, x, D);
      else
        break;
      k++;
    }
    for (; k <= M && k <= B; ) {
      const Q = f[M], le = _[B] = D ? At(_[B]) : st(_[B]);
      if (In(Q, le))
        E(Q, le, g, null, b, C, A, x, D);
      else
        break;
      M--, B--;
    }
    if (k > M) {
      if (k <= B) {
        const Q = B + 1, le = Q < F ? _[Q].el : w;
        for (; k <= B; )
          E(null, _[k] = D ? At(_[k]) : st(_[k]), g, le, b, C, A, x, D), k++;
      }
    } else if (k > B)
      for (; k <= M; )
        Xe(f[k], b, C, !0), k++;
    else {
      const Q = k, le = k, ye = /* @__PURE__ */ new Map();
      for (k = le; k <= B; k++) {
        const Ue = _[k] = D ? At(_[k]) : st(_[k]);
        Ue.key != null && ({}.NODE_ENV !== "production" && ye.has(Ue.key) && $("Duplicate keys found during update:", JSON.stringify(Ue.key), "Make sure keys are unique."), ye.set(Ue.key, k));
      }
      let _e, $e = 0;
      const nt = B - le + 1;
      let hn = !1, xr = 0;
      const Pn = new Array(nt);
      for (k = 0; k < nt; k++)
        Pn[k] = 0;
      for (k = Q; k <= M; k++) {
        const Ue = f[k];
        if ($e >= nt) {
          Xe(Ue, b, C, !0);
          continue;
        }
        let at;
        if (Ue.key != null)
          at = ye.get(Ue.key);
        else
          for (_e = le; _e <= B; _e++)
            if (Pn[_e - le] === 0 && In(Ue, _[_e])) {
              at = _e;
              break;
            }
        at === void 0 ? Xe(Ue, b, C, !0) : (Pn[at - le] = k + 1, at >= xr ? xr = at : hn = !0, E(Ue, _[at], g, null, b, C, A, x, D), $e++);
      }
      const $r = hn ? Vu(Pn) : On;
      for (_e = $r.length - 1, k = nt - 1; k >= 0; k--) {
        const Ue = le + k, at = _[Ue], Cr = Ue + 1 < F ? _[Ue + 1].el : w;
        Pn[k] === 0 ? E(null, at, g, Cr, b, C, A, x, D) : hn && (_e < 0 || k !== $r[_e] ? lt(
          at,
          g,
          Cr,
          2
          /* MoveType.REORDER */
        ) : _e--);
      }
    }
  }, lt = (f, _, g, w, b = null) => {
    const { el: C, type: A, transition: x, children: D, shapeFlag: k } = f;
    if (k & 6) {
      lt(f.component.subTree, _, g, w);
      return;
    }
    if (k & 128) {
      f.suspense.move(_, g, w);
      return;
    }
    if (k & 64) {
      A.move(f, _, g, ve);
      return;
    }
    if (A === de) {
      s(C, _, g);
      for (let M = 0; M < D.length; M++)
        lt(D[M], _, g, w);
      s(f.anchor, _, g);
      return;
    }
    if (A === Ds) {
      V(f, _, g);
      return;
    }
    if (w !== 2 && k & 1 && x)
      if (w === 0)
        x.beforeEnter(C), s(C, _, g), We(() => x.enter(C), b);
      else {
        const { leave: M, delayLeave: B, afterLeave: Q } = x, le = () => s(C, _, g), ye = () => {
          M(C, () => {
            le(), Q && Q();
          });
        };
        B ? B(C, le, ye) : ye();
      }
    else
      s(C, _, g);
  }, Xe = (f, _, g, w = !1, b = !1) => {
    const { type: C, props: A, ref: x, children: D, dynamicChildren: k, shapeFlag: F, patchFlag: M, dirs: B } = f;
    if (x != null && Uo(x, null, g, f, !0), F & 256) {
      _.ctx.deactivate(f);
      return;
    }
    const Q = F & 1 && B, le = !Bn(f);
    let ye;
    if (le && (ye = A && A.onVnodeBeforeUnmount) && ct(ye, _, f), F & 6)
      R(f.component, g, w);
    else {
      if (F & 128) {
        f.suspense.unmount(g, w);
        return;
      }
      Q && Wt(f, null, _, "beforeUnmount"), F & 64 ? f.type.remove(f, _, g, b, ve, w) : k && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (C !== de || M > 0 && M & 64) ? T(k, _, g, !1, !0) : (C === de && M & 384 || !b && F & 16) && T(D, _, g), w && pn(f);
    }
    (le && (ye = A && A.onVnodeUnmounted) || Q) && We(() => {
      ye && ct(ye, _, f), Q && Wt(f, null, _, "unmounted");
    }, g);
  }, pn = (f) => {
    const { type: _, el: g, anchor: w, transition: b } = f;
    if (_ === de) {
      ({}).NODE_ENV !== "production" && f.patchFlag > 0 && f.patchFlag & 2048 && b && !b.persisted ? f.children.forEach((A) => {
        A.type === qe ? o(A.el) : pn(A);
      }) : v(g, w);
      return;
    }
    if (_ === Ds) {
      re(f);
      return;
    }
    const C = () => {
      o(g), b && !b.persisted && b.afterLeave && b.afterLeave();
    };
    if (f.shapeFlag & 1 && b && !b.persisted) {
      const { leave: A, delayLeave: x } = b, D = () => A(g, C);
      x ? x(f.el, C, D) : D();
    } else
      C();
  }, v = (f, _) => {
    let g;
    for (; f !== _; )
      g = p(f), o(f), f = g;
    o(_);
  }, R = (f, _, g) => {
    ({}).NODE_ENV !== "production" && f.type.__hmrId && Tc(f);
    const { bum: w, scope: b, update: C, subTree: A, um: x } = f;
    w && vn(w), b.stop(), C && (C.active = !1, Xe(A, f, _, g)), x && We(x, _), We(() => {
      f.isUnmounted = !0;
    }, _), _ && _.pendingBranch && !_.isUnmounted && f.asyncDep && !f.asyncResolved && f.suspenseId === _.pendingId && (_.deps--, _.deps === 0 && _.resolve()), {}.NODE_ENV !== "production" && Lc(f);
  }, T = (f, _, g, w = !1, b = !1, C = 0) => {
    for (let A = C; A < f.length; A++)
      Xe(f[A], _, g, w, b);
  }, j = (f) => f.shapeFlag & 6 ? j(f.component.subTree) : f.shapeFlag & 128 ? f.suspense.next() : p(f.anchor || f.el), ue = (f, _, g) => {
    f == null ? _._vnode && Xe(_._vnode, null, null, !0) : E(_._vnode || null, f, _, null, null, null, g), jr(), _l(), _._vnode = f;
  }, ve = {
    p: E,
    um: Xe,
    m: lt,
    r: pn,
    mt: tt,
    mc: X,
    pc: Ge,
    pbc: xe,
    n: j,
    o: e
  };
  let ee, Y;
  return t && ([ee, Y] = t(ve)), {
    render: ue,
    hydrate: ee,
    createApp: Tu(ue, ee)
  };
}
function qt({ effect: e, update: t }, n) {
  e.allowRecurse = t.allowRecurse = n;
}
function Ss(e, t, n = !1) {
  const s = e.children, o = t.children;
  if (G(s) && G(o))
    for (let r = 0; r < s.length; r++) {
      const i = s[r];
      let a = o[r];
      a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && (a = o[r] = At(o[r]), a.el = i.el), n || Ss(i, a)), a.type === fs && (a.el = i.el), {}.NODE_ENV !== "production" && a.type === qe && !a.el && (a.el = i.el);
    }
}
function Vu(e) {
  const t = e.slice(), n = [0];
  let s, o, r, i, a;
  const l = e.length;
  for (s = 0; s < l; s++) {
    const u = e[s];
    if (u !== 0) {
      if (o = n[n.length - 1], e[o] < u) {
        t[s] = o, n.push(s);
        continue;
      }
      for (r = 0, i = n.length - 1; r < i; )
        a = r + i >> 1, e[n[a]] < u ? r = a + 1 : i = a;
      u < e[n[r]] && (r > 0 && (t[s] = n[r - 1]), n[r] = s);
    }
  }
  for (r = n.length, i = n[r - 1]; r-- > 0; )
    n[r] = i, i = t[i];
  return n;
}
const Ru = (e) => e.__isTeleport, de = Symbol({}.NODE_ENV !== "production" ? "Fragment" : void 0), fs = Symbol({}.NODE_ENV !== "production" ? "Text" : void 0), qe = Symbol({}.NODE_ENV !== "production" ? "Comment" : void 0), Ds = Symbol({}.NODE_ENV !== "production" ? "Static" : void 0), Gn = [];
let ot = null;
function S(e = !1) {
  Gn.push(ot = e ? null : []);
}
function Mu() {
  Gn.pop(), ot = Gn[Gn.length - 1] || null;
}
let ts = 1;
function Yr(e) {
  ts += e;
}
function Ul(e) {
  return e.dynamicChildren = ts > 0 ? ot || On : null, Mu(), ts > 0 && ot && ot.push(e), e;
}
function I(e, t, n, s, o, r) {
  return Ul(h(
    e,
    t,
    n,
    s,
    o,
    r,
    !0
    /* isBlock */
  ));
}
function it(e, t, n, s, o) {
  return Ul(N(
    e,
    t,
    n,
    s,
    o,
    !0
    /* isBlock: prevent a block from tracking itself */
  ));
}
function xn(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function In(e, t) {
  return {}.NODE_ENV !== "production" && t.shapeFlag & 6 && En.has(t.type) ? (e.shapeFlag &= -257, t.shapeFlag &= -513, !1) : e.type === t.type && e.key === t.key;
}
const Lu = (...e) => Hl(...e), ro = "__vInternal", Fl = ({ key: e }) => e ?? null, Ts = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? ke(e) || we(e) || q(e) ? { i: Ae, r: e, k: t, f: !!n } : e : null;
function h(e, t = null, n = null, s = 0, o = null, r = e === de ? 0 : 1, i = !1, a = !1) {
  const l = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Fl(t),
    ref: t && Ts(t),
    scopeId: so,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: r,
    patchFlag: s,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: Ae
  };
  return a ? (gr(l, n), r & 128 && e.normalize(l)) : n && (l.shapeFlag |= ke(n) ? 8 : 16), {}.NODE_ENV !== "production" && l.key !== l.key && $("VNode created with invalid key (NaN). VNode type:", l.type), ts > 0 && // avoid a block node from tracking itself
  !i && // has current parent block
  ot && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (l.patchFlag > 0 || r & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  l.patchFlag !== 32 && ot.push(l), l;
}
const N = {}.NODE_ENV !== "production" ? Lu : Hl;
function Hl(e, t = null, n = null, s = 0, o = null, r = !1) {
  if ((!e || e === au) && ({}.NODE_ENV !== "production" && !e && $(`Invalid vnode type when creating vnode: ${e}.`), e = qe), xn(e)) {
    const a = Ft(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && gr(a, n), ts > 0 && !r && ot && (a.shapeFlag & 6 ? ot[ot.indexOf(e)] = a : ot.push(a)), a.patchFlag |= -2, a;
  }
  if (ql(e) && (e = e.__vccOpts), t) {
    t = ju(t);
    let { class: a, style: l } = t;
    a && !ke(a) && (t.class = Se(a)), he(l) && (Rs(l) && !G(l) && (l = De({}, l)), t.style = ls(l));
  }
  const i = ke(e) ? 1 : zc(e) ? 128 : Ru(e) ? 64 : he(e) ? 4 : q(e) ? 2 : 0;
  return {}.NODE_ENV !== "production" && i & 4 && Rs(e) && (e = Z(e), $("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, e)), h(e, t, n, s, o, i, r, !0);
}
function ju(e) {
  return e ? Rs(e) || ro in e ? De({}, e) : e : null;
}
function Ft(e, t, n = !1) {
  const { props: s, ref: o, patchFlag: r, children: i } = e, a = t ? yr(s || {}, t) : s;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: a,
    key: a && Fl(a),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && o ? G(o) ? o.concat(Ts(t)) : [o, Ts(t)] : Ts(t)
    ) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: {}.NODE_ENV !== "production" && r === -1 && G(i) ? i.map(Bl) : i,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== de ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Ft(e.ssContent),
    ssFallback: e.ssFallback && Ft(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx
  };
}
function Bl(e) {
  const t = Ft(e);
  return G(e.children) && (t.children = e.children.map(Bl)), t;
}
function be(e = " ", t = 0) {
  return N(fs, null, e, t);
}
function Be(e = "", t = !1) {
  return t ? (S(), it(qe, null, e)) : N(qe, null, e);
}
function st(e) {
  return e == null || typeof e == "boolean" ? N(qe) : G(e) ? N(
    de,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : typeof e == "object" ? At(e) : N(fs, null, String(e));
}
function At(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Ft(e);
}
function gr(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null)
    t = null;
  else if (G(t))
    n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), gr(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(ro in t) ? t._ctx = Ae : o === 3 && Ae && (Ae.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    q(t) ? (t = { default: t, _ctx: Ae }, n = 32) : (t = String(t), s & 64 ? (n = 16, t = [be(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function yr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const o in s)
      if (o === "class")
        t.class !== s.class && (t.class = Se([t.class, s.class]));
      else if (o === "style")
        t.style = ls([t.style, s.style]);
      else if (as(o)) {
        const r = t[o], i = s[o];
        i && r !== i && !(G(r) && r.includes(i)) && (t[o] = r ? [].concat(r, i) : i);
      } else
        o !== "" && (t[o] = s[o]);
  }
  return t;
}
function ct(e, t, n, s = null) {
  rt(e, t, 7, [
    n,
    s
  ]);
}
const Uu = jl();
let Fu = 0;
function Hu(e, t, n) {
  const s = e.type, o = (t ? t.appContext : e.appContext) || Uu, r = {
    uid: Fu++,
    vnode: e,
    type: s,
    parent: t,
    appContext: o,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new ja(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(o.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Il(s, o),
    emitsOptions: bl(s, o),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: me,
    // inheritAttrs
    inheritAttrs: s.inheritAttrs,
    // state
    ctx: me,
    data: me,
    props: me,
    attrs: me,
    slots: me,
    refs: me,
    setupState: me,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return {}.NODE_ENV !== "production" ? r.ctx = uu(r) : r.ctx = { _: r }, r.root = t ? t.root : r, r.emit = Hc.bind(null, r), e.ce && e.ce(r), r;
}
let Pe = null;
const Gl = () => Pe || Ae, $n = (e) => {
  Pe = e, e.scope.on();
}, ln = () => {
  Pe && Pe.scope.off(), Pe = null;
}, Bu = /* @__PURE__ */ Bt("slot,component");
function Fo(e, t) {
  const n = t.isNativeTag || Fi;
  (Bu(e) || n(e)) && $("Do not use built-in or reserved HTML elements as component id: " + e);
}
function Kl(e) {
  return e.vnode.shapeFlag & 4;
}
let ns = !1;
function Gu(e, t = !1) {
  ns = t;
  const { props: n, children: s } = e.vnode, o = Kl(e);
  vu(e, n, o, t), Cu(e, s);
  const r = o ? Ku(e, t) : void 0;
  return ns = !1, r;
}
function Ku(e, t) {
  var n;
  const s = e.type;
  if ({}.NODE_ENV !== "production") {
    if (s.name && Fo(s.name, e.appContext.config), s.components) {
      const r = Object.keys(s.components);
      for (let i = 0; i < r.length; i++)
        Fo(r[i], e.appContext.config);
    }
    if (s.directives) {
      const r = Object.keys(s.directives);
      for (let i = 0; i < r.length; i++)
        Sl(r[i]);
    }
    s.compilerOptions && Wu() && $('"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.');
  }
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = ol(new Proxy(e.ctx, Tl)), {}.NODE_ENV !== "production" && du(e);
  const { setup: o } = s;
  if (o) {
    const r = e.setupContext = o.length > 1 ? qu(e) : null;
    $n(e), un();
    const i = Ot(o, e, 0, [{}.NODE_ENV !== "production" ? wn(e.props) : e.props, r]);
    if (dn(), ln(), nr(i)) {
      if (i.then(ln, ln), t)
        return i.then((a) => {
          Xr(e, a, t);
        }).catch((a) => {
          eo(
            a,
            e,
            0
            /* ErrorCodes.SETUP_FUNCTION */
          );
        });
      if (e.asyncDep = i, {}.NODE_ENV !== "production" && !e.suspense) {
        const a = (n = s.name) !== null && n !== void 0 ? n : "Anonymous";
        $(`Component <${a}>: setup function returned a promise, but no <Suspense> boundary was found in the parent component tree. A component with async setup() must be nested in a <Suspense> in order to be rendered.`);
      }
    } else
      Xr(e, i, t);
  } else
    Wl(e, t);
}
function Xr(e, t, n) {
  q(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : he(t) ? ({}.NODE_ENV !== "production" && xn(t) && $("setup() should not return VNodes directly - return a render function instead."), {}.NODE_ENV !== "production" && (e.devtoolsRawSetupState = t), e.setupState = al(t), {}.NODE_ENV !== "production" && fu(e)) : {}.NODE_ENV !== "production" && t !== void 0 && $(`setup() should return an object. Received: ${t === null ? "null" : typeof t}`), Wl(e, n);
}
let Ho;
const Wu = () => !Ho;
function Wl(e, t, n) {
  const s = e.type;
  if (!e.render) {
    if (!t && Ho && !s.render) {
      const o = s.template || _r(e).template;
      if (o) {
        ({}).NODE_ENV !== "production" && bt(e, "compile");
        const { isCustomElement: r, compilerOptions: i } = e.appContext.config, { delimiters: a, compilerOptions: l } = s, u = De(De({
          isCustomElement: r,
          delimiters: a
        }, i), l);
        s.render = Ho(o, u), {}.NODE_ENV !== "production" && wt(e, "compile");
      }
    }
    e.render = s.render || Me;
  }
  $n(e), un(), hu(e), dn(), ln(), {}.NODE_ENV !== "production" && !s.render && e.render === Me && !t && (s.template ? $(
    'Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".'
    /* should not happen */
  ) : $("Component is missing template or render function."));
}
function Zr(e) {
  return new Proxy(e.attrs, {}.NODE_ENV !== "production" ? {
    get(t, n) {
      return Ls(), ze(e, "get", "$attrs"), t[n];
    },
    set() {
      return $("setupContext.attrs is readonly."), !1;
    },
    deleteProperty() {
      return $("setupContext.attrs is readonly."), !1;
    }
  } : {
    get(t, n) {
      return ze(e, "get", "$attrs"), t[n];
    }
  });
}
function qu(e) {
  const t = (s) => {
    ({}).NODE_ENV !== "production" && e.exposed && $("expose() should be called only once per setup()."), e.exposed = s || {};
  };
  let n;
  return {}.NODE_ENV !== "production" ? Object.freeze({
    get attrs() {
      return n || (n = Zr(e));
    },
    get slots() {
      return wn(e.slots);
    },
    get emit() {
      return (s, ...o) => e.emit(s, ...o);
    },
    expose: t
  }) : {
    get attrs() {
      return n || (n = Zr(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function io(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(al(ol(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in rn)
          return rn[n](e);
      },
      has(t, n) {
        return n in t || n in rn;
      }
    }));
}
const zu = /(?:^|[-_])(\w)/g, Qu = (e) => e.replace(zu, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function vr(e, t = !0) {
  return q(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function lo(e, t, n = !1) {
  let s = vr(t);
  if (!s && t.__file) {
    const o = t.__file.match(/([^/\\]+)\.\w+$/);
    o && (s = o[1]);
  }
  if (!s && e && e.parent) {
    const o = (r) => {
      for (const i in r)
        if (r[i] === t)
          return i;
    };
    s = o(e.components || e.parent.type.components) || o(e.appContext.components);
  }
  return s ? Qu(s) : n ? "App" : "Anonymous";
}
function ql(e) {
  return q(e) && "__vccOpts" in e;
}
const H = (e, t) => Ec(e, t, ns);
function zl(e, t, n) {
  const s = arguments.length;
  return s === 2 ? he(t) && !G(t) ? xn(t) ? N(e, null, [t]) : N(e, t) : N(e, null, t) : (s > 3 ? n = Array.prototype.slice.call(arguments, 2) : s === 3 && xn(n) && (n = [n]), N(e, t, n));
}
const Ju = Symbol({}.NODE_ENV !== "production" ? "ssrContext" : ""), Yu = () => {
  {
    const e = kt(Ju);
    return e || {}.NODE_ENV !== "production" && $("Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."), e;
  }
};
function go(e) {
  return !!(e && e.__v_isShallow);
}
function Xu() {
  if ({}.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, s = { style: "color:#9d288c" }, o = {
    header(c) {
      return he(c) ? c.__isVue ? ["div", e, "VueInstance"] : we(c) ? [
        "div",
        {},
        ["span", e, d(c)],
        "<",
        a(c.value),
        ">"
      ] : nn(c) ? [
        "div",
        {},
        ["span", e, go(c) ? "ShallowReactive" : "Reactive"],
        "<",
        a(c),
        `>${Ut(c) ? " (readonly)" : ""}`
      ] : Ut(c) ? [
        "div",
        {},
        ["span", e, go(c) ? "ShallowReadonly" : "Readonly"],
        "<",
        a(c),
        ">"
      ] : null : null;
    },
    hasBody(c) {
      return c && c.__isVue;
    },
    body(c) {
      if (c && c.__isVue)
        return [
          "div",
          {},
          ...r(c.$)
        ];
    }
  };
  function r(c) {
    const p = [];
    c.type.props && c.props && p.push(i("props", Z(c.props))), c.setupState !== me && p.push(i("setup", c.setupState)), c.data !== me && p.push(i("data", Z(c.data)));
    const m = l(c, "computed");
    m && p.push(i("computed", m));
    const y = l(c, "inject");
    return y && p.push(i("injected", y)), p.push([
      "div",
      {},
      [
        "span",
        {
          style: s.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: c }]
    ]), p;
  }
  function i(c, p) {
    return p = De({}, p), Object.keys(p).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        c
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(p).map((m) => [
          "div",
          {},
          ["span", s, m + ": "],
          a(p[m], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function a(c, p = !0) {
    return typeof c == "number" ? ["span", t, c] : typeof c == "string" ? ["span", n, JSON.stringify(c)] : typeof c == "boolean" ? ["span", s, c] : he(c) ? ["object", { object: p ? Z(c) : c }] : ["span", n, String(c)];
  }
  function l(c, p) {
    const m = c.type;
    if (q(m))
      return;
    const y = {};
    for (const E in c.ctx)
      u(m, E, p) && (y[E] = c.ctx[E]);
    return y;
  }
  function u(c, p, m) {
    const y = c[m];
    if (G(y) && y.includes(p) || he(y) && p in y || c.extends && u(c.extends, p, m) || c.mixins && c.mixins.some((E) => u(E, p, m)))
      return !0;
  }
  function d(c) {
    return go(c) ? "ShallowRef" : c.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(o) : window.devtoolsFormatters = [o];
}
const ei = "3.2.45", Zu = "http://www.w3.org/2000/svg", Jt = typeof document < "u" ? document : null, ti = Jt && /* @__PURE__ */ Jt.createElement("template"), ed = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, s) => {
    const o = t ? Jt.createElementNS(Zu, e) : Jt.createElement(e, n ? { is: n } : void 0);
    return e === "select" && s && s.multiple != null && o.setAttribute("multiple", s.multiple), o;
  },
  createText: (e) => Jt.createTextNode(e),
  createComment: (e) => Jt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Jt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, s, o, r) {
    const i = n ? n.previousSibling : t.lastChild;
    if (o && (o === r || o.nextSibling))
      for (; t.insertBefore(o.cloneNode(!0), n), !(o === r || !(o = o.nextSibling)); )
        ;
    else {
      ti.innerHTML = s ? `<svg>${e}</svg>` : e;
      const a = ti.content;
      if (s) {
        const l = a.firstChild;
        for (; l.firstChild; )
          a.appendChild(l.firstChild);
        a.removeChild(l);
      }
      t.insertBefore(a, n);
    }
    return [
      // first
      i ? i.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
};
function td(e, t, n) {
  const s = e._vtc;
  s && (t = (t ? [t, ...s] : [...s]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
function nd(e, t, n) {
  const s = e.style, o = ke(n);
  if (n && !o) {
    for (const r in n)
      Bo(s, r, n[r]);
    if (t && !ke(t))
      for (const r in t)
        n[r] == null && Bo(s, r, "");
  } else {
    const r = s.display;
    o ? t !== n && (s.cssText = n) : t && e.removeAttribute("style"), "_vod" in e && (s.display = r);
  }
}
const sd = /[^\\];\s*$/, ni = /\s*!important$/;
function Bo(e, t, n) {
  if (G(n))
    n.forEach((s) => Bo(e, t, s));
  else if (n == null && (n = ""), {}.NODE_ENV !== "production" && sd.test(n) && $(`Unexpected semicolon at the end of '${t}' style value: '${n}'`), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const s = od(e, t);
    ni.test(n) ? e.setProperty($t(s), n.replace(ni, ""), "important") : e[s] = n;
  }
}
const si = ["Webkit", "Moz", "ms"], yo = {};
function od(e, t) {
  const n = yo[t];
  if (n)
    return n;
  let s = mt(t);
  if (s !== "filter" && s in e)
    return yo[t] = s;
  s = an(s);
  for (let o = 0; o < si.length; o++) {
    const r = si[o] + s;
    if (r in e)
      return yo[t] = r;
  }
  return t;
}
const oi = "http://www.w3.org/1999/xlink";
function rd(e, t, n, s, o) {
  if (s && t.startsWith("xlink:"))
    n == null ? e.removeAttributeNS(oi, t.slice(6, t.length)) : e.setAttributeNS(oi, t, n);
  else {
    const r = Pa(t);
    n == null || r && !Li(n) ? e.removeAttribute(t) : e.setAttribute(t, r ? "" : n);
  }
}
function id(e, t, n, s, o, r, i) {
  if (t === "innerHTML" || t === "textContent") {
    s && i(s, o, r), e[t] = n ?? "";
    return;
  }
  if (t === "value" && e.tagName !== "PROGRESS" && // custom elements may use _value internally
  !e.tagName.includes("-")) {
    e._value = n;
    const l = n ?? "";
    (e.value !== l || // #4956: always set for OPTION elements because its value falls back to
    // textContent if no value attribute is present. And setting .value for
    // OPTION has no side effect
    e.tagName === "OPTION") && (e.value = l), n == null && e.removeAttribute(t);
    return;
  }
  let a = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = Li(n) : n == null && l === "string" ? (n = "", a = !0) : l === "number" && (n = 0, a = !0);
  }
  try {
    e[t] = n;
  } catch (l) {
    ({}).NODE_ENV !== "production" && !a && $(`Failed setting prop "${t}" on <${e.tagName.toLowerCase()}>: value ${n} is invalid.`, l);
  }
  a && e.removeAttribute(t);
}
function Yt(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function ld(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
function ad(e, t, n, s, o = null) {
  const r = e._vei || (e._vei = {}), i = r[t];
  if (s && i)
    i.value = s;
  else {
    const [a, l] = cd(t);
    if (s) {
      const u = r[t] = fd(s, o);
      Yt(e, a, u, l);
    } else
      i && (ld(e, a, i, l), r[t] = void 0);
  }
}
const ri = /(?:Once|Passive|Capture)$/;
function cd(e) {
  let t;
  if (ri.test(e)) {
    t = {};
    let s;
    for (; s = e.match(ri); )
      e = e.slice(0, e.length - s[0].length), t[s[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : $t(e.slice(2)), t];
}
let vo = 0;
const ud = /* @__PURE__ */ Promise.resolve(), dd = () => vo || (ud.then(() => vo = 0), vo = Date.now());
function fd(e, t) {
  const n = (s) => {
    if (!s._vts)
      s._vts = Date.now();
    else if (s._vts <= n.attached)
      return;
    rt(pd(s, n.value), t, 5, [s]);
  };
  return n.value = e, n.attached = dd(), n;
}
function pd(e, t) {
  if (G(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map((s) => (o) => !o._stopped && s && s(o));
  } else
    return t;
}
const ii = /^on[a-z]/, hd = (e, t, n, s, o = !1, r, i, a, l) => {
  t === "class" ? td(e, s, o) : t === "style" ? nd(e, n, s) : as(t) ? Ps(t) || ad(e, t, n, s, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : _d(e, t, s, o)) ? id(e, t, s, r, i, a, l) : (t === "true-value" ? e._trueValue = s : t === "false-value" && (e._falseValue = s), rd(e, t, s, o));
};
function _d(e, t, n, s) {
  return s ? !!(t === "innerHTML" || t === "textContent" || t in e && ii.test(t) && q(n)) : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA" || ii.test(t) && ke(n) ? !1 : t in e;
}
const Fs = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return G(t) ? (n) => vn(t, n) : t;
};
function md(e) {
  e.target.composing = !0;
}
function li(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Cn = {
  created(e, { modifiers: { lazy: t, trim: n, number: s } }, o) {
    e._assign = Fs(o);
    const r = s || o.props && o.props.type === "number";
    Yt(e, t ? "change" : "input", (i) => {
      if (i.target.composing)
        return;
      let a = e.value;
      n && (a = a.trim()), r && (a = Is(a)), e._assign(a);
    }), n && Yt(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Yt(e, "compositionstart", md), Yt(e, "compositionend", li), Yt(e, "change", li));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, modifiers: { lazy: n, trim: s, number: o } }, r) {
    if (e._assign = Fs(r), e.composing || document.activeElement === e && e.type !== "range" && (n || s && e.value.trim() === t || (o || e.type === "number") && Is(e.value) === t))
      return;
    const i = t ?? "";
    e.value !== i && (e.value = i);
  }
}, Sn = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e._assign = Fs(n), Yt(e, "change", () => {
      const s = e._modelValue, o = gd(e), r = e.checked, i = e._assign;
      if (G(s)) {
        const a = ji(s, o), l = a !== -1;
        if (r && !l)
          i(s.concat(o));
        else if (!r && l) {
          const u = [...s];
          u.splice(a, 1), i(u);
        }
      } else if (zs(s)) {
        const a = new Set(s);
        r ? a.add(o) : a.delete(o), i(a);
      } else
        i(Ql(e, r));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: ai,
  beforeUpdate(e, t, n) {
    e._assign = Fs(n), ai(e, t, n);
  }
};
function ai(e, { value: t, oldValue: n }, s) {
  e._modelValue = t, G(t) ? e.checked = ji(t, s.props.value) > -1 : zs(t) ? e.checked = t.has(s.props.value) : t !== n && (e.checked = qs(t, Ql(e, !0)));
}
function gd(e) {
  return "_value" in e ? e._value : e.value;
}
function Ql(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const yd = ["ctrl", "shift", "alt", "meta"], vd = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => yd.some((n) => e[`${n}Key`] && !t.includes(n))
}, xt = (e, t) => (n, ...s) => {
  for (let o = 0; o < t.length; o++) {
    const r = vd[t[o]];
    if (r && r(n, t))
      return;
  }
  return e(n, ...s);
}, Ed = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Jl = (e, t) => (n) => {
  if (!("key" in n))
    return;
  const s = $t(n.key);
  if (t.some((o) => o === s || Ed[o] === s))
    return e(n);
}, bd = {
  beforeMount(e, { value: t }, { transition: n }) {
    e._vod = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Vn(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: s }) {
    !t != !n && (s ? t ? (s.beforeEnter(e), Vn(e, !0), s.enter(e)) : s.leave(e, () => {
      Vn(e, !1);
    }) : Vn(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Vn(e, t);
  }
};
function Vn(e, t) {
  e.style.display = t ? e._vod : "none";
}
const wd = /* @__PURE__ */ De({ patchProp: hd }, ed);
let ci;
function Nd() {
  return ci || (ci = Au(wd));
}
const ps = (...e) => {
  const t = Nd().createApp(...e);
  ({}).NODE_ENV !== "production" && (Od(t), kd(t));
  const { mount: n } = t;
  return t.mount = (s) => {
    const o = xd(s);
    if (!o)
      return;
    const r = t._component;
    !q(r) && !r.render && !r.template && (r.template = o.innerHTML), o.innerHTML = "";
    const i = n(o, !1, o instanceof SVGElement);
    return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), i;
  }, t;
};
function Od(e) {
  Object.defineProperty(e.config, "isNativeTag", {
    value: (t) => Sa(t) || Da(t),
    writable: !1
  });
}
function kd(e) {
  {
    const t = e.config.isCustomElement;
    Object.defineProperty(e.config, "isCustomElement", {
      get() {
        return t;
      },
      set() {
        $("The `isCustomElement` config option is deprecated. Use `compilerOptions.isCustomElement` instead.");
      }
    });
    const n = e.config.compilerOptions, s = 'The `compilerOptions` config option is only respected when using a build of Vue.js that includes the runtime compiler (aka "full build"). Since you are using the runtime-only build, `compilerOptions` must be passed to `@vue/compiler-dom` in the build setup instead.\n- For vue-loader: pass it via vue-loader\'s `compilerOptions` loader option.\n- For vue-cli: see https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-loader\n- For vite: pass it via @vitejs/plugin-vue options. See https://github.com/vitejs/vite/tree/main/packages/plugin-vue#example-for-passing-options-to-vuecompiler-dom';
    Object.defineProperty(e.config, "compilerOptions", {
      get() {
        return $(s), n;
      },
      set() {
        $(s);
      }
    });
  }
}
function xd(e) {
  if (ke(e)) {
    const t = document.querySelector(e);
    return {}.NODE_ENV !== "production" && !t && $(`Failed to mount app: mount target selector "${e}" returned null.`), t;
  }
  return {}.NODE_ENV !== "production" && window.ShadowRoot && e instanceof window.ShadowRoot && e.mode === "closed" && $('mounting on a ShadowRoot with `{mode: "closed"}` may lead to unpredictable bugs'), e;
}
function $d() {
  Xu();
}
({}).NODE_ENV !== "production" && $d();
const ge = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [s, o] of t)
    n[s] = o;
  return n;
}, Cd = {}, Sd = { id: "post-master" };
function Dd(e, t, n, s, o, r) {
  const i = Ee("router-view");
  return S(), I("div", Sd, [
    N(i)
  ]);
}
const Td = /* @__PURE__ */ ge(Cd, [["render", Dd]]);
var is, Gs, Yl;
class Er {
  constructor(t = "") {
    _n(this, Gs);
    _n(this, is, void 0);
    po(this, is, t);
  }
  get defaultConfig() {
    return {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }
      // add an abort signal
      // signal: abortController.signal,
    };
  }
  getFullURL(t) {
    return new URL(t, Kt(this, is));
  }
  makeRequest(t) {
    const n = this.getFullURL(t);
    return (o) => {
      let r = Sr(this, Gs, Yl).call(this, n, this.defaultConfig, o);
      return new Promise((a, l) => {
        fetch(n, r).then(async (u) => {
          var p;
          const c = ((p = u.headers.get("content-type")) == null ? void 0 : p.includes("application/json")) ? await u.json() : null;
          if (!u.ok) {
            const m = c && c.message || u.status;
            return l(m);
          }
          a(c);
        }).catch((u) => {
          console.error("Error fetching data:", u), l(u);
        });
      });
    };
  }
  /**
   * use this function in a derived class to
   * override the global params
   * 
   * @param {Object} params 
   * @returns 
   */
  visitGlobalParams(t) {
    return t;
  }
  get globalQueryParams() {
    let t = new URLSearchParams(location.search), n = {};
    for (let [s, o] of t.entries())
      n[s] = o;
    return window.redcap_csrf_token && (n.redcap_csrf_token = window.redcap_csrf_token), n = this.visitGlobalParams(n), n;
  }
  async send(t, n) {
    return this.makeRequest(t)(n);
  }
}
is = new WeakMap(), Gs = new WeakSet(), Yl = function(t, n, s) {
  for (let [o, r] of Object.entries(s))
    switch (o) {
      case "data":
        if (r instanceof FormData) {
          let u = {};
          const d = r;
          for (let [c, p] of d.entries())
            c in u ? (Array.isArray(u[c]) || (u[c] = [u[c]]), u[c].push(p)) : u[c] = p;
          n.body = JSON.stringify(u);
        } else
          n.body = JSON.stringify(r);
        break;
      case "params":
        const a = { ...this.globalQueryParams, ...r }, l = t.searchParams;
        for (const [u, d] of Object.entries(a))
          l.set(u, d);
        break;
      default:
        n[o] = r;
        break;
    }
  return n;
};
class Pd {
  constructor(t) {
    K(this, "body");
    K(this, "createdAt");
    K(this, "expiration");
    K(this, "from");
    K(this, "id");
    K(this, "lifespan");
    K(this, "read");
    K(this, "subject");
    K(this, "summary");
    K(this, "to");
    for (const [n, s] of Object.entries(t))
      this.hasOwnProperty(n) && (this[n] = s);
  }
  getReadable(t) {
    return window.hasOwnProperty("moment") ? window.moment(t).fromNow() : (console.warn("The moment.js library is missing; some features are disabled."), t);
  }
  get readableCreatedAt() {
    return this.getReadable(this.createdAt);
  }
  get readableExpiration() {
    return this.getReadable(this.expiration);
  }
}
const ui = Object.freeze({
  TOGGLE_READ: "toggle_read",
  DELETE: "delete",
  DELETE_SELECTED: "delete_selected",
  MARK_UNREAD_SELECTED: "mark_unread_selected",
  MARK_READ_SELECTED: "mark_read_selected"
});
let Go = "";
window.app_path_webroot_full ? Go = `${window.app_path_webroot_full}redcap_v${window.redcap_version}/` : Go = `${location.protocol}//${location.host}/api`;
const Eo = new Er(Go);
let di = !1;
const te = Gt({
  loading: !1,
  settings: {},
  list: [],
  //parcels
  active: null,
  // active parcel
  selected: [],
  // list of selected (checked) parcels
  findParcel(e) {
    return this.list.find((n) => n.id === e);
  },
  get unread() {
    let e = 0;
    for (const t of this.list)
      (t == null ? void 0 : t.read) === !1 && e++;
    return e;
  },
  reset() {
    this.active = null, this.selected = [], this.list = [];
  },
  async fetchList() {
    try {
      this.loading = !0, this.reset();
      const e = {
        route: "ParcelController:list"
      }, t = await Eo.send("", { params: e, method: "GET" }), { data: n = [], metadata: s = {} } = t;
      this.list = n.map((o) => new Pd(o));
    } catch (e) {
      console.log("error fetching messages", e);
    } finally {
      this.loading = !1;
    }
  },
  async fetchSettings() {
    const e = {
      route: "ParcelController:settings"
    }, t = await Eo.send("", { params: e, method: "GET" });
    this.settings = t;
  },
  async sendCommand(e, t = {}) {
    const n = {
      route: "ParcelController:command"
    };
    return await Eo.send("", {
      method: "POST",
      params: n,
      data: {
        action: e,
        args: t
      }
    });
  },
  /**
   * send commands, but use optimistic update
   * 
   * @param {String} ID 
   * @returns 
   */
  async deleteParcel(e) {
    const t = (r) => {
      const i = this.list.indexOf(r);
      i >= 0 && this.list.splice(i, 1);
    }, n = (r) => {
      const i = this.selected.indexOf(r);
      i < 0 || this.selected.splice(i, 1);
    }, s = (r) => {
      o === this.active && (this.active = null);
    }, o = this.findParcel(e);
    if (o)
      return n(e), s(), t(o), this.sendCommand(ui.DELETE, { id: e });
  },
  /**
   * send commands, but use optimistic update
   * 
   * @param {String} ID 
   * @param {Boolean} read 
   * @returns 
   */
  async markParcel(e, t) {
    const n = this.findParcel(e);
    return n && (n.read = t), this.sendCommand(ui.TOGGLE_READ, { id: e, read: t });
  },
  /**
   * toggle active parcel
   * @param {Object} parcel 
   */
  toggle(e) {
    this.active === e ? this.active = null : this.active = e;
  },
  async init() {
    return di ? void 0 : (di = !0, new Promise(async (t, n) => {
      try {
        await this.fetchSettings(), await this.fetchList(), t();
      } catch (s) {
        n(s);
      }
    }));
  }
});
let fi = null;
const Ad = 1e3 * 60, Id = {
  methods: {
    onRefreshClicked() {
      te.fetchList();
    }
  },
  mounted() {
    fi = setInterval(() => {
      te.fetchList();
    }, Ad);
  },
  unmounted() {
    clearInterval(fi);
  },
  computed: {
    loading() {
      return te.loading;
    },
    unread() {
      return te.unread;
    },
    link() {
      var e;
      return (e = te == null ? void 0 : te.settings) == null ? void 0 : e.indexURL;
    }
  }
}, Xl = (e) => (gt("data-v-d7879430"), e = e(), yt(), e), Vd = ["href"], Rd = {
  key: 0,
  class: "action"
}, Md = /* @__PURE__ */ Xl(() => /* @__PURE__ */ h("i", { class: "fa-solid fa-spinner fa-spin fa-fw" }, null, -1)), Ld = [
  Md
], jd = /* @__PURE__ */ Xl(() => /* @__PURE__ */ h("i", { class: "fas fa-sync-alt fa-fw" }, null, -1)), Ud = [
  jd
], Fd = {
  key: 2,
  class: "ml-2 badge badge-danger"
};
function Hd(e, t, n, s, o, r) {
  return S(), I(de, null, [
    h("a", { href: r.link }, "Messages", 8, Vd),
    r.loading ? (S(), I("span", Rd, Ld)) : (S(), I("span", {
      key: 1,
      class: "action",
      onClick: t[0] || (t[0] = (...i) => r.onRefreshClicked && r.onRefreshClicked(...i))
    }, Ud)),
    r.unread > 0 ? (S(), I("span", Fd, oe(r.unread), 1)) : Be("", !0)
  ], 64);
}
const Bd = /* @__PURE__ */ ge(Id, [["render", Hd], ["__scopeId", "data-v-d7879430"]]);
function Gd() {
  return Zl().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function Zl() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof global < "u" ? global : {};
}
const Kd = typeof Proxy == "function", Wd = "devtools-plugin:setup", qd = "plugin:settings:set";
let mn, Ko;
function zd() {
  var e;
  return mn !== void 0 || (typeof window < "u" && window.performance ? (mn = !0, Ko = window.performance) : typeof global < "u" && (!((e = global.perf_hooks) === null || e === void 0) && e.performance) ? (mn = !0, Ko = global.perf_hooks.performance) : mn = !1), mn;
}
function Qd() {
  return zd() ? Ko.now() : Date.now();
}
class Jd {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const s = {};
    if (t.settings)
      for (const i in t.settings) {
        const a = t.settings[i];
        s[i] = a.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${t.id}`;
    let r = Object.assign({}, s);
    try {
      const i = localStorage.getItem(o), a = JSON.parse(i);
      Object.assign(r, a);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return r;
      },
      setSettings(i) {
        try {
          localStorage.setItem(o, JSON.stringify(i));
        } catch {
        }
        r = i;
      },
      now() {
        return Qd();
      }
    }, n && n.on(qd, (i, a) => {
      i === this.plugin.id && this.fallbacks.setSettings(a);
    }), this.proxiedOn = new Proxy({}, {
      get: (i, a) => this.target ? this.target.on[a] : (...l) => {
        this.onQueue.push({
          method: a,
          args: l
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (i, a) => this.target ? this.target[a] : a === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(a) ? (...l) => (this.targetQueue.push({
        method: a,
        args: l,
        resolve: () => {
        }
      }), this.fallbacks[a](...l)) : (...l) => new Promise((u) => {
        this.targetQueue.push({
          method: a,
          args: l,
          resolve: u
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
}
function Yd(e, t) {
  const n = e, s = Zl(), o = Gd(), r = Kd && n.enableEarlyProxy;
  if (o && (s.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !r))
    o.emit(Wd, e, t);
  else {
    const i = r ? new Jd(n, o) : null;
    (s.__VUE_DEVTOOLS_PLUGINS__ = s.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: i
    }), i && t(i.proxiedTarget);
  }
}
/*!
  * vue-router v4.1.6
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
const Nt = typeof window < "u";
function Xd(e) {
  return e.__esModule || e[Symbol.toStringTag] === "Module";
}
const fe = Object.assign;
function bo(e, t) {
  const n = {};
  for (const s in t) {
    const o = t[s];
    n[s] = Ye(o) ? o.map(e) : e(o);
  }
  return n;
}
const Kn = () => {
}, Ye = Array.isArray;
function ce(e) {
  const t = Array.from(arguments).slice(1);
  console.warn.apply(console, ["[Vue Router warn]: " + e].concat(t));
}
const Zd = /\/$/, ef = (e) => e.replace(Zd, "");
function wo(e, t, n = "/") {
  let s, o = {}, r = "", i = "";
  const a = t.indexOf("#");
  let l = t.indexOf("?");
  return a < l && a >= 0 && (l = -1), l > -1 && (s = t.slice(0, l), r = t.slice(l + 1, a > -1 ? a : t.length), o = e(r)), a > -1 && (s = s || t.slice(0, a), i = t.slice(a, t.length)), s = sf(s ?? t, n), {
    fullPath: s + (r && "?") + r + i,
    path: s,
    query: o,
    hash: i
  };
}
function tf(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function pi(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || "/";
}
function hi(e, t, n) {
  const s = t.matched.length - 1, o = n.matched.length - 1;
  return s > -1 && s === o && Ht(t.matched[s], n.matched[o]) && ea(t.params, n.params) && e(t.query) === e(n.query) && t.hash === n.hash;
}
function Ht(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function ea(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length)
    return !1;
  for (const n in e)
    if (!nf(e[n], t[n]))
      return !1;
  return !0;
}
function nf(e, t) {
  return Ye(e) ? _i(e, t) : Ye(t) ? _i(t, e) : e === t;
}
function _i(e, t) {
  return Ye(t) ? e.length === t.length && e.every((n, s) => n === t[s]) : e.length === 1 && e[0] === t;
}
function sf(e, t) {
  if (e.startsWith("/"))
    return e;
  if ({}.NODE_ENV !== "production" && !t.startsWith("/"))
    return ce(`Cannot resolve a relative location without an absolute path. Trying to resolve "${e}" from "${t}". It should look like "/${t}".`), e;
  if (!e)
    return t;
  const n = t.split("/"), s = e.split("/");
  let o = n.length - 1, r, i;
  for (r = 0; r < s.length; r++)
    if (i = s[r], i !== ".")
      if (i === "..")
        o > 1 && o--;
      else
        break;
  return n.slice(0, o).join("/") + "/" + s.slice(r - (r === s.length ? 1 : 0)).join("/");
}
var ss;
(function(e) {
  e.pop = "pop", e.push = "push";
})(ss || (ss = {}));
var Wn;
(function(e) {
  e.back = "back", e.forward = "forward", e.unknown = "";
})(Wn || (Wn = {}));
function of(e) {
  if (!e)
    if (Nt) {
      const t = document.querySelector("base");
      e = t && t.getAttribute("href") || "/", e = e.replace(/^\w+:\/\/[^\/]+/, "");
    } else
      e = "/";
  return e[0] !== "/" && e[0] !== "#" && (e = "/" + e), ef(e);
}
const rf = /^[^#]+#/;
function lf(e, t) {
  return e.replace(rf, "#") + t;
}
function af(e, t) {
  const n = document.documentElement.getBoundingClientRect(), s = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0)
  };
}
const ao = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});
function cf(e) {
  let t;
  if ("el" in e) {
    const n = e.el, s = typeof n == "string" && n.startsWith("#");
    if ({}.NODE_ENV !== "production" && typeof e.el == "string" && (!s || !document.getElementById(e.el.slice(1))))
      try {
        const r = document.querySelector(e.el);
        if (s && r) {
          ce(`The selector "${e.el}" should be passed as "el: document.querySelector('${e.el}')" because it starts with "#".`);
          return;
        }
      } catch {
        ce(`The selector "${e.el}" is invalid. If you are using an id selector, make sure to escape it. You can find more information about escaping characters in selectors at https://mathiasbynens.be/notes/css-escapes or use CSS.escape (https://developer.mozilla.org/en-US/docs/Web/API/CSS/escape).`);
        return;
      }
    const o = typeof n == "string" ? s ? document.getElementById(n.slice(1)) : document.querySelector(n) : n;
    if (!o) {
      ({}).NODE_ENV !== "production" && ce(`Couldn't find element using selector "${e.el}" returned by scrollBehavior.`);
      return;
    }
    t = af(o, e);
  } else
    t = e;
  "scrollBehavior" in document.documentElement.style ? window.scrollTo(t) : window.scrollTo(t.left != null ? t.left : window.pageXOffset, t.top != null ? t.top : window.pageYOffset);
}
function mi(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const Wo = /* @__PURE__ */ new Map();
function uf(e, t) {
  Wo.set(e, t);
}
function df(e) {
  const t = Wo.get(e);
  return Wo.delete(e), t;
}
let ff = () => location.protocol + "//" + location.host;
function ta(e, t) {
  const { pathname: n, search: s, hash: o } = t, r = e.indexOf("#");
  if (r > -1) {
    let a = o.includes(e.slice(r)) ? e.slice(r).length : 1, l = o.slice(a);
    return l[0] !== "/" && (l = "/" + l), pi(l, "");
  }
  return pi(n, e) + s + o;
}
function pf(e, t, n, s) {
  let o = [], r = [], i = null;
  const a = ({ state: p }) => {
    const m = ta(e, location), y = n.value, E = t.value;
    let O = 0;
    if (p) {
      if (n.value = m, t.value = p, i && i === y) {
        i = null;
        return;
      }
      O = E ? p.position - E.position : 0;
    } else
      s(m);
    o.forEach((P) => {
      P(n.value, y, {
        delta: O,
        type: ss.pop,
        direction: O ? O > 0 ? Wn.forward : Wn.back : Wn.unknown
      });
    });
  };
  function l() {
    i = n.value;
  }
  function u(p) {
    o.push(p);
    const m = () => {
      const y = o.indexOf(p);
      y > -1 && o.splice(y, 1);
    };
    return r.push(m), m;
  }
  function d() {
    const { history: p } = window;
    p.state && p.replaceState(fe({}, p.state, { scroll: ao() }), "");
  }
  function c() {
    for (const p of r)
      p();
    r = [], window.removeEventListener("popstate", a), window.removeEventListener("beforeunload", d);
  }
  return window.addEventListener("popstate", a), window.addEventListener("beforeunload", d), {
    pauseListeners: l,
    listen: u,
    destroy: c
  };
}
function gi(e, t, n, s = !1, o = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: s,
    position: window.history.length,
    scroll: o ? ao() : null
  };
}
function hf(e) {
  const { history: t, location: n } = window, s = {
    value: ta(e, n)
  }, o = { value: t.state };
  o.value || r(s.value, {
    back: null,
    current: s.value,
    forward: null,
    // the length is off by one, we need to decrease it
    position: t.length - 1,
    replaced: !0,
    // don't add a scroll as the user may have an anchor, and we want
    // scrollBehavior to be triggered without a saved position
    scroll: null
  }, !0);
  function r(l, u, d) {
    const c = e.indexOf("#"), p = c > -1 ? (n.host && document.querySelector("base") ? e : e.slice(c)) + l : ff() + e + l;
    try {
      t[d ? "replaceState" : "pushState"](u, "", p), o.value = u;
    } catch (m) {
      ({}).NODE_ENV !== "production" ? ce("Error with push/replace State", m) : console.error(m), n[d ? "replace" : "assign"](p);
    }
  }
  function i(l, u) {
    const d = fe({}, t.state, gi(
      o.value.back,
      // keep back and forward entries but override current position
      l,
      o.value.forward,
      !0
    ), u, { position: o.value.position });
    r(l, d, !0), s.value = l;
  }
  function a(l, u) {
    const d = fe(
      {},
      // use current history state to gracefully handle a wrong call to
      // history.replaceState
      // https://github.com/vuejs/router/issues/366
      o.value,
      t.state,
      {
        forward: l,
        scroll: ao()
      }
    );
    ({}).NODE_ENV !== "production" && !t.state && ce(`history.state seems to have been manually replaced without preserving the necessary values. Make sure to preserve existing history state if you are manually calling history.replaceState:

history.replaceState(history.state, '', url)

You can find more information at https://next.router.vuejs.org/guide/migration/#usage-of-history-state.`), r(d.current, d, !0);
    const c = fe({}, gi(s.value, l, null), { position: d.position + 1 }, u);
    r(l, c, !1), s.value = l;
  }
  return {
    location: s,
    state: o,
    push: a,
    replace: i
  };
}
function _f(e) {
  e = of(e);
  const t = hf(e), n = pf(e, t.state, t.location, t.replace);
  function s(r, i = !0) {
    i || n.pauseListeners(), history.go(r);
  }
  const o = fe({
    // it's overridden right after
    location: "",
    base: e,
    go: s,
    createHref: lf.bind(null, e)
  }, t, n);
  return Object.defineProperty(o, "location", {
    enumerable: !0,
    get: () => t.location.value
  }), Object.defineProperty(o, "state", {
    enumerable: !0,
    get: () => t.state.value
  }), o;
}
function mf(e) {
  return e = location.host ? e || location.pathname + location.search : "", e.includes("#") || (e += "#"), {}.NODE_ENV !== "production" && !e.endsWith("#/") && !e.endsWith("#") && ce(`A hash base must end with a "#":
"${e}" should be "${e.replace(/#.*$/, "#")}".`), _f(e);
}
function gf(e) {
  return typeof e == "string" || e && typeof e == "object";
}
function na(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const Tt = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
}, qo = Symbol({}.NODE_ENV !== "production" ? "navigation failure" : "");
var yi;
(function(e) {
  e[e.aborted = 4] = "aborted", e[e.cancelled = 8] = "cancelled", e[e.duplicated = 16] = "duplicated";
})(yi || (yi = {}));
const yf = {
  [
    1
    /* ErrorTypes.MATCHER_NOT_FOUND */
  ]({ location: e, currentLocation: t }) {
    return `No match for
 ${JSON.stringify(e)}${t ? `
while being at
` + JSON.stringify(t) : ""}`;
  },
  [
    2
    /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
  ]({ from: e, to: t }) {
    return `Redirected from "${e.fullPath}" to "${Ef(t)}" via a navigation guard.`;
  },
  [
    4
    /* ErrorTypes.NAVIGATION_ABORTED */
  ]({ from: e, to: t }) {
    return `Navigation aborted from "${e.fullPath}" to "${t.fullPath}" via a navigation guard.`;
  },
  [
    8
    /* ErrorTypes.NAVIGATION_CANCELLED */
  ]({ from: e, to: t }) {
    return `Navigation cancelled from "${e.fullPath}" to "${t.fullPath}" with a new navigation.`;
  },
  [
    16
    /* ErrorTypes.NAVIGATION_DUPLICATED */
  ]({ from: e, to: t }) {
    return `Avoided redundant navigation to current location: "${e.fullPath}".`;
  }
};
function Dn(e, t) {
  return {}.NODE_ENV !== "production" ? fe(new Error(yf[e](t)), {
    type: e,
    [qo]: !0
  }, t) : fe(new Error(), {
    type: e,
    [qo]: !0
  }, t);
}
function Et(e, t) {
  return e instanceof Error && qo in e && (t == null || !!(e.type & t));
}
const vf = ["params", "query", "hash"];
function Ef(e) {
  if (typeof e == "string")
    return e;
  if ("path" in e)
    return e.path;
  const t = {};
  for (const n of vf)
    n in e && (t[n] = e[n]);
  return JSON.stringify(t, null, 2);
}
const vi = "[^/]+?", bf = {
  sensitive: !1,
  strict: !1,
  start: !0,
  end: !0
}, wf = /[.+*?^${}()[\]/\\]/g;
function Nf(e, t) {
  const n = fe({}, bf, t), s = [];
  let o = n.start ? "^" : "";
  const r = [];
  for (const u of e) {
    const d = u.length ? [] : [
      90
      /* PathScore.Root */
    ];
    n.strict && !u.length && (o += "/");
    for (let c = 0; c < u.length; c++) {
      const p = u[c];
      let m = 40 + (n.sensitive ? 0.25 : 0);
      if (p.type === 0)
        c || (o += "/"), o += p.value.replace(wf, "\\$&"), m += 40;
      else if (p.type === 1) {
        const { value: y, repeatable: E, optional: O, regexp: P } = p;
        r.push({
          name: y,
          repeatable: E,
          optional: O
        });
        const U = P || vi;
        if (U !== vi) {
          m += 10;
          try {
            new RegExp(`(${U})`);
          } catch (V) {
            throw new Error(`Invalid custom RegExp for param "${y}" (${U}): ` + V.message);
          }
        }
        let W = E ? `((?:${U})(?:/(?:${U}))*)` : `(${U})`;
        c || (W = // avoid an optional / if there are more segments e.g. /:p?-static
        // or /:p?-:p2
        O && u.length < 2 ? `(?:/${W})` : "/" + W), O && (W += "?"), o += W, m += 20, O && (m += -8), E && (m += -20), U === ".*" && (m += -50);
      }
      d.push(m);
    }
    s.push(d);
  }
  if (n.strict && n.end) {
    const u = s.length - 1;
    s[u][s[u].length - 1] += 0.7000000000000001;
  }
  n.strict || (o += "/?"), n.end ? o += "$" : n.strict && (o += "(?:/|$)");
  const i = new RegExp(o, n.sensitive ? "" : "i");
  function a(u) {
    const d = u.match(i), c = {};
    if (!d)
      return null;
    for (let p = 1; p < d.length; p++) {
      const m = d[p] || "", y = r[p - 1];
      c[y.name] = m && y.repeatable ? m.split("/") : m;
    }
    return c;
  }
  function l(u) {
    let d = "", c = !1;
    for (const p of e) {
      (!c || !d.endsWith("/")) && (d += "/"), c = !1;
      for (const m of p)
        if (m.type === 0)
          d += m.value;
        else if (m.type === 1) {
          const { value: y, repeatable: E, optional: O } = m, P = y in u ? u[y] : "";
          if (Ye(P) && !E)
            throw new Error(`Provided param "${y}" is an array but it is not repeatable (* or + modifiers)`);
          const U = Ye(P) ? P.join("/") : P;
          if (!U)
            if (O)
              p.length < 2 && (d.endsWith("/") ? d = d.slice(0, -1) : c = !0);
            else
              throw new Error(`Missing required param "${y}"`);
          d += U;
        }
    }
    return d || "/";
  }
  return {
    re: i,
    score: s,
    keys: r,
    parse: a,
    stringify: l
  };
}
function Of(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const s = t[n] - e[n];
    if (s)
      return s;
    n++;
  }
  return e.length < t.length ? e.length === 1 && e[0] === 40 + 40 ? -1 : 1 : e.length > t.length ? t.length === 1 && t[0] === 40 + 40 ? 1 : -1 : 0;
}
function kf(e, t) {
  let n = 0;
  const s = e.score, o = t.score;
  for (; n < s.length && n < o.length; ) {
    const r = Of(s[n], o[n]);
    if (r)
      return r;
    n++;
  }
  if (Math.abs(o.length - s.length) === 1) {
    if (Ei(s))
      return 1;
    if (Ei(o))
      return -1;
  }
  return o.length - s.length;
}
function Ei(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const xf = {
  type: 0,
  value: ""
}, $f = /[a-zA-Z0-9_]/;
function Cf(e) {
  if (!e)
    return [[]];
  if (e === "/")
    return [[xf]];
  if (!e.startsWith("/"))
    throw new Error({}.NODE_ENV !== "production" ? `Route paths should start with a "/": "${e}" should be "/${e}".` : `Invalid path "${e}"`);
  function t(m) {
    throw new Error(`ERR (${n})/"${u}": ${m}`);
  }
  let n = 0, s = n;
  const o = [];
  let r;
  function i() {
    r && o.push(r), r = [];
  }
  let a = 0, l, u = "", d = "";
  function c() {
    u && (n === 0 ? r.push({
      type: 0,
      value: u
    }) : n === 1 || n === 2 || n === 3 ? (r.length > 1 && (l === "*" || l === "+") && t(`A repeatable param (${u}) must be alone in its segment. eg: '/:ids+.`), r.push({
      type: 1,
      value: u,
      regexp: d,
      repeatable: l === "*" || l === "+",
      optional: l === "*" || l === "?"
    })) : t("Invalid state to consume buffer"), u = "");
  }
  function p() {
    u += l;
  }
  for (; a < e.length; ) {
    if (l = e[a++], l === "\\" && n !== 2) {
      s = n, n = 4;
      continue;
    }
    switch (n) {
      case 0:
        l === "/" ? (u && c(), i()) : l === ":" ? (c(), n = 1) : p();
        break;
      case 4:
        p(), n = s;
        break;
      case 1:
        l === "(" ? n = 2 : $f.test(l) ? p() : (c(), n = 0, l !== "*" && l !== "?" && l !== "+" && a--);
        break;
      case 2:
        l === ")" ? d[d.length - 1] == "\\" ? d = d.slice(0, -1) + l : n = 3 : d += l;
        break;
      case 3:
        c(), n = 0, l !== "*" && l !== "?" && l !== "+" && a--, d = "";
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return n === 2 && t(`Unfinished custom RegExp for param "${u}"`), c(), i(), o;
}
function Sf(e, t, n) {
  const s = Nf(Cf(e.path), n);
  if ({}.NODE_ENV !== "production") {
    const r = /* @__PURE__ */ new Set();
    for (const i of s.keys)
      r.has(i.name) && ce(`Found duplicated params with name "${i.name}" for path "${e.path}". Only the last one will be available on "$route.params".`), r.add(i.name);
  }
  const o = fe(s, {
    record: e,
    parent: t,
    // these needs to be populated by the parent
    children: [],
    alias: []
  });
  return t && !o.record.aliasOf == !t.record.aliasOf && t.children.push(o), o;
}
function Df(e, t) {
  const n = [], s = /* @__PURE__ */ new Map();
  t = Ni({ strict: !1, end: !0, sensitive: !1 }, t);
  function o(d) {
    return s.get(d);
  }
  function r(d, c, p) {
    const m = !p, y = Tf(d);
    ({}).NODE_ENV !== "production" && Vf(y, c), y.aliasOf = p && p.record;
    const E = Ni(t, d), O = [
      y
    ];
    if ("alias" in d) {
      const W = typeof d.alias == "string" ? [d.alias] : d.alias;
      for (const V of W)
        O.push(fe({}, y, {
          // this allows us to hold a copy of the `components` option
          // so that async components cache is hold on the original record
          components: p ? p.record.components : y.components,
          path: V,
          // we might be the child of an alias
          aliasOf: p ? p.record : y
          // the aliases are always of the same kind as the original since they
          // are defined on the same record
        }));
    }
    let P, U;
    for (const W of O) {
      const { path: V } = W;
      if (c && V[0] !== "/") {
        const re = c.record.path, Ne = re[re.length - 1] === "/" ? "" : "/";
        W.path = c.record.path + (V && Ne + V);
      }
      if ({}.NODE_ENV !== "production" && W.path === "*")
        throw new Error(`Catch all routes ("*") must now be defined using a param with a custom regexp.
See more at https://next.router.vuejs.org/guide/migration/#removed-star-or-catch-all-routes.`);
      if (P = Sf(W, c, E), {}.NODE_ENV !== "production" && c && V[0] === "/" && Rf(P, c), p ? (p.alias.push(P), {}.NODE_ENV !== "production" && If(p, P)) : (U = U || P, U !== P && U.alias.push(P), m && d.name && !wi(P) && i(d.name)), y.children) {
        const re = y.children;
        for (let Ne = 0; Ne < re.length; Ne++)
          r(re[Ne], P, p && p.children[Ne]);
      }
      p = p || P, (P.record.components && Object.keys(P.record.components).length || P.record.name || P.record.redirect) && l(P);
    }
    return U ? () => {
      i(U);
    } : Kn;
  }
  function i(d) {
    if (na(d)) {
      const c = s.get(d);
      c && (s.delete(d), n.splice(n.indexOf(c), 1), c.children.forEach(i), c.alias.forEach(i));
    } else {
      const c = n.indexOf(d);
      c > -1 && (n.splice(c, 1), d.record.name && s.delete(d.record.name), d.children.forEach(i), d.alias.forEach(i));
    }
  }
  function a() {
    return n;
  }
  function l(d) {
    let c = 0;
    for (; c < n.length && kf(d, n[c]) >= 0 && // Adding children with empty path should still appear before the parent
    // https://github.com/vuejs/router/issues/1124
    (d.record.path !== n[c].record.path || !sa(d, n[c])); )
      c++;
    n.splice(c, 0, d), d.record.name && !wi(d) && s.set(d.record.name, d);
  }
  function u(d, c) {
    let p, m = {}, y, E;
    if ("name" in d && d.name) {
      if (p = s.get(d.name), !p)
        throw Dn(1, {
          location: d
        });
      if ({}.NODE_ENV !== "production") {
        const U = Object.keys(d.params || {}).filter((W) => !p.keys.find((V) => V.name === W));
        U.length && ce(`Discarded invalid param(s) "${U.join('", "')}" when navigating. See https://github.com/vuejs/router/blob/main/packages/router/CHANGELOG.md#414-2022-08-22 for more details.`);
      }
      E = p.record.name, m = fe(
        // paramsFromLocation is a new object
        bi(
          c.params,
          // only keep params that exist in the resolved location
          // TODO: only keep optional params coming from a parent record
          p.keys.filter((U) => !U.optional).map((U) => U.name)
        ),
        // discard any existing params in the current location that do not exist here
        // #1497 this ensures better active/exact matching
        d.params && bi(d.params, p.keys.map((U) => U.name))
      ), y = p.stringify(m);
    } else if ("path" in d)
      y = d.path, {}.NODE_ENV !== "production" && !y.startsWith("/") && ce(`The Matcher cannot resolve relative paths but received "${y}". Unless you directly called \`matcher.resolve("${y}")\`, this is probably a bug in vue-router. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/router.`), p = n.find((U) => U.re.test(y)), p && (m = p.parse(y), E = p.record.name);
    else {
      if (p = c.name ? s.get(c.name) : n.find((U) => U.re.test(c.path)), !p)
        throw Dn(1, {
          location: d,
          currentLocation: c
        });
      E = p.record.name, m = fe({}, c.params, d.params), y = p.stringify(m);
    }
    const O = [];
    let P = p;
    for (; P; )
      O.unshift(P.record), P = P.parent;
    return {
      name: E,
      path: y,
      params: m,
      matched: O,
      meta: Af(O)
    };
  }
  return e.forEach((d) => r(d)), { addRoute: r, resolve: u, removeRoute: i, getRoutes: a, getRecordMatcher: o };
}
function bi(e, t) {
  const n = {};
  for (const s of t)
    s in e && (n[s] = e[s]);
  return n;
}
function Tf(e) {
  return {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: void 0,
    beforeEnter: e.beforeEnter,
    props: Pf(e),
    children: e.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in e ? e.components || null : e.component && { default: e.component }
  };
}
function Pf(e) {
  const t = {}, n = e.props || !1;
  if ("component" in e)
    t.default = n;
  else
    for (const s in e.components)
      t[s] = typeof n == "boolean" ? n : n[s];
  return t;
}
function wi(e) {
  for (; e; ) {
    if (e.record.aliasOf)
      return !0;
    e = e.parent;
  }
  return !1;
}
function Af(e) {
  return e.reduce((t, n) => fe(t, n.meta), {});
}
function Ni(e, t) {
  const n = {};
  for (const s in e)
    n[s] = s in t ? t[s] : e[s];
  return n;
}
function zo(e, t) {
  return e.name === t.name && e.optional === t.optional && e.repeatable === t.repeatable;
}
function If(e, t) {
  for (const n of e.keys)
    if (!n.optional && !t.keys.find(zo.bind(null, n)))
      return ce(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
  for (const n of t.keys)
    if (!n.optional && !e.keys.find(zo.bind(null, n)))
      return ce(`Alias "${t.record.path}" and the original record: "${e.record.path}" must have the exact same param named "${n.name}"`);
}
function Vf(e, t) {
  t && t.record.name && !e.name && !e.path && ce(`The route named "${String(t.record.name)}" has a child without a name and an empty path. Using that name won't render the empty path child so you probably want to move the name to the child instead. If this is intentional, add a name to the child route to remove the warning.`);
}
function Rf(e, t) {
  for (const n of t.keys)
    if (!e.keys.find(zo.bind(null, n)))
      return ce(`Absolute path "${e.record.path}" must have the exact same param named "${n.name}" as its parent "${t.record.path}".`);
}
function sa(e, t) {
  return t.children.some((n) => n === e || sa(e, n));
}
const oa = /#/g, Mf = /&/g, Lf = /\//g, jf = /=/g, Uf = /\?/g, ra = /\+/g, Ff = /%5B/g, Hf = /%5D/g, ia = /%5E/g, Bf = /%60/g, la = /%7B/g, Gf = /%7C/g, aa = /%7D/g, Kf = /%20/g;
function br(e) {
  return encodeURI("" + e).replace(Gf, "|").replace(Ff, "[").replace(Hf, "]");
}
function Wf(e) {
  return br(e).replace(la, "{").replace(aa, "}").replace(ia, "^");
}
function Qo(e) {
  return br(e).replace(ra, "%2B").replace(Kf, "+").replace(oa, "%23").replace(Mf, "%26").replace(Bf, "`").replace(la, "{").replace(aa, "}").replace(ia, "^");
}
function qf(e) {
  return Qo(e).replace(jf, "%3D");
}
function zf(e) {
  return br(e).replace(oa, "%23").replace(Uf, "%3F");
}
function Qf(e) {
  return e == null ? "" : zf(e).replace(Lf, "%2F");
}
function os(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {
    ({}).NODE_ENV !== "production" && ce(`Error decoding "${e}". Using original value`);
  }
  return "" + e;
}
function Jf(e) {
  const t = {};
  if (e === "" || e === "?")
    return t;
  const s = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let o = 0; o < s.length; ++o) {
    const r = s[o].replace(ra, " "), i = r.indexOf("="), a = os(i < 0 ? r : r.slice(0, i)), l = i < 0 ? null : os(r.slice(i + 1));
    if (a in t) {
      let u = t[a];
      Ye(u) || (u = t[a] = [u]), u.push(l);
    } else
      t[a] = l;
  }
  return t;
}
function Oi(e) {
  let t = "";
  for (let n in e) {
    const s = e[n];
    if (n = qf(n), s == null) {
      s !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (Ye(s) ? s.map((r) => r && Qo(r)) : [s && Qo(s)]).forEach((r) => {
      r !== void 0 && (t += (t.length ? "&" : "") + n, r != null && (t += "=" + r));
    });
  }
  return t;
}
function Yf(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    s !== void 0 && (t[n] = Ye(s) ? s.map((o) => o == null ? null : "" + o) : s == null ? s : "" + s);
  }
  return t;
}
const Xf = Symbol({}.NODE_ENV !== "production" ? "router view location matched" : ""), ki = Symbol({}.NODE_ENV !== "production" ? "router view depth" : ""), wr = Symbol({}.NODE_ENV !== "production" ? "router" : ""), ca = Symbol({}.NODE_ENV !== "production" ? "route location" : ""), Jo = Symbol({}.NODE_ENV !== "production" ? "router view location" : "");
function Rn() {
  let e = [];
  function t(s) {
    return e.push(s), () => {
      const o = e.indexOf(s);
      o > -1 && e.splice(o, 1);
    };
  }
  function n() {
    e = [];
  }
  return {
    add: t,
    list: () => e,
    reset: n
  };
}
function It(e, t, n, s, o) {
  const r = s && // name is defined if record is because of the function overload
  (s.enterCallbacks[o] = s.enterCallbacks[o] || []);
  return () => new Promise((i, a) => {
    const l = (c) => {
      c === !1 ? a(Dn(4, {
        from: n,
        to: t
      })) : c instanceof Error ? a(c) : gf(c) ? a(Dn(2, {
        from: t,
        to: c
      })) : (r && // since enterCallbackArray is truthy, both record and name also are
      s.enterCallbacks[o] === r && typeof c == "function" && r.push(c), i());
    }, u = e.call(s && s.instances[o], t, n, {}.NODE_ENV !== "production" ? Zf(l, t, n) : l);
    let d = Promise.resolve(u);
    if (e.length < 3 && (d = d.then(l)), {}.NODE_ENV !== "production" && e.length > 2) {
      const c = `The "next" callback was never called inside of ${e.name ? '"' + e.name + '"' : ""}:
${e.toString()}
. If you are returning a value instead of calling "next", make sure to remove the "next" parameter from your function.`;
      if (typeof u == "object" && "then" in u)
        d = d.then((p) => l._called ? p : (ce(c), Promise.reject(new Error("Invalid navigation guard"))));
      else if (u !== void 0 && !l._called) {
        ce(c), a(new Error("Invalid navigation guard"));
        return;
      }
    }
    d.catch((c) => a(c));
  });
}
function Zf(e, t, n) {
  let s = 0;
  return function() {
    s++ === 1 && ce(`The "next" callback was called more than once in one navigation guard when going from "${n.fullPath}" to "${t.fullPath}". It should be called exactly one time in each navigation guard. This will fail in production.`), e._called = !0, s === 1 && e.apply(null, arguments);
  };
}
function No(e, t, n, s) {
  const o = [];
  for (const r of e) {
    ({}).NODE_ENV !== "production" && !r.components && !r.children.length && ce(`Record with path "${r.path}" is either missing a "component(s)" or "children" property.`);
    for (const i in r.components) {
      let a = r.components[i];
      if ({}.NODE_ENV !== "production") {
        if (!a || typeof a != "object" && typeof a != "function")
          throw ce(`Component "${i}" in record with path "${r.path}" is not a valid component. Received "${String(a)}".`), new Error("Invalid route component");
        if ("then" in a) {
          ce(`Component "${i}" in record with path "${r.path}" is a Promise instead of a function that returns a Promise. Did you write "import('./MyPage.vue')" instead of "() => import('./MyPage.vue')" ? This will break in production if not fixed.`);
          const l = a;
          a = () => l;
        } else
          a.__asyncLoader && // warn only once per component
          !a.__warnedDefineAsync && (a.__warnedDefineAsync = !0, ce(`Component "${i}" in record with path "${r.path}" is defined using "defineAsyncComponent()". Write "() => import('./MyPage.vue')" instead of "defineAsyncComponent(() => import('./MyPage.vue'))".`));
      }
      if (!(t !== "beforeRouteEnter" && !r.instances[i]))
        if (ep(a)) {
          const u = (a.__vccOpts || a)[t];
          u && o.push(It(u, n, s, r, i));
        } else {
          let l = a();
          ({}).NODE_ENV !== "production" && !("catch" in l) && (ce(`Component "${i}" in record with path "${r.path}" is a function that does not return a Promise. If you were passing a functional component, make sure to add a "displayName" to the component. This will break in production if not fixed.`), l = Promise.resolve(l)), o.push(() => l.then((u) => {
            if (!u)
              return Promise.reject(new Error(`Couldn't resolve component "${i}" at "${r.path}"`));
            const d = Xd(u) ? u.default : u;
            r.components[i] = d;
            const p = (d.__vccOpts || d)[t];
            return p && It(p, n, s, r, i)();
          }));
        }
    }
  }
  return o;
}
function ep(e) {
  return typeof e == "object" || "displayName" in e || "props" in e || "__vccOpts" in e;
}
function xi(e) {
  const t = kt(wr), n = kt(ca), s = H(() => t.resolve(L(e.to))), o = H(() => {
    const { matched: l } = s.value, { length: u } = l, d = l[u - 1], c = n.matched;
    if (!d || !c.length)
      return -1;
    const p = c.findIndex(Ht.bind(null, d));
    if (p > -1)
      return p;
    const m = $i(l[u - 2]);
    return (
      // we are dealing with nested routes
      u > 1 && // if the parent and matched route have the same path, this link is
      // referring to the empty child. Or we currently are on a different
      // child of the same parent
      $i(d) === m && // avoid comparing the child with its parent
      c[c.length - 1].path !== m ? c.findIndex(Ht.bind(null, l[u - 2])) : p
    );
  }), r = H(() => o.value > -1 && op(n.params, s.value.params)), i = H(() => o.value > -1 && o.value === n.matched.length - 1 && ea(n.params, s.value.params));
  function a(l = {}) {
    return sp(l) ? t[L(e.replace) ? "replace" : "push"](
      L(e.to)
      // avoid uncaught errors are they are logged anyway
    ).catch(Kn) : Promise.resolve();
  }
  if ({}.NODE_ENV !== "production" && Nt) {
    const l = Gl();
    if (l) {
      const u = {
        route: s.value,
        isActive: r.value,
        isExactActive: i.value
      };
      l.__vrl_devtools = l.__vrl_devtools || [], l.__vrl_devtools.push(u), Jc(() => {
        u.route = s.value, u.isActive = r.value, u.isExactActive = i.value;
      }, { flush: "post" });
    }
  }
  return {
    route: s,
    href: H(() => s.value.href),
    isActive: r,
    isExactActive: i,
    navigate: a
  };
}
const tp = /* @__PURE__ */ Ol({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: !0
    },
    replace: Boolean,
    activeClass: String,
    // inactiveClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink: xi,
  setup(e, { slots: t }) {
    const n = Gt(xi(e)), { options: s } = kt(wr), o = H(() => ({
      [Ci(e.activeClass, s.linkActiveClass, "router-link-active")]: n.isActive,
      // [getLinkClass(
      //   props.inactiveClass,
      //   options.linkInactiveClass,
      //   'router-link-inactive'
      // )]: !link.isExactActive,
      [Ci(e.exactActiveClass, s.linkExactActiveClass, "router-link-exact-active")]: n.isExactActive
    }));
    return () => {
      const r = t.default && t.default(n);
      return e.custom ? r : zl("a", {
        "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
        href: n.href,
        // this would override user added attrs but Vue will still add
        // the listener, so we end up triggering both
        onClick: n.navigate,
        class: o.value
      }, r);
    };
  }
}), np = tp;
function sp(e) {
  if (!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) && !e.defaultPrevented && !(e.button !== void 0 && e.button !== 0)) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t))
        return;
    }
    return e.preventDefault && e.preventDefault(), !0;
  }
}
function op(e, t) {
  for (const n in t) {
    const s = t[n], o = e[n];
    if (typeof s == "string") {
      if (s !== o)
        return !1;
    } else if (!Ye(o) || o.length !== s.length || s.some((r, i) => r !== o[i]))
      return !1;
  }
  return !0;
}
function $i(e) {
  return e ? e.aliasOf ? e.aliasOf.path : e.path : "";
}
const Ci = (e, t, n) => e ?? t ?? n, rp = /* @__PURE__ */ Ol({
  name: "RouterView",
  // #674 we manually inherit them
  inheritAttrs: !1,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  // Better compat for @vue/compat users
  // https://github.com/vuejs/router/issues/1315
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t, slots: n }) {
    ({}).NODE_ENV !== "production" && lp();
    const s = kt(Jo), o = H(() => e.route || s.value), r = kt(ki, 0), i = H(() => {
      let u = L(r);
      const { matched: d } = o.value;
      let c;
      for (; (c = d[u]) && !c.components; )
        u++;
      return u;
    }), a = H(() => o.value.matched[i.value]);
    Cs(ki, H(() => i.value + 1)), Cs(Xf, a), Cs(Jo, o);
    const l = Ce();
    return Lt(() => [l.value, a.value, e.name], ([u, d, c], [p, m, y]) => {
      d && (d.instances[c] = u, m && m !== d && u && u === p && (d.leaveGuards.size || (d.leaveGuards = m.leaveGuards), d.updateGuards.size || (d.updateGuards = m.updateGuards))), u && d && // if there is no instance but to and from are the same this might be
      // the first visit
      (!m || !Ht(d, m) || !p) && (d.enterCallbacks[c] || []).forEach((E) => E(u));
    }, { flush: "post" }), () => {
      const u = o.value, d = e.name, c = a.value, p = c && c.components[d];
      if (!p)
        return Si(n.default, { Component: p, route: u });
      const m = c.props[d], y = m ? m === !0 ? u.params : typeof m == "function" ? m(u) : m : null, O = zl(p, fe({}, y, t, {
        onVnodeUnmounted: (P) => {
          P.component.isUnmounted && (c.instances[d] = null);
        },
        ref: l
      }));
      if ({}.NODE_ENV !== "production" && Nt && O.ref) {
        const P = {
          depth: i.value,
          name: c.name,
          path: c.path,
          meta: c.meta
        };
        (Ye(O.ref) ? O.ref.map((W) => W.i) : [O.ref.i]).forEach((W) => {
          W.__vrv_devtools = P;
        });
      }
      return (
        // pass the vnode to the slot as a prop.
        // h and <component :is="..."> both accept vnodes
        Si(n.default, { Component: O, route: u }) || O
      );
    };
  }
});
function Si(e, t) {
  if (!e)
    return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const ip = rp;
function lp() {
  const e = Gl(), t = e.parent && e.parent.type.name;
  if (t && (t === "KeepAlive" || t.includes("Transition"))) {
    const n = t === "KeepAlive" ? "keep-alive" : "transition";
    ce(`<router-view> can no longer be used directly inside <transition> or <keep-alive>.
Use slot props instead:

<router-view v-slot="{ Component }">
  <${n}>
    <component :is="Component" />
  </${n}>
</router-view>`);
  }
}
function Mn(e, t) {
  const n = fe({}, e, {
    // remove variables that can contain vue instances
    matched: e.matched.map((s) => mp(s, ["instances", "children", "aliasOf"]))
  });
  return {
    _custom: {
      type: null,
      readOnly: !0,
      display: e.fullPath,
      tooltip: t,
      value: n
    }
  };
}
function Ns(e) {
  return {
    _custom: {
      display: e
    }
  };
}
let ap = 0;
function cp(e, t, n) {
  if (t.__hasDevtools)
    return;
  t.__hasDevtools = !0;
  const s = ap++;
  Yd({
    id: "org.vuejs.router" + (s ? "." + s : ""),
    label: "Vue Router",
    packageName: "vue-router",
    homepage: "https://router.vuejs.org",
    logo: "https://router.vuejs.org/logo.png",
    componentStateTypes: ["Routing"],
    app: e
  }, (o) => {
    typeof o.now != "function" && console.warn("[Vue Router]: You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."), o.on.inspectComponent((d, c) => {
      d.instanceData && d.instanceData.state.push({
        type: "Routing",
        key: "$route",
        editable: !1,
        value: Mn(t.currentRoute.value, "Current Route")
      });
    }), o.on.visitComponentTree(({ treeNode: d, componentInstance: c }) => {
      if (c.__vrv_devtools) {
        const p = c.__vrv_devtools;
        d.tags.push({
          label: (p.name ? `${p.name.toString()}: ` : "") + p.path,
          textColor: 0,
          tooltip: "This component is rendered by &lt;router-view&gt;",
          backgroundColor: ua
        });
      }
      Ye(c.__vrl_devtools) && (c.__devtoolsApi = o, c.__vrl_devtools.forEach((p) => {
        let m = pa, y = "";
        p.isExactActive ? (m = fa, y = "This is exactly active") : p.isActive && (m = da, y = "This link is active"), d.tags.push({
          label: p.route.path,
          textColor: 0,
          tooltip: y,
          backgroundColor: m
        });
      }));
    }), Lt(t.currentRoute, () => {
      l(), o.notifyComponentUpdate(), o.sendInspectorTree(a), o.sendInspectorState(a);
    });
    const r = "router:navigations:" + s;
    o.addTimelineLayer({
      id: r,
      label: `Router${s ? " " + s : ""} Navigations`,
      color: 4237508
    }), t.onError((d, c) => {
      o.addTimelineEvent({
        layerId: r,
        event: {
          title: "Error during Navigation",
          subtitle: c.fullPath,
          logType: "error",
          time: o.now(),
          data: { error: d },
          groupId: c.meta.__navigationId
        }
      });
    });
    let i = 0;
    t.beforeEach((d, c) => {
      const p = {
        guard: Ns("beforeEach"),
        from: Mn(c, "Current Location during this navigation"),
        to: Mn(d, "Target location")
      };
      Object.defineProperty(d.meta, "__navigationId", {
        value: i++
      }), o.addTimelineEvent({
        layerId: r,
        event: {
          time: o.now(),
          title: "Start of navigation",
          subtitle: d.fullPath,
          data: p,
          groupId: d.meta.__navigationId
        }
      });
    }), t.afterEach((d, c, p) => {
      const m = {
        guard: Ns("afterEach")
      };
      p ? (m.failure = {
        _custom: {
          type: Error,
          readOnly: !0,
          display: p ? p.message : "",
          tooltip: "Navigation Failure",
          value: p
        }
      }, m.status = Ns("❌")) : m.status = Ns("✅"), m.from = Mn(c, "Current Location during this navigation"), m.to = Mn(d, "Target location"), o.addTimelineEvent({
        layerId: r,
        event: {
          title: "End of navigation",
          subtitle: d.fullPath,
          time: o.now(),
          data: m,
          logType: p ? "warning" : "default",
          groupId: d.meta.__navigationId
        }
      });
    });
    const a = "router-inspector:" + s;
    o.addInspector({
      id: a,
      label: "Routes" + (s ? " " + s : ""),
      icon: "book",
      treeFilterPlaceholder: "Search routes"
    });
    function l() {
      if (!u)
        return;
      const d = u;
      let c = n.getRoutes().filter((p) => !p.parent);
      c.forEach(ma), d.filter && (c = c.filter((p) => (
        // save matches state based on the payload
        Yo(p, d.filter.toLowerCase())
      ))), c.forEach((p) => _a(p, t.currentRoute.value)), d.rootNodes = c.map(ha);
    }
    let u;
    o.on.getInspectorTree((d) => {
      u = d, d.app === e && d.inspectorId === a && l();
    }), o.on.getInspectorState((d) => {
      if (d.app === e && d.inspectorId === a) {
        const p = n.getRoutes().find((m) => m.record.__vd_id === d.nodeId);
        p && (d.state = {
          options: dp(p)
        });
      }
    }), o.sendInspectorTree(a), o.sendInspectorState(a);
  });
}
function up(e) {
  return e.optional ? e.repeatable ? "*" : "?" : e.repeatable ? "+" : "";
}
function dp(e) {
  const { record: t } = e, n = [
    { editable: !1, key: "path", value: t.path }
  ];
  return t.name != null && n.push({
    editable: !1,
    key: "name",
    value: t.name
  }), n.push({ editable: !1, key: "regexp", value: e.re }), e.keys.length && n.push({
    editable: !1,
    key: "keys",
    value: {
      _custom: {
        type: null,
        readOnly: !0,
        display: e.keys.map((s) => `${s.name}${up(s)}`).join(" "),
        tooltip: "Param keys",
        value: e.keys
      }
    }
  }), t.redirect != null && n.push({
    editable: !1,
    key: "redirect",
    value: t.redirect
  }), e.alias.length && n.push({
    editable: !1,
    key: "aliases",
    value: e.alias.map((s) => s.record.path)
  }), Object.keys(e.record.meta).length && n.push({
    editable: !1,
    key: "meta",
    value: e.record.meta
  }), n.push({
    key: "score",
    editable: !1,
    value: {
      _custom: {
        type: null,
        readOnly: !0,
        display: e.score.map((s) => s.join(", ")).join(" | "),
        tooltip: "Score used to sort routes",
        value: e.score
      }
    }
  }), n;
}
const ua = 15485081, da = 2450411, fa = 8702998, fp = 2282478, pa = 16486972, pp = 6710886;
function ha(e) {
  const t = [], { record: n } = e;
  n.name != null && t.push({
    label: String(n.name),
    textColor: 0,
    backgroundColor: fp
  }), n.aliasOf && t.push({
    label: "alias",
    textColor: 0,
    backgroundColor: pa
  }), e.__vd_match && t.push({
    label: "matches",
    textColor: 0,
    backgroundColor: ua
  }), e.__vd_exactActive && t.push({
    label: "exact",
    textColor: 0,
    backgroundColor: fa
  }), e.__vd_active && t.push({
    label: "active",
    textColor: 0,
    backgroundColor: da
  }), n.redirect && t.push({
    label: typeof n.redirect == "string" ? `redirect: ${n.redirect}` : "redirects",
    textColor: 16777215,
    backgroundColor: pp
  });
  let s = n.__vd_id;
  return s == null && (s = String(hp++), n.__vd_id = s), {
    id: s,
    label: n.path,
    tags: t,
    children: e.children.map(ha)
  };
}
let hp = 0;
const _p = /^\/(.*)\/([a-z]*)$/;
function _a(e, t) {
  const n = t.matched.length && Ht(t.matched[t.matched.length - 1], e.record);
  e.__vd_exactActive = e.__vd_active = n, n || (e.__vd_active = t.matched.some((s) => Ht(s, e.record))), e.children.forEach((s) => _a(s, t));
}
function ma(e) {
  e.__vd_match = !1, e.children.forEach(ma);
}
function Yo(e, t) {
  const n = String(e.re).match(_p);
  if (e.__vd_match = !1, !n || n.length < 3)
    return !1;
  if (new RegExp(n[1].replace(/\$$/, ""), n[2]).test(t))
    return e.children.forEach((i) => Yo(i, t)), e.record.path !== "/" || t === "/" ? (e.__vd_match = e.re.test(t), !0) : !1;
  const o = e.record.path.toLowerCase(), r = os(o);
  return !t.startsWith("/") && (r.includes(t) || o.includes(t)) || r.startsWith(t) || o.startsWith(t) || e.record.name && String(e.record.name).includes(t) ? !0 : e.children.some((i) => Yo(i, t));
}
function mp(e, t) {
  const n = {};
  for (const s in e)
    t.includes(s) || (n[s] = e[s]);
  return n;
}
function gp(e) {
  const t = Df(e.routes, e), n = e.parseQuery || Jf, s = e.stringifyQuery || Oi, o = e.history;
  if ({}.NODE_ENV !== "production" && !o)
    throw new Error('Provide the "history" option when calling "createRouter()": https://next.router.vuejs.org/api/#history.');
  const r = Rn(), i = Rn(), a = Rn(), l = hc(Tt);
  let u = Tt;
  Nt && e.scrollBehavior && "scrollRestoration" in history && (history.scrollRestoration = "manual");
  const d = bo.bind(null, (v) => "" + v), c = bo.bind(null, Qf), p = (
    // @ts-expect-error: intentionally avoid the type check
    bo.bind(null, os)
  );
  function m(v, R) {
    let T, j;
    return na(v) ? (T = t.getRecordMatcher(v), j = R) : j = v, t.addRoute(j, T);
  }
  function y(v) {
    const R = t.getRecordMatcher(v);
    R ? t.removeRoute(R) : {}.NODE_ENV !== "production" && ce(`Cannot remove non-existent route "${String(v)}"`);
  }
  function E() {
    return t.getRoutes().map((v) => v.record);
  }
  function O(v) {
    return !!t.getRecordMatcher(v);
  }
  function P(v, R) {
    if (R = fe({}, R || l.value), typeof v == "string") {
      const Y = wo(n, v, R.path), f = t.resolve({ path: Y.path }, R), _ = o.createHref(Y.fullPath);
      return {}.NODE_ENV !== "production" && (_.startsWith("//") ? ce(`Location "${v}" resolved to "${_}". A resolved location cannot start with multiple slashes.`) : f.matched.length || ce(`No match found for location with path "${v}"`)), fe(Y, f, {
        params: p(f.params),
        hash: os(Y.hash),
        redirectedFrom: void 0,
        href: _
      });
    }
    let T;
    if ("path" in v)
      ({}).NODE_ENV !== "production" && "params" in v && !("name" in v) && // @ts-expect-error: the type is never
      Object.keys(v.params).length && ce(`Path "${// @ts-expect-error: the type is never
      v.path}" was passed with params but they will be ignored. Use a named route alongside params instead.`), T = fe({}, v, {
        path: wo(n, v.path, R.path).path
      });
    else {
      const Y = fe({}, v.params);
      for (const f in Y)
        Y[f] == null && delete Y[f];
      T = fe({}, v, {
        params: c(v.params)
      }), R.params = c(R.params);
    }
    const j = t.resolve(T, R), ue = v.hash || "";
    ({}).NODE_ENV !== "production" && ue && !ue.startsWith("#") && ce(`A \`hash\` should always start with the character "#". Replace "${ue}" with "#${ue}".`), j.params = d(p(j.params));
    const ve = tf(s, fe({}, v, {
      hash: Wf(ue),
      path: j.path
    })), ee = o.createHref(ve);
    return {}.NODE_ENV !== "production" && (ee.startsWith("//") ? ce(`Location "${v}" resolved to "${ee}". A resolved location cannot start with multiple slashes.`) : j.matched.length || ce(`No match found for location with path "${"path" in v ? v.path : v}"`)), fe({
      fullPath: ve,
      // keep the hash encoded so fullPath is effectively path + encodedQuery +
      // hash
      hash: ue,
      query: (
        // if the user is using a custom query lib like qs, we might have
        // nested objects, so we keep the query as is, meaning it can contain
        // numbers at `$route.query`, but at the point, the user will have to
        // use their own type anyway.
        // https://github.com/vuejs/router/issues/328#issuecomment-649481567
        s === Oi ? Yf(v.query) : v.query || {}
      )
    }, j, {
      redirectedFrom: void 0,
      href: ee
    });
  }
  function U(v) {
    return typeof v == "string" ? wo(n, v, l.value.path) : fe({}, v);
  }
  function W(v, R) {
    if (u !== v)
      return Dn(8, {
        from: R,
        to: v
      });
  }
  function V(v) {
    return Ve(v);
  }
  function re(v) {
    return V(fe(U(v), { replace: !0 }));
  }
  function Ne(v) {
    const R = v.matched[v.matched.length - 1];
    if (R && R.redirect) {
      const { redirect: T } = R;
      let j = typeof T == "function" ? T(v) : T;
      if (typeof j == "string" && (j = j.includes("?") || j.includes("#") ? j = U(j) : (
        // force empty params
        { path: j }
      ), j.params = {}), {}.NODE_ENV !== "production" && !("path" in j) && !("name" in j))
        throw ce(`Invalid redirect found:
${JSON.stringify(j, null, 2)}
 when navigating to "${v.fullPath}". A redirect must contain a name or path. This will break in production.`), new Error("Invalid redirect");
      return fe({
        query: v.query,
        hash: v.hash,
        // avoid transferring params if the redirect has a path
        params: "path" in j ? {} : v.params
      }, j);
    }
  }
  function Ve(v, R) {
    const T = u = P(v), j = l.value, ue = v.state, ve = v.force, ee = v.replace === !0, Y = Ne(T);
    if (Y)
      return Ve(
        fe(U(Y), {
          state: typeof Y == "object" ? fe({}, ue, Y.state) : ue,
          force: ve,
          replace: ee
        }),
        // keep original redirectedFrom if it exists
        R || T
      );
    const f = T;
    f.redirectedFrom = R;
    let _;
    return !ve && hi(s, j, T) && (_ = Dn(16, { to: f, from: j }), fn(
      j,
      j,
      // this is a push, the only way for it to be triggered from a
      // history.listen is with a redirect, which makes it become a push
      !0,
      // This cannot be the first navigation because the initial location
      // cannot be manually navigated to
      !1
    )), (_ ? Promise.resolve(_) : X(f, j)).catch((g) => Et(g) ? (
      // navigation redirects still mark the router as ready
      Et(
        g,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? g : Ge(g)
    ) : (
      // reject any unknown error
      ne(g, f, j)
    )).then((g) => {
      if (g) {
        if (Et(
          g,
          2
          /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
        ))
          return {}.NODE_ENV !== "production" && // we are redirecting to the same location we were already at
          hi(s, P(g.to), f) && // and we have done it a couple of times
          R && // @ts-expect-error: added only in dev
          (R._count = R._count ? (
            // @ts-expect-error
            R._count + 1
          ) : 1) > 10 ? (ce(`Detected an infinite redirection in a navigation guard when going from "${j.fullPath}" to "${f.fullPath}". Aborting to avoid a Stack Overflow. This will break in production if not fixed.`), Promise.reject(new Error("Infinite redirect in navigation guard"))) : Ve(
            // keep options
            fe({
              // preserve an existing replacement but allow the redirect to override it
              replace: ee
            }, U(g.to), {
              state: typeof g.to == "object" ? fe({}, ue, g.to.state) : ue,
              force: ve
            }),
            // preserve the original redirectedFrom if any
            R || f
          );
      } else
        g = xe(f, j, !0, ee, ue);
      return z(f, j, g), g;
    });
  }
  function je(v, R) {
    const T = W(v, R);
    return T ? Promise.reject(T) : Promise.resolve();
  }
  function X(v, R) {
    let T;
    const [j, ue, ve] = yp(v, R);
    T = No(j.reverse(), "beforeRouteLeave", v, R);
    for (const Y of j)
      Y.leaveGuards.forEach((f) => {
        T.push(It(f, v, R));
      });
    const ee = je.bind(null, v, R);
    return T.push(ee), gn(T).then(() => {
      T = [];
      for (const Y of r.list())
        T.push(It(Y, v, R));
      return T.push(ee), gn(T);
    }).then(() => {
      T = No(ue, "beforeRouteUpdate", v, R);
      for (const Y of ue)
        Y.updateGuards.forEach((f) => {
          T.push(It(f, v, R));
        });
      return T.push(ee), gn(T);
    }).then(() => {
      T = [];
      for (const Y of v.matched)
        if (Y.beforeEnter && !R.matched.includes(Y))
          if (Ye(Y.beforeEnter))
            for (const f of Y.beforeEnter)
              T.push(It(f, v, R));
          else
            T.push(It(Y.beforeEnter, v, R));
      return T.push(ee), gn(T);
    }).then(() => (v.matched.forEach((Y) => Y.enterCallbacks = {}), T = No(ve, "beforeRouteEnter", v, R), T.push(ee), gn(T))).then(() => {
      T = [];
      for (const Y of i.list())
        T.push(It(Y, v, R));
      return T.push(ee), gn(T);
    }).catch((Y) => Et(
      Y,
      8
      /* ErrorTypes.NAVIGATION_CANCELLED */
    ) ? Y : Promise.reject(Y));
  }
  function z(v, R, T) {
    for (const j of a.list())
      j(v, R, T);
  }
  function xe(v, R, T, j, ue) {
    const ve = W(v, R);
    if (ve)
      return ve;
    const ee = R === Tt, Y = Nt ? history.state : {};
    T && (j || ee ? o.replace(v.fullPath, fe({
      scroll: ee && Y && Y.scroll
    }, ue)) : o.push(v.fullPath, ue)), l.value = v, fn(v, R, T, ee), Ge();
  }
  let Oe;
  function Ze() {
    Oe || (Oe = o.listen((v, R, T) => {
      if (!pn.listening)
        return;
      const j = P(v), ue = Ne(j);
      if (ue) {
        Ve(fe(ue, { replace: !0 }), j).catch(Kn);
        return;
      }
      u = j;
      const ve = l.value;
      Nt && uf(mi(ve.fullPath, T.delta), ao()), X(j, ve).catch((ee) => Et(
        ee,
        12
        /* ErrorTypes.NAVIGATION_CANCELLED */
      ) ? ee : Et(
        ee,
        2
        /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */
      ) ? (Ve(
        ee.to,
        j
        // avoid an uncaught rejection, let push call triggerError
      ).then((Y) => {
        Et(
          Y,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && !T.delta && T.type === ss.pop && o.go(-1, !1);
      }).catch(Kn), Promise.reject()) : (T.delta && o.go(-T.delta, !1), ne(ee, j, ve))).then((ee) => {
        ee = ee || xe(
          // after navigation, all matched components are resolved
          j,
          ve,
          !1
        ), ee && (T.delta && // a new navigation has been triggered, so we do not want to revert, that will change the current history
        // entry while a different route is displayed
        !Et(
          ee,
          8
          /* ErrorTypes.NAVIGATION_CANCELLED */
        ) ? o.go(-T.delta, !1) : T.type === ss.pop && Et(
          ee,
          20
          /* ErrorTypes.NAVIGATION_DUPLICATED */
        ) && o.go(-1, !1)), z(j, ve, ee);
      }).catch(Kn);
    }));
  }
  let et = Rn(), tt = Rn(), Te;
  function ne(v, R, T) {
    Ge(v);
    const j = tt.list();
    return j.length ? j.forEach((ue) => ue(v, R, T)) : ({}.NODE_ENV !== "production" && ce("uncaught error during route navigation:"), console.error(v)), Promise.reject(v);
  }
  function ie() {
    return Te && l.value !== Tt ? Promise.resolve() : new Promise((v, R) => {
      et.add([v, R]);
    });
  }
  function Ge(v) {
    return Te || (Te = !v, Ze(), et.list().forEach(([R, T]) => v ? T(v) : R()), et.reset()), v;
  }
  function fn(v, R, T, j) {
    const { scrollBehavior: ue } = e;
    if (!Nt || !ue)
      return Promise.resolve();
    const ve = !T && df(mi(v.fullPath, 0)) || (j || !T) && history.state && history.state.scroll || null;
    return fl().then(() => ue(v, R, ve)).then((ee) => ee && cf(ee)).catch((ee) => ne(ee, v, R));
  }
  const vt = (v) => o.go(v);
  let lt;
  const Xe = /* @__PURE__ */ new Set(), pn = {
    currentRoute: l,
    listening: !0,
    addRoute: m,
    removeRoute: y,
    hasRoute: O,
    getRoutes: E,
    resolve: P,
    options: e,
    push: V,
    replace: re,
    go: vt,
    back: () => vt(-1),
    forward: () => vt(1),
    beforeEach: r.add,
    beforeResolve: i.add,
    afterEach: a.add,
    onError: tt.add,
    isReady: ie,
    install(v) {
      const R = this;
      v.component("RouterLink", np), v.component("RouterView", ip), v.config.globalProperties.$router = R, Object.defineProperty(v.config.globalProperties, "$route", {
        enumerable: !0,
        get: () => L(l)
      }), Nt && // used for the initial navigation client side to avoid pushing
      // multiple times when the router is used in multiple apps
      !lt && l.value === Tt && (lt = !0, V(o.location).catch((ue) => {
        ({}).NODE_ENV !== "production" && ce("Unexpected error when starting the router:", ue);
      }));
      const T = {};
      for (const ue in Tt)
        T[ue] = H(() => l.value[ue]);
      v.provide(wr, R), v.provide(ca, Gt(T)), v.provide(Jo, l);
      const j = v.unmount;
      Xe.add(v), v.unmount = function() {
        Xe.delete(v), Xe.size < 1 && (u = Tt, Oe && Oe(), Oe = null, l.value = Tt, lt = !1, Te = !1), j();
      }, {}.NODE_ENV !== "production" && Nt && cp(v, R, t);
    }
  };
  return pn;
}
function gn(e) {
  return e.reduce((t, n) => t.then(() => n()), Promise.resolve());
}
function yp(e, t) {
  const n = [], s = [], o = [], r = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < r; i++) {
    const a = t.matched[i];
    a && (e.matched.find((u) => Ht(u, a)) ? s.push(a) : n.push(a));
    const l = e.matched[i];
    l && (t.matched.find((u) => Ht(u, l)) || o.push(l));
  }
  return [n, s, o];
}
const vp = {}, Ep = { id: "post-master" };
function bp(e, t, n, s, o, r) {
  const i = Ee("router-view");
  return S(), I("div", Ep, [
    N(i)
  ]);
}
const wp = /* @__PURE__ */ ge(vp, [["render", bp]]);
const Np = {}, Op = { class: "wrapper" }, kp = { class: "detail" };
function xp(e, t, n, s, o, r) {
  const i = Ee("router-view");
  return S(), I("div", Op, [
    h("aside", null, [
      N(i, { name: "Aside" })
    ]),
    h("main", null, [
      h("div", kp, [
        N(i)
      ])
    ])
  ]);
}
const $p = /* @__PURE__ */ ge(Np, [["render", xp], ["__scopeId", "data-v-18071913"]]), Cp = {
  created() {
  }
}, Sp = /* @__PURE__ */ h("p", null, [
  /* @__PURE__ */ h("em", null, "Parcel"),
  /* @__PURE__ */ be(" is a system designed to securely store and manage messages that could contain sensitive data such as protected health information (PHI).")
], -1), Dp = /* @__PURE__ */ h("p", null, "All messages are encrypted to ensure the confidentiality and integrity of the data.", -1), Tp = /* @__PURE__ */ h("p", null, "Additionally, the system includes a functionality that automatically deletes messages once they reach their expiration date. This ensures that PHI is only accessible to authorized individuals for the necessary duration, and that it is subsequently removed to maintain compliance with relevant regulations.", -1), Pp = /* @__PURE__ */ h("p", null, "Overall, our messaging system provides a secure and efficient way to manage PHI while maintaining compliance with relevant regulations.", -1), Ap = [
  Sp,
  Dp,
  Tp,
  Pp
];
function Ip(e, t, n, s, o, r) {
  return S(), I("div", null, Ap);
}
const Vp = /* @__PURE__ */ ge(Cp, [["render", Ip]]);
const Rp = {
  props: {
    read: {
      type: Boolean,
      default: !1
    },
    parcelId: {
      type: String,
      default: null
    }
  },
  computed: {
    readIconClass() {
      return this.read ? "fa-envelope" : "fa-envelope-open";
    }
  },
  methods: {
    onDeleteClicked() {
      if (!confirm("Are you sure you want to delete this item?"))
        return;
      const t = this.parcelId;
      te.deleteParcel(t);
    },
    onMarkClicked() {
      const e = this.parcelId, t = !Boolean(this.read);
      te.markParcel(e, t);
    }
  }
}, Mp = (e) => (gt("data-v-38251629"), e = e(), yt(), e), Lp = /* @__PURE__ */ Mp(() => /* @__PURE__ */ h("i", { class: "fa-regular fa-trash-can fa-fw" }, null, -1)), jp = [
  Lp
], Up = ["title"];
function Fp(e, t, n, s, o, r) {
  return S(), I("ul", null, [
    h("li", {
      onClick: t[0] || (t[0] = xt((...i) => r.onDeleteClicked && r.onDeleteClicked(...i), ["stop"])),
      title: "delete"
    }, jp),
    h("li", {
      onClick: t[1] || (t[1] = xt((...i) => r.onMarkClicked && r.onMarkClicked(...i), ["stop"])),
      title: `mark as ${n.read ? "unread" : "read"}`
    }, [
      h("i", {
        class: Se(["fa-regular fa-empty-set fa-fw", r.readIconClass])
      }, null, 2)
    ], 8, Up)
  ]);
}
const Hp = /* @__PURE__ */ ge(Rp, [["render", Fp], ["__scopeId", "data-v-38251629"]]), Bp = {
  data() {
    return {
      momentAvailable: window.hasOwnProperty("moment")
    };
  },
  props: {
    value: { type: String, default: null }
  },
  computed: {
    _date() {
      if (!this.momentAvailable)
        return this.value;
      const e = window.moment(), t = new Date(this.value);
      return e.isSame(t, "day") ? window.moment(t).format("LT") : window.moment(t).format("L");
    }
  }
};
function Gp(e, t, n, s, o, r) {
  return S(), I("span", null, [
    be(oe(r._date), 1),
    Re(e.$slots, "default")
  ]);
}
const Kp = /* @__PURE__ */ ge(Bp, [["render", Gp]]);
const Wp = {
  components: { ParcelToolbar: Hp, DateTime: Kp },
  props: {
    parcel: {
      type: Object,
      default: {}
    }
  },
  computed: {
    active() {
      var e, t;
      return ((e = te.active) == null ? void 0 : e.id) === ((t = this.parcel) == null ? void 0 : t.id);
    },
    read() {
      var e;
      return ((e = this.parcel) == null ? void 0 : e.read) === !0;
    },
    selected: {
      get() {
        return te.selected.indexOf(this.parcel.id) >= 0;
      },
      set(e) {
        const t = this.parcel.id, s = [...te.selected].indexOf(t);
        if (e === !0) {
          if (s >= 0)
            return;
          te.selected.push(t);
        } else {
          if (s < 0)
            return;
          te.selected.splice(s, 1);
        }
      }
    }
  }
}, qp = { class: "pl-2 mr-2" }, zp = ["value"], Qp = { class: "flex-fill" }, Jp = {
  class: "d-block",
  "data-from": ""
}, Yp = { class: "d-flex" }, Xp = {
  class: "d-block",
  "data-subject": ""
}, Zp = ["title"], eh = {
  class: "d-block",
  "data-summary": ""
};
function th(e, t, n, s, o, r) {
  const i = Ee("DateTime"), a = Ee("ParcelToolbar");
  return S(), I("main", {
    class: Se(["d-flex align-items-center p-2", { active: r.active, read: r.read }])
  }, [
    h("aside", qp, [
      Je(h("input", {
        type: "checkbox",
        "onUpdate:modelValue": t[0] || (t[0] = (l) => r.selected = l),
        value: n.parcel.id,
        onClick: t[1] || (t[1] = xt(() => {
        }, ["stop"]))
      }, null, 8, zp), [
        [Sn, r.selected]
      ])
    ]),
    h("article", Qp, [
      h("span", Jp, oe(n.parcel.from), 1),
      h("span", Yp, [
        h("span", Xp, oe(n.parcel.subject), 1),
        h("span", {
          class: "d-block ml-auto text-muted text-right",
          "data-created-at": "",
          title: n.parcel.createdAt
        }, [
          N(i, {
            value: n.parcel.createdAt
          }, null, 8, ["value"])
        ], 8, Zp)
      ]),
      h("span", eh, oe(n.parcel.summary), 1),
      N(a, {
        "data-toolbar": "",
        read: n.parcel.read,
        "parcel-id": n.parcel.id
      }, null, 8, ["read", "parcel-id"])
    ])
  ], 2);
}
const nh = /* @__PURE__ */ ge(Wp, [["render", th], ["__scopeId", "data-v-22390d1c"]]);
const sh = {}, Nr = (e) => (gt("data-v-c1f6f322"), e = e(), yt(), e), oh = { "data-wrapper": "" }, rh = /* @__PURE__ */ Nr(() => /* @__PURE__ */ h("span", { class: "title" }, "Folder is empty", -1)), ih = /* @__PURE__ */ Nr(() => /* @__PURE__ */ h("i", { class: "icon fa-regular fa-folder-open" }, null, -1)), lh = /* @__PURE__ */ Nr(() => /* @__PURE__ */ h("span", { class: "description" }, "Nothing to select.", -1)), ah = [
  rh,
  ih,
  lh
];
function ch(e, t, n, s, o, r) {
  return S(), I("div", oh, ah);
}
const uh = /* @__PURE__ */ ge(sh, [["render", ch], ["__scopeId", "data-v-c1f6f322"]]);
const dh = {
  components: { ParcelListItem: nh, FolderEmpty: uh },
  computed: {
    read() {
      const e = [...te.selected];
      for (const t of te.list)
        if (e.includes(t.id) && t.read === !0)
          return !0;
      return !1;
    },
    loading() {
      return te.loading;
    },
    list() {
      return te.list;
    },
    unread() {
      return te.unread;
    },
    readIconClass() {
      return this.read ? "fa-envelope" : "fa-envelope-open";
    },
    indeterminate() {
      const e = [...te.selected];
      if (e.length === 0)
        return !1;
      const t = te.list.map((n) => n.id);
      return e.length != t.length;
    },
    allChecked: {
      get() {
        const e = [...te.selected];
        if (e.length === 0)
          return !1;
        const t = te.list.map((n) => n.id);
        return e.length === t.length;
      },
      set(e) {
        e === !1 ? te.selected = [] : te.selected = te.list.map((t) => t.id);
      }
    },
    actionsDisabled() {
      return [...te.selected].length <= 0;
    }
  },
  methods: {
    async onRefreshClicked() {
      te.fetchList();
    },
    onParcelClicked(e) {
      te.toggle(e), te.active === null ? this.$router.push("/inbox") : this.$router.push(`/inbox/${e.id}`);
    },
    onDeleteClicked() {
      const e = [...te.selected], t = e.length;
      if (!(t < 1 || confirm(`Are you sure wyou want to delete ${t} element${t === 1 ? "" : "s"}`) === !1)) {
        console.log("onDeleteClickedAll clicked");
        for (const s of e)
          te.deleteParcel(s);
      }
    },
    onMarkClicked() {
      const e = [...te.selected], t = !Boolean(this.read);
      for (const n of e)
        te.markParcel(n, t);
    }
  }
}, ga = (e) => (gt("data-v-90c48330"), e = e(), yt(), e), fh = /* @__PURE__ */ ga(() => /* @__PURE__ */ h("strong", null, "Inbox", -1)), ph = { class: "action" }, hh = {
  key: 0,
  class: "fa-solid fa-spinner fa-spin fa-fw"
}, _h = {
  key: 0,
  class: "badge badge-danger"
}, mh = { class: "toolbar d-flex" }, gh = { class: "ml-1 d-flex align-items-center justify-content-center" }, yh = ["indeterminate"], vh = {
  for: "select-all-checkbox",
  class: "m-0"
}, Eh = { class: "ml-auto" }, bh = /* @__PURE__ */ ga(() => /* @__PURE__ */ h("i", { class: "fa-regular fa-trash-can fa-fw" }, null, -1)), wh = [
  bh
], Nh = ["title"], Oh = { class: "parcels-wrapper" };
function kh(e, t, n, s, o, r) {
  const i = Ee("FolderEmpty"), a = Ee("ParcelListItem");
  return S(), I(de, null, [
    h("header", null, [
      h("div", null, [
        fh,
        h("span", ph, [
          r.loading ? (S(), I("i", hh)) : (S(), I("i", {
            key: 1,
            onClick: t[0] || (t[0] = (...l) => r.onRefreshClicked && r.onRefreshClicked(...l)),
            class: "fas fa-sync-alt fa-fw"
          }))
        ]),
        r.unread > 0 ? (S(), I("span", _h, oe(r.unread), 1)) : Be("", !0)
      ]),
      h("div", mh, [
        h("div", gh, [
          Je(h("input", {
            class: "mr-2",
            type: "checkbox",
            indeterminate: r.indeterminate,
            "onUpdate:modelValue": t[1] || (t[1] = (l) => r.allChecked = l),
            id: "select-all-checkbox"
          }, null, 8, yh), [
            [Sn, r.allChecked]
          ]),
          h("label", vh, oe(r.allChecked ? "deselect" : "select") + " all", 1)
        ]),
        h("div", Eh, [
          h("ul", {
            class: Se(["actions", { disabled: r.actionsDisabled }])
          }, [
            h("li", null, [
              h("span", {
                class: "action",
                onClick: t[2] || (t[2] = xt((...l) => r.onDeleteClicked && r.onDeleteClicked(...l), ["stop"])),
                title: "delete"
              }, wh)
            ]),
            h("li", null, [
              h("span", {
                class: "action",
                onClick: t[3] || (t[3] = xt((...l) => r.onMarkClicked && r.onMarkClicked(...l), ["stop"])),
                title: `mark all as ${r.read ? "unread" : "read"}`
              }, [
                h("i", {
                  class: Se(["fa-regular fa-empty-set fa-fw", r.readIconClass])
                }, null, 2)
              ], 8, Nh)
            ])
          ], 2)
        ])
      ])
    ]),
    h("div", Oh, [
      r.list.length === 0 ? (S(), it(i, {
        key: 0,
        class: "my-5"
      })) : (S(!0), I(de, { key: 1 }, _t(r.list, (l) => (S(), it(a, {
        key: l.id,
        "data-parcel-item": "",
        parcel: l,
        onClick: xt((u) => r.onParcelClicked(l), ["stop"])
      }, null, 8, ["parcel", "onClick"]))), 128))
    ])
  ], 64);
}
const Di = /* @__PURE__ */ ge(dh, [["render", kh], ["__scopeId", "data-v-90c48330"]]);
const xh = {
  props: {
    id: {
      type: String,
      default: null
    }
  },
  computed: {
    parcel() {
      const e = te.list.find((t) => t.id === this.id);
      return e && (te.active = e), e;
    },
    active() {
      return te.active;
    },
    createdAtDescription() {
      return "created at";
    },
    expirationDescription() {
      return "expiration: date when the message will be automatically deleted";
    },
    createdAtDisplay() {
      var s;
      const e = (s = this.parcel) == null ? void 0 : s.createdAt;
      if (!e)
        return "no date available";
      if (!window.hasOwnProperty("moment"))
        return e;
      const t = window.moment(e).format("LT");
      return `${window.moment(e).format("L")}, ${t}`;
    }
  },
  methods: {
    formatDate(e) {
      var t = new Date(e), n = [
        t.getMonth() + 1,
        t.getDate(),
        t.getFullYear()
      ].join("/") + " " + [
        t.getHours(),
        t.getMinutes(),
        t.getSeconds()
      ].join(":");
      return n;
    }
  },
  watch: {
    parcel: {
      immediate: !0,
      handler(e) {
        !e || e.read === !0 || te.markParcel(e.id, !0);
      }
    },
    active: {
      immediate: !1,
      handler(e) {
        e === null && this.$router.push("/inbox");
      }
    }
  }
}, hs = (e) => (gt("data-v-1fee825b"), e = e(), yt(), e), $h = {
  key: 0,
  class: "parcel-detail"
}, Ch = { class: "d-flex" }, Sh = { class: "d-block text-bold" }, Dh = /* @__PURE__ */ hs(() => /* @__PURE__ */ h("span", { class: "detail-label" }, "From:", -1)), Th = { class: "d-block" }, Ph = /* @__PURE__ */ hs(() => /* @__PURE__ */ h("span", { class: "detail-label" }, "To:", -1)), Ah = { class: "ml-auto text-right" }, Ih = { class: "time" }, Vh = ["title"], Rh = ["title"], Mh = /* @__PURE__ */ hs(() => /* @__PURE__ */ h("i", { class: "far fa-clock fa-fw" }, null, -1)), Lh = [
  Mh
], jh = ["title"], Uh = ["title"], Fh = /* @__PURE__ */ hs(() => /* @__PURE__ */ h("i", { class: "far fa-hourglass fa-fw" }, null, -1)), Hh = [
  Fh
], Bh = { class: "d-block" }, Gh = /* @__PURE__ */ hs(() => /* @__PURE__ */ h("span", { class: "detail-label" }, "Subject:", -1)), Kh = { class: "mt-2" }, Wh = ["innerHTML"], qh = { key: 1 };
function zh(e, t, n, s, o, r) {
  return r.parcel ? (S(), I("article", $h, [
    h("header", null, [
      h("div", Ch, [
        h("div", null, [
          h("span", Sh, [
            Dh,
            be(oe(r.parcel.from), 1)
          ]),
          h("span", Th, [
            Ph,
            be(oe(r.parcel.to), 1)
          ])
        ]),
        h("div", Ah, [
          h("div", Ih, [
            h("small", {
              title: r.parcel.createdAt,
              class: "text-muted"
            }, "created " + oe(r.createdAtDisplay), 9, Vh),
            h("small", {
              title: r.createdAtDescription,
              class: "text-muted"
            }, Lh, 8, Rh),
            h("small", {
              title: r.parcel.expiration,
              class: "text-muted"
            }, "expires " + oe(r.parcel.readableExpiration), 9, jh),
            h("small", {
              title: r.expirationDescription,
              class: "text-muted"
            }, Hh, 8, Uh)
          ])
        ])
      ]),
      h("span", Bh, [
        Gh,
        be(oe(r.parcel.subject), 1)
      ])
    ]),
    h("main", Kh, [
      h("span", {
        class: "d-block",
        innerHTML: r.parcel.body
      }, null, 8, Wh)
    ])
  ])) : (S(), I("span", qh, "Parcel ID " + oe(n.id) + " was not found", 1));
}
const Qh = /* @__PURE__ */ ge(xh, [["render", zh], ["__scopeId", "data-v-1fee825b"]]);
const Jh = {}, Or = (e) => (gt("data-v-09322505"), e = e(), yt(), e), Yh = { "data-wrapper": "" }, Xh = /* @__PURE__ */ Or(() => /* @__PURE__ */ h("span", { class: "title" }, "No Conversation Selected", -1)), Zh = /* @__PURE__ */ Or(() => /* @__PURE__ */ h("i", { class: "icon fas fa-inbox" }, null, -1)), e_ = /* @__PURE__ */ Or(() => /* @__PURE__ */ h("span", { class: "description" }, "Select a conversation to read.", -1)), t_ = [
  Xh,
  Zh,
  e_
];
function n_(e, t, n, s, o, r) {
  return S(), I("div", Yh, t_);
}
const s_ = /* @__PURE__ */ ge(Jh, [["render", n_], ["__scopeId", "data-v-09322505"]]), o_ = [
  {
    path: "/",
    name: "home",
    component: wp,
    redirect: "/inbox",
    children: [
      { path: "inbox", component: $p, children: [
        {
          path: "",
          name: "inbox",
          components: {
            Aside: Di,
            default: s_
          }
        },
        {
          path: ":id",
          name: "inbox-detail",
          components: {
            Aside: Di,
            default: Qh
          },
          props: { default: !0, Aside: !1 }
        }
      ] },
      { path: "/about", component: Vp }
    ]
  }
];
let Xo;
const r_ = () => (Xo = gp({
  // Provide the history implementation to use. We are using the hash history for simplicity here.
  history: mf(),
  routes: o_
}), Xo), rv = async (e) => {
  await te.init(), r_();
  const t = ps(Td);
  return t.use(Xo), t.mount(e), t;
}, iv = async (e) => {
  await te.init();
  const t = ps(Bd);
  return t.mount(e), t;
};
function i_(e, t = 300) {
  let n;
  return function(...s) {
    n && clearTimeout(n);
    const o = this;
    n = setTimeout(() => {
      e.apply(o, s);
    }, t);
  };
}
function l_(e, t = 0, n = 100) {
  return Math.min(Math.max(e, t), n);
}
const Qe = Object.freeze({
  WAITING: "waiting",
  PROCESSING: "processing",
  COMPLETED: "completed",
  ERROR: "error",
  WARNING: "warning",
  CANCELED: "canceled"
});
var Ks, Mi;
let a_ = (Mi = class extends Er {
  constructor() {
    super(...arguments);
    _n(this, Ks, ["pid"]);
  }
  visitGlobalParams(n) {
    const s = {};
    for (const [o, r] of Object.entries(n))
      Kt(this, Ks).includes(o) || (s[o] = r);
    return s;
  }
}, Ks = new WeakMap(), Mi), Zo = "";
window.app_path_webroot_full ? Zo = `${window.app_path_webroot_full}redcap_v${window.redcap_version}/` : Zo = `${location.protocol}//${location.host}/api`;
const Oo = new a_(Zo), qn = Gt({
  loading: !1,
  data: [],
  metadata: {},
  list: [],
  //
  async fetchMessages(e = 0, t = 0, n = "") {
    try {
      this.loading = !0;
      const s = {
        route: "QueueController:getList",
        page: e,
        perPage: t,
        query: n
      }, o = await Oo.send("", { params: s, method: "GET" }), { data: r, metadata: i } = o;
      this.data = r, this.metadata = i;
    } catch (s) {
      console.log(s);
    } finally {
      this.loading = !1;
    }
  },
  async updatePriority(e, t) {
    try {
      const n = {
        route: "QueueController:setPriority"
      }, s = { ID: e, priority: t }, o = await Oo.send("", { method: "POST", params: n, data: s }), { data: r } = o;
      return !0;
    } catch {
      return !1;
    } finally {
    }
  },
  async deleteMessage(e) {
    try {
      const t = {
        route: "QueueController:deleteMessage"
      }, n = { ID: e }, s = await Oo.send("", { method: "DELETE", params: t, data: n }), { data: o } = s;
      return !0;
    } catch {
      return !1;
    } finally {
    }
  }
}), Vt = Object.freeze({
  ASC: "ASC",
  DESC: "DESC",
  IGNORE: "IGNORE"
});
class c_ {
  constructor(t, n = Vt.ASC, s = null) {
    K(this, "key");
    K(this, "direction");
    K(this, "sortFn");
    this.key = t, this.direction = n, this.sortFn = s;
  }
}
const Ti = (e, t) => {
  const n = (a, l) => {
    let u = typeof a, d = typeof l;
    return u == "number" && u == d;
  }, s = (a, l) => a - l, o = (a, l) => (a = a ?? "", l = l ?? "", a.localeCompare(l)), r = (a, l) => n(a, l) ? s : o, i = [...t];
  return i.sort((a, l) => {
    let u = 0;
    for (let d of e) {
      let { key: c, direction: p, sortFn: m } = d, y = p === Vt.ASC ? 1 : -1, E = a[c], O = l[c];
      if (m = typeof m == "function" ? m : r(E, O), u = m(E, O, a, l, t, d, y) * y, u !== 0)
        return u;
    }
    return u;
  }), i;
};
class u_ {
  constructor(t) {
    K(this, "key", "");
    // age
    K(this, "label", "");
    // Person age
    K(this, "sortable", !1);
    // true
    /**
     * optional sorting logic for the field
     * a sort function accepts 2 parameters (a,b)
     * and follows the sorting rules
     */
    K(this, "sortFn", null);
    typeof t == "string" ? (this.key = t, this.label = t) : (this.key = t == null ? void 0 : t.key, this.label = t == null ? void 0 : t.label, this.sortable = (t == null ? void 0 : t.sortable) || !1, this.sortFn = (t == null ? void 0 : t.sortFn) || null);
  }
}
const d_ = (e) => {
  let t = [];
  for (const n of e)
    t = t.concat(Object.keys(n));
  return t = t.filter((n, s) => t.indexOf(n) == s), t;
}, f_ = {
  emits: ["sort"],
  setup(e, t) {
    const n = Ce([]), s = H(() => {
      if (e.externalSort || n.value.length == 0)
        return e.items;
      const l = [...e.items];
      return Ti(n.value, l);
    }), o = H(() => {
      let l = e.fields;
      return l.length === 0 && (l = d_([...e.items])), l.map((u) => new u_(u));
    });
    function r(l) {
      const u = n.value.findIndex((d) => d.key === l.key);
      return u < 0 ? "" : u + 1;
    }
    function i(l) {
      const u = n.value.findIndex((c) => c.key === l.key);
      if (u < 0)
        return "fas fa-sort";
      const d = n.value[u];
      return d.direction === Vt.ASC ? "fas fa-sort-up" : d.direction === Vt.DESC ? "fas fa-sort-down" : "far fa-exclamation-triangle";
    }
    function a(l) {
      const { key: u } = l, d = n.value.findIndex((c) => c.key === u);
      if (d < 0) {
        const c = new c_(u, Vt.ASC, l.sortFn);
        n.value.push(c);
      } else {
        const c = n.value[d], p = c.direction;
        p === Vt.ASC ? c.direction = Vt.DESC : p === Vt.DESC && n.value.splice(d, 1);
      }
      t.emit("sort", n.value, Ti);
    }
    return {
      sorts: n,
      sortedItems: s,
      mapedFields: o,
      sortBy: a,
      sortIndex: r,
      sortIcon: i
    };
  },
  props: {
    fields: { type: Array, default: [] },
    items: { type: Array, default: [] },
    striped: { type: Boolean, default: !1 },
    hover: { type: Boolean, default: !0 },
    externalSort: { type: Boolean, default: !1 },
    // sort externally
    showEmpty: { type: Boolean, default: !1 },
    emptyText: { type: String, default: "nothing to display" }
  }
}, p_ = ["onClick"], h_ = { class: "th-wrapper" }, __ = {
  key: 0,
  "data-sort-indicator": ""
}, m_ = { class: "sort-index" }, g_ = { class: "sort-direction" }, y_ = {
  key: 0,
  class: "p-5 text-muted font-italic"
}, v_ = ["colspan"], E_ = ["innerHTML"];
function b_(e, t, n, s, o, r) {
  return S(), I("table", yr({ ...e.$attrs }, {
    class: { striped: n.striped, hover: n.hover }
  }), [
    h("thead", null, [
      (S(!0), I(de, null, _t(s.mapedFields, (i) => (S(), I("th", {
        key: `thead-${i.key}`,
        class: Se({ sortable: i.sortable }),
        onClick: (a) => i.sortable && s.sortBy(i)
      }, [
        h("span", h_, [
          Re(e.$slots, `head(${i.key})`, {
            field: i,
            data: this,
            value: i.label
          }, () => [
            be(oe(i.label), 1)
          ], !0),
          i.sortable ? (S(), I("span", __, [
            h("span", m_, oe(s.sortIndex(i)), 1),
            h("span", g_, [
              h("i", {
                class: Se(s.sortIcon(i))
              }, null, 2)
            ])
          ])) : Be("", !0)
        ])
      ], 10, p_))), 128))
    ]),
    h("tbody", null, [
      (S(!0), I(de, null, _t(s.sortedItems, (i, a) => (S(), I(de, {
        key: `trow-${(i == null ? void 0 : i.id) ?? a}`
      }, [
        Re(e.$slots, "row", {
          item: i,
          index: a,
          colspan: s.mapedFields.length
        }, void 0, !0),
        h("tr", null, [
          (S(!0), I(de, null, _t(s.mapedFields, (l) => (S(), I("td", {
            key: `tcell-${l.key + ((i == null ? void 0 : i.id) ?? a)}`,
            class: Se({ [`tcell-${l.key}`]: !0 })
          }, [
            Re(e.$slots, `cell(${l.key})`, {
              data: this,
              item: i,
              field: l,
              value: i[l.key]
            }, () => [
              be(oe(i[l.key]), 1)
            ], !0)
          ], 2))), 128))
        ])
      ], 64))), 128))
    ]),
    h("tfoot", null, [
      Re(e.$slots, "footer", { data: this }, void 0, !0)
    ]),
    n.showEmpty && s.sortedItems.length === 0 ? (S(), I("tr", y_, [
      h("td", {
        colspan: s.mapedFields.length
      }, [
        Re(e.$slots, "empty", {
          items: s.sortedItems,
          data: this,
          fields: s.mapedFields
        }, () => [
          h("span", { innerHTML: n.emptyText }, null, 8, E_)
        ], !0)
      ], 8, v_)
    ])) : Be("", !0)
  ], 16);
}
const w_ = /* @__PURE__ */ ge(f_, [["render", b_], ["__scopeId", "data-v-697e347a"]]);
var Zt;
class N_ {
  constructor() {
    K(this, "previousStyle");
    _n(this, Zt, void 0);
    po(this, Zt, document.querySelector("body"));
  }
  applyStyle(t) {
    this.backupStyle();
    for (const [n, s] of Object.entries(t))
      Kt(this, Zt).style[n] = s;
  }
  backupStyle() {
    this.previousStyle = Kt(this, Zt).style;
  }
  restoreStyle() {
    this.previousStyle && (Kt(this, Zt).style = this.previousStyle);
  }
}
Zt = new WeakMap();
const Pi = new N_(), yn = Object.freeze({
  OK: 1,
  CANCEL: 0,
  ERROR: -1
}), Ln = Object.freeze({
  small: "300px",
  default: "500px",
  large: "800px",
  extra: "1140px"
});
let jn, Os;
var ko;
let Nn = (ko = class {
  constructor(t, n) {
    this.props = t, this.context = n;
  }
  setup() {
    const t = this, n = this.props, s = this.context, { visible: o, size: r, modelValue: i } = us(n), a = Ce(null), l = Ce(!1), u = Ce({}), d = H({
      get() {
        return i.value;
      },
      set(V) {
        s.emit("update:modelValue", V);
      }
    });
    Lt(
      o,
      function(V) {
        V === !0 ? c() : p();
      },
      { immediate: !0 }
    ), Lt(
      r,
      function(V) {
        let re = (Ln == null ? void 0 : Ln[V]) ?? Ln.Default;
        u.value["--modal-width"] = re;
      },
      { immediate: !0 }
    );
    async function c() {
      return l.value ? void 0 : (Nn.openModals.size === 0 && Pi.applyStyle({ overflow: "hidden" }), l.value = !0, await W(), Nn.openModals.add(t), s.emit("show", s), new Promise((re, Ne) => {
        jn = re, Os = Ne;
      }));
    }
    async function p(V = yn.CANCEL) {
      if (await W(!1), !!l.value && (l.value = !1, s.emit("hide", s, V), Nn.openModals.delete(t), Nn.openModals.size === 0 && Pi.restoreStyle(), !(!jn || !Os))) {
        switch (V) {
          case yn.OK:
            jn(!0);
            break;
          case yn.CANCEL:
            jn(!1);
            break;
          case yn.ERROR:
            Os(!0);
            break;
        }
        jn = Os = null;
      }
    }
    function m() {
      return l ? p() : c();
    }
    function y() {
      p(yn.CANCEL);
    }
    function E(V) {
      n.disableOutsideClick || y();
    }
    function O(V) {
      y();
    }
    function P(V) {
      y();
    }
    function U(V) {
      p(yn.OK);
    }
    function W(V = !0) {
      if (!a.value)
        return;
      const re = a.value, Ne = re.querySelector("[data-content]");
      let Ve = {
        duration: 300,
        fill: "forwards",
        easing: "ease-in-out",
        direction: V ? "normal" : "reverse"
        // iterations: Infinity
      };
      const je = (Ze) => {
        let et = [
          { opacity: "0" },
          { opacity: "1" }
        ];
        return Ze.animate(et, Ve);
      }, X = (Ze) => {
        let et = [
          { transform: "translate(0, -25%)" },
          { transform: "translate(0, 0)" }
        ];
        return Ze.animate(et, Ve);
      }, z = je(re), xe = X(Ne);
      return Promise.all([z.finished, xe.finished]);
    }
    return {
      root: a,
      isVisible: l,
      style: u,
      prompt: d,
      onBackdropClicked: E,
      onCloseClicked: O,
      onCancelClicked: P,
      onOkClicked: U,
      toggle: m,
      show: c,
      hide: p,
      cancel: y
    };
  }
  /**
   * export the props
   * @param {Function} visit optional function that can modify the default props
   * @returns 
   */
  static props(t = null) {
    const n = {
      visible: { type: Boolean, default: !1 },
      backdrop: { type: Boolean, default: !1 },
      disableOutsideClick: { type: Boolean, default: !1 },
      okOnly: { type: Boolean, default: !1 },
      okText: { type: String, default: "Ok" },
      cancelText: { type: String, default: "Cancel" },
      closeText: { type: String, default: "&times;" },
      title: { type: String, default: "" },
      body: { type: String, default: "" },
      size: { type: String, default: Ln.Default },
      showPrompt: { type: Boolean, default: !1 },
      modelValue: { type: String, default: "" }
    };
    return typeof t == "function" && t(n), n;
  }
}, // TODO: keep track of open Modals
K(ko, "openModals", /* @__PURE__ */ new Set()), ko);
const O_ = {
  emits: ["update:modelValue", "show", "hide"],
  setup(e, t) {
    return new Nn(e, t).setup();
  },
  props: Nn.props()
}, k_ = { "data-dialog": "" }, x_ = { "data-content": "" }, $_ = { "data-header": "" }, C_ = ["innerHTML"], S_ = { "data-body": "" }, D_ = ["innerHTML"], T_ = { "data-footer": "" }, P_ = ["innerHTML"], A_ = ["innerHTML"];
function I_(e, t, n, s, o, r) {
  return Je((S(), I("div", {
    ref: "root",
    "data-modal": "",
    onClick: t[4] || (t[4] = xt((...i) => e.onBackdropClicked && e.onBackdropClicked(...i), ["self"])),
    style: ls(e.style)
  }, [
    h("div", k_, [
      h("div", x_, [
        h("div", $_, [
          e.isVisible ? Re(e.$slots, "header", { key: 0 }, () => [
            h("div", { innerHTML: e.title }, null, 8, C_)
          ], !0) : Be("", !0),
          h("div", null, [
            h("span", {
              "data-close": "",
              onClick: t[0] || (t[0] = (...i) => e.onCloseClicked && e.onCloseClicked(...i))
            }, "×")
          ])
        ]),
        h("div", S_, [
          e.isVisible ? Re(e.$slots, "default", {
            key: 0,
            onOkClicked: e.onOkClicked
          }, () => [
            h("div", { innerHTML: e.body }, null, 8, D_)
          ], !0) : Be("", !0),
          e.isVisible && e.showPrompt ? Re(e.$slots, "secondary-prompt", { key: 1 }, () => [
            Je(h("input", {
              class: "form-control mt-2",
              type: "text",
              "onUpdate:modelValue": t[1] || (t[1] = (i) => e.prompt = i)
            }, null, 512), [
              [Cn, e.prompt]
            ])
          ], !0) : Be("", !0)
        ]),
        h("div", T_, [
          e.isVisible ? Re(e.$slots, "footer", { key: 0 }, () => [
            Re(e.$slots, "secondary-button", {}, () => [
              e.okOnly ? Be("", !0) : (S(), I("button", {
                key: 0,
                class: "btn btn-sm btn-secondary",
                type: "button",
                "data-button-cancel": "",
                onClick: t[2] || (t[2] = (...i) => e.onCancelClicked && e.onCancelClicked(...i)),
                innerHTML: e.cancelText
              }, null, 8, P_))
            ], !0),
            Re(e.$slots, "primary-button", {}, () => [
              h("button", {
                class: "btn btn-sm btn-primary",
                type: "button",
                "data-button-ok": "",
                onClick: t[3] || (t[3] = (...i) => e.onOkClicked && e.onOkClicked(...i)),
                innerHTML: e.okText
              }, null, 8, A_)
            ], !0)
          ], !0) : Be("", !0)
        ])
      ])
    ])
  ], 4)), [
    [bd, e.isVisible]
  ]);
}
const co = /* @__PURE__ */ ge(O_, [["render", I_], ["__scopeId", "data-v-e2a18a08"]]);
const V_ = "prevent-close", R_ = {
  props: {
    text: { type: String, default: "" },
    variant: { type: String, default: "primary" },
    right: { type: Boolean, default: !1 },
    top: { type: Boolean, default: !1 }
  },
  setup(e, t) {
    let n;
    const s = Ce(!1);
    function o(l) {
      console.log("onSlotClicked");
    }
    function r() {
      s.value = !0;
    }
    function i() {
      s.value = !1;
    }
    function a(l) {
      n && n.abort();
      const { currentTarget: u } = l;
      n = new AbortController(), s.value ? i() : r(), setTimeout(() => {
        document.addEventListener("click", (d) => {
          const { target: c } = d;
          c != null && c.closest(`[${V_}]`) || c === u || (i(), n.abort());
        }, { signal: n.signal });
      }, null);
    }
    return {
      isOpen: s,
      open: r,
      close: i,
      onItemClick: o,
      onButtonClicked: a
    };
  }
}, M_ = { "data-button": "" }, L_ = ["innerHTML"], j_ = {
  key: 0,
  "data-menu": ""
};
function U_(e, t, n, s, o, r) {
  return S(), I("div", yr({ "data-dropdown": "" }, { ...e.$attrs }, {
    class: { right: n.right, top: n.top }
  }), [
    h("div", M_, [
      h("button", {
        class: Se(["btn btn-sm d-flex align-items-center", { [`btn-${n.variant}`]: !0 }]),
        type: "button",
        onClick: t[0] || (t[0] = (...i) => s.onButtonClicked && s.onButtonClicked(...i))
      }, [
        Re(e.$slots, "button", { dropdown: this }, () => [
          h("span", { innerHTML: n.text }, null, 8, L_)
        ], !0),
        Re(e.$slots, "caret", {}, () => [
          h("i", {
            class: Se(["ms-auto fas fa-caret-right fa-fw", { "fa-rotate-90": s.isOpen }])
          }, null, 2)
        ], !0)
      ], 2)
    ]),
    s.isOpen ? (S(), I("div", j_, [
      Re(e.$slots, "default", {
        onItemClick: s.onItemClick,
        dropdown: this
      }, void 0, !0)
    ])) : Be("", !0)
  ], 16);
}
const uo = /* @__PURE__ */ ge(R_, [["render", U_], ["__scopeId", "data-v-f97c2434"]]);
const F_ = {
  emits: ["click"],
  setup(e, t) {
    function n() {
      t.emit("click", this);
    }
    return {
      onClick: n
    };
  }
};
function H_(e, t, n, s, o, r) {
  return S(), I("div", {
    "data-dropdown-item": "",
    onClick: t[0] || (t[0] = (...i) => s.onClick && s.onClick(...i))
  }, [
    Re(e.$slots, "default", {}, void 0, !0)
  ]);
}
const rs = /* @__PURE__ */ ge(F_, [["render", H_], ["__scopeId", "data-v-b223643c"]]);
const B_ = {
  setup(e, t) {
    return {};
  }
}, G_ = { "data-dropdown-divider": "" };
function K_(e, t, n, s, o, r) {
  return S(), I("hr", G_);
}
const W_ = /* @__PURE__ */ ge(B_, [["render", K_], ["__scopeId", "data-v-42e5e876"]]);
function q_(e, t = 0) {
  return [...Array(e).keys()].map((n) => n + t);
}
const z_ = Object.freeze({
  SMALL: "sm",
  NORMAL: "",
  LARGE: "lg"
}), Q_ = {
  setup(e, t) {
    const { modelValue: n, maxVisibleButtons: s, hideEllipsis: o } = us(e), r = Math.floor(s.value / 2), i = H(() => {
      let O = s.value, P = n.value <= r ? 1 : n.value - r;
      return n.value >= u.value - r && (P = u.value - O + 1), P < 1 && (P = 1), u.value < O && (O = u.value), q_(O, P);
    }), a = H(() => n.value <= 1), l = H(() => n.value >= u.value), u = H(() => {
      const { perPage: O, totalItems: P } = e;
      return Math.ceil(P / O);
    });
    function d(O) {
      const P = s.value - 1;
      return !(o.value === !0 || O === 0 && n.value - r - 1 <= 0 || O === P && n.value + r >= u.value || O > 0 && O < P);
    }
    function c(O) {
      O < 1 && (O = 1), O > u.value && (O = u.value), t.emit("update:modelValue", O);
    }
    function p() {
      t.emit("update:modelValue", 1);
    }
    function m() {
      t.emit("update:modelValue", u.value);
    }
    function y() {
      let O = n.value - 1;
      O < 1 && (O = 1), t.emit("update:modelValue", O);
    }
    function E() {
      let O = n.value + 1;
      O > u.value && (O = u.value), t.emit("update:modelValue", O);
    }
    return {
      pages: i,
      totalPages: u,
      isFirstPage: a,
      isLastPage: l,
      showEllipsis: d,
      onPageClicked: c,
      onFirstClicked: p,
      onPrevClicked: y,
      onNextClicked: E,
      onLastClicked: m
    };
  },
  props: {
    modelValue: { type: Number, default: 1 },
    perPage: { type: Number, default: 5 },
    maxVisibleButtons: { type: Number, default: 5 },
    totalItems: { type: Number, default: 0 },
    hideEllipsis: { type: Boolean, default: !1 },
    hideGotoEndButtons: { type: Boolean, default: !1 },
    firstText: { type: String, default: "«" },
    prevText: { type: String, default: "‹" },
    nextText: { type: String, default: "›" },
    lastText: { type: String, default: "»" },
    ellipsisText: { type: String, default: "…" },
    size: { type: String, default: "", validator(e) {
      return Object.values(z_).includes(e);
    } }
  }
}, J_ = { "data-first": "" }, Y_ = ["disabled", "innerHTML"], X_ = { "data-prev": "" }, Z_ = ["disabled", "innerHTML"], em = { key: 0 }, tm = ["innerHTML"], nm = ["onClick"], sm = { "data-next": "" }, om = ["disabled", "innerHTML"], rm = { "data-last": "" }, im = ["disabled", "innerHTML"];
function lm(e, t, n, s, o, r) {
  return S(), I("ul", {
    class: Se(["pagination", n.size])
  }, [
    h("li", J_, [
      h("button", {
        class: "",
        disabled: s.isFirstPage,
        innerHTML: n.firstText,
        onClick: t[0] || (t[0] = (...i) => s.onFirstClicked && s.onFirstClicked(...i))
      }, null, 8, Y_)
    ]),
    h("li", X_, [
      h("button", {
        class: "",
        disabled: s.isFirstPage,
        innerHTML: n.prevText,
        onClick: t[1] || (t[1] = (...i) => s.onPrevClicked && s.onPrevClicked(...i))
      }, null, 8, Z_)
    ]),
    (S(!0), I(de, null, _t(s.pages, (i, a) => (S(), I(de, null, [
      s.showEllipsis(a) ? (S(), I("li", em, [
        h("button", {
          disabled: "",
          class: "",
          innerHTML: n.ellipsisText
        }, null, 8, tm)
      ])) : (S(), I("li", {
        key: 1,
        "data-prev": "",
        class: Se({ active: n.modelValue === i })
      }, [
        h("button", {
          class: "",
          onClick: (l) => s.onPageClicked(i)
        }, oe(i), 9, nm)
      ], 2))
    ], 64))), 256)),
    h("li", sm, [
      h("button", {
        class: "",
        disabled: s.isLastPage,
        innerHTML: n.nextText,
        onClick: t[2] || (t[2] = (...i) => s.onNextClicked && s.onNextClicked(...i))
      }, null, 8, om)
    ]),
    h("li", rm, [
      h("button", {
        class: "",
        disabled: s.isLastPage,
        innerHTML: n.lastText,
        onClick: t[3] || (t[3] = (...i) => s.onLastClicked && s.onLastClicked(...i))
      }, null, 8, im)
    ])
  ], 2);
}
const ya = /* @__PURE__ */ ge(Q_, [["render", lm], ["__scopeId", "data-v-4e20c400"]]), am = "fas fa-refresh", cm = {
  emits: ["click"],
  props: {
    loading: { type: Boolean, default: !1 },
    icon: { type: String, default: am },
    text: { type: String, default: "" },
    callback: { type: Function, default: null }
  },
  setup(e, t) {
    const { text: n, icon: s, loading: o } = us(e);
    function r() {
      t.emit("click", this);
    }
    return {
      text: n,
      icon: s,
      loading: o,
      onButtonClicked: r
    };
  }
}, um = ["disabled"], dm = {
  key: 0,
  class: "fas fa-spinner fa-spin fa-fw"
}, fm = ["innerHTML"];
function pm(e, t, n, s, o, r) {
  return S(), I("div", null, [
    h("button", {
      disabled: s.loading,
      class: "btn btn-sm btn-primary",
      onClick: t[0] || (t[0] = (...i) => s.onButtonClicked && s.onButtonClicked(...i))
    }, [
      s.loading ? (S(), I("i", dm)) : (S(), I("i", {
        key: 1,
        class: Se([s.icon, "fa-fw"])
      }, null, 2)),
      s.text ? (S(), I("span", {
        key: 2,
        class: "ml-2",
        innerHTML: s.text
      }, null, 8, fm)) : Be("", !0)
    ], 8, um)
  ]);
}
const hm = /* @__PURE__ */ ge(cm, [["render", pm]]);
class ft {
  static make(t) {
    const n = document.createElement("div");
    return document.body.appendChild(n), ps(co, { ...t }).mount(n);
  }
  static async confirm(t) {
    const n = ft.make(t);
    return ft.show(n);
  }
  static async alert(t) {
    const n = ft.make({ okOnly: !0, ...t });
    return ft.show(n);
  }
  static async prompt(t) {
    const n = ft.make({ showPrompt: !0, ...t });
    return ft.show(n);
  }
  static async show(t) {
    const n = () => {
      const o = t.$el.parentNode;
      o.parentNode.removeChild(o);
    };
    return new Promise((o, r) => {
      setTimeout(async () => {
        const i = await t.show();
        o(i), n();
      }, 0);
    });
  }
}
const _m = {
  components: { Modal: co, DropDown: uo, DropDownItem: rs },
  emits: ["onDelete"],
  props: {
    list: { type: Array, default: () => [] }
  },
  setup(e, t) {
    const n = Ce(""), s = Ce(null), { list: o } = us(e), r = H(() => o.value.filter(({ status: c }) => c === Qe.WAITING).length == 0);
    async function i() {
      var c, p;
      const d = o.value.length;
      n.value = d === 1 ? (p = (c = o.value) == null ? void 0 : c[0]) == null ? void 0 : p.priority : "", await s.value.show(), o.value.forEach((m) => {
        a(m);
      });
    }
    async function a(d) {
      if (d.status !== Qe.WAITING || !Number.isInteger(n.value))
        return;
      const c = d.priority;
      let p = l_(n.value, 1, 100);
      if (isNaN(p))
        return;
      d.priority = p;
      const m = await qn.updatePriority(d.id, p);
      return m || (d.priority = c), m;
    }
    const l = H(() => o.value.filter(({ status: c }) => c !== Qe.PROCESSING).length == 0);
    async function u() {
      const d = o.value.length === 1 ? "this item" : "these items";
      if (!await ft.confirm({
        title: "Are you sure?",
        body: `Do you really want to delete ${d}? This action cannot be undone.`
      }))
        return;
      const p = o.value.filter(({ status: y }) => y !== Qe.PROCESSING), m = [];
      p.forEach(async (y) => {
        if (y.status === Qe.PROCESSING)
          return;
        const E = qn.deleteMessage(y.id);
        m.push(E);
      }), await Promise.all(m), t.emit("onDelete");
    }
    return {
      messages: o,
      priorityValue: n,
      priorityModal: s,
      modifyDisabled: r,
      onModifyClicked: i,
      deleteDisabled: l,
      onDeleteClicked: u
    };
  }
}, Tn = (e) => (gt("data-v-7e5d9e35"), e = e(), yt(), e), mm = /* @__PURE__ */ Tn(() => /* @__PURE__ */ h("span", { class: "ms-2" }, "actions", -1)), gm = ["disabled"], ym = /* @__PURE__ */ Tn(() => /* @__PURE__ */ h("i", { class: "fas fa-pencil fa-fw" }, null, -1)), vm = /* @__PURE__ */ Tn(() => /* @__PURE__ */ h("span", { class: "ms-2" }, "edit priority", -1)), Em = [
  ym,
  vm
], bm = ["disabled"], wm = /* @__PURE__ */ Tn(() => /* @__PURE__ */ h("i", { class: "fas fa-trash fa-fw" }, null, -1)), Nm = /* @__PURE__ */ Tn(() => /* @__PURE__ */ h("span", { class: "ms-2" }, "delete", -1)), Om = [
  wm,
  Nm
], km = /* @__PURE__ */ Tn(() => /* @__PURE__ */ h("p", { class: "alert alert-info" }, "Please note that priority will only be updated for messages with a 'waiting' stutus.", -1)), xm = ["onKeyup"];
function $m(e, t, n, s, o, r) {
  const i = Ee("DropDownItem"), a = Ee("DropDown"), l = Ee("Modal");
  return S(), I(de, null, [
    N(a, { variant: "outline-secondary" }, {
      button: J(({ dropdown: u }) => [
        h("i", {
          class: Se(["fas fa-cog fa-fw", { "fa-rotate-90": u.isOpen }])
        }, null, 2),
        mm
      ]),
      default: J(({ onItemClick: u, dropdown: d }) => [
        N(i, null, {
          default: J(() => [
            h("button", {
              class: "d-flex align-items-center justify-content-between",
              disabled: s.modifyDisabled,
              onClick: t[0] || (t[0] = (...c) => s.onModifyClicked && s.onModifyClicked(...c))
            }, Em, 8, gm)
          ]),
          _: 1
        }),
        N(i, null, {
          default: J(() => [
            h("button", {
              class: "",
              disabled: s.deleteDisabled,
              onClick: t[1] || (t[1] = (...c) => s.onDeleteClicked && s.onDeleteClicked(...c))
            }, Om, 8, bm)
          ]),
          _: 1
        })
      ]),
      _: 1
    }),
    N(l, { ref: "priorityModal" }, {
      header: J(() => [
        be(" Modify priority ")
      ]),
      default: J(({ onOkClicked: u }) => [
        km,
        Je(h("input", {
          class: "form-control form-control-sm",
          "onUpdate:modelValue": t[2] || (t[2] = (d) => s.priorityValue = d),
          type: "number",
          onKeyup: Jl(u, ["enter"])
        }, null, 40, xm), [
          [Cn, s.priorityValue]
        ])
      ]),
      _: 1
    }, 512)
  ], 64);
}
const Cm = /* @__PURE__ */ ge(_m, [["render", $m], ["__scopeId", "data-v-7e5d9e35"]]);
const Sm = [
  { key: "id", label: "", sortable: !1 },
  // { key: 'data', label: 'data', sortable: true },
  { key: "key", label: "KEY", sortable: !0 },
  { key: "status", label: "STATUS", sortable: !0, sortFn: (e, t, n, s, o, r, i) => {
    const { status: a = "", priority: l = 0 } = n, { status: u = "", priority: d = 0 } = s, c = a.localeCompare(u);
    return c === 0 ? l - d : c;
  } },
  { key: "description", label: "DESCRIPTION", sortable: !0 },
  // { key: 'priority', label: 'PRIORITY', sortable: true },
  { key: "message", label: "MESSAGE", sortable: !0 },
  { key: "created_at", label: "CREATED AT", sortable: !0 },
  { key: "started_at", label: "STARTED AT", sortable: !0 },
  { key: "completed_at", label: "COMPLETED AT", sortable: !0 }
], Dm = ["status", "key", "priority", "description", "message"], Tm = {
  components: { Table: w_, Modal: co, Toolbar: Cm, Pagination: ya, RefreshButton: hm, DropDown: uo, DropDownItem: rs },
  setup() {
    const e = H(() => qn.metadata), t = Ce(!1), n = Ce(1), s = [25, 50, 100, 500], o = Ce(s[1]), r = Ce(""), i = Ce(null), a = Ce(Object.values(Qe)), l = Ce([]), u = H(() => {
      const X = d.value.length, z = l.value.length;
      return z === 0 ? !1 : z !== X;
    }), d = H(() => E.value), c = H(() => {
      const X = l.value.length, z = d.value.length;
      return !(X === 0 || X < z);
    });
    function p() {
      l.value.length === 0 || u.value === !0 ? l.value = d.value : l.value = [];
    }
    const m = H(() => qn.data), y = Ce([]), E = H(() => {
      l.value = [];
      let X = y.value;
      return X = X.filter((z) => a.value.includes(z.status)), r.value !== "" && (X = X.filter((z) => {
        for (const xe of Dm)
          if (String(z == null ? void 0 : z[xe]).match(r.value))
            return !0;
        return !1;
      })), X;
    }), O = H(() => E.value.length), P = H(() => {
      const X = (n.value - 1) * o.value, z = X + o.value;
      return E.value.slice(X, z);
    });
    function U(X, z) {
      X.length === 0 ? y.value = [...m.value] : y.value = z(X, m.value);
    }
    const W = i_((X) => {
      n.value = 1;
      const { value: z } = X.target;
      r.value = z;
    }, 300);
    async function V() {
      await qn.fetchMessages();
    }
    function re(X) {
      let z = "";
      switch (X) {
        case Qe.WAITING:
          z = "fas fa-clock text-primary";
          break;
        case Qe.PROCESSING:
          z = "fas fa-spinner fa-spin text-muted";
          break;
        case Qe.COMPLETED:
          z = "fas fa-check-circle text-success";
          break;
        case Qe.WARNING:
          z = "fas fa-exclamation-triangle text-warning";
          break;
        case Qe.ERROR:
          z = "fas fa-times-circle text-danger";
          break;
        case Qe.CANCELED:
          z = "fas fa-ban text-secondary";
          break;
        default:
          z = "fas fa-check-circle text-secondary";
          break;
      }
      return z;
    }
    function Ne(X, z = 1, xe = 100, Oe = 0.4) {
      return `hsl(${120 - (X - z) / (xe - z) * 120} 100% 50% / ${Oe})`;
    }
    const Ve = Ce("");
    async function je() {
      return new Promise(async (z, xe) => {
        try {
          t.value = !0, await V(), n.value = 1, y.value = m.value, z(!0);
        } catch (Oe) {
          xe(Oe);
        } finally {
          t.value = !1;
        }
      });
    }
    return je(), {
      paginatedMessages: P,
      messagesMetadata: e,
      enabledStatuses: a,
      selectedMessages: l,
      selectionIndeterminate: u,
      selectAllChecked: c,
      onSelectAllClicked: p,
      load: je,
      loading: t,
      query: r,
      tableFields: Sm,
      total: O,
      page: n,
      perPage: o,
      perPageOptions: s,
      onSort: U,
      onQueryInput: W,
      loadMessages: V,
      getStatusIcon: re,
      getColorByPriority: Ne,
      priorityValue: Ve,
      STATUS: Qe,
      priorityModal: i
    };
  }
}, _s = (e) => (gt("data-v-442132b6"), e = e(), yt(), e), Pm = { class: "my-2 d-flex justify-content-between align-items-center" }, Am = { class: "d-flex mb-2" }, Im = { class: "ms-auto me-2" }, Vm = ["value"], Rm = /* @__PURE__ */ _s(() => /* @__PURE__ */ h("i", { class: "fas fa-list fa-fw" }, null, -1)), Mm = /* @__PURE__ */ _s(() => /* @__PURE__ */ h("span", { class: "ms-2" }, "visible statuses", -1)), Lm = { class: "d-flex align-items-center justify-content-start" }, jm = ["id", "value"], Um = ["for"], Fm = /* @__PURE__ */ _s(() => /* @__PURE__ */ h("span", null, null, -1)), Hm = { class: "custom-control custom-switch" }, Bm = ["checked", "indeterminate"], Gm = /* @__PURE__ */ _s(() => /* @__PURE__ */ h("label", {
  class: "custom-control-label",
  for: "checkbox-select-all"
}, null, -1)), Km = ["innerHTML"], Wm = ["title"], qm = ["value", "id"], zm = ["for"], Qm = ["innerHTML"], Jm = { class: "" }, Ym = { class: "d-flex m-auto align-items-center" }, Xm = ["title"], Zm = {
  key: 0,
  class: "d-flex"
}, eg = ["innerHTML"], tg = { class: "d-flex align-items-center priority" }, ng = /* @__PURE__ */ _s(() => /* @__PURE__ */ h("i", { class: "fas fa-arrow-circle-up" }, null, -1)), sg = [
  ng
], og = ["innerHTML"], rg = { class: "my-2 d-flex justify-content-between align-items-center" }, ig = ["onKeyup"];
function lg(e, t, n, s, o, r) {
  const i = Ee("Pagination"), a = Ee("DropDownItem"), l = Ee("DropDown"), u = Ee("RefreshButton"), d = Ee("Toolbar"), c = Ee("Table"), p = Ee("Modal");
  return S(), I(de, null, [
    h("div", null, [
      h("div", Pm, [
        N(i, {
          totalItems: s.total,
          modelValue: s.page,
          "onUpdate:modelValue": t[0] || (t[0] = (m) => s.page = m),
          perPage: s.perPage,
          size: "sm"
        }, null, 8, ["totalItems", "modelValue", "perPage"]),
        N(l, {
          class: "ms-auto",
          variant: "outline-primary"
        }, {
          button: J(() => [
            h("span", null, "Per page " + oe(s.perPage), 1)
          ]),
          default: J(({ onItemClick: m, dropdown: y }) => [
            (S(!0), I(de, null, _t(s.perPageOptions, (E, O) => (S(), it(a, {
              key: O,
              active: E === s.perPage,
              onClick: (P) => s.perPage = E
            }, {
              default: J(() => [
                be(oe(E), 1)
              ]),
              _: 2
            }, 1032, ["active", "onClick"]))), 128))
          ]),
          _: 1
        }),
        N(u, {
          class: "ms-2",
          onClick: s.load,
          loading: s.loading
        }, null, 8, ["onClick", "loading"])
      ]),
      h("div", Am, [
        h("div", null, [
          N(d, {
            list: s.selectedMessages,
            onOnDelete: s.load
          }, null, 8, ["list", "onOnDelete"])
        ]),
        h("div", Im, [
          h("input", {
            class: "form-control form-control-sm",
            type: "search",
            value: s.query,
            onInput: t[1] || (t[1] = (...m) => s.onQueryInput && s.onQueryInput(...m)),
            placeholder: "filter..."
          }, null, 40, Vm)
        ]),
        N(l, { variant: "outline-secondary" }, {
          button: J(() => [
            Rm,
            Mm
          ]),
          default: J(({ onItemClick: m, dropdown: y }) => [
            (S(!0), I(de, null, _t(s.STATUS, (E, O) => (S(), it(a, {
              key: O,
              "prevent-close": ""
            }, {
              default: J(() => [
                h("span", Lm, [
                  h("span", null, [
                    Je(h("input", {
                      class: "me-2",
                      type: "checkbox",
                      name: "",
                      id: `status-${E}`,
                      value: E,
                      "onUpdate:modelValue": t[2] || (t[2] = (P) => s.enabledStatuses = P)
                    }, null, 8, jm), [
                      [Sn, s.enabledStatuses]
                    ])
                  ]),
                  h("span", null, [
                    h("label", {
                      for: `status-${E}`,
                      class: "m-0"
                    }, [
                      h("i", {
                        class: Se(s.getStatusIcon(E))
                      }, null, 2),
                      be(" " + oe(E), 1)
                    ], 8, Um)
                  ])
                ])
              ]),
              _: 2
            }, 1024))), 128))
          ]),
          _: 1
        })
      ]),
      N(c, {
        id: "messages-table",
        fields: s.tableFields,
        items: s.paginatedMessages,
        onSort: s.onSort,
        "show-empty": "",
        externalSort: ""
      }, {
        "head(id)": J(({ data: m, field: y, value: E }) => [
          Fm,
          h("div", Hm, [
            h("input", {
              class: "custom-control-input",
              type: "checkbox",
              checked: s.selectAllChecked,
              indeterminate: s.selectionIndeterminate,
              onClickCapture: t[3] || (t[3] = (...O) => s.onSelectAllClicked && s.onSelectAllClicked(...O)),
              id: "checkbox-select-all"
            }, null, 40, Bm),
            Gm
          ])
        ]),
        "head(priority)": J(({ data: m, field: y, value: E }) => [
          h("span", { innerHTML: E }, null, 8, Km)
        ]),
        "cell(id)": J(({ data: m, item: y, field: E, value: O }) => [
          h("div", {
            class: "custom-control custom-switch",
            title: y.id
          }, [
            Je(h("input", {
              class: "custom-control-input",
              type: "checkbox",
              "onUpdate:modelValue": t[4] || (t[4] = (P) => s.selectedMessages = P),
              value: y,
              id: `checkbox-${y.id}`
            }, null, 8, qm), [
              [Sn, s.selectedMessages]
            ]),
            h("label", {
              class: "custom-control-label",
              for: `checkbox-${y.id}`
            }, null, 8, zm)
          ], 8, Wm)
        ]),
        "cell(description)": J(({ data: m, item: y, field: E, value: O }) => [
          h("span", { innerHTML: O }, null, 8, Qm)
        ]),
        "cell(status)": J(({ data: m, item: y, field: E, value: O }) => [
          h("span", Jm, [
            h("span", Ym, [
              h("i", {
                title: O,
                class: Se(["m-auto", s.getStatusIcon(O)])
              }, null, 10, Xm)
            ]),
            O == s.STATUS.WAITING ? (S(), I("span", Zm, [
              h("span", {
                class: "m-auto text-muted font-italic small text-nowrap",
                innerHTML: `priority level ${y.priority}`
              }, null, 8, eg)
            ])) : Be("", !0)
          ])
        ]),
        "cell(priority)": J(({ data: m, item: y, field: E, value: O }) => [
          h("span", tg, [
            h("span", {
              style: ls({ backgroundColor: s.getColorByPriority(O) }),
              class: "d-flex align-items-center justify-content-center p-1 mr-1 rounded"
            }, sg, 4),
            h("span", {
              innerHTML: O
            }, null, 8, og)
          ])
        ]),
        _: 1
      }, 8, ["fields", "items", "onSort"]),
      h("div", rg, [
        N(i, {
          totalItems: s.total,
          modelValue: s.page,
          "onUpdate:modelValue": t[5] || (t[5] = (m) => s.page = m),
          perPage: s.perPage,
          size: "sm"
        }, null, 8, ["totalItems", "modelValue", "perPage"]),
        N(u, {
          class: "ms-auto",
          onClick: s.load,
          loading: s.loading
        }, null, 8, ["onClick", "loading"])
      ])
    ]),
    N(p, { ref: "priorityModal" }, {
      header: J(() => [
        be(" Modify priority ")
      ]),
      default: J(({ onOkClicked: m }) => [
        Je(h("input", {
          class: "form-control form-control-sm",
          "onUpdate:modelValue": t[6] || (t[6] = (y) => s.priorityValue = y),
          type: "number",
          onKeyup: Jl(m, ["enter"])
        }, null, 40, ig), [
          [Cn, s.priorityValue]
        ])
      ]),
      _: 1
    }, 512)
  ], 64);
}
const ag = /* @__PURE__ */ ge(Tm, [["render", lg], ["__scopeId", "data-v-442132b6"]]), cg = {
  components: { MessagesTable: ag },
  setup() {
    return {};
  }
};
function ug(e, t, n, s, o, r) {
  const i = Ee("MessagesTable");
  return S(), it(i);
}
const dg = /* @__PURE__ */ ge(cg, [["render", ug]]), cv = (e) => {
  const t = ps(dg);
  return t.mount(e), t;
};
var Ws;
class fg extends Er {
  constructor() {
    super(...arguments);
    _n(this, Ws, ["pid"]);
  }
  visitGlobalParams(n) {
    const s = {};
    for (const [o, r] of Object.entries(n))
      Kt(this, Ws).includes(o) || (s[o] = r);
    return s;
  }
}
Ws = new WeakMap();
let er = "";
window.app_path_webroot_full ? er = `${window.app_path_webroot_full}redcap_v${window.redcap_version}/` : er = `${location.protocol}//${location.host}/api`;
const Ai = new fg(er), va = {
  getData() {
    const e = {
      route: "EmailUsersController:getData"
      // _page: this.page,
      // _per_page: 10,
      // _query: this.query,
    };
    return Ai.send("", { params: e, method: "GET" });
  },
  scheduleEmails(e) {
    const t = {
      route: "EmailUsersController:scheduleEmails"
    };
    return Ai.send("", { params: t, data: e, method: "POST" });
  }
};
class Hs {
  constructor(t) {
    K(this, "ui_id");
    K(this, "username");
    K(this, "user_firstname");
    K(this, "user_lastname");
    K(this, "user_email");
    K(this, "user_suspended_time");
    K(this, "user_lastactivity");
    K(this, "table_based_user");
    K(this, "has_api_token");
    K(this, "is_project_owner");
    K(this, "has_mobile_app_rights");
    K(this, "cdis_user");
    K(this, "online");
    t && (this.ui_id = t.ui_id ? parseInt(t.ui_id) : this.ui_id, this.username = t.username ?? this.username, this.user_firstname = t.user_firstname ?? this.user_firstname, this.user_lastname = t.user_lastname ?? this.user_lastname, this.user_email = t.user_email ?? this.user_email, this.user_suspended_time = t.user_suspended_time ? new Date(t.user_suspended_time) : this.user_suspended_time, this.user_lastactivity = t.user_lastactivity ? new Date(t.user_lastactivity) : this.user_lastactivity, this.table_based_user = Number(t.table_based_user) ?? this.table_based_user, this.has_api_token = Number(t.has_api_token) ?? this.has_api_token, this.is_project_owner = Number(t.is_project_owner) ?? this.is_project_owner, this.has_mobile_app_rights = Number(t.has_mobile_app_rights) ?? this.has_mobile_app_rights, this.cdis_user = Number(t.cdis_user) ?? this.cdis_user, this.online = Number(t.online) ?? this.online);
  }
  get isSuspended() {
    return Boolean(typeof this.user_suspended_time < "u");
  }
  get isOnline() {
    return Boolean(this.online);
  }
  get isActive() {
    return Boolean(this.user_lastactivity);
  }
  get isNotActive() {
    return !Boolean(this.isActive);
  }
  get isTableUser() {
    return Boolean(this.table_based_user);
  }
  get isLdapUser() {
    return !Boolean(this.table_based_user);
  }
  get isCdisUser() {
    return Boolean(this.cdis_user);
  }
  get isProjectOwner() {
    return Boolean(this.is_project_owner);
  }
  get hasAPIToken() {
    return Boolean(this.has_api_token);
  }
  get hasMobileAppRights() {
    return Boolean(this.has_mobile_app_rights);
  }
  get wasActivePastWeek() {
    return this.wasActiveInRange("weeks", 1);
  }
  get wasActivePastMonth() {
    return this.wasActiveInRange("months", 1);
  }
  get wasActivePast3Months() {
    return this.wasActiveInRange("months", 3);
  }
  get wasActivePast6Months() {
    return this.wasActiveInRange("months", 6);
  }
  get wasActivePast12Months() {
    return this.wasActiveInRange("months", 12);
  }
  get lastActivityInMilliseconds() {
    return this.user_lastactivity instanceof Date ? Hs.getTotalMilliseconds(new Date(), this.user_lastactivity) : 0;
  }
  wasActiveInRange(t, n) {
    try {
      const s = this.user_lastactivity;
      if (!(s instanceof Date))
        return !1;
      const o = new Date(), r = Hs.addToDate(o, -n, t);
      return s > r;
    } catch (s) {
      return console.log(`error checking activity for user ${this.username}`, s), !1;
    }
  }
  static getTotalMilliseconds(t, n) {
    if (!(t instanceof Date && !isNaN(t.getTime())) || !(n instanceof Date && !isNaN(n.getTime())))
      throw new Error("Invalid date parameters");
    return Math.abs(t - n);
  }
  static addToDate(t, n, s) {
    if (!(t instanceof Date && !isNaN(t.getTime())))
      return !1;
    const o = new Date(t.getTime());
    switch (s) {
      case "minutes":
        o.setMinutes(o.getMinutes() + n);
        break;
      case "hours":
        o.setHours(o.getHours() + n);
        break;
      case "days":
        o.setDate(o.getDate() + n);
        break;
      case "weeks":
        o.setDate(o.getDate() + n * 7);
        break;
      case "months":
        o.setMonth(o.getMonth() + n);
        break;
      case "years":
        o.setFullYear(o.getFullYear() + n);
        break;
      default:
        throw new Error(`Invalid date unit: ${s}`);
    }
    return o;
  }
}
function pg(e, t) {
  for (let n of e) {
    const s = String(n).match(t);
    if (s)
      return s;
  }
  return !1;
}
const ae = {
  ACTIVE: "ACTIVE",
  NON_ACTIVE: "NON_ACTIVE",
  LOGGED_IN: "LOGGED_IN",
  API_TOKEN: "API_TOKEN",
  MOBILE_APP_RIGHTS: "MOBILE_APP_RIGHTS",
  PROJECT_OWNERS: "PROJECT_OWNERS",
  CDIS: "CDIS",
  TABLE_BASED: "TABLE_BASED",
  LDAP: "LDAP",
  INTERVAL_PAST_WEEK: "INTERVAL_PAST_WEEK",
  INTERVAL_PAST_MONTH: "INTERVAL_PAST_MONTH",
  INTERVAL_PAST_3_MONTHS: "INTERVAL_PAST_3_MONTHS",
  INTERVAL_PAST_6_MONTHS: "INTERVAL_PAST_6_MONTHS",
  INTERVAL_PAST_12_MONTHS: "INTERVAL_PAST_12_MONTHS"
}, Ii = /* @__PURE__ */ new Set([
  ae.INTERVAL_PAST_WEEK,
  ae.INTERVAL_PAST_MONTH,
  ae.INTERVAL_PAST_3_MONTHS,
  ae.INTERVAL_PAST_6_MONTHS,
  ae.INTERVAL_PAST_12_MONTHS
]);
class Bs {
  constructor(t = []) {
    K(this, "MIN_PER_PAGE", 10);
    K(this, "MAX_PER_PAGE", 1e3);
    K(this, "_showSuspended", !1);
    K(this, "_users", []);
    // original users as defined in the constructor
    K(this, "_ids", []);
    K(this, "_page", 1);
    K(this, "_perPage", 25);
    K(this, "_paginatedUsers", []);
    K(this, "_valid_users", []);
    // not suspended
    K(this, "_includedUsers", /* @__PURE__ */ new Set());
    // inclusion group (manually selected from list)
    K(this, "_excludedUsers", /* @__PURE__ */ new Set());
    // exclusion group (manually selected from list)
    K(this, "_selectedGroups", /* @__PURE__ */ new Set());
    // using sets since order is not important
    K(this, "_selectedUsers", /* @__PURE__ */ new Set());
    // using sets since order is not important
    K(this, "_selectedIDs", /* @__PURE__ */ new Set());
    // using sets since order is not important
    // filter users using a query
    K(this, "_query", "");
    K(this, "_filteredUsers", /* @__PURE__ */ new Set());
    // based on query
    K(this, "_state", {});
    // this is the state that will be passed to a store
    K(this, "_groups", /* @__PURE__ */ new Map());
    K(this, "_groupsMetadata", {});
    this.setUsers(t);
  }
  initGroups() {
    for (const t of Object.values(ae))
      this._groups.set(t, /* @__PURE__ */ new Set());
  }
  setUsers(t) {
    const n = (s) => {
      if (!s.isSuspended)
        for (const o of Object.values(ae))
          Bs.userBelongsToGroup(s, o) && (this._groups.has(o) || this._groups.set(o, /* @__PURE__ */ new Set()), this._groups.get(o).add(s));
    };
    this.initGroups(), this._users = [];
    for (const s of t) {
      const o = new Hs(s);
      this._users.push(o), this._ids.push(o.ui_id), n(o), o.isSuspended || this._valid_users.push(o);
    }
  }
  includeUser(t) {
    this._ids.includes(t.ui_id) && this.select([t]);
  }
  excludeUser(t) {
    this.deselect([t]);
  }
  setPage(t) {
    t = parseInt(t), t < 1 && (t = 1), t > this.totalPages && (t = this.totalPages), this._page = t;
  }
  setPerPage(t) {
    t = parseInt(t), t < this.MIN_PER_PAGE && (console.warning(`minimum elements per page is ${this.MIN_PER_PAGE}`), t = this.MIN_PER_PAGE), t > this.MAX_PER_PAGE && (console.warning(`maximum elements per page is ${this.MAX_PER_PAGE}`), t = this.MAX_PER_PAGE), this._perPage = t, this.setPage(1);
  }
  setQuery(t) {
    this._query = t;
  }
  toggleGroup(t) {
    this._selectedGroups.has(t) ? this.deselectGroups([t]) : this.selectGroups([t]);
  }
  getGroup(t) {
    const n = this._groups.get(t);
    if (!n) {
      console.log(`The group ${t} does not exist`);
      return;
    }
    return n;
  }
  selectGroups(t) {
    const n = (s) => {
      for (const o of Ii)
        o != s && this._selectedGroups.delete(o);
    };
    for (const s of t)
      this.getGroup(s) && (this._selectedGroups.add(s), Ii.has(s) && n(s));
  }
  deselectGroups(t) {
    for (const n of t)
      this.getGroup(n) && this._selectedGroups.delete(n);
  }
  /**
   * check if a group has to be unselected
   * based on the current users selection
   * also set the metadata for the group
   */
  checkSelectedGroups() {
    for (const [t, n] of this._groups) {
      const s = new Set([...n].filter((o) => this._selectedUsers.has(o)));
      this._groupsMetadata[t] = {
        total: n.size,
        selected: s.size
      };
    }
  }
  toggleSuspended() {
    this._showSuspended = !this._showSuspended;
  }
  select(t) {
    for (const n of t)
      this._selectedIDs.add(n.ui_id), this._selectedUsers.add(n);
  }
  deselect(t) {
    for (const n of t)
      this._selectedIDs.delete(n.ui_id), this._selectedUsers.delete(n);
  }
  selectAll(t) {
    t ? this.select(this._valid_users) : this.deselect(this._valid_users);
  }
  selectFiltered(t) {
    t ? this.select(this.filteredUsers) : this.deselect(this.filteredUsers);
  }
  /**
   * apply a filter to the users serve to the user
   * it could be including suspended users or not
   * @param {*} users 
   */
  applyQuery(t) {
    let n = [];
    const s = (r, i) => {
      const a = [
        r.ui_id,
        r.username,
        `${r.user_firstname} ${r.user_lastname}`,
        r.user_email
      ], l = new RegExp(i, "gi");
      return pg(a, l) !== !1;
    }, o = this._query;
    if (o !== "")
      for (const r of t)
        s(r, o) && n.push(r);
    else
      n = t;
    return n;
  }
  /**
   * apply a filter to the users serve to the user
   * it could be including suspended users or not
   * @param {*} users 
   */
  applyGroups(t) {
    if (this._selectedGroups.size === 0)
      return t;
    let n = /* @__PURE__ */ new Set();
    for (const [s, o] of this._groups)
      if (this._selectedGroups.has(s))
        for (const r of t)
          o.has(r) && n.add(r);
    return Array.from(n);
  }
  setPaginatedUsers() {
    let t = [];
    t = this.showSuspended ? [...this._users] : [...this._valid_users], t = this.applyGroups(t), t = this.applyQuery(t), this._filteredUsers = t;
    const n = this.totalFiltered, s = this._perPage * (this._page - 1);
    if (s >= n)
      return this._paginatedUsers = [];
    const o = s + this._perPage;
    return this._paginatedUsers = t.slice(s, o);
  }
  /**
   * - set the paginated users
   * - manually update the state
   */
  updateState() {
    this.setPaginatedUsers(), this.checkSelectedGroups(), this._state = {
      data: {
        users: this.paginatedUsers,
        groups: this.groups,
        selectedIDs: this.selectedIDs,
        selectedUsers: this.selectedUsers
      },
      metadata: this.metadata
    };
  }
  get metadata() {
    return {
      total: this.showSuspended ? this._users.length : this._valid_users.length,
      page: this.page,
      perPage: this.perPage,
      totalPages: this.totalPages,
      totalFiltered: this.totalFiltered,
      selectedTotal: this._selectedUsers.size,
      paginatedTotal: this._paginatedUsers.length,
      filteredTotal: this.filteredSelectedIDs.size,
      validTotal: this._valid_users.length,
      showSuspended: this.showSuspended,
      // data about each group
      groups: this.groupsMetadata,
      query: this._query,
      isFilterActive: this.isFilterActive
    };
  }
  get page() {
    return this._page;
  }
  get perPage() {
    return this._perPage;
  }
  get totalUsers() {
    return this.showSuspended ? this._users.length : this._valid_users.length;
  }
  get totalPages() {
    return Math.ceil(this.totalUsers / this._perPage);
  }
  get totalFiltered() {
    return this._filteredUsers.length;
  }
  get state() {
    return this._state;
  }
  get paginatedUsers() {
    return this._paginatedUsers;
  }
  get groups() {
    return Array.from(this._selectedGroups);
  }
  get selectedUsers() {
    return Array.from(this._selectedUsers);
  }
  get selectedIDs() {
    return Array.from(this._selectedIDs);
  }
  get filteredUsers() {
    return Array.from(this._filteredUsers);
  }
  get showSuspended() {
    return this._showSuspended;
  }
  get groupsMetadata() {
    return this._groupsMetadata;
  }
  // get the users that are selected in the current filter
  get filteredSelectedIDs() {
    const t = /* @__PURE__ */ new Set();
    for (const n of this._selectedUsers)
      this._filteredUsers.includes(n) && t.add(n.ui_id);
    return t;
  }
  get isFilterActive() {
    return this.groups.length > 0 || this._query !== "";
  }
  static userBelongsToGroup(t, n) {
    switch (n) {
      case ae.ACTIVE:
        return t.isActive;
      case ae.NON_ACTIVE:
        return t.isNotActive;
      case ae.LOGGED_IN:
        return t.isOnline;
      case ae.API_TOKEN:
        return t.hasAPIToken;
      case ae.MOBILE_APP_RIGHTS:
        return t.hasMobileAppRights;
      case ae.PROJECT_OWNERS:
        return t.isProjectOwner;
      case ae.CDIS:
        return t.isCdisUser;
      case ae.TABLE_BASED:
        return t.isTableUser;
      case ae.LDAP:
        return t.isLdapUser;
      case ae.INTERVAL_PAST_WEEK:
        return t.wasActivePastWeek;
      case ae.INTERVAL_PAST_MONTH:
        return t.wasActivePastMonth;
      case ae.INTERVAL_PAST_3_MONTHS:
        return t.wasActivePast3Months;
      case ae.INTERVAL_PAST_6_MONTHS:
        return t.wasActivePast6Months;
      case ae.INTERVAL_PAST_12_MONTHS:
        return t.wasActivePast12Months;
      default:
        return !1;
    }
  }
  serialize() {
    return JSON.stringify({
      ...this,
      __proto__: Object.getPrototypeOf(this)
    });
  }
  static deserialize(t) {
    const n = new Bs([], []);
    let s = JSON.parse(t);
    return Object.setPrototypeOf(s, Object.getPrototypeOf(n)), s;
  }
  static fromJSON(t) {
    return new this(t.users, t.groups);
  }
}
const Ea = {
  loading: !1,
  groups: [],
  users: [],
  selectedUsers: [],
  // IDs of selected users
  metadata: {},
  query: "",
  get filterDisabled() {
    return this.query == "" && this.groups.length == 0;
  },
  sync({ data: e, metadata: t }) {
    this.metadata = { ...t }, this.groups = [...e.groups], this.users = [...e.users], this.selectedUsers = [...e.selectedIDs], this.query = t.query ?? "";
  },
  loadData(e) {
    const { data: t } = e;
    hg(t);
  },
  setQuery(e) {
  },
  async doAction(e, t = [], n = !0) {
    if (this.loading && n) {
      console.log(`cannot run ${e} because another process is running`);
      return;
    }
    try {
      this.loading = !0;
      const s = await _g(e, t), { data: o, metadata: r } = s;
      n && this.sync({ data: o, metadata: r });
    } catch (s) {
      console.log(s);
    } finally {
      this.loading = !1;
    }
  }
};
let Ie = new Bs();
const hg = (e) => {
  Ie.setUsers(e), Ie.updateState(), Ea.sync(Ie.state);
}, _g = (e, t = []) => new Promise((n, s) => {
  if (!Ie) {
    let r = "UsersManager service not available";
    return console.log(r), s(r);
  }
  switch (e) {
    case "includeUser":
      Ie.includeUser(...t);
      break;
    case "excludeUser":
      Ie.excludeUser(...t);
      break;
    case "toggleGroup":
      Ie.toggleGroup(...t);
      break;
    case "selectGroups":
      Ie.selectGroups(...t);
      break;
    case "deselectGroups":
      Ie.deselectGroups(...t);
      break;
    case "toggleSuspended":
      Ie.toggleSuspended(...t);
      break;
    case "selectAll":
      Ie.selectAll(...t);
      break;
    case "selectFiltered":
      Ie.selectFiltered(...t);
      break;
    case "setPage":
      Ie.setPage(...t);
      break;
    case "setPerPage":
      Ie.setPerPage(...t);
      break;
    case "setQuery":
      Ie.setPage(1), Ie.setQuery(...t);
      break;
    default:
      let r = `method ${e} not available`;
      return s(r);
  }
  Ie.updateState();
  let o = Ie.state;
  setTimeout(() => {
    n(o);
  }, 0);
}), mg = {
  lang: {},
  user: {
    username: null,
    emails: []
  },
  settings: [],
  loadData(e) {
    this.lang = e.lang, this.user = e.user, this.settings = e.settings || [];
  }
}, gg = {
  ui_ids: [],
  from: "",
  subject: "",
  message: "",
  sending: !1,
  errors(e) {
    var i;
    const t = {
      from: [],
      subject: [],
      message: [],
      to: []
    }, { from: n = "", subject: s = "", message: o = "" } = e, r = [...(i = store == null ? void 0 : store.users) == null ? void 0 : i.selectedUsers];
    return n.trim() === "" && t.from.push("a 'from' email must be selected"), s.trim() === "" && t.subject.push("subject cannot be empty"), o.trim() === "" && t.message.push("message cannot be empty"), r.length == 0 && t.to.push("you must select at least 1 recipient"), t;
  }
}, pe = Gt({
  users: Ea,
  settings: mg,
  form: gg
});
const yg = { class: "email-attributes mb-2" }, vg = { class: "label" }, Eg = { class: "label" }, bg = ["placeholder"], wg = { class: "label" }, Ng = {
  __name: "ComposeEmailPanel",
  setup(e) {
    $l(() => {
      typeof window.initTinyMCEglobal == "function" && window.initTinyMCEglobal("vue-mceditor", !1);
    });
    const t = H(() => {
      var l, u;
      return ((u = (l = pe.settings) == null ? void 0 : l.user) == null ? void 0 : u.emails) || [];
    }), n = H({
      get() {
        return pe.form.from;
      },
      set(l) {
        pe.form.from = l;
      }
    }), s = H({
      get() {
        return pe.form.subject;
      },
      set(l) {
        pe.form.subject = l;
      }
    }), o = H({
      get() {
        return pe.form.message;
      },
      set(l) {
        pe.form.message = l;
      }
    });
    Lt(t, (l) => {
      t.length != 0 && (n.value = l[0]);
    }, { immediate: !0 });
    function r(l) {
      var d;
      const u = (d = l == null ? void 0 : l.target) == null ? void 0 : d.value;
      if (u == null)
        throw new Error("Error getting the message value");
      o.value = u;
    }
    function i(l) {
      n.value = l;
    }
    function a() {
      typeof window.setUpAdditionalEmails == "function" && window.setUpAdditionalEmails();
    }
    return (l, u) => {
      var c, p;
      const d = Ee("tt-text");
      return S(), I(de, null, [
        h("div", yg, [
          h("div", null, [
            h("span", vg, [
              N(d, { tkey: "email_users_108" })
            ])
          ]),
          h("div", null, [
            N(L(uo), {
              "dropdown-email": "",
              variant: "outline-secondary"
            }, {
              button: J(() => [
                h("span", null, oe(L(n)), 1)
              ]),
              default: J(() => [
                (S(!0), I(de, null, _t(L(t), (m, y) => (S(), it(L(rs), {
                  key: y,
                  onClick: (E) => i(m),
                  active: m == L(n)
                }, {
                  default: J(() => [
                    be(oe(m), 1)
                  ]),
                  _: 2
                }, 1032, ["onClick", "active"]))), 128)),
                L(t).length < 3 ? (S(), I(de, { key: 0 }, [
                  N(L(W_)),
                  N(L(rs), { onClick: a }, {
                    default: J(() => [
                      N(d, { tkey: "email_users_132" })
                    ]),
                    _: 1
                  })
                ], 64)) : Be("", !0)
              ]),
              _: 1
            })
          ]),
          h("div", null, [
            h("span", Eg, [
              N(d, { tkey: "email_users_109" })
            ])
          ]),
          h("input", {
            type: "text",
            class: "form-control",
            placeholder: `[${(p = (c = L(pe).settings) == null ? void 0 : c.lang) == null ? void 0 : p.email_users_09}]`,
            disabled: ""
          }, null, 8, bg),
          h("div", null, [
            h("span", wg, [
              N(d, { tkey: "email_users_10" })
            ])
          ]),
          Je(h("input", {
            type: "text",
            class: "form-control",
            "onUpdate:modelValue": u[0] || (u[0] = (m) => we(s) ? s.value = m : null)
          }, null, 512), [
            [Cn, L(s)]
          ])
        ]),
        h("div", null, [
          Je(h("textarea", {
            name: "emailMessage",
            class: "x-form-textarea x-form-field vue-mceditor w-100",
            onInput: r,
            "onUpdate:modelValue": u[1] || (u[1] = (m) => we(o) ? o.value = m : null)
          }, null, 544), [
            [Cn, L(o)]
          ])
        ])
      ], 64);
    };
  }
}, Og = /* @__PURE__ */ ge(Ng, [["__scopeId", "data-v-7b485122"]]);
const kg = ["disabled"], xg = { class: "group-metadata" }, $g = {
  __name: "UsersButtonGroup",
  props: {
    group: { type: String }
  },
  setup(e) {
    const t = e, { users: n } = pe, { group: s } = us(t), o = H(() => {
      var c;
      return (c = n.metadata.groups) == null ? void 0 : c[s.value];
    }), r = H(() => {
      var c;
      return (c = o.value) == null ? void 0 : c.total;
    }), i = H(() => {
      var c;
      return (c = o.value) == null ? void 0 : c.selected;
    }), a = H(() => {
      var c;
      return (((c = o.value) == null ? void 0 : c.total) ?? 0) <= 0;
    }), l = H(() => n.groups), u = H(() => {
      var c, p, m;
      return {
        active: l.value.includes(s.value),
        indeterminate: ((c = o.value) == null ? void 0 : c.selected) > 0 && ((p = o.value) == null ? void 0 : p.selected) != ((m = o.value) == null ? void 0 : m.total)
      };
    });
    function d() {
      n.doAction("toggleGroup", [s.value]);
    }
    return (c, p) => (S(), I("button", {
      class: Se(["btn btn-sm btn-outline-primary", L(u)]),
      disabled: L(a),
      onClick: d
    }, [
      Re(c.$slots, "default", {}, void 0, !0),
      h("span", xg, [
        h("span", null, oe(L(i)), 1),
        be("/ "),
        h("span", null, oe(L(r)), 1)
      ])
    ], 10, kg));
  }
}, Ke = /* @__PURE__ */ ge($g, [["__scopeId", "data-v-b378d60d"]]);
const ms = (e) => (gt("data-v-6a5bb861"), e = e(), yt(), e), Cg = { class: "border rounded p-2" }, Sg = { class: "button-grid" }, Dg = { class: "state" }, Tg = { class: "button-group" }, Pg = /* @__PURE__ */ ms(() => /* @__PURE__ */ h("sup", null, " *", -1)), Ag = /* @__PURE__ */ ms(() => /* @__PURE__ */ h("sup", null, " *", -1)), Ig = { class: "feature" }, Vg = { class: "font-weight-bold" }, Rg = { class: "button-group" }, Mg = /* @__PURE__ */ ms(() => /* @__PURE__ */ h("sup", null, "**", -1)), Lg = { class: "auth-type" }, jg = { class: "font-weight-bold" }, Ug = { class: "button-group" }, Fg = { class: "activity" }, Hg = { class: "font-weight-bold" }, Bg = { class: "button-group" }, Gg = { class: "mt-2 notes-descriptions font-italic small text-muted text-end" }, Kg = /* @__PURE__ */ ms(() => /* @__PURE__ */ h("span", null, "*", -1)), Wg = /* @__PURE__ */ ms(() => /* @__PURE__ */ h("span", null, "**", -1)), qg = {
  __name: "UsersButtonGroups",
  setup(e) {
    return (t, n) => {
      const s = Ee("tt-text");
      return S(), I("div", Cg, [
        h("h5", null, [
          N(s, { tkey: "email_users_103" })
        ]),
        h("div", Sg, [
          h("div", Dg, [
            h("div", Tg, [
              N(Ke, {
                group: L(ae).ACTIVE
              }, {
                default: J(() => [
                  N(s, { tkey: "email_users_19" }),
                  Pg
                ]),
                _: 1
              }, 8, ["group"]),
              N(Ke, {
                group: L(ae).NON_ACTIVE
              }, {
                default: J(() => [
                  N(s, { tkey: "email_users_20" }),
                  Ag
                ]),
                _: 1
              }, 8, ["group"]),
              N(Ke, {
                group: L(ae).LOGGED_IN
              }, {
                default: J(() => [
                  N(s, { tkey: "email_users_34" })
                ]),
                _: 1
              }, 8, ["group"])
            ])
          ]),
          h("div", Ig, [
            h("span", Vg, [
              N(s, { tkey: "email_users_104" }),
              be(":")
            ]),
            h("div", Rg, [
              N(Ke, {
                group: L(ae).API_TOKEN
              }, {
                default: J(() => [
                  N(s, { tkey: "email_users_116" })
                ]),
                _: 1
              }, 8, ["group"]),
              N(Ke, {
                group: L(ae).MOBILE_APP_RIGHTS
              }, {
                default: J(() => [
                  N(s, { tkey: "email_users_117" })
                ]),
                _: 1
              }, 8, ["group"]),
              N(Ke, {
                group: L(ae).PROJECT_OWNERS
              }, {
                default: J(() => [
                  N(s, { tkey: "email_users_118" }),
                  be(),
                  Mg
                ]),
                _: 1
              }, 8, ["group"]),
              N(Ke, {
                group: L(ae).CDIS
              }, {
                default: J(() => [
                  N(s, { tkey: "email_users_119" })
                ]),
                _: 1
              }, 8, ["group"])
            ])
          ]),
          h("div", Lg, [
            h("span", jg, [
              N(s, { tkey: "email_users_105" }),
              be(":")
            ]),
            h("div", Ug, [
              N(Ke, {
                group: L(ae).TABLE_BASED
              }, {
                default: J(() => [
                  N(s, { tkey: "email_users_31" })
                ]),
                _: 1
              }, 8, ["group"]),
              N(Ke, {
                group: L(ae).LDAP
              }, {
                default: J(() => [
                  N(s, { tkey: "email_users_32" })
                ]),
                _: 1
              }, 8, ["group"])
            ])
          ]),
          h("div", Fg, [
            h("span", Hg, [
              N(s, { tkey: "email_users_106" }),
              be(":")
            ]),
            h("div", Bg, [
              N(Ke, {
                group: L(ae).INTERVAL_PAST_WEEK
              }, {
                default: J(() => [
                  N(s, { tkey: "email_users_107" })
                ]),
                _: 1
              }, 8, ["group"]),
              N(Ke, {
                group: L(ae).INTERVAL_PAST_MONTH
              }, {
                default: J(() => [
                  N(s, { tkey: "email_users_24" })
                ]),
                _: 1
              }, 8, ["group"]),
              N(Ke, {
                group: L(ae).INTERVAL_PAST_3_MONTHS
              }, {
                default: J(() => [
                  N(s, { tkey: "email_users_27" })
                ]),
                _: 1
              }, 8, ["group"]),
              N(Ke, {
                group: L(ae).INTERVAL_PAST_6_MONTHS
              }, {
                default: J(() => [
                  N(s, { tkey: "email_users_25" })
                ]),
                _: 1
              }, 8, ["group"]),
              N(Ke, {
                group: L(ae).INTERVAL_PAST_12_MONTHS
              }, {
                default: J(() => [
                  N(s, { tkey: "email_users_26" })
                ]),
                _: 1
              }, 8, ["group"])
            ])
          ])
        ]),
        h("ul", Gg, [
          h("li", null, [
            Kg,
            be(),
            N(s, { tkey: "email_users_30" })
          ]),
          h("li", null, [
            Wg,
            be(),
            N(s, { tkey: "email_users_102" })
          ])
        ])
      ]);
    };
  }
}, zg = /* @__PURE__ */ ge(qg, [["__scopeId", "data-v-6a5bb861"]]), Qg = { class: "d-flex justify-content-start align-items-center small fst-italic" }, Jg = { class: "font-weigth-bold" }, Yg = /* @__PURE__ */ h("div", { class: "vr mx-2" }, null, -1), Xg = { class: "font-weigth-bold" }, Zg = {
  __name: "UsersMetadata",
  setup(e) {
    const { users: t } = pe, n = H(() => t.metadata);
    return (s, o) => {
      const r = Ee("tt-text");
      return S(), I("div", Qg, [
        h("span", null, [
          N(r, { tkey: "email_users_110" }),
          be(" ("),
          N(r, { tkey: "email_users_133" }),
          be("): "),
          h("span", Jg, oe(L(n).selectedTotal) + "/" + oe(L(n).total), 1)
        ]),
        L(n).isFilterActive ? (S(), I(de, { key: 0 }, [
          Yg,
          h("span", null, [
            N(r, { tkey: "email_users_110" }),
            be(" ("),
            N(r, { tkey: "email_users_134" }),
            be("): "),
            h("span", Xg, oe(L(n).filteredTotal) + "/" + oe(L(n).totalFiltered), 1)
          ])
        ], 64)) : Be("", !0)
      ]);
    };
  }
};
const kr = (e) => (gt("data-v-920d92c4"), e = e(), yt(), e), ey = { class: "table table-bordered table-striped my-2" }, ty = { class: "check-all-button-container d-flex flex-column justify-content-start align-items-start" }, ny = {
  key: 0,
  class: "form-check form-switch"
}, sy = ["indeterminate"], oy = /* @__PURE__ */ kr(() => /* @__PURE__ */ h("label", {
  class: "form-check-label",
  for: "selectAllSwitch"
}, "Toggle All", -1)), ry = {
  key: 1,
  class: "form-check form-switch"
}, iy = ["indeterminate"], ly = /* @__PURE__ */ kr(() => /* @__PURE__ */ h("label", {
  class: "form-check-label",
  for: "selectFilteredSwitch"
}, "Toggle Filtered", -1)), ay = ["onClick"], cy = { class: "form-check form-switch" }, uy = ["value", "checked", "disabled"], dy = {
  key: 0,
  class: "text-success ms-2"
}, fy = /* @__PURE__ */ kr(() => /* @__PURE__ */ h("i", { class: "fa-solid fa-circle fa-2xs" }, null, -1)), py = [
  fy
], hy = {
  key: 0,
  class: "font-italic"
}, _y = { key: 1 }, my = {
  __name: "UsersTable",
  setup(e) {
    const { users: t } = pe, n = H(() => t.users), s = H(() => t.metadata), o = H(() => pe.users.selectedUsers), r = H(() => {
      var y, E;
      const p = ((y = s.value) == null ? void 0 : y.selectedTotal) ?? 0, m = ((E = s.value) == null ? void 0 : E.validTotal) ?? 0;
      return p === 0 ? !1 : p != m;
    }), i = H(() => {
      var y, E;
      const p = ((y = s.value) == null ? void 0 : y.selectedTotal) ?? 0, m = ((E = s.value) == null ? void 0 : E.totalFiltered) ?? 0;
      return p === 0 ? !1 : p != m;
    }), a = H({
      get() {
        return s.value.validTotal == s.value.selectedTotal;
      },
      set(p) {
        t.doAction("selectAll", [p]);
      }
    }), l = H({
      get() {
        return s.value.totalFiltered == s.value.selectedTotal;
      },
      set(p) {
        t.doAction("selectFiltered", [p]);
      }
    }), u = H(() => t.filterDisabled);
    function d(p) {
      return o.value.includes(p.ui_id);
    }
    function c(p) {
      if (p = Z(p), p.isSuspended) {
        alert("this user is suspended and cannot be selected");
        return;
      }
      d(p) ? t.doAction("excludeUser", [p]) : t.doAction("includeUser", [p]);
    }
    return (p, m) => {
      const y = Ee("tt-text");
      return S(), I("table", ey, [
        h("thead", null, [
          h("tr", null, [
            h("th", null, [
              h("div", ty, [
                L(u) ? (S(), I("div", ny, [
                  Je(h("input", {
                    class: "form-check-input",
                    id: "selectAllSwitch",
                    type: "checkbox",
                    value: !0,
                    "onUpdate:modelValue": m[0] || (m[0] = (E) => we(a) ? a.value = E : null),
                    disabled: !1,
                    indeterminate: L(r)
                  }, null, 8, sy), [
                    [Sn, L(a)]
                  ]),
                  oy
                ])) : (S(), I("div", ry, [
                  Je(h("input", {
                    class: "form-check-input",
                    id: "selectFilteredSwitch",
                    type: "checkbox",
                    value: !0,
                    "onUpdate:modelValue": m[1] || (m[1] = (E) => we(l) ? l.value = E : null),
                    disabled: !1,
                    indeterminate: L(i)
                  }, null, 8, iy), [
                    [Sn, L(l)]
                  ]),
                  ly
                ]))
              ])
            ]),
            h("th", null, [
              N(y, { tkey: "email_users_120" })
            ]),
            h("th", null, [
              N(y, { tkey: "email_users_121" })
            ]),
            h("th", null, [
              N(y, { tkey: "email_users_122" })
            ])
          ])
        ]),
        h("tbody", null, [
          (S(!0), I(de, null, _t(L(n), (E, O) => (S(), I("tr", {
            key: `user-${O}`,
            class: Se({ suspended: E.isSuspended }),
            onClick: (P) => c(E)
          }, [
            h("td", null, [
              h("div", cy, [
                h("input", {
                  class: "form-check-input",
                  type: "checkbox",
                  value: E.ui_id,
                  checked: d(E),
                  disabled: E.isSuspended,
                  onClick: m[2] || (m[2] = xt(() => {
                  }, ["prevent"]))
                }, null, 8, uy)
              ])
            ]),
            h("td", null, [
              h("span", null, oe(E.username), 1),
              E.isOnline == !0 ? (S(), I("span", dy, py)) : Be("", !0)
            ]),
            h("td", null, [
              h("span", null, oe(`${E.user_firstname} ${E.user_lastname}`), 1)
            ]),
            h("td", null, [
              E.isSuspended ? (S(), I("span", hy, "user suspended")) : (S(), I("span", _y, oe(E.user_email), 1))
            ])
          ], 10, ay))), 128))
        ])
      ]);
    };
  }
}, gy = /* @__PURE__ */ ge(my, [["__scopeId", "data-v-920d92c4"]]), yy = {
  __name: "UsersSearchField",
  setup(e) {
    const { users: t } = pe, s = function(r, i = 300) {
      let a = {};
      return (...l) => {
        a[r] && clearTimeout(a[r]), a[r] = setTimeout(() => {
          r.apply(this, l);
        }, i);
      };
    }((r) => {
      t.doAction("setQuery", [r]);
    }, 300), o = H({
      get() {
        return t.query;
      },
      set(r) {
        s(r);
      }
    });
    return (r, i) => (S(), I("div", null, [
      Je(h("input", {
        type: "search",
        class: "form-control form-control-sm",
        placeholder: "Search...",
        "onUpdate:modelValue": i[0] || (i[0] = (a) => we(o) ? o.value = a : null)
      }, null, 512), [
        [Cn, L(o)]
      ])
    ]));
  }
}, Vi = {
  __name: "UsersPagination",
  setup(e) {
    const { users: t } = pe, n = H({
      get() {
        return t.metadata.page;
      },
      set(r) {
        t.doAction("setPage", [r]);
      }
    }), s = H({
      get() {
        return t.metadata.perPage;
      },
      set(r) {
        t.doAction("setPerPage", [r]);
      }
    }), o = H({
      get() {
        return t.metadata.totalFiltered;
      },
      set(r) {
      }
    });
    return (r, i) => (S(), it(ya, {
      "per-page": L(s),
      "total-items": L(o),
      modelValue: L(n),
      "onUpdate:modelValue": i[0] || (i[0] = (a) => we(n) ? n.value = a : null),
      size: "sm"
    }, null, 8, ["per-page", "total-items", "modelValue"]));
  }
}, vy = { class: "text-nowrap" }, Ey = {
  __name: "UsersPerPageDropDown",
  setup(e) {
    const { users: t } = pe, n = Ce([25, 50, 100, 500]), s = H({
      get() {
        return t.metadata.perPage;
      },
      set(o) {
        t.doAction("setPerPage", [o]);
      }
    });
    return (o, r) => {
      const i = Ee("tt-text");
      return S(), it(L(uo), { variant: "outline-secondary" }, {
        button: J(() => [
          h("span", vy, [
            N(i, { tkey: "email_users_123" }),
            be(": " + oe(L(s)), 1)
          ])
        ]),
        default: J(() => [
          (S(!0), I(de, null, _t(n.value, (a, l) => (S(), it(L(rs), {
            key: l,
            onClick: (u) => s.value = a,
            active: a == L(s)
          }, {
            default: J(() => [
              h("span", null, oe(a), 1)
            ]),
            _: 2
          }, 1032, ["onClick", "active"]))), 128))
        ]),
        _: 1
      });
    };
  }
}, zn = (e) => {
  var n;
  const t = (n = pe == null ? void 0 : pe.settings) == null ? void 0 : n.lang[e];
  return t ?? (console.log(`error: could not find a translation for ${e}`), !1);
}, by = {
  computed: {
    translation() {
      const e = zn(this.tkey);
      return e || "-- no translation found --";
    }
  },
  props: {
    tkey: {
      type: String,
      default: ""
    }
  }
}, wy = ["innerHTML"];
function Ny(e, t, n, s, o, r) {
  return S(), I("span", { innerHTML: r.translation }, null, 8, wy);
}
const Oy = /* @__PURE__ */ ge(by, [["render", Ny]]);
const ky = { class: "text-nowrap" }, xy = ["disabled"], $y = {
  key: 0,
  class: "fas fa-spinner fa-spin fa-fw"
}, Cy = {
  key: 1,
  class: "fas fa-envelope fa-fw"
}, Sy = { class: "ms-2" }, Dy = { class: "font-weight-bold" }, Ty = { class: "confirmation-data" }, Py = { class: "data-label" }, Ay = { class: "data-value" }, Iy = { class: "data-label" }, Vy = { class: "data-value" }, Ry = { class: "data-label" }, My = { class: "data-value" }, Ly = { class: "data-label" }, jy = { class: "card" }, Uy = ["innerHTML"], Fy = {
  __name: "SendEmailsButton",
  setup(e) {
    const { users: t } = pe, n = Ce(), s = H(() => {
      const d = pe.form.from, c = pe.form.subject, p = pe.form.message, m = [...t.selectedUsers];
      return { from: d, subject: c, message: p, ui_ids: m };
    }), o = H({
      get() {
        return pe.form.sending;
      },
      set(d) {
        pe.form.sending = d;
      }
    }), r = H(() => {
      const d = [], { from: c = "", subject: p = "", message: m = "", ui_ids: y = [] } = s.value;
      return c.trim() === "" && d.push("a 'from' email must be selected"), p.trim() === "" && d.push("subject cannot be empty"), m.trim() === "" && d.push("message cannot be empty"), y.length == 0 && d.push("you must select at least 1 recipient"), d;
    }), i = H(() => r.value.length > 0 || o.value);
    async function a() {
      await n.value.show() === !0 && l();
    }
    async function l() {
      var d, c;
      try {
        o.value = !0;
        const p = { ...s.value };
        await va.scheduleEmails(p);
        const m = zn("email_users_127") || "Success", y = zn("email_users_128") || "Emails scheduled. You can leave this page.", E = { title: m, body: y }, O = await ft.alert(E);
        u();
      } catch (p) {
        const m = zn("email_users_126") || "Error", y = ((c = (d = p == null ? void 0 : p.response) == null ? void 0 : d.data) == null ? void 0 : c.message) || "There was an error scheduling your emails.";
        ft.alert({ title: m, body: y });
      } finally {
        o.value = !1;
      }
    }
    async function u() {
      pe.form.subject = "", pe.form.message = "", await pe.users.doAction("deselectGroups", [Object.values(ae)]), await pe.users.doAction("selectAll", [!1]);
    }
    return (d, c) => {
      const p = Ee("tt-text");
      return S(), I("div", null, [
        h("div", ky, [
          h("button", {
            type: "button",
            class: "btn btn-primary btn-sm",
            disabled: L(i),
            onClick: a
          }, [
            L(o) ? (S(), I("i", $y)) : (S(), I("i", Cy)),
            h("span", Sy, [
              N(p, { tkey: "email_users_113" })
            ])
          ], 8, xy)
        ]),
        N(co, {
          ref_key: "confirmationModal",
          ref: n,
          "ok-text": d.$tt("email_users_113")
        }, {
          header: J(() => [
            h("span", Dy, [
              N(p, { tkey: "email_users_131" })
            ])
          ]),
          default: J(() => [
            h("div", Ty, [
              h("span", Py, [
                N(p, { tkey: "email_users_108" })
              ]),
              h("span", Ay, oe(L(s).from), 1),
              h("span", Iy, [
                N(p, { tkey: "email_users_109" })
              ]),
              h("span", Vy, oe(L(s).ui_ids.length) + " " + oe(L(s).ui_ids.length == 1 ? "user" : "users"), 1),
              h("span", Ry, [
                N(p, { tkey: "email_users_10" })
              ]),
              h("span", My, oe(L(s).subject), 1),
              h("span", Ly, [
                N(p, { tkey: "email_users_114" })
              ]),
              h("div", jy, [
                h("span", {
                  class: "card-body p-1",
                  innerHTML: L(s).message
                }, null, 8, Uy)
              ])
            ])
          ]),
          _: 1
        }, 8, ["ok-text"])
      ]);
    };
  }
}, Ri = /* @__PURE__ */ ge(Fy, [["__scopeId", "data-v-c16530ff"]]), Hy = {
  class: "m-0",
  for: "show-suspended"
}, By = ["checked", "onClick"], Gy = {
  __name: "SuspendedUsersToggler",
  setup(e) {
    const { users: t } = pe, n = H(() => {
      var o;
      return ((o = t.metadata) == null ? void 0 : o.showSuspended) ?? !1;
    });
    function s() {
      t.doAction("toggleSuspended");
    }
    return (o, r) => {
      const i = Ee("tt-text");
      return S(), I("div", null, [
        h("label", Hy, [
          N(i, { tkey: "email_users_111" })
        ]),
        h("input", {
          class: "ms-2",
          id: "show-suspended",
          type: "checkbox",
          value: !0,
          checked: L(n),
          onClick: xt(s, ["prevent"])
        }, null, 8, By)
      ]);
    };
  }
}, Ky = { class: "d-flex my-2 align-items-center" }, Wy = { class: "d-flex gap-2 align-items-center" }, qy = { class: "me-auto" }, zy = { class: "d-flex gap-2 align-items-center" }, Qy = { class: "d-flex gap-2" }, Jy = {
  __name: "UsersPanel",
  setup(e) {
    return (t, n) => (S(), I(de, null, [
      N(zg),
      h("div", Ky, [
        N(Ri, { class: "ms-auto" })
      ]),
      h("div", Wy, [
        h("div", qy, [
          N(Vi)
        ]),
        N(Ey),
        N(yy)
      ]),
      h("div", zy, [
        N(Gy, { class: "my-2" }),
        N(Zg, { class: "ms-auto" })
      ]),
      N(gy),
      h("div", Qy, [
        N(Vi, { class: "me-auto" }),
        N(Ri)
      ])
    ], 64));
  }
}, Yy = {
  key: 0,
  class: "p-2"
}, Xy = /* @__PURE__ */ h("i", { class: "fa fa-spinner fa-spin" }, null, -1), Zy = /* @__PURE__ */ h("span", { class: "ms-2" }, "Loading", -1), ev = [
  Xy,
  Zy
], tv = { key: 1 }, nv = { class: "mt-2" }, sv = {
  __name: "App",
  setup(e) {
    const t = Ce(!1);
    async function n() {
      try {
        t.value = !0;
        const s = await va.getData(), { users: o, settings: r } = s;
        await pe.settings.loadData(r), await pe.users.loadData(o);
      } catch {
      } finally {
        t.value = !1;
      }
    }
    return xl(() => {
      n();
    }), (s, o) => t.value ? (S(), I("div", Yy, ev)) : (S(), I("div", tv, [
      N(Og),
      h("div", nv, [
        N(Jy)
      ])
    ]));
  }
}, uv = (e) => {
  const t = ps(sv);
  return t.config.globalProperties.$tt = zn, t.component("tt-text", Oy), t.mount(e), t;
};
export {
  uv as EmailUsers,
  rv as Parcel,
  iv as ParcelBadge,
  cv as QueueMonitor
};

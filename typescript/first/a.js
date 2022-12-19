define("second", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getB = void 0;
    const b = "bbbbbb";
    function getB(who = b) {
        console.log(who);
    }
    exports.getB = getB;
});
define("index", ["require", "exports", "second"], function (require, exports, second_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const a = "aaaaaa";
    function hello(who) {
        console.log(who);
    }
    function h() {
        hello(a);
        (0, second_1.getB)();
    }
    exports.default = h;
    h();
});
//# sourceMappingURL=a.js.map
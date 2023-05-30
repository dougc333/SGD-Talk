//is ok but a bit awkward have to use array notation for tuples
function add(first, second) {
    return [first[0] + second[0], first[1] + second[1], first[2] + second[2]];
}
console.log(add([0, 0, 0], [1, 1, 2]));
var ThreeDPoint = /** @class */ (function () {
    function ThreeDPoint(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    return ThreeDPoint;
}());
function add2Points(first, second) {
    return new ThreeDPoint(first.x + second.x, first.y + second.y, first.z + second.z);
}
console.log(JSON.stringify(add2Points(new ThreeDPoint(0, 0, 0), new ThreeDPoint(2, 1, 2))));
//this one below is better.
console.log(add2Points(new ThreeDPoint(0, 0, 0), new ThreeDPoint(2, 1, 2)));
function add2d(first, second) {
    return { x: first.x + second.x, y: first.y + second.y };
}
//implementing useState. 
console.log("interface 2d point add:", add2d({ x: 0, y: 0 }, { x: 3, y: 3 }));

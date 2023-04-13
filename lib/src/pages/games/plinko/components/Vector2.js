export default class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    multiply(t) {
        return new Vector2(this.x * t, this.y * t);
    }
    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }
    subtract(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }
    sqrMagnitude() {
        return this.x * this.x + this.y * this.y;
    }
    magnitude() {
        return Math.sqrt(this.sqrMagnitude());
    }
    negate() {
        return new Vector2(-this.x, -this.y);
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    normalize() {
        const magnitude = this.magnitude();
        return new Vector2(this.x / magnitude, this.y / magnitude);
    }
}
//# sourceMappingURL=Vector2.js.map
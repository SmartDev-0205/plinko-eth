import { Drawable } from "./Drawable";
class Pin extends Drawable {
    constructor(position, radius, color) {
        super(position);
        this.radius = radius;
        this.color = color;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}
export default Pin;
//# sourceMappingURL=Pin.js.map
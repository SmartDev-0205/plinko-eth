import { Drawable } from "./Drawable";
import Vector2 from "./Vector2";
class Ball extends Drawable {
    constructor(position, radius, color) {
        super(position);
        this.v = new Vector2(0, 0.1);
        this.oldPos = new Vector2(0, 0);
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
export default Ball;
//# sourceMappingURL=Ball.js.map
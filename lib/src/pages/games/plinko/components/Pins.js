import { Drawable } from "./Drawable";
import Pin from "./Pin";
import Vector2 from "./Vector2";
class Pins extends Drawable {
    constructor(rows, color) {
        super(new Vector2(0, 0));
        this.pinRadius = 0.02;
        this.pins = [];
        this.rows = rows;
        // Create pins
        const distance = (2 - 2 * this.pinRadius) / (this.rows + 1);
        const rowDistance = Math.sqrt(1.25 * distance * distance);
        const topOffset = 2 - rowDistance * (rows - 1) - this.pinRadius;
        for (let i = 2; i < this.rows + 2; i++) {
            const startPosX = (-distance * i) / 2;
            const posY = (i - 2) * rowDistance - 1 + topOffset;
            for (let j = 0; j < i + 1; j++) {
                const posX = startPosX + j * distance;
                this.pins.push(new Pin(new Vector2(posX, posY), this.pinRadius, color));
            }
        }
    }
    getCollisionPin(start, end, radius) {
        // TODO: simple not optimized implementation;
        const maxDistanceSqr = (this.pinRadius + radius) * (this.pinRadius + radius);
        const direction = end.subtract(start);
        const magnitudeSqr = direction.sqrMagnitude();
        for (const pin of this.pins) {
            // calculate nearest point
            const t = Math.max(0, direction.dot(pin.position.subtract(start)) / magnitudeSqr);
            const nearestPoint = start.add(direction.multiply(Math.min(1, t)));
            const projection = start.add(direction.multiply(t));
            const distanceSqr = nearestPoint.subtract(pin.position).sqrMagnitude();
            // calculate distance on nearest point
            const distanceNearestPointSqr = projection.subtract(pin.position).sqrMagnitude();
            if (distanceSqr > maxDistanceSqr) {
                continue;
            }
            // calculate collision point
            const distFromNearestToCollisionPoint = Math.sqrt(maxDistanceSqr - distanceNearestPointSqr);
            const collisionPointDist = start.subtract(projection).magnitude() - distFromNearestToCollisionPoint;
            const collisionPoint = start.add(direction.normalize().multiply(collisionPointDist));
            // calculate collision normal
            const normal = collisionPoint.subtract(pin.position).normalize();
            // const rrr = collisionPoint.subtract(pin.position).magnitude();
            // const www = start.subtract(pin.position).magnitude();
            // const vvv = start.subtract(pin.position).magnitude();
            // //if (Math.abs(rrr - radius - this.pinRadius) < 0.000000000001) {
            //     console.error("Error collision calc!", Math.abs(rrr - radius - this.pinRadius), Math.abs(www - radius - this.pinRadius), Math.abs(vvv - radius - this.pinRadius));
            // //}
            return { collisionPoint, normal };
        }
        return undefined;
    }
    draw(ctx) {
        for (const pin of this.pins) {
            pin.draw(ctx);
        }
    }
}
export default Pins;
//# sourceMappingURL=Pins.js.map
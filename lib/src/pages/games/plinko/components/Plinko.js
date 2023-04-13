import Rand from "rand-seed";
import * as React from "react";
import ReactResizeDetector from "react-resize-detector";
import { PLINKO_PAYOUT } from "@dicether/state-channel";
import PureCanvas from "../../reusable/PureCanvas";
import Ball from "./Ball";
import { startPositions } from "./lookupTables";
import PayoutTable from "./PayoutTable";
import Pins from "./Pins";
import Vector2 from "./Vector2";
import Style from "./Plinko.scss";
import DayColors from "./PlinkoDayColors.scss";
import NightColors from "./PlinkoNightColors.scss";
class Plinko extends React.Component {
    constructor(props) {
        super(props);
        this.ctx = null;
        this.parent = React.createRef();
        this.activeBalls = [];
        this.animationActive = false;
        this.ballAcceleration = new Vector2(0, 9.81);
        this.currentTime = 0;
        this.accumulator = 0;
        this.k = 0.5;
        this.stepsPerSecond = 120;
        this.speed = 0.75;
        this.addBall = (targetPos, resultNum) => {
            const startPos = startPositions[this.props.rows][targetPos][resultNum % 16];
            const promise = new Promise((resolve) => {
                this.activeBalls.push({
                    ball: new Ball(new Vector2(startPos, -1.1), this.ballRadius, DayColors.ballColor),
                    targetPos,
                    finishedCallBack: resolve,
                });
            });
            if (!this.animationActive) {
                this.animationActive = true;
                this.accumulator = 0;
                this.currentTime = Date.now();
                requestAnimationFrame(this.animation);
            }
            return promise;
        };
        this.renderToCanvas = () => {
            const ctx = this.ctx;
            if (ctx === null) {
                return;
            }
            const width = ctx.canvas.width;
            const height = ctx.canvas.height;
            ctx.clearRect(0, 0, width, height);
            ctx.save();
            ctx.scale(width / 2, height / 2);
            ctx.translate(1.0, 1.0);
            this.pins.draw(ctx);
            this.activeBalls.forEach((x) => x.ball.draw(ctx));
            ctx.restore();
        };
        this.simulate = () => {
            const from = -0.1;
            const to = 0.1;
            const steps = 5000;
            const range = to - from;
            const results = [...Array(this.props.rows + 1)].map((_) => []);
            const rand = new Rand("123456789");
            for (let i = 0; i < steps; i++) {
                const pos = Math.round(from + Math.round(rand.next() * range * 10000)) / 10000;
                const yPos = this.simulateBall(pos);
                if (yPos <= -1 || yPos >= 1) {
                    continue;
                }
                const resultPos = Math.floor(((yPos + 1) / 2) * (this.props.rows + 1));
                const resArray = results[resultPos];
                if (resArray.length >= 16) {
                    continue;
                }
                resArray.push(pos);
            }
            let resString = "";
            for (let pos = 0; pos < results.length; pos++) {
                resString += `${pos}: [${results[pos].join(", ")}],\n`;
            }
            console.log(resString);
        };
        this.simulateBall = (startPos) => {
            const ball = new Ball(new Vector2(startPos, -1.1), this.ballRadius, "white");
            const maxSteps = 100000;
            let steps = 0;
            while (ball.position.y < 1 && steps++ < maxSteps) {
                this.animateBall(ball, 1 / this.stepsPerSecond);
            }
            if (steps >= maxSteps) {
                return -1; // invalid
            }
            return ball.position.x;
        };
        this.animateBall = (ball, dt) => {
            const initialPos = ball.position;
            const initialV = ball.v;
            const newV = initialV.add(this.ballAcceleration.multiply(dt));
            const newPos = initialPos.add(newV.multiply(dt));
            const collisionInfo = this.pins.getCollisionPin(initialPos, newPos, ball.radius);
            if (collisionInfo === undefined) {
                ball.position = newPos;
                ball.v = newV;
                return;
            }
            const { collisionPoint, normal } = collisionInfo;
            const aM = this.ballAcceleration.magnitude();
            const vM = initialV.magnitude();
            const sM = collisionPoint.subtract(initialPos).magnitude();
            const collisionTime = (-vM + Math.sqrt(initialV.sqrMagnitude() + 4 * aM * sM)) / (2 * aM);
            const tLeft = dt - collisionTime;
            const vCollision = ball.v.add(this.ballAcceleration.multiply(collisionTime));
            // check collision
            // const colP = initialPos.add(vCollision.multiply(collisionTime));
            // const diff = colP.subtract(collisionPoint).magnitude();
            // if (diff > 0.00001) {
            //     console.warn("To high diff", diff);
            // }
            // calculate new v
            const tmp = normal.multiply(vCollision.dot(normal) * 2);
            const reflectedV = vCollision.subtract(tmp);
            const finalV = reflectedV.multiply(this.k);
            ball.v = finalV.add(this.ballAcceleration.multiply(tLeft));
            ball.position = collisionPoint.add(ball.v.multiply(tLeft));
        };
        this.animation = () => {
            const newTime = Date.now();
            const frameTime = newTime - this.currentTime;
            this.currentTime = newTime;
            this.accumulator += frameTime * this.speed;
            const dt = 1000 / this.stepsPerSecond;
            while (this.accumulator >= dt) {
                for (const { ball } of this.activeBalls) {
                    this.animateBall(ball, 1 / this.stepsPerSecond);
                }
                this.accumulator -= dt;
            }
            const finishedBalls = this.activeBalls.filter((ballData) => ballData.ball.position.y >= 1);
            this.activeBalls = this.activeBalls.filter((ballData) => ballData.ball.position.y < 1);
            this.renderToCanvas();
            if (this.activeBalls.length > 0) {
                requestAnimationFrame(this.animation);
            }
            for (const ballData of finishedBalls) {
                ballData.finishedCallBack();
            }
            if (this.activeBalls.length === 0) {
                this.animationActive = false;
            }
        };
        this.saveContext = (ctx) => {
            this.ctx = ctx;
        };
        this.onResize = (width) => {
            if (width === undefined)
                return;
            this.setState({
                size: width,
            });
            this.renderToCanvas();
        };
        const { rows, nightMode } = this.props;
        this.pins = new Pins(rows, nightMode ? NightColors.pinColor : DayColors.pinColor);
        this.ballRadius = (0.02 * 16) / rows;
        this.state = {
            size: 500,
        };
    }
    componentDidMount() {
        this.renderToCanvas();
    }
    componentDidUpdate() {
        const { rows, nightMode } = this.props;
        this.pins = new Pins(rows, nightMode ? NightColors.pinColor : DayColors.pinColor);
        this.ballRadius = (0.02 * 16) / rows;
        this.renderToCanvas();
    }
    render() {
        const { size } = this.state;
        const { rows, resultColumn, risk, showResult } = this.props;
        const payout = PLINKO_PAYOUT[risk][rows];
        // TODO: Split in plinko and grid !!!
        return (React.createElement("div", { className: Style.wrapper },
            React.createElement("div", { className: Style.plinkoGrid },
                React.createElement("div", { ref: this.parent, className: Style.plinko },
                    React.createElement(ReactResizeDetector, { handleWidth: true, handleHeight: true, onResize: this.onResize }),
                    React.createElement(PureCanvas, { width: size, height: size, contextRef: this.saveContext }),
                    React.createElement(PayoutTable, { payout: payout, showResult: showResult, resultColumn: resultColumn })))));
    }
}
export default Plinko;
//# sourceMappingURL=Plinko.js.map
import Visualizer from './Visualizer.js';
import {TAU} from '../settings.js';

export default class CircularBarVisualizer extends Visualizer {
  constructor(options) {
    super(options);

    this.length = TAU * options.radius;
  }

  setSize() {
    super.setSize();

    const {ctx, center} = this;

    ctx.translate(center.x, center.y);
    ctx.rotate(Math.PI / 2);

    return this;
  }

  drawFrame(frequencyData) {
    const sixth = Math.floor(frequencyData.length / 6);
    const len = Math.floor(sixth * 5);
    const {ctx, options: {drawEveryNthBar, radius}} = this;
    const arcPortion = this.length / len;

    this.clear();

    return this.drawIsolated(() => {
      for (let i = 0; i <= len; i++) {
        if (i % drawEveryNthBar) continue;

        const bucket = frequencyData[i];

        this.drawIsolated(() => {
          const arcLength = i * arcPortion;
          const rotateBy = arcLength / radius;
          const lineLength = Math.ceil(Math.pow(bucket, 2) / 512);

          ctx.rotate(rotateBy);

          this.drawBar(lineLength);
          this.drawShadow(lineLength * 0.5);
        });
      }
    });
  }

  drawBar(lineLength) {
    const {ctx, options: {radius, lineWidth}} = this;

    ctx.beginPath();
    ctx.rect(radius - lineLength / 2, 0, lineLength, lineWidth);
    ctx.fill();
  }

  drawShadow(lineLength) {
    const {ctx, options: {radius, lineWidth}} = this;

    this.drawIsolated(() => {
      ctx.beginPath();
      ctx.rect(radius - lineLength / 2, 0, lineLength, lineWidth);
      ctx.fill();
    });
  }
}

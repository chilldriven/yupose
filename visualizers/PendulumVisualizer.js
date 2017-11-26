import Visualizer from './Visualizer.js';
import {MAX_FREQ, TAU} from '../settings.js';

export default class PendulumVisualizer extends Visualizer {
  constructor(options) {
    super(options);
    this.iteration = 0;
    this.options.velocity = this.options.velocity || 0.5;
  }

  getCurrentIteration(i) {
    this.iteration += this.options.velocity;
    const {options: {drawEveryNthBar}} = this;
    return this.iteration * (i % (drawEveryNthBar * 2) ? 1 : -1);
  }

  drawFrame(frequencyData) {
    const {ctx, center, options: {drawEveryNthBar, fill}} = this;

    this.clear();

    const quarter = frequencyData.length / 4;
    const len = quarter * 3;

    for (let i = quarter; i <= len; i++) {
      if (i % drawEveryNthBar) continue;
      const bucket = frequencyData[i] || 0;
      const fraction = bucket / MAX_FREQ;
      const offset = bucket ? this.getCurrentIteration(i) : i;
      ctx.beginPath();

      // blueish
      // const color = `hsla(${i % 90 + 180}, 100%, 50%, ${1 * fraction})`;
      // reddish
      const color = `hsla(${i + 180 % 240}, 100%, 50%, ${i / 10000 +
        2 * fraction})`;

      this.applyOptions({
        fillStyle: color,
        strokeStyle: color,
      });

      const arcLength = TAU * (i / len);

      ctx.arc(center.x, center.y, i, offset, arcLength + offset);

      if (fill) {
        ctx.fill();
      } else {
        ctx.stroke();
      }
    }
  }
}

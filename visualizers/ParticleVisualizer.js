import Visualizer from './Visualizer.js';
import {MAX_FREQ, TAU} from '../settings.js';

export default class ParticleVisualizer extends Visualizer {
  constructor(options) {
    super(options);
    this.particles = new Map();
  }

  drawFrame(frequencyData) {
    const sixth = Math.floor(frequencyData.length / 6);
    const len = Math.floor(sixth * 5);
    const {ctx, options: {drawEveryNthBar, lineWidth}} = this;

    this.clear();

    this.drawIsolated(() => {
      for (let i = 0; i <= len; i++) {
        if (i % drawEveryNthBar) continue;
        const bucket = frequencyData[i] || 0;
        const fraction = bucket / MAX_FREQ;

        // const color = `hsla(${i}, 100%, 50%, ${0.1 + 2 * fraction})`;
        const color = `hsla(${i + 180 % 240}, 100%, 50%, ${i / 10000 +
          2 * fraction})`;

        this.applyOptions({
          fillStyle: color,
          strokeStyle: color,
        });

        const {positionX, positionY} =
          this.particles.get(i) ||
          this.particles.set(i, this.computeParticle()).get(i);

        const radius = lineWidth;

        this.drawIsolated(() => {
          ctx.beginPath();
          ctx.arc(positionX, positionY, radius, 0, TAU);
          ctx.fill();
        });
      }
    });
  }

  computeParticle() {
    const {canvas} = this;
    const positionX = Math.random() * canvas.width;
    const positionY = Math.random() * canvas.height;

    return {
      positionX,
      positionY,
    };
  }
}

import Visualizer from './Visualizer.js';
import {MAX_FREQ} from '../settings.js';

export default class ParticleVisualizer extends Visualizer {
  constructor(options) {
    super(options);
    this.particles = [];
  }

  drawFrame(frequencyData) {
    const quarter = Math.floor(frequencyData.length / 4);
    const len = Math.floor(quarter * 3);
    const {center, canvas, ctx, options: {drawEveryNthBar, orientation}} = this;

    this.clear();

    this.drawIsolated(() => {
      for (let i = 0; i <= len; i++) {
        if (i % drawEveryNthBar) continue;

        const bucket = frequencyData[i];
        const fraction = bucket / MAX_FREQ;
        const color = `hsla(${i}, 100%, 50%, ${1 * fraction})`;

        this.applyOptions({
          fillStyle: color,
          strokeStyle: color,
        });

        this.drawIsolated(() => {
          ctx.beginPath();

          if (orientation === 'vertical') {
            const offsetY = i * canvas.height / len;
            const lineLength = Math.floor(fraction * canvas.width);

            ctx.moveTo(center.x, offsetY);
            ctx.lineTo(center.x - lineLength, offsetY);
            ctx.lineTo(center.x + lineLength, offsetY);
          } else {
            const offsetX = i * canvas.width / len;
            const lineLength = Math.floor(
              Math.pow(fraction * canvas.height, 2) / 200,
            );

            ctx.moveTo(offsetX, center.y);
            ctx.lineTo(offsetX, center.y - lineLength);
            ctx.lineTo(offsetX, center.y + lineLength);
          }

          ctx.stroke();
          ctx.closePath();
        });
      }
    });
  }
}

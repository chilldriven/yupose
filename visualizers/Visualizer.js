export default class Visualizer {
  constructor(options = {}) {
    const canvas = (this.canvas = document.createElement('canvas'));
    document.body.appendChild(canvas);

    this.ctx = canvas.getContext('2d');
    this.options = {
      lineWidth: 2,
      shadowBlur: 16,
      shadowColor: '#fff',
      lineJoin: 'miter',
      lineCap: 'miter',
      strokeStyle: '#fff',
      fillStyle: '#fff',
      offsetX: 0,
      offsetY: 0,
      ...options,
    };

    this.setSize();
  }

  setSize() {
    const {canvas} = this;
    canvas.width = window.innerWidth || 0;
    canvas.height = window.innerHeight || 0;

    this.center = {
      x: canvas.width / 2,
      y: canvas.height / 2,
    };

    return this;
  }

  applyOptions(partial = {}) {
    this.options = {
      ...this.options,
      ...partial,
    };

    const {
      lineWidth,
      shadowBlur,
      lineJoin,
      shadowColor,
      lineCap,
      strokeStyle,
      fillStyle,
      font,
      textAlign,
    } = this.options;

    Object.assign(this.ctx, {
      lineWidth,
      shadowBlur,
      lineJoin,
      shadowColor,
      lineCap,
      strokeStyle,
      textAlign,
      fillStyle,
      font,
    });

    return this;
  }

  update(frequencyData, timeDomainData) {
    this.applyOptions(this.options);
    this.drawFrame(frequencyData, timeDomainData);
    return this;
  }

  drawFrame() {}

  clear() {
    const {ctx, canvas} = this;

    return this.drawIsolated(() => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
  }

  drawIsolated(fn) {
    const {ctx} = this;
    ctx.save();
    fn();
    ctx.restore();

    return this;
  }

  transformBucket(bucket) {
    return bucket;
  }
}

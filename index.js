import Track from './Track.js';

import SpectrumVisualizer from './visualizers/SpectrumVisualizer.js';
import CircularBarVisualizer from './visualizers/CircularBarVisualizer.js';
import ParticleVisualizer from './visualizers/ParticleVisualizer.js';
import PendulumVisualizer from './visualizers/PendulumVisualizer.js';

async function run() {
  const track = new Track(`/audio/Pieces.mp3`, {
    name: 'Pieces',
    author: 'La Cataline',
  });

  const visualizers = [
    new PendulumVisualizer({
      lineJoin: 'round',
      lineCap: 'butt',
      lineWidth: 2,
      drawEveryNthBar: 16,
      shadowBlur: 5,
      velocity: 0.001,
    }),
    new CircularBarVisualizer({
      lineWidth: 3,
      drawEveryNthBar: 4,
      withCircle: false,
      lineCap: 'round',
      radius: 300,
      // fillStyle: 'rgba(100,200,300,0.6)',
      fillStyle: 'rgba(222,200,200,0.6)',
    }),
    // new SpectrumVisualizer(),
    new ParticleVisualizer({
      drawEveryNthBar: 4,
      lineWidth: 4,
      velocity: 0.001,
    }),
  ];

  const renderFrame = () => {
    requestAnimationFrame(renderFrame);

    for (const visualization of visualizers) {
      visualization.update(track.getByteFrequencyData());
    }
  };

  renderFrame();
}

run();

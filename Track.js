import {FFT_SIZE} from './settings.js';

export default class Track {
  constructor(src, {name, author}) {
    this.author = author;
    this.name = name;
    this.audio = new Audio(src);
    this.audio.controls = true;
    this.audio.type = 'audio/mp3';

    setTimeout(() => this.audio.play(), 10000);

    window.credentials.innerHTML = `
      <h1 class="credentials__row credentials__name">${name}</h1>
      <h2 class="credentials__row credentials__author">${author}</h2>
    `;

    this.context = new AudioContext();
    this.analyser = this.context.createAnalyser();
    this.source = this.context.createMediaElementSource(this.audio);
    this.source.connect(this.analyser);
    this.source.connect(this.context.destination);

    this.analyser.fftSize = FFT_SIZE;
  }

  getByteFrequencyData() {
    const data = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(data);

    return data;
  }
}

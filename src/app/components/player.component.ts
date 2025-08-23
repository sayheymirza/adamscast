import { isPlatformServer } from '@angular/common';
import { Component, ElementRef, inject, Input, PLATFORM_ID, viewChild } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-player',
  imports: [],
  template: `
    <div class="flex flex-nowrap items-center gap-2 h-16 px-2">
      <button
        (click)="toggle()"
        class="w-10 h-10 cursor-pointer bg-black/10 flex items-center justify-center transition-all hover:bg-black hover:fill-white active:scale-90"
      >
        @if (playing) {
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z"/></svg>
        } @else {
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M320-200v-560l440 280-440 280Z"/></svg>
        }
      </button>

      <div class="w-full flex-1 grow" #wavesufer></div>
    </div>

    <nav class="flex flex-nowrap items-center gap-2 p-2 border-t bg-black/10 transition-all">
        <button
          (click)="replay5()"
          class="cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440h80q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440q0-117-81.5-198.5T480-720h-6l62 62-56 58-160-160 160-160 56 58-62 62h6q75 0 140.5 28.5t114 77q48.5 48.5 77 114T840-440q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80ZM380-320v-60h120v-40H380v-140h180v60H440v40h80q17 0 28.5 11.5T560-420v60q0 17-11.5 28.5T520-320H380Z"/></svg>
        </button>

        <button
          (click)="forward5()"
          class="cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M480-80q-75 0-140.5-28.5t-114-77q-48.5-48.5-77-114T120-440q0-75 28.5-140.5t77-114q48.5-48.5 114-77T480-800h6l-62-62 56-58 160 160-160 160-56-58 62-62h-6q-117 0-198.5 81.5T200-440q0 117 81.5 198.5T480-160q117 0 198.5-81.5T760-440h80q0 75-28.5 140.5t-77 114q-48.5 48.5-114 77T480-80ZM380-320v-60h120v-40H380v-140h180v60H440v40h80q17 0 28.5 11.5T560-420v60q0 17-11.5 28.5T520-320H380Z"/></svg>
        </button>

      <div class="flex-1"></div>

      <span class="text-sm opacity-70">
        {{ formatTime(current) }} / {{ formatTime(total) }}
      </span>
    </nav>
  `,
  host: {
    class: 'flex flex-col border transition-all hidden',
    dir: 'ltr',
  },
  styles: [`
    :host.male {
      border-color: #2563eb; /* blue-900 */
    }

    :host.male nav {
      border-color: #2563eb;
      color: #2563eb;
      background-color: #eff6ff; /* blue-50 */
      fill: #2563eb;
    }

    :host.male div button {
      background-color: #2563eb; /* blue-900 */
      fill: #ffffff;
    }

    :host.female {
      border-color: #db2777; /* purple-500 */
    }

    :host.female nav {
      border-color: #db2777;
      color: #db2777;
      background-color: #fdf2f8; /* purple-50 */
      fill: #db2777;
    }

    :host.female div button {
      background-color: #db2777; /* purple-900 */
      fill: #ffffff;
    }
  `]
})
export class PlayerComponent {
  private wavesurferElem = viewChild<ElementRef<HTMLDivElement>>('wavesufer');
  private platformId = inject(PLATFORM_ID);

  private wavesurfer: WaveSurfer | null = null;

  private speakersObject: ISpeakerObject[] = [];

  private _episode: number = 0;

  @Input()
  public set episode(value: number) {
    this._episode = value;

    this.init(value);
  }

  @Input()
  public reload: boolean = false;

  @Input()
  public lazy: boolean = false;

  public get host(): HTMLElement | null {
    if (isPlatformServer(this.platformId)) {
      return null;
    }

    const elem = this.wavesurferElem();
    if (elem) {
      return elem.nativeElement.parentElement?.parentElement || null;
    }
    return null;
  }

  public get playing(): boolean {
    return this.wavesurfer ? this.wavesurfer.isPlaying() : false;
  }

  public get total(): number {
    return this.wavesurfer ? this.wavesurfer.getDuration() : 0;
  }

  public get current(): number {
    return this.wavesurfer ? this.wavesurfer.getCurrentTime() : 0;
  }

  ngAfterViewInit() {
    if (isPlatformServer(this.platformId)) return;
  }

  public formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }

  public play() {
    if (this.wavesurfer) {
      this.wavesurfer.play();
    }
  }

  public pause() {
    if (this.wavesurfer) {
      this.wavesurfer.pause();
      this.changeHostGender();
    }
  }

  public toggle() {
    if (this.wavesurfer) {
      if (this.wavesurfer.isPlaying()) {
        this.pause();
      } else {
        this.play();
      }
    }
  }

  public replay5() {
    if (this.wavesurfer) {
      const currentTime = this.wavesurfer.getCurrentTime();
      const newTime = Math.max(0, currentTime - 5);
      this.wavesurfer.seekTo(newTime / this.wavesurfer.getDuration());
    }
  }

  public forward5() {
    if (this.wavesurfer) {
      const currentTime = this.wavesurfer.getCurrentTime();
      const newTime = Math.min(this.wavesurfer.getDuration(), currentTime + 5);
      this.wavesurfer.seekTo(newTime / this.wavesurfer.getDuration());
    }
  }

  private async init(episode: number) {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    const url = `${window.location.origin}/episodes/${episode}`;

    const [_, peaks] = await Promise.all([
      this.initSpeakers(`${url}/speakers.json`),
      this.initPeaks(`${url}/wavesurfer.json`),
    ]);

    await this.initWaveSurfer(`${url}/audio.m4a`, peaks);
  }

  private async initSpeakers(url: string) {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    try {
      const response = await fetch(url);
      const json = await response.json();

      this.speakersObject = json;
    } catch (error) {
      console.error(error);
      this.speakersObject = [];
    }
  }

  private async initPeaks(url: string): Promise<number[][] | undefined> {
    try {
      if (isPlatformServer(this.platformId)) {
        return undefined;
      }

      const response = await fetch(url);

      if (response.status.toString().startsWith('20')) {
        const json = await response.json();
        return json;
      }

      return undefined;
    } catch (error) {
      return undefined;
    }
  }

  private async initWaveSurfer(url: string, peaks?: number[][]) {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    if (this.wavesurfer) {
      this.wavesurfer.destroy();
    }

    const wavesurferElem = this.wavesurferElem();

    if (!wavesurferElem) {
      console.error('Wavesurfer element not found');
      return;
    }

    if (this.lazy) {
      this.host!.classList.remove('hidden');
    }

    this.wavesurfer = WaveSurfer.create({
      container: wavesurferElem.nativeElement,
      waveColor: '#DFD7C3',
      progressColor: '#000000',
      cursorColor: 'navy',
      barWidth: 2,
      height: 40,
      width: "auto",
      backend: 'MediaElement',
      peaks: peaks,
    });

    this.wavesurfer.on('ready', () => {
      this.host!.classList.remove('hidden');
    });

    // on current time change
    this.wavesurfer.on('audioprocess', () => {
      const currentTime = parseFloat(this.wavesurfer!.getCurrentTime().toFixed(2));
      const speaker = this.speakersObject.find(s => s.start_time <= currentTime && s.end_time >= currentTime);

      if (speaker && this.playing) {
        this.changeHostGender(speaker.speaker_id);
      } else {
        this.changeHostGender();
      }
    });

    await this.wavesurfer.load(url, peaks);

    const blob = new Blob([JSON.stringify(this.wavesurfer.exportPeaks())], { type: 'application/json' });
    const blobUrl = URL.createObjectURL(blob);

    console.log(`Wavesurfer exported as blob:`, blobUrl);
  }

  private changeHostGender(gender?: 'male' | 'female') {
    const host = this.host;

    if (host && gender && !host.classList.contains(gender)) {
      host.classList.remove('male', 'female');

      if (gender) {
        host.classList.add(gender);
      }

      if (gender == 'male') {
        this.wavesurfer!.setOptions({
          progressColor: '#2563eb', // blue-900
          cursorColor: '#2563eb', // blue-900
        })
      }

      if (gender == 'female') {
        this.wavesurfer!.setOptions({
          progressColor: '#db2777', // purple-900
          cursorColor: '#db2777', // purple-900
        })
      }
    }

    if (host && !gender) {
      host.classList.remove('male');
      host.classList.remove('female');

      this.wavesurfer!.setOptions({
        progressColor: '#000000', // default color
        cursorColor: 'navy', // default color
      });
    }
  }
}

interface ISpeakerObject {
  "speaker_id": 'male' | 'female'
  "start_time": number
  "end_time": number
  "duration_ms": number
}
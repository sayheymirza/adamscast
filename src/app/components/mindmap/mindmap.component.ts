import { Component, effect, inject, input, PLATFORM_ID } from '@angular/core';
import { IMindmapNode } from '../../services/episodes.service';
import getRender from './mindmap.script';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-mindmap',
  imports: [],
  template: `
    <div class="w-full h-full" id="mindmap"></div>
  `,
  host: {
    class: 'block'
  }
})
export class MindmapComponent {
  public nodes = input.required<IMindmapNode>();
  private platform = inject(PLATFORM_ID);

  constructor() {
    effect(() => {
      if (this.nodes()) {
        this.render();
      }
    });
  }

  private render() {
    if (isPlatformBrowser(this.platform)) {
      const container = document.getElementById('mindmap')!;
      const render = getRender(container);
      render(this.nodes());
    }
  }
}

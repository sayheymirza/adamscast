import { Component, effect, input } from '@angular/core';
import { IMindmapNode } from '../../services/episodes.service';
import getRender from './mindmap.script';

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

  constructor() {
    effect(() => {
      if (this.nodes()) {
        this.render();
      }
    });
  }

  private render() {
    setTimeout(() => {
      const container = document.getElementById('mindmap')!;
      const render = getRender(container);
      render(this.nodes());
    }, 1000);
  }
}

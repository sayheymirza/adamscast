import { tree as createTree, hierarchy, HierarchyNode } from 'd3-hierarchy';
import { scaleOrdinal } from 'd3-scale';
import { select } from 'd3-selection';
import 'd3-transition';

interface MindMapData {
    name: string;
    children?: MindMapData[];
}

interface Options {
    colorSet?: string[];
}

interface Axis {
    x: number;
    y: number;
}

type MNode = HierarchyNode<MindMapData> & {
    x0: number;
    y0: number;
    x: number;
    y: number;
};

function diagonal(s: Axis, d: Axis) {
    return `M ${s.y} ${s.x}
    C ${(s.y + d.y) / 2} ${s.x},
      ${(s.y + d.y) / 2} ${d.x},
      ${d.y} ${d.x}`;
}

export default function getRender(container: HTMLElement, options: Options = {}) {

    // init options
    const colorSet = options.colorSet || ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];

    // Clear any existing content and init the svg and tree
    select(container).selectAll('*').remove();
    const svg = select(container).append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .style('overflow', 'scroll')
    const svgGroup = svg.append('g');

    const height = container.clientHeight;
    const width = container.clientWidth;
    // Reserve 40% of height for bottom spacing and use 60% for tree (more dramatic change)
    const treeHeight = height * 1.5;

    svg.attr('height', `${treeHeight + 100}px`);

    const tree = createTree<MindMapData>().size([treeHeight + 100, width]);

    const color = scaleOrdinal(colorSet);
    let root: MNode | undefined;

    // update function
    function update(source: MNode) {
        if (!root) {
            return;
        }
        const treeData = tree(root);
        const nodes = treeData.descendants();
        const links = treeData.links();

        nodes.forEach((d: any) => {
            // RTL layout: reverse the horizontal positioning
            d.y = (width - (d.depth * 180)) / 2; // Start from right and move left
            // Position tree in the upper portion with proper spacing
            d.x = (d.x + (height - treeHeight) / 2) + 50; // Add 75px top margin
        });

        let i = 0;
        const node: any = svgGroup.selectAll('.node')
            .data(nodes, (d: any) => d.id || (d.id = ++i))

        const nodeEnter = node.enter()
            .append('g')
            .attr('class', 'node')
            .attr('transform', (d: any) => `translate(${source.y0}, ${source.x0})`);

        nodeEnter.append('text')
            .attr('dy', 3)
            .style('font-weight', 'bold')
            .style('font-size', '12px')
            .style('font-family', 'Croissant')
            .text((d: any) => d.data.name);

        const nodeUpdate = nodeEnter.merge(node);

        nodeUpdate.transition()
            .attr('transform', (d: any) => `translate(${d.y}, ${d.x})`);

        nodeUpdate.select('circle')
            .attr('r', 4.5)
            .style('fill', (d: any) => color(d.depth));

        nodeUpdate.select('text')
            .attr('dx', (d: any) => d.children ? 15 : -15) // RTL: flip text positioning, increased offset
            .attr('dy', 3)
            .style('text-anchor', (d: any) => d.children ? 'end' : 'start') // RTL: flip text anchoring
            .text((d: any) => d.data.name);

        const nodeExit = node.exit()
            .transition()
            .attr('transform', (d: any) => `translate(${source.y}, ${source.x})`)
            .remove();

        nodeExit.select('circle')
            .attr('r', 1e-6);

        nodeExit.select('text')
            .style('fill-opacity', 1e-6);

        const link: any = svgGroup.selectAll('.link')
            .data(links, (d: any) => d.target.id);


        const linkEnter = link.enter().insert('path', 'g')
            .attr('class', 'link')
            .attr('d', () => {
                const o = { x: source.x0, y: source.y0 };
                return diagonal(o, o);
            })
            .style('fill', 'none')
            .style('stroke', '#ccc')
            .style('stroke-width', '1.5px');

        const linkUpdate = linkEnter.merge(link);

        linkUpdate.transition()
            .attr('d', (d: any) => diagonal(d.source, d.target));

        link.exit().transition()
            .attr('d', () => {
                const o = { x: source.x, y: source.y };
                return diagonal(o, o);
            })
            .remove();

        nodes.forEach((d: any) => {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    return function (data: MindMapData) {
        root = hierarchy(data) as MNode;
        // Position root node in the center-left with proper vertical centering
        root.x0 = height / 2; // Position at 40% of height for better centering
        root.y0 = width / 2;
        update(root);
        return {
            root,
            svg,
            svgGroup,
        };
    }
}
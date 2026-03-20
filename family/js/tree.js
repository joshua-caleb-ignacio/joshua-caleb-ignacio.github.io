import { $, bino, LeftyTreeLayout } from './chart.js';
import { TreeNode } from './tree/node.js';
import { TreeBranch } from './tree/link.js';
import { TreeModel } from './tree/model.js';
import { CouplePointNode } from './tree/couple_point.js';

// The central person in this family tree (Ira Mae Ignacio)
const MAIN_KEY = "G29T-1TB";

const calculateScale = () => {
  // Needs to be updated if the tree extends horizontally or vertically
  // this would include updating node widths, adding a new generation,
  // adding a detail to a node causing it to increase in height
  const tw = 3045;
  const th = 1678;
  const tree_ratio = tw / th;

  // Desired width based on Photoshop check. Includes Lolo Eusebio's gen
  const dw = 1842;
  const dh = 983;

  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  const view_ratio = vw / vh;

  return Math.min(0.81, Math.max((vh / dh), (vw / dw), (vw / tw), (vh / th)));
}

let tree = $(
  bino.Diagram,
  "tree",
  {
    isReadOnly: true,
    padding: 40,
    scale: calculateScale(),
    layout: $(
      LeftyTreeLayout, {
        // All nodes go in the same direction (ancestors branch upward/left)
        directionFunction: (node) => true,
        bottomRightOptions: { layerSpacing: 36, nodeSpacing: 9 },
        topLeftOptions:     { layerSpacing: 36, nodeSpacing: 9 },
      }
    ),
    hasHorizontalScrollbar: false,
    hasVerticalScrollbar: false,
    allowHorizontalScroll: true,
    allowSelect: false,
    allowVerticalScroll: true,
    allowZoom: true,
  }
);

tree.nodeTemplate = TreeNode();
tree.nodeTemplateMap.add("point", CouplePointNode());
tree.linkTemplate = TreeBranch();
tree.model = TreeModel();

// Make sure the family tree focuses on Ira Mae when layout completes
tree.addDiagramListener("InitialLayoutCompleted", (e) => {
  let mainNode = tree.findNodeForKey(MAIN_KEY);
  if (mainNode !== null) {
    // Check if mobile device (small screen)
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const isMobile = vw <= 768;

    if (isMobile) {
      const photoWidth = 95.5;
      const photoHeight = mainNode.data.height || 95.5;

      const nodePos = mainNode.actualBounds.position;
      const photoBounds = new bino.Rect(
        nodePos.x,
        nodePos.y,
        photoWidth,
        photoHeight
      );

      const targetScreenPercentage = 0.4;
      const scaleByWidth = (vw * targetScreenPercentage) / photoWidth;
      const scaleByHeight = (vh * targetScreenPercentage) / photoHeight;
      const targetScale = Math.min(scaleByWidth, scaleByHeight);

      tree.scale = targetScale;
      tree.centerRect(photoBounds);
    } else {
      tree.centerRect(mainNode.actualBounds);
    }
  }
});

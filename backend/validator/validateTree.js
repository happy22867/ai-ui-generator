const ALLOWED_COMPONENTS = [
  "Navbar",
  "Sidebar",
  "Card",
  "Button",
  "Input",
  "Table",
  "Modal",
  "Chart",
];

function validateTree(tree = []) {
  return tree
    .filter(
      (node) =>
        node &&
        typeof node === "object" &&
        ALLOWED_COMPONENTS.includes(node.type)
    )
    .map((node) => ({
      type: node.type,
      props: node.props || {},
    }));
}

module.exports = { validateTree, ALLOWED_COMPONENTS };

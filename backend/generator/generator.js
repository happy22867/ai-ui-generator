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

function withDefaultProps(component) {
  const defaults = {
    Modal: { title: "Modal", description: "Details" },
    Card: { title: "Card", content: "Content" },
    Button: { label: "Click" },
    Input: { label: "Input", placeholder: "Enter value" },
    Table: { columns: ["Column"], data: [] },
    Chart: { title: "Chart" },
    Navbar: { title: "App" },
    Sidebar: { items: ["Home"] },
  };

  return {
    type: component.type,
    props: {
      ...defaults[component.type],
      ...component.props,
    },
  };
}

/**
 * Generate UI tree
 * plan: AI response { components: [...] }
 * previousTree: current UI tree
 * mode: "fresh" | "add" | "remove" | "replace"
 * message: user input text
 */
function generateUI(plan, previousTree = [], mode = "replace", message = "") {
  console.log(mode);
  console.log(plan);
  let baseTree;

   
  // 1️⃣ Fresh → start empty
  if (mode === "fresh") {
    baseTree = [];
  } else {
    // add/remove/replace → start with previous tree
    baseTree = [...previousTree];
  }

  // 2️⃣ Check if message wants to remove something
  let componentToRemove;
  if (mode === "remove") {
    const match = message.match(/(?:remove|delete)\s+(\w+)/i);
    componentToRemove = match?.[1]?.toLowerCase();
  }

  // 3️⃣ Add components from AI plan
  if (Array.isArray(plan.components)) {
    plan.components.forEach(c => {
      if (!ALLOWED_COMPONENTS.includes(c.type)) return;

      // Skip if this component should be removed
      if (componentToRemove && c.type.toLowerCase() === componentToRemove) return;

      const component = withDefaultProps(c);

      if (mode === "add") {
        // add only if not already in baseTree
        const exists = baseTree.some(node => node.type === component.type);
        if (!exists) baseTree.push(component);
      } else if (mode === "fresh" || mode === "replace") {
        baseTree.push(component);
      }
    });
  }

  // 4️⃣ Remove from existing tree if needed
  if (componentToRemove) {
    baseTree = baseTree.filter(node => node.type.toLowerCase() !== componentToRemove);
  }
  console.log("Generated Tree:", JSON.stringify(baseTree, null, 2));

  return baseTree;
}

module.exports = { generateUI, ALLOWED_COMPONENTS };

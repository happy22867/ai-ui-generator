function explainChange(message, tree, previousTree = []) {
  const newComponents = tree.filter(
    (c) =>
      !previousTree.some(
        (p) =>
          p.type === c.type &&
          JSON.stringify(p.props) === JSON.stringify(c.props)
      )
  );

  const removedComponents = previousTree.filter(
    (p) =>
      !tree.some(
        (c) =>
          c.type === p.type &&
          JSON.stringify(c.props) === JSON.stringify(p.props)
      )
  );

  let explanation = `💡 User Request: "${message}"\n\n`;

  // Explain new components
  if (newComponents.length > 0) {
    explanation += "🟢 Components Added:\n";
    newComponents.forEach((c) => {
      explanation += `- ${c.type} added because the user requested it.\n`;

      // Explain placement and props
      switch (c.type) {
        case "Navbar":
          explanation += `  • Placed at the top for primary navigation.\n`;
          explanation += `  • Props: ${JSON.stringify(c.props)}\n`;
          break;
        case "Sidebar":
          explanation += `  • Placed on the left side for secondary links or actions.\n`;
          explanation += `  • Props: ${JSON.stringify(c.props)}\n`;
          break;
        case "Card":
          explanation += `  • Used to group related content in the main area.\n`;
          explanation += `  • Props: ${JSON.stringify(c.props)}\n`;
          break;
        case "Modal":
          explanation += `  • Will appear as a popup when triggered.\n`;
          explanation += `  • Props: ${JSON.stringify(c.props)}\n`;
          break;
        case "Button":
          explanation += `  • Added as a clickable action.\n`;
          explanation += `  • Props: ${JSON.stringify(c.props)}\n`;
          break;
        case "Input":
          explanation += `  • Used for user input forms.\n`;
          explanation += `  • Props: ${JSON.stringify(c.props)}\n`;
          break;
        case "Table":
          explanation += `  • Displays structured data.\n`;
          explanation += `  • Props: ${JSON.stringify(c.props)}\n`;
          break;
        case "Chart":
          explanation += `  • Visualizes data trends.\n`;
          explanation += `  • Props: ${JSON.stringify(c.props)}\n`;
          break;
        default:
          explanation += `  • Props: ${JSON.stringify(c.props)}\n`;
      }
    });
  }

  // Explain removed components
  if (removedComponents.length > 0) {
    explanation += "\n🔴 Components Removed:\n";
    removedComponents.forEach((c) => {
      explanation += `- ${c.type} removed as per user instruction.\n`;
    });
  }

  // Explain layout context
  explanation += "\n📐 Layout Summary:\n";
  if (tree.find((c) => c.type === "Navbar")) {
    explanation += "- Navbar is present at the top for main navigation.\n";
  }
  if (tree.find((c) => c.type === "Sidebar")) {
    explanation += "- Sidebar is on the left for secondary actions or links.\n";
  }
  if (tree.find((c) => c.type === "Modal")) {
    explanation += "- Modals will popup for forms or alerts.\n";
  }
  if (tree.find((c) => c.type === "Card")) {
    explanation += "- Cards are used to group related information in the main content.\n";
  }

  // Prompt separation
  explanation += `\n🔄 Action Type: ${
    /create|generate|build|new ui/i.test(message)
      ? "Fresh UI created"
      : /add|append/i.test(message)
      ? "Incremental addition"
      : /remove|delete/i.test(message)
      ? "Component removal"
      : "UI modification"
  }\n`;

  return explanation;
}

module.exports = { explainChange };

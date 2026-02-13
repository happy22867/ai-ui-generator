// Build prompt for AI to plan UI components
function buildPlannerPrompt(message, previousTree, mode) {
  const existing = previousTree.map(c => c.type).join(", ") || "none";
  
  let prompt = `You are a UI planner that returns JSON only.

Available components:
- Navbar with props: title
- Sidebar with props: items (array)
- Card with props: title, content  
- Button with props: label
- Input with props: placeholder
- Table with props: headers (array), rows (2D array)
- Modal with props: title, content
- Chart with props: title, data (array of numbers)

Rules:
- Return valid JSON only
- No markdown, no explanations
- Use exact component names
- Include all required props
`;

  if (mode === "fresh") {
    prompt += `\nCreate new UI from scratch based on user request.`;
  } else if (mode === "add") {
    prompt += `\nExisting UI has: ${existing}
Add only NEW components. Don't duplicate existing types.`;
  } else if (mode === "remove") {
    prompt += `\nReturn empty components array: { "components": [] }`;
  } else {
    prompt += `\nModify current UI. Existing: ${existing}`;
  }

  prompt += `\n\nUser: "${message}"

Return format:
{
  "components": [
    { "type": "Card", "props": { "title": "...", "content": "..." } }
  ]
}`;

  return prompt;
}

module.exports = { buildPlannerPrompt };
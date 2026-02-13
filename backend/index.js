require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { buildPlannerPrompt } = require("./planner/aiPlanner");
const { callLLM } = require("./ai/llmClient");
const { explainChange } = require("./explainer/explainer");
const { validateTree } = require("./validator/validateTree");
const { generateUI } = require("./generator/generator");
const { saveVersion, getAllVersions, getVersion, deleteVersion } = require("./store/versionStore");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate-ui", async (req, res) => {
  try {
    const { message, previousTree = [], mode } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: "Message required" });
    }

    // Validate that message contains a valid component name
    const validComponents = ["navbar", "sidebar", "card", "modal", "button", "input", "table", "chart"];
    const messageLower = message.toLowerCase();
    const messageHasValidComponent = validComponents.some(comp => 
      messageLower.includes(comp)
    );

    console.log("Message:", message);
    console.log("Message lowercase:", messageLower);
    console.log("Has valid component:", messageHasValidComponent);

    if (!messageHasValidComponent) {
      console.log("Validation failed - returning toast");
      return res.json({ 
        toast: {
          type: "error",
          message: "Please mention a component name (Navbar, Sidebar, Card, Modal, Button, Input, Table, or Chart)"
        }
      });
    }

    console.log("Validation passed - continuing with AI generation");


    // Detect mode if not provided
    let detectedMode = mode;
    if (detectedMode === "modify") detectedMode = "add";
    if (!["fresh","add","remove","replace"].includes(detectedMode)) detectedMode = "add";
    const lower = message.toLowerCase();
    
    if (!detectedMode) {
      if (lower.includes("delete") || lower.includes("remove")) {
        detectedMode = "remove";
      } else if ((lower.includes("add") || lower.includes("also")) && previousTree.length > 0) {
        detectedMode = "add";
      } else if (lower.includes("create") || lower.includes("generate") || previousTree.length === 0) {
        detectedMode = "fresh";
      } else {
        detectedMode = "replace";
      }
    }


    // Build prompt and call AI
    const prompt = buildPlannerPrompt(message, previousTree, detectedMode);
    console.log("Planner Prompt:", prompt);
    const plan = await callLLM(prompt);
    console.log("AI Plan:", JSON.stringify(plan, null, 2));

    // Generate UI tree
    let tree = generateUI(plan, previousTree, detectedMode, message);
    console.log("Generated Tree before validation:", JSON.stringify(tree, null, 2));  
    tree = validateTree(tree);
    console.log("Validated Tree:", JSON.stringify(tree, null, 2));

    // Save and explain
    saveVersion(tree);
    const explanation = explainChange(message, tree, previousTree);

    res.json({ tree, explanation, mode: detectedMode });

  } catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/versions", (req, res) => {
  res.json(getAllVersions());
});

app.post("/rollback", (req, res) => {
  const { versionIndex } = req.body;
  const tree = getVersion(versionIndex);
  
  if (!tree) {
    return res.status(400).json({ error: "Invalid version" });
  }
  
  res.json({ tree, explanation: `Rolled back to version ${versionIndex}` });
});

app.delete("/versions/:index", (req, res) => {
  const idx = parseInt(req.params.index);
  
  if (isNaN(idx) || idx < 0) {
    return res.status(400).json({ error: "Invalid index" });
  }

  deleteVersion(idx);
  res.json({ message: "Version deleted", versions: getAllVersions() });
});

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
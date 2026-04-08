const express = require('express');
const cors = require('cors');
const { Groq } = require('groq-sdk');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/api/generate', async (req, res) => {
  const { floorCount, userOpenings } = req.body;
  
  const prompt = `You are a High-End Modern Architect. 
  User layout: ${JSON.stringify(userOpenings)}.
  
  TASK: Generate a COMPLEX MULTI-WING mansion layout.
  - MUST HAVE AT LEAST 2 CONNECTED SECTIONS (Main Wing + Lateral Wing).
  - USE L_SHAPE or U_SHAPE floorplans.
  
  Return ONLY JSON:
  {
    "floorplan_type": "L_SHAPE",
    "sections": [
      { "id": "Main", "width": 4, "depth": 4, "pos": [0, 0], "height": ${1.2 * floorCount} },
      { "id": "Wing_1", "width": 2, "depth": 3, "pos": [3, 0], "height": 1.2 }
    ],
    "openings": [
        // Include ALL userOpenings, and add new glassy ones
    ],
    "balconies": [],
    "overhangs": []
  }
  No extra text. Only JSON.`;

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.2
    });
    
    let content = chatCompletion.choices[0].message.content;
    // Basic JSON extraction
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if(jsonMatch) content = jsonMatch[0];
    
    const result = JSON.parse(content);
    return res.json(result);
  } catch (error) {
    console.warn("AI Generation Error, Using Stable Mansion Fallback...");
    // 🏠 Stable High-End Mansion Fallback
    const fallbackMansion = {
      floorplan_type: "L_SHAPE",
      sections: [
        { id: "Main", width: 4, depth: 3, pos: [0,0], height: 1.2 * (floorCount || 1) },
        { id: "Wing_1", width: 2, depth: 4, pos: [3, 0.5], height: 1.2 }
      ],
      openings: userOpenings || []
    };
    return res.json(fallbackMansion);
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`AI Backend running on port ${PORT}`));

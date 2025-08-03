import fs from 'fs/promises';
import path from 'path';

export async function POST({ request }) {
  try {
    const { color } = await request.json();
    
    // Validate color
    const validColors = [
      'gray', 'stone', 'red', 'pink', 'purple', 'violet',
      'indigo', 'blue', 'cyan', 'teal', 'green', 'lime',
      'yellow', 'orange', 'choco', 'brown', 'sand', 'camo', 'jungle'
    ];
    
    if (!validColors.includes(color)) {
      return new Response(JSON.stringify({ error: 'Invalid color' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Read the current resume JSON
    const resumePath = path.join(process.cwd(), 'src', 'data', 'resume.json');
    const resumeData = JSON.parse(await fs.readFile(resumePath, 'utf8'));
    
    // Update the theme color
    if (!resumeData.meta) {
      resumeData.meta = {};
    }
    if (!resumeData.meta.themeOptions) {
      resumeData.meta.themeOptions = {};
    }
    
    resumeData.meta.themeOptions.color = color;
    
    // Write back to file
    await fs.writeFile(resumePath, JSON.stringify(resumeData, null, 2));
    
    return new Response(JSON.stringify({ success: true, color }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error updating theme:', error);
    return new Response(JSON.stringify({ error: 'Failed to update theme' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 
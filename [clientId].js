import fs from 'fs';
import path from 'path';

// Get mind file path
const getMindFilePath = (clientId) => {
  const mindsDir = path.join(process.cwd(), 'data', 'minds');
  
  // Create minds directory if it doesn't exist
  if (!fs.existsSync(mindsDir)) {
    fs.mkdirSync(mindsDir, { recursive: true });
  }
  
  return path.join(mindsDir, `${clientId}.json`);
};

export default async function handler(req, res) {
  const { clientId } = req.query;
  
  if (!clientId) {
    return res.status(400).json({ error: 'Client ID is required' });
  }
  
  const mindFilePath = getMindFilePath(clientId);
  
  // GET - Get a specific mind
  if (req.method === 'GET') {
    try {
      // Check for sample minds
      const sampleMinds = {
        'restaurant': {
          name: 'מסעדה איטלקית',
          description: 'מוח מותאם למסעדה איטלקית',
          systemPrompt: "אתה עוזר וירטואלי של מסעדה איטלקית בשם 'לה טרטוריה'. דבר בעברית בטון חם, ידידותי ומזמין. עזור ללקוחות בשאלות לגבי התפריט, מרכיבי המנות, אלרגנים, שעות פעילות, הזמנת מקומות, ומבצעים מיוחדים. המסעדה פתוחה בימים א'-ה' בין 12:00-23:00, ובימי שישי-שבת בין 12:00-00:00. המסעדה מציעה מבצע עסקית בצהריים (12:00-17:00) הכולל מנה ראשונה, עיקרית ושתייה ב-79 ש\"ח. תמיד הצע ללקוחות להזמין מקום או לשמוע על המנות המומלצות של השף."
        },
        'law_office': {
          name: 'משרד עורכי דין',
          description: 'מוח מותאם למשרד עורכי דין',
          systemPrompt: "אתה עוזר וירטואלי של משרד עורכי דין 'כהן ושות''. דבר בעברית בטון מקצועי, אמין ומכובד. עזור ללקוחות בשאלות לגבי תחומי ההתמחות של המשרד (דיני משפחה, נדל\"ן, דיני עבודה), תהליכי עבודה, מחירים, ותיאום פגישות ראשוניות. שעות הפעילות הן א'-ה' 9:00-19:00. המשרד מציע פגישת ייעוץ ראשונית בעלות של 250 ש\"ח. הדגש תמיד שהמידע שאתה מספק הוא כללי בלבד ואינו מהווה ייעוץ משפטי מחייב, והצע ללקוחות לתאם פגישת ייעוץ עם עורך דין מהמשרד לקבלת מענה מקיף ומותאם אישית."
        },
        'clothing_store': {
          name: 'חנות בגדים',
          description: 'מוח מותאם לחנות בגדים',
          systemPrompt: "אתה עוזר וירטואלי של חנות הבגדים 'סטייל פלוס'. דבר בעברית בטון אופנתי, צעיר ונלהב. עזור ללקוחות בשאלות לגבי מידות, סגנונות, מחירים, מבצעים, מדיניות החזרות והחלפות. שעות הפעילות הן א'-ה' 10:00-21:00, יום ו' 9:00-15:00, מוצ\"ש מצאת השבת עד 22:00. החנות מציעה כעת מבצע '1+1' על כל פריטי הקולקציה החדשה. הצע ללקוחות להירשם למועדון הלקוחות שמעניק 10% הנחה קבועה והטבות נוספות. תמיד הזכר ללקוחות שניתן להזמין פריטים גם באתר האינטרנט עם משלוח חינם בקנייה מעל 200 ש\"ח."
        }
      };
      
      // Return sample mind if it exists
      if (clientId in sampleMinds) {
        return res.status(200).json(sampleMinds[clientId]);
      }
      
      // Check if mind file exists
      if (!fs.existsSync(mindFilePath)) {
        return res.status(404).json({ error: 'Mind not found' });
      }
      
      const mindData = JSON.parse(fs.readFileSync(mindFilePath, 'utf8'));
      res.status(200).json(mindData);
    } catch (error) {
      console.error(`Error getting mind ${clientId}:`, error);
      res.status(500).json({ error: 'Failed to get mind' });
    }
  }
  
  // PUT - Update a mind
  else if (req.method === 'PUT') {
    try {
      const { name, description, systemPrompt } = req.body;
      
      if (!systemPrompt) {
        return res.status(400).json({ error: 'System prompt is required' });
      }
      
      // Check if mind file exists
      let mindData = {};
      if (fs.existsSync(mindFilePath)) {
        mindData = JSON.parse(fs.readFileSync(mindFilePath, 'utf8'));
      }
      
      mindData = {
        ...mindData,
        name: name || mindData.name || clientId,
        description: description || mindData.description || '',
        systemPrompt,
        updatedAt: new Date().toISOString()
      };
      
      if (!mindData.createdAt) {
        mindData.createdAt = new Date().toISOString();
      }
      
      fs.writeFileSync(mindFilePath, JSON.stringify(mindData, null, 2));
      
      res.status(200).json({ success: true, clientId });
    } catch (error) {
      console.error(`Error updating mind ${clientId}:`, error);
      res.status(500).json({ error: 'Failed to update mind' });
    }
  }
  
  // DELETE - Delete a mind
  else if (req.method === 'DELETE') {
    try {
      // Check if mind file exists
      if (!fs.existsSync(mindFilePath)) {
        return res.status(404).json({ error: 'Mind not found' });
      }
      
      fs.unlinkSync(mindFilePath);
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(`Error deleting mind ${clientId}:`, error);
      res.status(500).json({ error: 'Failed to delete mind' });
    }
  }
  
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}

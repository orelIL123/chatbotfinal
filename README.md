# GPT-Chat Website

מערכת צ'אט חכם מבוססת GPT לאתרי עסקים, עם תמיכה ב"מוחות" מותאמים אישית.

## תכונות עיקריות

- **צ'אט חכם מבוסס GPT** - מענה אוטומטי לשאלות לקוחות
- **"מוחות" מותאמים אישית** - התאמת התשובות לפי סוג העסק
- **תמיכה מלאה בעברית** - כולל RTL ופונטים מותאמים
- **ממשק ניהול** - ניהול קל של "מוחות" מותאמים אישית
- **התקנה פשוטה** - הטמעה קלה באתרי אינטרנט קיימים

## טכנולוגיות

- **Frontend**: Next.js, React, TailwindCSS
- **Backend**: Next.js API Routes
- **AI**: OpenAI GPT API
- **פריסה**: Vercel

## התקנה מקומית

1. התקן את התלויות:
   ```bash
   npm install
   ```

2. צור קובץ `.env.local` עם המשתנים הבאים:
   ```
   OPENAI_API_KEY=your-openai-api-key-here
   ```

3. הפעל את שרת הפיתוח:
   ```bash
   npm run dev
   ```

4. פתח את [http://localhost:3000](http://localhost:3000) בדפדפן שלך.

## פריסה

ראה את [DEPLOYMENT.md](DEPLOYMENT.md) להוראות מפורטות לפריסה ב-Vercel.

## שימוש

### הטמעת הצ'אט באתר שלך

הוסף את קטע הקוד הבא לפני תג הסגירה של `</body>`:

```html
<script src="https://your-vercel-domain.com/widget.js"></script>
<script>
  document.addEventListener('DOMContentLoaded', function() {
    if (window.GPTChatWidget) {
      window.GPTChatWidget.init({
        apiUrl: 'https://your-vercel-domain.com/api/chat',
        clientId: 'your_client_id',
        primaryColor: '#0078ff',
        welcomeMessage: 'שלום! במה אוכל לעזור לך היום?'
      });
    }
  });
</script>
```

החלף את `your-vercel-domain.com` בדומיין שלך ואת `your_client_id` במזהה הלקוח של ה"מוח" שיצרת.

### ניהול "מוחות"

גש לדף הניהול באתר שלך (`/manage`) כדי ליצור, לערוך ולמחוק "מוחות" מותאמים אישית.

## רישיון

כל הזכויות שמורות © 2025

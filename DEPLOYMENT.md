# GPT-Chat Website - הוראות פריסה

מסמך זה מכיל הוראות מפורטות לפריסת אתר GPT-Chat ב-Vercel.

## דרישות מקדימות

לפני שתתחיל, ודא שיש לך:
- חשבון GitHub
- חשבון Vercel
- מפתח API של OpenAI

## שלב 1: העלאת הקוד ל-GitHub

1. צור מאגר חדש ב-GitHub:
   - היכנס לחשבון ה-GitHub שלך (orelil123)
   - לחץ על "New repository"
   - תן למאגר שם (לדוגמה: "gpt-chat-website")
   - בחר באפשרות "Private" אם אתה רוצה שהמאגר יהיה פרטי
   - לחץ על "Create repository"

2. העלה את הקוד למאגר:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/orelil123/gpt-chat-website.git
   git push -u origin main
   ```

## שלב 2: פריסה ב-Vercel

1. היכנס לחשבון ה-Vercel שלך:
   - פתח את https://vercel.com
   - התחבר עם חשבון ה-GitHub שלך

2. צור פרויקט חדש:
   - לחץ על "Add New" > "Project"
   - בחר את המאגר "gpt-chat-website" מהרשימה
   - אם אינך רואה את המאגר, לחץ על "Configure GitHub App" והוסף הרשאות למאגר

3. הגדר את הפרויקט:
   - **Framework Preset**: בחר ב-Next.js
   - **Root Directory**: השאר ריק (שורש הפרויקט)
   - **Build Command**: השאר את ברירת המחדל (next build)
   - **Output Directory**: השאר את ברירת המחדל (.next)

4. הגדר משתני סביבה:
   - לחץ על "Environment Variables"
   - הוסף משתנה סביבה חדש:
     - NAME: `OPENAI_API_KEY`
     - VALUE: [המפתח שלך מ-OpenAI]
   - לחץ על "Add"

5. לחץ על "Deploy" והמתן לסיום הפריסה

## שלב 3: בדיקת האתר

1. לאחר סיום הפריסה, לחץ על "Visit" כדי לבקר באתר שלך
2. בדוק שכל הדפים עובדים כראוי:
   - דף הבית
   - דף הדגמה
   - דף תיעוד
   - דף ניהול

3. בדוק את פונקציונליות הצ'אט:
   - לחץ על כפתור הצ'אט בפינה הימנית התחתונה
   - שלח הודעה ובדוק שאתה מקבל תשובה

## שלב 4: הגדרת דומיין מותאם אישית (אופציונלי)

אם ברצונך להשתמש בדומיין משלך במקום בדומיין של Vercel:

1. היכנס לפרויקט ב-Vercel
2. לחץ על "Settings" > "Domains"
3. הזן את הדומיין שלך ולחץ על "Add"
4. עקוב אחר ההוראות להגדרת רשומות ה-DNS

## פתרון בעיות נפוצות

### שגיאת 404 בעת גלישה לאתר
- ודא שהפריסה הושלמה בהצלחה
- בדוק את לוג הבנייה ב-Vercel לאיתור שגיאות
- ודא שמבנה הקבצים תקין ושיש קובץ `pages/index.js`

### שגיאת "No Next.js version could be detected"
- ודא שיש לך את הגדרות ה-Next.js הנכונות ב-package.json
- בדוק שקובץ next.config.js קיים ותקין
- נסה להגדיר את Framework Preset ל-Next.js במפורש בהגדרות הפרויקט ב-Vercel

### הצ'אט לא עובד
- ודא שהגדרת את משתנה הסביבה OPENAI_API_KEY
- בדוק שהמפתח שהזנת תקין
- בדוק את לוג השגיאות בקונסול של הדפדפן

אם אתה נתקל בבעיות נוספות, בדוק את [התיעוד הרשמי של Vercel](https://vercel.com/docs) או צור קשר לקבלת תמיכה.

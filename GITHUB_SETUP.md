# הגדרת GitHub לפרויקט GPT-Chat

מסמך זה מכיל הוראות מפורטות להגדרת מאגר GitHub עבור פרויקט GPT-Chat שלך.

## שלב 1: יצירת חשבון GitHub

אם אין לך עדיין חשבון GitHub:

1. פתח את [GitHub.com](https://github.com)
2. לחץ על "Sign up" ועקוב אחר ההוראות ליצירת חשבון חדש
3. אמת את כתובת האימייל שלך

## שלב 2: התקנת Git

אם Git אינו מותקן במחשב שלך:

### Windows
1. הורד את המתקין מ-[git-scm.com](https://git-scm.com/download/win)
2. הפעל את המתקין ועקוב אחר ההוראות
3. בחר באפשרויות ברירת המחדל אם אינך בטוח

### macOS
1. פתח את Terminal
2. הקלד `git --version`
3. אם Git אינו מותקן, תתבקש להתקין אותו

### Linux (Ubuntu/Debian)
1. פתח את Terminal
2. הקלד `sudo apt-get update`
3. הקלד `sudo apt-get install git`

## שלב 3: הגדרת Git

הגדר את הפרטים שלך ב-Git:

```bash
git config --global user.name "השם שלך"
git config --global user.email "האימייל שלך"
```

## שלב 4: יצירת מאגר חדש ב-GitHub

1. היכנס לחשבון ה-GitHub שלך
2. לחץ על כפתור "+" בפינה העליונה ובחר "New repository"
3. מלא את הפרטים הבאים:
   - Repository name: `gpt-chat-website` (או שם אחר לבחירתך)
   - Description: `מערכת צ'אט חכם מבוססת GPT לאתרי עסקים`
   - Visibility: בחר "Private" אם אתה רוצה שהמאגר יהיה פרטי, או "Public" אם אתה רוצה שיהיה ציבורי
   - אל תסמן את האפשרות "Initialize this repository with a README"
4. לחץ על "Create repository"

## שלב 5: העלאת הקוד למאגר

פתח את Terminal או Command Prompt במחשב שלך, נווט לתיקיית הפרויקט והקלד את הפקודות הבאות:

```bash
# נווט לתיקיית הפרויקט
cd /path/to/gpt-chat-project

# אתחל מאגר Git חדש
git init

# הוסף את כל הקבצים לשלב ההכנה
git add .

# צור commit ראשוני
git commit -m "Initial commit"

# הגדר את ה-branch הראשי כ-main
git branch -M main

# הוסף את המאגר המרוחק
git remote add origin https://github.com/orelil123/gpt-chat-website.git

# העלה את הקוד למאגר המרוחק
git push -u origin main
```

הערה: החלף את `orelil123/gpt-chat-website.git` בשם המשתמש והמאגר שלך.

## שלב 6: אימות ההעלאה

1. רענן את דף המאגר ב-GitHub
2. ודא שכל הקבצים הועלו בהצלחה
3. בדוק שאתה רואה את הקבצים הבאים:
   - `package.json`
   - `next.config.js`
   - `pages/` (תיקייה)
   - `components/` (תיקייה)
   - `public/` (תיקייה)
   - `styles/` (תיקייה)
   - `README.md`
   - `DEPLOYMENT.md`

## שלב 7: הגדרת Personal Access Token (אופציונלי)

אם אתה נתקל בבעיות אימות בעת העלאת הקוד:

1. היכנס לחשבון ה-GitHub שלך
2. לחץ על התמונה שלך בפינה העליונה ובחר "Settings"
3. גלול למטה ולחץ על "Developer settings"
4. לחץ על "Personal access tokens" ואז "Tokens (classic)"
5. לחץ על "Generate new token"
6. תן לטוקן שם כמו "GPT-Chat Project"
7. בחר בהרשאות הבאות:
   - `repo` (כל האפשרויות)
   - `workflow`
8. לחץ על "Generate token"
9. העתק את הטוקן שנוצר (זו ההזדמנות היחידה שלך לראות אותו)
10. השתמש בטוקן זה כסיסמה בפעם הבאה שתתבקש להזין סיסמה ב-Git

## שלב 8: חיבור ל-Vercel

לאחר שהעלית את הקוד ל-GitHub, אתה מוכן לפרוס את האתר ב-Vercel:

1. היכנס לחשבון ה-Vercel שלך
2. לחץ על "Add New" > "Project"
3. בחר את המאגר `gpt-chat-website` מהרשימה
4. עקוב אחר ההוראות ב-[DEPLOYMENT.md](DEPLOYMENT.md) להמשך תהליך הפריסה

## פתרון בעיות נפוצות

### שגיאת אימות בעת העלאת קוד
- ודא שאתה משתמש בשם המשתמש והסיסמה הנכונים
- אם אתה משתמש באימות דו-שלבי, צור Personal Access Token כמתואר בשלב 7
- נסה להשתמש ב-HTTPS במקום SSH לכתובת המאגר

### שגיאת "fatal: remote origin already exists"
- הסר את המאגר המרוחק הקיים עם `git remote remove origin`
- הוסף מחדש עם `git remote add origin https://github.com/username/repo.git`

### שגיאת "failed to push some refs"
- משוך את השינויים מהמאגר המרוחק תחילה עם `git pull origin main --rebase`
- נסה שוב להעלות עם `git push -u origin main`

### קבצים גדולים מדי
- אם יש לך קבצים גדולים מ-100MB, GitHub עשוי לדחות אותם
- הוסף קבצים כאלה ל-.gitignore או השתמש ב-Git LFS

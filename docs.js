import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Docs() {
  useEffect(() => {
    // Initialize chat widget when component mounts
    if (typeof window !== 'undefined' && window.GPTChatWidget) {
      window.GPTChatWidget.init({
        apiUrl: '/api/chat',
        clientId: 'default',
        primaryColor: '#0078ff',
        welcomeMessage: 'שלום! אשמח לעזור לך בנושא התיעוד. במה אוכל לסייע?'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>תיעוד | מערכת GPT-Chat לאתרי עסקים</title>
        <meta name="description" content="תיעוד מפורט למערכת צ'אט חכם מבוססת GPT לאתרי עסקים" />
      </Head>

      <header className="bg-primary text-white py-6">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">GPT-Chat</h1>
            <nav>
              <ul className="flex space-x-6 space-x-reverse">
                <li><Link href="/" className="hover:underline">דף הבית</Link></li>
                <li><Link href="/demo" className="hover:underline">הדגמה</Link></li>
                <li><Link href="/docs" className="hover:underline font-bold">תיעוד</Link></li>
                <li><Link href="/manage" className="hover:underline">ניהול</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">תיעוד מערכת GPT-Chat</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="md:col-span-1">
                <div className="sticky top-8">
                  <nav className="card">
                    <h3 className="text-lg font-bold mb-4">תוכן עניינים</h3>
                    <ul className="space-y-2">
                      <li><a href="#installation" className="hover:text-primary">התקנה</a></li>
                      <li><a href="#configuration" className="hover:text-primary">הגדרות</a></li>
                      <li><a href="#api" className="hover:text-primary">API</a></li>
                      <li><a href="#minds" className="hover:text-primary">ניהול "מוחות"</a></li>
                      <li><a href="#widget" className="hover:text-primary">הטמעת הצ'אט</a></li>
                      <li><a href="#customization" className="hover:text-primary">התאמה אישית</a></li>
                      <li><a href="#faq" className="hover:text-primary">שאלות נפוצות</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
              
              <div className="md:col-span-3">
                <section id="installation" className="card mb-8">
                  <h3 className="text-2xl font-bold mb-4">התקנה</h3>
                  <p className="mb-4">
                    להתקנת מערכת GPT-Chat, עקוב אחר השלבים הבאים:
                  </p>
                  
                  <h4 className="text-xl font-bold mt-6 mb-2">דרישות מקדימות</h4>
                  <ul className="list-disc list-inside space-y-1 pr-4 mb-4">
                    <li>חשבון Vercel</li>
                    <li>חשבון GitHub</li>
                    <li>מפתח API של OpenAI</li>
                  </ul>
                  
                  <h4 className="text-xl font-bold mt-6 mb-2">שלבי התקנה</h4>
                  <ol className="list-decimal list-inside space-y-2 pr-4">
                    <li>העלה את קוד המערכת ל-GitHub</li>
                    <li>התחבר לחשבון Vercel שלך</li>
                    <li>צור פרויקט חדש ובחר את המאגר שיצרת</li>
                    <li>הגדר את משתני הסביבה הנדרשים (ראה סעיף הגדרות)</li>
                    <li>לחץ על "Deploy" והמתן לסיום הפריסה</li>
                  </ol>
                </section>
                
                <section id="configuration" className="card mb-8">
                  <h3 className="text-2xl font-bold mb-4">הגדרות</h3>
                  
                  <h4 className="text-xl font-bold mt-4 mb-2">משתני סביבה</h4>
                  <p className="mb-4">
                    הגדר את משתני הסביבה הבאים ב-Vercel:
                  </p>
                  
                  <div className="bg-gray-100 p-4 rounded-md mb-6">
                    <code className="block mb-2">OPENAI_API_KEY=your-openai-api-key-here</code>
                  </div>
                  
                  <h4 className="text-xl font-bold mt-6 mb-2">הגדרות נוספות</h4>
                  <p>
                    ניתן להגדיר את הפרמטרים הבאים בקובץ <code>vercel.json</code>:
                  </p>
                  
                  <div className="bg-gray-100 p-4 rounded-md my-4">
                    <pre>{`{
  "version": 2,
  "buildCommand": "next build",
  "installCommand": "npm install",
  "framework": "nextjs",
  "outputDirectory": ".next"
}`}</pre>
                  </div>
                </section>
                
                <section id="api" className="card mb-8">
                  <h3 className="text-2xl font-bold mb-4">API</h3>
                  
                  <h4 className="text-xl font-bold mt-4 mb-2">נקודות קצה</h4>
                  
                  <div className="mb-6">
                    <h5 className="font-bold">POST /api/chat</h5>
                    <p className="mb-2">שליחת הודעה לצ'אט וקבלת תשובה.</p>
                    <p className="mb-2"><strong>גוף הבקשה:</strong></p>
                    <div className="bg-gray-100 p-4 rounded-md mb-4">
                      <pre>{`{
  "message": "שאלה כלשהי",
  "clientId": "restaurant"
}`}</pre>
                    </div>
                    <p className="mb-2"><strong>תשובה:</strong></p>
                    <div className="bg-gray-100 p-4 rounded-md">
                      <pre>{`{
  "reply": "תשובה מהמערכת..."
}`}</pre>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h5 className="font-bold">GET /api/minds</h5>
                    <p className="mb-2">קבלת רשימת כל ה"מוחות" הקיימים.</p>
                    <p className="mb-2"><strong>תשובה:</strong></p>
                    <div className="bg-gray-100 p-4 rounded-md">
                      <pre>{`{
  "minds": [
    {
      "clientId": "restaurant",
      "name": "מסעדה איטלקית",
      "description": "מוח מותאם למסעדה איטלקית"
    },
    ...
  ]
}`}</pre>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h5 className="font-bold">POST /api/minds</h5>
                    <p className="mb-2">יצירת "מוח" חדש.</p>
                    <p className="mb-2"><strong>גוף הבקשה:</strong></p>
                    <div className="bg-gray-100 p-4 rounded-md">
                      <pre>{`{
  "clientId": "new_business",
  "name": "עסק חדש",
  "description": "תיאור העסק",
  "systemPrompt": "הנחיות המערכת ל-GPT..."
}`}</pre>
                    </div>
                  </div>
                </section>
                
                <section id="minds" className="card mb-8">
                  <h3 className="text-2xl font-bold mb-4">ניהול "מוחות"</h3>
                  
                  <p className="mb-4">
                    "מוח" הוא הגדרת ההנחיות המותאמות אישית לעסק ספציפי. כל "מוח" מכיל את המידע הייחודי לעסק, כמו שעות פעילות, מוצרים, שירותים ומדיניות.
                  </p>
                  
                  <h4 className="text-xl font-bold mt-6 mb-2">יצירת "מוח" חדש</h4>
                  <p className="mb-4">
                    ניתן ליצור "מוח" חדש באמצעות ממשק הניהול או באמצעות ה-API. בעת יצירת "מוח" חדש, יש להגדיר:
                  </p>
                  <ul className="list-disc list-inside space-y-1 pr-4 mb-4">
                    <li><strong>מזהה לקוח (clientId)</strong> - מזהה ייחודי ללקוח, ללא רווחים או תווים מיוחדים</li>
                    <li><strong>שם העסק</strong> - שם העסק שיוצג בממשק הניהול</li>
                    <li><strong>תיאור</strong> - תיאור קצר של העסק</li>
                    <li><strong>הנחיות מערכת (System Prompt)</strong> - ההנחיות המפורטות ל-GPT</li>
                  </ul>
                  
                  <h4 className="text-xl font-bold mt-6 mb-2">טיפים ליצירת "מוח" אפקטיבי</h4>
                  <ul className="list-disc list-inside space-y-2 pr-4">
                    <li>התחל עם הגדרה ברורה של תפקיד העוזר הווירטואלי ושם העסק</li>
                    <li>הגדר את הטון והסגנון הרצויים (מקצועי, ידידותי, רשמי, וכו')</li>
                    <li>כלול מידע ספציפי על העסק כמו שעות פעילות, מבצעים, ומדיניות</li>
                    <li>הגדר את תחומי הידע העיקריים שהעוזר צריך להתמקד בהם</li>
                    <li>הוסף הנחיות לגבי אופן המענה לשאלות נפוצות</li>
                  </ul>
                </section>
                
                <section id="widget" className="card mb-8">
                  <h3 className="text-2xl font-bold mb-4">הטמעת הצ'אט</h3>
                  
                  <p className="mb-4">
                    כדי להטמיע את הצ'אט באתר שלך, הוסף את קטע הקוד הבא לפני תג הסגירה של <code>&lt;/body&gt;</code>:
                  </p>
                  
                  <div className="bg-gray-100 p-4 rounded-md mb-6">
                    <pre>{`<script src="https://your-vercel-domain.com/widget.js"></script>
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
</script>`}</pre>
                  </div>
                  
                  <p className="mb-4">
                    החלף את <code>your-vercel-domain.com</code> בדומיין שלך ואת <code>your_client_id</code> במזהה הלקוח של ה"מוח" שיצרת.
                  </p>
                </section>
                
                <section id="customization" className="card mb-8">
                  <h3 className="text-2xl font-bold mb-4">התאמה אישית</h3>
                  
                  <p className="mb-4">
                    ניתן להתאים את מראה הצ'אט באמצעות הפרמטרים הבאים:
                  </p>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 mb-6">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">פרמטר</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">תיאור</th>
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">ברירת מחדל</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">primaryColor</td>
                          <td className="px-6 py-4 text-sm">צבע ראשי (קוד HEX)</td>
                          <td className="px-6 py-4 text-sm">#0078ff</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">secondaryColor</td>
                          <td className="px-6 py-4 text-sm">צבע משני (קוד HEX)</td>
                          <td className="px-6 py-4 text-sm">#f0f4f8</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">position</td>
                          <td className="px-6 py-4 text-sm">מיקום הצ'אט</td>
                          <td className="px-6 py-4 text-sm">bottom-right</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">headerText</td>
                          <td className="px-6 py-4 text-sm">טקסט בכותרת הצ'אט</td>
                          <td className="px-6 py-4 text-sm">שאל/י אותנו</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">welcomeMessage</td>
                          <td className="px-6 py-4 text-sm">הודעת פתיחה</td>
                          <td className="px-6 py-4 text-sm">שלום! במה אוכל לעזור לך היום?</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">autoOpen</td>
                          <td className="px-6 py-4 text-sm">האם לפתוח את הצ'אט אוטומטית</td>
                          <td className="px-6 py-4 text-sm">false</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
                
                <section id="faq" className="card">
                  <h3 className="text-2xl font-bold mb-4">שאלות נפוצות</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold mb-2">האם המערכת תומכת בשפות נוספות מלבד עברית?</h4>
                      <p>
                        כן, המערכת יכולה לתמוך בכל שפה שנתמכת על ידי GPT. עם זאת, הממשק מותאם במיוחד לעברית עם תמיכה ב-RTL.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold mb-2">כמה "מוחות" אני יכול ליצור?</h4>
                      <p>
                        אין הגבלה על מספר ה"מוחות" שניתן ליצור במערכת.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold mb-2">האם ניתן לשלב את הצ'אט במערכות ניהול תוכן כמו WordPress?</h4>
                      <p>
                        כן, ניתן להטמיע את הצ'אט בכל אתר אינטרנט, כולל אתרי WordPress, Wix, Shopify ועוד.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold mb-2">האם המערכת שומרת את היסטוריית השיחות?</h4>
                      <p>
                        בגרסה הנוכחית, המערכת אינה שומרת את היסטוריית השיחות. כל שיחה היא עצמאית.
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold mb-2">האם ניתן להגביל את מספר השאלות שמשתמש יכול לשאול?</h4>
                      <p>
                        כרגע אין אפשרות להגביל את מספר השאלות, אך ניתן להוסיף פונקציונליות זו בהתאמה אישית.
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p>&copy; 2025 מערכת GPT-Chat. כל הזכויות שמורות.</p>
            </div>
            <div>
              <ul className="flex space-x-6 space-x-reverse">
                <li><Link href="/docs" className="hover:underline">תיעוד</Link></li>
                <li><Link href="/privacy" className="hover:underline">מדיניות פרטיות</Link></li>
                <li><Link href="/contact" className="hover:underline">צור קשר</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      {/* Widget script will be loaded here */}
      <script src="/widget.js" />
    </div>
  );
}

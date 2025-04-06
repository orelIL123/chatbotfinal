import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Demo() {
  const [selectedMind, setSelectedMind] = useState('restaurant');
  
  useEffect(() => {
    // Initialize chat widget when component mounts or when selectedMind changes
    if (typeof window !== 'undefined' && window.GPTChatWidget) {
      window.GPTChatWidget.init({
        apiUrl: '/api/chat',
        clientId: selectedMind,
        primaryColor: '#0078ff',
        welcomeMessage: 'שלום! אשמח לעזור לך. במה אוכל לסייע?',
        autoOpen: true
      });
    }
  }, [selectedMind]);

  const handleMindChange = (mindId) => {
    setSelectedMind(mindId);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>הדגמה | מערכת GPT-Chat לאתרי עסקים</title>
        <meta name="description" content="הדגמה של מערכת צ'אט חכם מבוססת GPT לאתרי עסקים" />
      </Head>

      <header className="bg-primary text-white py-6">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">GPT-Chat</h1>
            <nav>
              <ul className="flex space-x-6 space-x-reverse">
                <li><Link href="/" className="hover:underline">דף הבית</Link></li>
                <li><Link href="/demo" className="hover:underline font-bold">הדגמה</Link></li>
                <li><Link href="/docs" className="hover:underline">תיעוד</Link></li>
                <li><Link href="/manage" className="hover:underline">ניהול</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="py-12">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">נסה את הצ'אט החכם</h2>
            
            <div className="card mb-8">
              <h3 className="text-xl font-bold mb-4">בחר סוג עסק להדגמה</h3>
              <p className="mb-6">
                בחר את סוג העסק כדי לראות כיצד הצ'אט מותאם לתחום הספציפי. לחץ על כפתור הצ'אט בפינה הימנית התחתונה כדי להתחיל שיחה.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button 
                  className={`p-4 rounded-lg border-2 transition-all ${selectedMind === 'restaurant' ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-primary/50'}`}
                  onClick={() => handleMindChange('restaurant')}
                >
                  <h4 className="font-bold mb-2">מסעדה איטלקית</h4>
                  <p className="text-sm">צ'אט המותאם למסעדה איטלקית עם מידע על התפריט, שעות פעילות ומבצעים.</p>
                </button>
                
                <button 
                  className={`p-4 rounded-lg border-2 transition-all ${selectedMind === 'law_office' ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-primary/50'}`}
                  onClick={() => handleMindChange('law_office')}
                >
                  <h4 className="font-bold mb-2">משרד עורכי דין</h4>
                  <p className="text-sm">צ'אט המותאם למשרד עורכי דין עם מידע על תחומי התמחות, תהליכי עבודה ותיאום פגישות.</p>
                </button>
                
                <button 
                  className={`p-4 rounded-lg border-2 transition-all ${selectedMind === 'clothing_store' ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-primary/50'}`}
                  onClick={() => handleMindChange('clothing_store')}
                >
                  <h4 className="font-bold mb-2">חנות בגדים</h4>
                  <p className="text-sm">צ'אט המותאם לחנות בגדים עם מידע על מידות, סגנונות, מחירים ומבצעים.</p>
                </button>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-bold mb-4">שאלות לדוגמה</h3>
              <p className="mb-4">
                הנה כמה שאלות שתוכל לשאול את הצ'אט כדי לראות כיצד הוא מגיב בהתאם לסוג העסק שבחרת:
              </p>
              
              {selectedMind === 'restaurant' && (
                <ul className="list-disc list-inside space-y-2 pr-4">
                  <li>מה שעות הפעילות שלכם?</li>
                  <li>האם יש לכם מנות טבעוניות?</li>
                  <li>מה המנה המומלצת של השף?</li>
                  <li>האם צריך להזמין מקום מראש?</li>
                  <li>יש לכם מבצעים מיוחדים?</li>
                </ul>
              )}
              
              {selectedMind === 'law_office' && (
                <ul className="list-disc list-inside space-y-2 pr-4">
                  <li>באילו תחומים אתם מתמחים?</li>
                  <li>כמה עולה פגישת ייעוץ ראשונית?</li>
                  <li>איך אפשר לקבוע פגישה?</li>
                  <li>מה שעות הקבלה במשרד?</li>
                  <li>האם אתם מטפלים בתיקי גירושין?</li>
                </ul>
              )}
              
              {selectedMind === 'clothing_store' && (
                <ul className="list-disc list-inside space-y-2 pr-4">
                  <li>מה המבצעים שיש לכם כרגע?</li>
                  <li>האם יש לכם מידות גדולות?</li>
                  <li>מה מדיניות ההחזרות שלכם?</li>
                  <li>האם אתם מוכרים גם באינטרנט?</li>
                  <li>מה שעות הפתיחה של החנות?</li>
                </ul>
              )}
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

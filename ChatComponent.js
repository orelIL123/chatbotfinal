import Head from 'next/head';
import Link from 'next/link';

export default function ChatComponent() {
  return (
    <div className="card p-4 shadow-md rounded-lg">
      <h3 className="text-xl font-bold mb-4">רכיב הצ'אט</h3>
      <p className="mb-4">
        רכיב הצ'אט מוטמע אוטומטית בכל דפי האתר. לחץ על כפתור הצ'אט בפינה הימנית התחתונה כדי לפתוח את הצ'אט.
      </p>
      <div className="bg-gray-100 p-4 rounded-md mb-4">
        <pre className="text-sm overflow-x-auto">
{`<script src="https://your-vercel-domain.com/widget.js"></script>
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
</script>`}
        </pre>
      </div>
      <p>
        החלף את <code>your-vercel-domain.com</code> בדומיין שלך ואת <code>your_client_id</code> במזהה הלקוח של ה"מוח" שיצרת.
      </p>
    </div>
  );
}

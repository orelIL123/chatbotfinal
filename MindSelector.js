import { useState, useEffect } from 'react';

export default function MindSelector({ onSelectMind }) {
  const [minds, setMinds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedMind, setSelectedMind] = useState('restaurant');

  useEffect(() => {
    // Fetch minds data
    fetchMinds();
  }, []);

  const fetchMinds = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/minds');
      if (!response.ok) {
        throw new Error('Failed to fetch minds');
      }
      const data = await response.json();
      setMinds(data.minds || []);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleMindChange = (mindId) => {
    setSelectedMind(mindId);
    if (onSelectMind) {
      onSelectMind(mindId);
    }
  };

  if (loading) {
    return <div className="text-center py-4">טוען...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">שגיאה: {error}</div>;
  }

  if (minds.length === 0) {
    return <div className="text-center py-4">לא נמצאו "מוחות" זמינים</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {minds.map((mind) => (
        <button 
          key={mind.clientId}
          className={`p-4 rounded-lg border-2 transition-all ${selectedMind === mind.clientId ? 'border-primary bg-primary/10' : 'border-gray-200 hover:border-primary/50'}`}
          onClick={() => handleMindChange(mind.clientId)}
        >
          <h4 className="font-bold mb-2">{mind.name}</h4>
          <p className="text-sm">{mind.description}</p>
        </button>
      ))}
    </div>
  );
}

import { useState, useEffect } from 'react';

export default function MindTable({ onEdit, onDelete, onRefresh }) {
  const [minds, setMinds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
      
      if (onRefresh) {
        onRefresh();
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (clientId) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק מוח זה?')) {
      return;
    }
    
    try {
      const response = await fetch(`/api/minds/${clientId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete mind');
      }
      
      fetchMinds();
      
      if (onDelete) {
        onDelete(clientId);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div className="text-center py-4">טוען...</div>;
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p>{error}</p>
        <button 
          className="underline text-sm"
          onClick={() => {
            setError(null);
            fetchMinds();
          }}
        >
          נסה שוב
        </button>
      </div>
    );
  }

  if (minds.length === 0) {
    return <p>אין "מוחות" קיימים. צור "מוח" חדש כדי להתחיל.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              מזהה לקוח
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              שם
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              תיאור
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              פעולות
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {minds.map((mind) => (
            <tr key={mind.clientId}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{mind.clientId}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{mind.name}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{mind.description}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onEdit && onEdit(mind)}
                  className="text-primary hover:text-blue-800 ml-4"
                >
                  ערוך
                </button>
                <button
                  onClick={() => handleDelete(mind.clientId)}
                  className="text-red-600 hover:text-red-800"
                >
                  מחק
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

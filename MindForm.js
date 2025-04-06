import { useState } from 'react';

export default function MindForm({ initialData = null, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    clientId: initialData?.clientId || '',
    name: initialData?.name || '',
    description: initialData?.description || '',
    systemPrompt: initialData?.systemPrompt || ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await onSubmit(formData);
      setIsSubmitting(false);
    } catch (err) {
      setError(err.message || 'אירעה שגיאה בעת שליחת הטופס');
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="clientId">
          מזהה לקוח
        </label>
        <input
          type="text"
          id="clientId"
          name="clientId"
          value={formData.clientId}
          onChange={handleInputChange}
          disabled={initialData !== null}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
        <p className="text-sm text-gray-500 mt-1">
          מזהה ייחודי ללקוח, ללא רווחים או תווים מיוחדים
        </p>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="name">
          שם העסק
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="description">
          תיאור
        </label>
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="systemPrompt">
          הנחיות מערכת (System Prompt)
        </label>
        <textarea
          id="systemPrompt"
          name="systemPrompt"
          value={formData.systemPrompt}
          onChange={handleInputChange}
          rows="8"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          required
        ></textarea>
        <p className="text-sm text-gray-500 mt-1">
          הנחיות המערכת ל-GPT, המגדירות את אופי התשובות והתנהגות הצ'אט
        </p>
      </div>
      
      <div className="flex gap-2">
        <button
          type="submit"
          className="btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'שולח...' : initialData ? 'עדכן "מוח"' : 'צור "מוח"'}
        </button>
        
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
            disabled={isSubmitting}
          >
            בטל
          </button>
        )}
      </div>
    </form>
  );
}

import { useState } from 'react';

export default function MindManager() {
  const [currentMind, setCurrentMind] = useState(null);
  const [formMode, setFormMode] = useState('create'); // 'create' or 'edit'
  const [refreshKey, setRefreshKey] = useState(0);

  const handleEdit = (mind) => {
    // Fetch the full mind data including systemPrompt
    fetch(`/api/minds/${mind.clientId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch mind details');
        }
        return response.json();
      })
      .then(data => {
        setCurrentMind(data);
        setFormMode('edit');
      })
      .catch(error => {
        console.error('Error fetching mind details:', error);
        alert('שגיאה בטעינת פרטי המוח: ' + error.message);
      });
  };

  const handleSubmit = async (formData) => {
    const url = formMode === 'create' 
      ? '/api/minds' 
      : `/api/minds/${formData.clientId}`;
    
    const method = formMode === 'create' ? 'POST' : 'PUT';
    
    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to ${formMode === 'create' ? 'create' : 'update'} mind`);
    }
    
    // Reset form and refresh minds list
    resetForm();
    setRefreshKey(prev => prev + 1);
    
    return await response.json();
  };

  const resetForm = () => {
    setCurrentMind(null);
    setFormMode('create');
  };

  return {
    currentMind,
    formMode,
    refreshKey,
    handleEdit,
    handleSubmit,
    resetForm
  };
}

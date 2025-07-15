import React, { useState } from 'react';

const initialTemplates = [
  {
    id: '1',
    title: 'Follow-Up Email',
    body: 'Hi {client_name}, just following up on our recent conversation about {business_name}. Let me know if you have any questions!'
  },
  {
    id: '2',
    title: 'Welcome Message',
    body: 'Welcome to {business_name}, {client_name}! We\'re excited to have you on board.'
  }
];

export default function MessageTemplates() {
  const [templates, setTemplates] = useState(initialTemplates);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState({ id: '', title: '', body: '' });

  const handleAddTemplate = () => {
    setIsEditing(true);
    setCurrentTemplate({ id: '', title: '', body: '' });
  };

  const handleEditTemplate = (template) => {
    setIsEditing(true);
    setCurrentTemplate(template);
  };

  const handleDeleteTemplate = (id) => {
    setTemplates(templates.filter(template => template.id !== id));
  };

  const handleSaveTemplate = () => {
    if (currentTemplate.id) {
      setTemplates(templates.map(template => 
        template.id === currentTemplate.id ? currentTemplate : template
      ));
    } else {
      setTemplates([...templates, { ...currentTemplate, id: Date.now().toString() }]);
    }
    setIsEditing(false);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Message Templates</h1>
        <button
          onClick={handleAddTemplate}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Add Template
        </button>
      </div>

      {isEditing ? (
        <div className="mb-6">
          <div className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="Template Title"
              value={currentTemplate.title}
              onChange={(e) => setCurrentTemplate({ ...currentTemplate, title: e.target.value })}
              className="p-2 border border-gray-300 rounded-md"
            />
            <textarea
              placeholder="Template Body (Use {client_name} and {business_name} as variables)"
              value={currentTemplate.body}
              onChange={(e) => setCurrentTemplate({ ...currentTemplate, body: e.target.value })}
              className="p-2 border border-gray-300 rounded-md min-h-[150px]"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveTemplate}
              className="bg-success text-white px-4 py-2 rounded-md hover:bg-success/90 transition-colors"
            >
              Save Template
            </button>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4">
        {templates.map((template) => (
          <div key={template.id} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{template.title}</h3>
                <p className="text-gray-600 mt-1 whitespace-pre-line">{template.body}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEditTemplate(template)}
                  className="text-primary hover:text-primary/80"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="text-error hover:text-error/80"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

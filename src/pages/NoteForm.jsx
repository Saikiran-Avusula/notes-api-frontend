import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { createNote, getNoteById, updateNote } from '../services/api';

function NoteForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  useEffect(() => {
    if (isEditMode) {
      fetchNote();
    }
  }, [id]);

  useEffect(() => {
    setWordCount(content.trim().split(/\s+/).filter(word => word.length > 0).length);
    setCharCount(content.length);
  }, [content]);

  const fetchNote = async () => {
    try {
      const response = await getNoteById(id);
      setTitle(response.data.title);
      setContent(response.data.content || '');
    } catch (err) {
      setError('Failed to load note');
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isEditMode) {
        await updateNote(id, { title, content });
      } else {
        await createNote({ title, content });
      }
      navigate('/notes');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save note');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const userName = localStorage.getItem('userName');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Modern Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link to="/notes" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">📝</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NotesApp
              </h1>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 hidden sm:block">Welcome, <span className="font-semibold">{userName}</span></span>
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-3">
            {isEditMode ? (
              <>
                ✏️ Edit Note
              </>
            ) : (
              <>
                ✨ Create New Note
              </>
            )}
          </h2>
          <p className="text-gray-600">
            {isEditMode ? 'Update your note with new ideas' : 'Capture your thoughts and ideas'}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/20">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
              <span>⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                📝 Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200 placeholder-gray-400 text-lg font-medium"
                placeholder="Enter a catchy title for your note..."
              />
            </div>

            {/* Content Textarea */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                📜 Content
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="12"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-200 placeholder-gray-400 resize-none"
                placeholder="Start writing your note here... \n\nYou can write anything - ideas, reminders, thoughts, or detailed notes. Let your creativity flow!"
              />
              
              {/* Word/Character Count */}
              <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    🔢 {wordCount} words
                  </span>
                  <span className="flex items-center gap-1">
                    🔤 {charCount} characters
                  </span>
                </div>
                <div className="text-xs text-gray-400">
                  {content.length > 0 ? 'Looking good!' : 'Start typing...'}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                type="submit"
                disabled={loading || !title.trim()}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    {isEditMode ? '💾 Update Note' : '✨ Create Note'}
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/notes')}
                className="flex-1 bg-gradient-to-r from-gray-400 to-gray-500 text-white py-3 px-6 rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                ← Back to Notes
              </button>
            </div>
          </form>

          {/* Tips Section */}
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
              💡 Pro Tips
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Use descriptive titles to find your notes easily</li>
              <li>• Break long content into paragraphs for better readability</li>
              <li>• Your notes are automatically saved when you click the save button</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoteForm;
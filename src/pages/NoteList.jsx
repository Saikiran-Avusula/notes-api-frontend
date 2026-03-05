import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getNotes, deleteNote } from '../services/api';

function NotesList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await getNotes();
      setNotes(response.data);
    } catch (err) {
      setError('Failed to load notes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        await deleteNote(id);
        setNotes(notes.filter(note => note.id !== id));
      } catch (err) {
        alert('Failed to delete note');
        console.error(err);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-xl text-gray-600">Loading your notes...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Modern Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">📝</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              NotesApp
            </h1>
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Your Notes</h2>
          <p className="text-gray-600">Organize your thoughts and ideas</p>
        </div>

        {/* Search and Create Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm shadow-sm"
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>
          <Link
            to="/notes/new"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium flex items-center gap-2 justify-center"
          >
            <span className="text-lg">+</span>
            Create Note
          </Link>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6 shadow-sm">
            {error}
          </div>
        )}

        {filteredNotes.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              {searchTerm ? 'No notes found' : 'No notes yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm ? 'Try a different search term' : 'Create your first note to get started!'}
            </p>
            {!searchTerm && (
              <Link
                to="/notes/new"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg font-medium"
              >
                <span className="text-lg">+</span>
                Create Your First Note
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-white/20 hover:border-blue-200 group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                    {note.title}
                  </h3>
                  <div className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-200">
                    📄
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                  {note.content || 'No content'}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-400 flex items-center gap-1">
                    <span>📅</span>
                    {new Date(note.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                </div>
                
                <div className="flex gap-2">
                  <Link
                    to={`/notes/edit/${note.id}`}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 px-4 rounded-lg text-center hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                  >
                    ✏️ Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(note.id)}
                    className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-2.5 px-4 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Footer */}
        {notes.length > 0 && (
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 bg-white/60 backdrop-blur-sm rounded-xl px-6 py-3 shadow-sm border border-white/20">
              <span className="text-gray-600">
                📊 Total Notes: <span className="font-semibold text-blue-600">{notes.length}</span>
              </span>
              {searchTerm && (
                <span className="text-gray-600">
                  🔍 Found: <span className="font-semibold text-purple-600">{filteredNotes.length}</span>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NotesList;
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Login from './pages/Login';
import Register from './pages/Register';
import NoteForm from './pages/NoteForm';
import NotesList from './pages/NoteList';
import { ROUTES } from './constants';

// Protected Route Component
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to={ROUTES.LOGIN} />;
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.LOGIN} />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER} element={<Register />} />
          <Route
            path={ROUTES.NOTES}
            element={
              <ProtectedRoute>
                <NotesList/>
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.NEW_NOTE}
            element={
              <ProtectedRoute>
                <NoteForm />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.EDIT_NOTE}
            element={
              <ProtectedRoute>
                <NoteForm />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
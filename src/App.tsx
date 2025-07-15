import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LeadDiscoveryPanel from './components/LeadDiscoveryPanel';
import LeadDashboard from './components/LeadDashboard';
import Navigation from './components/Navigation';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <Router>
      <Navigation />
      <div className="min-h-screen bg-gray-100 p-8">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={
              <div className="max-w-4xl mx-auto space-y-8">
                <LeadDashboard />
                <LeadDiscoveryPanel />
              </div>
            } />
          </Routes>
        </ErrorBoundary>
      </div>
    </Router>
  );
}

export default App;

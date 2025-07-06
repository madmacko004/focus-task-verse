
import { useState } from 'react';
import LandingPage from '@/components/LandingPage';
import Dashboard from '@/pages/Dashboard';

const Index = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  const handleGetStarted = () => {
    setShowDashboard(true);
  };

  if (showDashboard) {
    return <Dashboard />;
  }

  return <LandingPage onGetStarted={handleGetStarted} />;
};

export default Index;

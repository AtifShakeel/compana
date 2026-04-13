import React, { useState } from 'react';
import ProcessStepper from '../../../components/ui/ProcessStepper';

const WorkspaceIntro = () => (
  <div style={{ padding: '1.5rem' }}>
    <h3 style={{ color: 'var(--primary)', fontFamily: 'var(--font-heading)', marginBottom: '1rem', fontSize: '18px' }}>
      Welcome to CompIntel!
    </h3>
    <p style={{ color: 'var(--text)', marginBottom: '1rem' }}>
      CompIntel is a competitive intelligence platform that helps you monitor and analyze your competitors in real-time.
    </p>
    <div style={{ backgroundColor: 'var(--background)', padding: '1rem', borderRadius: 'var(--radius-sm)' }}>
      <ul style={{ color: 'var(--text-light)', fontSize: '14px', margin: 0, paddingLeft: '1.5rem' }}>
        <li>Track competitor activities</li>
        <li>Analyze market trends</li>
        <li>Get actionable insights</li>
      </ul>
    </div>
  </div>
);

const WorkspaceProfile = () => (
  <div style={{ padding: '1.5rem' }}>
    <h3 style={{ color: 'var(--primary)', fontFamily: 'var(--font-heading)', marginBottom: '1rem', fontSize: '18px' }}>
      Create Your Workspace
    </h3>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <label style={{ color: 'var(--text)', fontWeight: '600', fontSize: '14px', display: 'block', marginBottom: '0.5rem' }}>
          Workspace Name
        </label>
        <input
          type="text"
          placeholder="e.g., My Company Analytics"
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            color: 'var(--text)',
            backgroundColor: 'var(--card)',
            fontSize: '14px',
            boxSizing: 'border-box',
          }}
        />
      </div>
      <div>
        <label style={{ color: 'var(--text)', fontWeight: '600', fontSize: '14px', display: 'block', marginBottom: '0.5rem' }}>
          Industry
        </label>
        <select style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)', color: 'var(--text)', backgroundColor: 'var(--card)', fontSize: '14px', boxSizing: 'border-box' }}>
          <option>Select Industry</option>
          <option>Technology</option>
          <option>Retail</option>
          <option>Finance</option>
          <option>Healthcare</option>
        </select>
      </div>
    </div>
  </div>
);

const Confirmation = () => (
  <div style={{ padding: '1.5rem', textAlign: 'center' }}>
    <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '32px', color: 'white' }}>
      ✓
    </div>
    <h3 style={{ color: 'var(--primary)', fontFamily: 'var(--font-heading)', marginBottom: '0.5rem' }}>
      All Set!
    </h3>
    <p style={{ color: 'var(--text-light)' }}>
      Your workspace is ready to use. Start monitoring your competitors now!
    </p>
  </div>
);

const steps = [
  { id: 1, label: 'Get Started', description: 'Welcome to CompIntel', component: <WorkspaceIntro /> },
  { id: 2, label: 'Workspace', description: 'Configure your workspace', component: <WorkspaceProfile /> },
  { id: 3, label: 'Confirmation', description: 'Setup complete', component: <Confirmation /> },
];

function OnBoarding() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div style={{ backgroundColor: 'var(--background)', fontFamily: 'var(--font-body)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ backgroundColor: 'var(--card)', boxShadow: 'var(--shadow-md)', borderRadius: 'var(--radius-md)', maxWidth: '700px', width: '100%', padding: '2rem' }}>
        <h2 style={{ color: 'var(--primary)', fontFamily: 'var(--font-heading)', textAlign: 'center', marginBottom: '0.5rem', fontSize: '28px' }}>
          Welcome to CompIntel
        </h2>
        <p style={{ color: 'var(--text-light)', textAlign: 'center', marginBottom: '2rem', fontSize: '14px' }}>
          Set up your workspace in just a few steps
        </p>
        <ProcessStepper currentStep={currentStep} steps={steps} onStepChange={setCurrentStep} />
      </div>
    </div>
  );
}

export default OnBoarding;

import React from 'react';
import { TrendingUp, Microscope, LineChart, Shield, Rocket, Lightbulb } from 'lucide-react';
import Button from '../../ui/Button';

function WorkspaceIntro() {

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      {/* Hero Section */}
      <div
        style={{
          padding: '2rem 0',
          textAlign: 'center',
          marginBottom: '2rem',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'var(--background)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
          }}
        >
          <Rocket size={40} style={{ color: 'var(--accent)' }} />
        </div>
        <h1
          style={{
            fontSize: '28px',
            fontWeight: '700',
            color: 'var(--primary)',
            fontFamily: 'var(--font-heading)',
            marginBottom: '0.5rem',
          }}
        >
          Welcome to CompIntel
        </h1>
        <p
          style={{
            fontSize: '15px',
            color: 'var(--text-light)',
            marginBottom: '1rem',
            lineHeight: '1.6',
          }}
        >
          Your competitive intelligence platform for smarter business decisions
        </p>
      </div>


      {/* CTA Section */}
      <div
        style={{
          backgroundColor: 'var(--accent)',
          borderRadius: 'var(--radius-md)',
          padding: '2rem',
          textAlign: 'center',
          color: 'white',
          marginBottom: '1.5rem',
        }}
      >
        <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '0.5rem' }}>
          Ready to Get Started?
        </h2>
        <p style={{ fontSize: '14px', marginBottom: '1rem', opacity: 0.95 }}>
          Click "Next" to set up your workspace and start monitoring competitors
        </p>
      </div>

      {/* Info Box */}
      <div
        style={{
          padding: '1rem',
          backgroundColor: 'var(--background)',
          borderRadius: 'var(--radius-md)',
          border: `1px solid var(--border)`,
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem',
        }}
      >
        <Lightbulb size={16} style={{ color: 'var(--accent)', marginTop: '2px', flexShrink: 0 }} />
        <p
          style={{
            fontSize: '12px',
            color: 'var(--text-light)',
            margin: 0,
            lineHeight: '1.6',
          }}
        >
          <strong>Tip:</strong> You can add or modify your workspace settings anytime from
          the settings panel. No commitment required!
        </p>
      </div>
    </div>
  );
}

export default WorkspaceIntro;

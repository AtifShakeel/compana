import { useState } from 'react';
import { Briefcase, ShoppingCart, Cpu, Microscope, Zap, Globe } from 'lucide-react';
import Button from '../../ui/Button'
import Input from '../../ui/Input'

function WorkspaceProfile({ onNext }) {
  const [workspaceName, setWorkspaceName] = useState('');
  const [workspaceURL, setWorkspaceURL] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState(null);

  const industries = [
    { id: 1, name: 'E-Commerce', icon: ShoppingCart },
    { id: 2, name: 'Saas', icon: Cpu },
    { id: 3, name: 'Agency', icon: Briefcase },
    { id: 4, name: 'Others', icon: Globe },
  ];

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <h2
        style={{
          fontSize: '24px',
          fontWeight: '700',
          marginBottom: '8px',
          color: 'var(--primary)',
          fontFamily: 'var(--font-heading)',
        }}
      >
        Set Up Your Workspace
      </h2>
      <p
        style={{
          fontSize: '15px',
          color: 'var(--text-light)',
          marginBottom: '1.5rem',
          lineHeight: '1.6',
        }}
      >
        Tell us a bit about your workspace to get started.
      </p>

      {/* Workspace Name and URL */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label
            htmlFor="workspaceName"
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: 'var(--text)',
            }}
          >
            Workspace Name
          </label>
          <Input
            id="workspaceName"
            placeholder="Enter your workspace name"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="workspaceURL"
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '8px',
              color: 'var(--text)',
            }}
          >
            Workspace URL
          </label>
          <Input
            id="workspaceURL"
            placeholder="Enter your workspace URL"
            value={workspaceURL}
            onChange={(e) => setWorkspaceURL(e.target.value)}
          />
        </div>
      </div>

      {/* Industry Selection */}
      <div style={{ marginBottom: '2rem' }}>
        <label
          style={{
            display: 'block',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '12px',
            color: 'var(--text)',
          }}
        >
          Industry
        </label>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
          }}
        >
          {industries.map((industry) => {
            const IconComponent = industry.icon;
            const isSelected = selectedIndustry?.id === industry.id;

            return (
              <div
                key={industry.id}
                onClick={() => setSelectedIndustry(industry)}
                style={{
                  padding: '32px 24px',
                  border: isSelected ? '2px solid var(--accent)' : '2px solid var(--border)',
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  backgroundColor: isSelected ? 'rgba(255, 107, 107, 0.05)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'var(--secondary)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                <div style={{ marginBottom: '12px', display: 'flex', justifyContent: 'center' }}>
                  <IconComponent
                    size={32}
                    style={{ color: isSelected ? 'var(--accent)' : 'var(--primary)' }}
                  />
                </div>
                <p
                  style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--text)',
                    margin: 0,
                  }}
                >
                  {industry.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <Button
        title="Continue"
        variant="primary"
        fullWidth={true}
        onClick={onNext}
      />
    </div>
  );
}

export default WorkspaceProfile


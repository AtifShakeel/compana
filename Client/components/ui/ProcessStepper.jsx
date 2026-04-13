import React, { useState, useEffect } from 'react';

function ProcessStepper({ currentStep = 1, steps = [], onStepChange }) {
  const [activeStep, setActiveStep] = useState(currentStep);

  useEffect(() => {
    setActiveStep(currentStep);
  }, [currentStep]);

  const handleStepChange = (stepId) => {
    setActiveStep(stepId);
    onStepChange && onStepChange(stepId);
  };

  const sampleSteps = [
    {
      id: 1,
      label: 'Account Details',
      description: 'Enter your basic information',
    },
    {
      id: 2,
      label: 'Verification',
      description: 'Verify your email address',
    },
    {
      id: 3,
      label: 'Profile Setup',
      description: 'Complete your profile',
    },
    {
      id: 4,
      label: 'Confirmation',
      description: 'Review and confirm',
    },
  ];

  steps = steps.length > 0 ? steps : sampleSteps;
  const totalSteps = steps.length;

  const isStepCompleted = (stepId) => stepId < activeStep;
  const isStepActive = (stepId) => stepId === activeStep;

  return (
    <div
      style={{
        padding: '2rem',
        backgroundColor: 'var(--card)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Stepper Container */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem', position: 'relative' }}>
        {/* Progress Line Background */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '0',
            right: '0',
            height: '2px',
            backgroundColor: 'var(--border)',
            zIndex: 0,
          }}
        ></div>

        {/* Steps */}
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', zIndex: 1, position: 'relative' }}>
          {steps.map((step) => (
            <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
              {/* Step Circle */}
              <div
                onClick={() => handleStepChange(step.id)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isStepCompleted(step.id)
                    ? 'var(--success)'
                    : isStepActive(step.id)
                    ? 'var(--accent)'
                    : 'var(--border)',
                  color: isStepCompleted(step.id) || isStepActive(step.id) ? 'white' : 'var(--text-light)',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontSize: '14px',
                }}
                title={`Step ${step.id}`}
              >
                {isStepCompleted(step.id) ? '✓' : step.id}
              </div>

              {/* Step Label */}
              <p
                style={{
                  marginTop: '0.75rem',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: isStepActive(step.id) ? 'var(--primary)' : 'var(--text)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {step.label}
              </p>

              {/* Step Description */}
              <p
                style={{
                  marginTop: '0.25rem',
                  fontSize: '11px',
                  color: 'var(--text-light)',
                  fontFamily: 'var(--font-body)',
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div
        style={{
          height: '4px',
          backgroundColor: 'var(--border)',
          borderRadius: 'var(--radius-sm)',
          overflow: 'hidden',
          marginBottom: '1.5rem',
        }}
      >
        <div
          style={{
            height: '100%',
            backgroundColor: 'var(--accent)',
            width: `${(activeStep / totalSteps) * 100}%`,
            transition: 'width 0.3s ease',
          }}
        ></div>
      </div>

      {/* Step Info */}
      <div>
        {steps[activeStep - 1]?.component}
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginTop: '1.5rem',
          justifyContent: 'space-between',
        }}
      >
        <button
          onClick={() => activeStep > 1 && handleStepChange(activeStep - 1)}
          disabled={activeStep === 1}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: activeStep === 1 ? 'var(--border)' : 'var(--card)',
            color: activeStep === 1 ? 'var(--text-light)' : 'var(--primary)',
            border: `1px solid ${activeStep === 1 ? 'var(--border)' : 'var(--border)'}`,
            borderRadius: 'var(--radius-md)',
            fontWeight: '600',
            cursor: activeStep === 1 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
          }}
        >
          Previous
        </button>

        <button
          onClick={() => activeStep < totalSteps && handleStepChange(activeStep + 1)}
          disabled={activeStep === totalSteps}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: activeStep === totalSteps ? 'var(--success)' : 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            fontWeight: '600',
            cursor: activeStep === totalSteps ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
          }}
        >
          {activeStep === totalSteps ? 'Completed' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export default ProcessStepper;

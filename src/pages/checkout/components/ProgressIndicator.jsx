import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps = 3 }) => {
  const steps = [
    { id: 1, name: 'Envío', icon: 'truck' },
    { id: 2, name: 'Pago', icon: 'credit-card' },
    { id: 3, name: 'Confirmación', icon: 'check-circle' }
  ];

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              <div className="flex flex-col items-center">
                <div
                  className={`
                    flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                    ${isCompleted
                      ? 'bg-success border-success text-success-foreground'
                      : isActive
                      ? 'bg-primary border-primary text-primary-foreground'
                      : 'bg-background border-muted-foreground text-muted-foreground'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Icon name="check" size={20} />
                  ) : (
                    <Icon name={step.icon} size={20} />
                  )}
                </div>
                <span
                  className={`
                    mt-2 text-sm font-body transition-colors duration-300
                    ${isActive
                      ? 'text-primary font-medium'
                      : isCompleted
                      ? 'text-success font-medium' :'text-muted-foreground'
                    }
                  `}
                >
                  {step.name}
                </span>
              </div>
              
              {!isLast && (
                <div
                  className={`
                    flex-1 h-0.5 mx-4 transition-colors duration-300
                    ${isCompleted
                      ? 'bg-success' :'bg-muted-foreground/30'
                    }
                  `}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
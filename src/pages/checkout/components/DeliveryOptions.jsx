import React from 'react';
import Icon from '../../../components/AppIcon';

const DeliveryOptions = ({ selectedOption, onOptionChange }) => {
  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Envío Estándar',
      description: 'Entrega en 3-5 días laborables',
      price: 4.99,
      icon: 'truck',
      estimatedDays: '3-5 días'
    },
    {
      id: 'express',
      name: 'Envío Express',
      description: 'Entrega en 1-2 días laborables',
      price: 9.99,
      icon: 'zap',
      estimatedDays: '1-2 días',
      popular: true
    },
    {
      id: 'premium',
      name: 'Envío Premium',
      description: 'Entrega en 24 horas',
      price: 15.99,
      icon: 'clock',
      estimatedDays: '24 horas'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="font-heading font-medium text-lg mb-4">Opciones de Envío</h3>
      
      {deliveryOptions.map((option) => (
        <div
          key={option.id}
          className={`
            relative border rounded-lg p-4 cursor-pointer transition-all duration-200
            ${selectedOption === option.id
              ? 'border-primary bg-primary/5 shadow-soft'
              : 'border-border hover:border-primary/50 hover:bg-muted/50'
            }
          `}
          onClick={() => onOptionChange(option.id)}
        >
          {option.popular && (
            <div className="absolute -top-2 left-4 bg-accent text-accent-foreground text-xs font-bold px-2 py-1 rounded">
              Más Popular
            </div>
          )}
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-lg
                ${selectedOption === option.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
                }
              `}>
                <Icon name={option.icon} size={20} />
              </div>
              
              <div>
                <h4 className="font-body font-semibold text-base">{option.name}</h4>
                <p className="text-sm text-muted-foreground">{option.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Icon name="calendar" size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{option.estimatedDays}</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="font-body font-semibold text-lg">
                {option.price === 0 ? 'Gratis' : `€${option.price.toFixed(2)}`}
              </div>
              <div className={`
                w-5 h-5 rounded-full border-2 mt-2
                ${selectedOption === option.id
                  ? 'border-primary bg-primary' :'border-muted-foreground'
                }
              `}>
                {selectedOption === option.id && (
                  <div className="w-full h-full flex items-center justify-center">
                    <Icon name="check" size={12} color="white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <div className="bg-muted/50 rounded-lg p-4 mt-6">
        <div className="flex items-start space-x-3">
          <Icon name="info" size={16} className="text-primary mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Información de Envío</p>
            <ul className="space-y-1">
              <li>• Los envíos se realizan de lunes a viernes</li>
              <li>• Recibirás un código de seguimiento por email</li>
              <li>• Envío gratuito en pedidos superiores a €50</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryOptions;
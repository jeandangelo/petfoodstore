import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const PaymentForm = ({ onNext, onBack, paymentData, onPaymentChange }) => {
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const paymentMethods = [
    { value: 'card', label: 'Tarjeta de Crédito/Débito', icon: 'credit-card' },
    { value: 'paypal', label: 'PayPal', icon: 'wallet' },
    { value: 'transfer', label: 'Transferencia Bancaria', icon: 'building-2' }
  ];

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: String(i + 1).padStart(2, '0'),
    label: String(i + 1).padStart(2, '0')
  }));

  const yearOptions = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() + i;
    return { value: String(year), label: String(year) };
  });

  const validateForm = () => {
    const newErrors = {};

    if (!paymentData.method) {
      newErrors.method = 'Selecciona un método de pago';
    }

    if (paymentData.method === 'card') {
      if (!paymentData.cardNumber?.trim()) {
        newErrors.cardNumber = 'El número de tarjeta es obligatorio';
      } else if (paymentData.cardNumber.replace(/\s/g, '').length < 16) {
        newErrors.cardNumber = 'El número de tarjeta debe tener 16 dígitos';
      }

      if (!paymentData.cardName?.trim()) {
        newErrors.cardName = 'El nombre del titular es obligatorio';
      }

      if (!paymentData.expiryMonth) {
        newErrors.expiryMonth = 'El mes de vencimiento es obligatorio';
      }

      if (!paymentData.expiryYear) {
        newErrors.expiryYear = 'El año de vencimiento es obligatorio';
      }

      if (!paymentData.cvv?.trim()) {
        newErrors.cvv = 'El CVV es obligatorio';
      } else if (paymentData.cvv.length < 3) {
        newErrors.cvv = 'El CVV debe tener al menos 3 dígitos';
      }
    }

    if (!paymentData.acceptTerms) {
      newErrors.acceptTerms = 'Debes aceptar los términos y condiciones';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (validateForm()) {
      onNext();
    }

    setIsProcessing(false);
  };

  const handleInputChange = (field, value) => {
    onPaymentChange({ ...paymentData, [field]: value });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full">
          <Icon name="credit-card" size={16} />
        </div>
        <h2 className="font-heading font-semibold text-xl">Información de Pago</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Method Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Método de Pago *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {paymentMethods.map((method) => (
              <div
                key={method.value}
                className={`
                  border rounded-lg p-4 cursor-pointer transition-all duration-200
                  ${paymentData.method === method.value
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }
                `}
                onClick={() => handleInputChange('method', method.value)}
              >
                <div className="flex items-center space-x-3">
                  <Icon name={method.icon} size={20} className="text-primary" />
                  <span className="font-body text-sm">{method.label}</span>
                </div>
              </div>
            ))}
          </div>
          {errors.method && (
            <p className="text-error text-sm mt-1">{errors.method}</p>
          )}
        </div>

        {/* Card Payment Form */}
        {paymentData.method === 'card' && (
          <div className="space-y-4 border-t border-border pt-6">
            <Input
              label="Número de Tarjeta"
              type="text"
              placeholder="1234 5678 9012 3456"
              value={paymentData.cardNumber || ''}
              onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
              error={errors.cardNumber}
              maxLength={19}
              required
            />

            <Input
              label="Nombre del Titular"
              type="text"
              placeholder="Como aparece en la tarjeta"
              value={paymentData.cardName || ''}
              onChange={(e) => handleInputChange('cardName', e.target.value.toUpperCase())}
              error={errors.cardName}
              required
            />

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Select
                label="Mes"
                placeholder="MM"
                options={monthOptions}
                value={paymentData.expiryMonth || ''}
                onChange={(value) => handleInputChange('expiryMonth', value)}
                error={errors.expiryMonth}
                required
              />
              <Select
                label="Año"
                placeholder="YYYY"
                options={yearOptions}
                value={paymentData.expiryYear || ''}
                onChange={(value) => handleInputChange('expiryYear', value)}
                error={errors.expiryYear}
                required
              />
              <Input
                label="CVV"
                type="text"
                placeholder="123"
                value={paymentData.cvv || ''}
                onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, ''))}
                error={errors.cvv}
                maxLength={4}
                required
              />
            </div>
          </div>
        )}

        {/* PayPal */}
        {paymentData.method === 'paypal' && (
          <div className="border-t border-border pt-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Icon name="info" size={16} className="text-primary" />
                <p className="text-sm text-muted-foreground">
                  Serás redirigido a PayPal para completar el pago de forma segura.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bank Transfer */}
        {paymentData.method === 'transfer' && (
          <div className="border-t border-border pt-6">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="info" size={16} className="text-primary mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p className="font-medium text-foreground mb-2">Datos para Transferencia:</p>
                  <div className="space-y-1">
                    <p>IBAN: ES91 2100 0418 4502 0005 1332</p>
                    <p>Beneficiario: PetFoodStore S.L.</p>
                    <p>Concepto: Pedido #[número de pedido]</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Terms and Conditions */}
        <div className="border-t border-border pt-6">
          <Checkbox
            label="Acepto los términos y condiciones y la política de privacidad"
            checked={paymentData.acceptTerms || false}
            onChange={(e) => handleInputChange('acceptTerms', e.target.checked)}
            error={errors.acceptTerms}
            required
          />
        </div>

        {/* Security Badges */}
        <div className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-center justify-center space-x-6">
            <div className="flex items-center space-x-2">
              <Icon name="shield-check" size={16} className="text-success" />
              <span className="text-xs text-muted-foreground">SSL Seguro</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="lock" size={16} className="text-success" />
              <span className="text-xs text-muted-foreground">Pago Protegido</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="verified" size={16} className="text-success" />
              <span className="text-xs text-muted-foreground">Verificado</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            iconName="arrow-left"
            iconPosition="left"
            className="sm:w-auto"
          >
            Volver
          </Button>
          <Button
            type="submit"
            variant="default"
            loading={isProcessing}
            iconName="lock"
            iconPosition="left"
            className="sm:w-auto min-w-[160px]"
          >
            {isProcessing ? 'Procesando...' : 'Finalizar Pedido'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
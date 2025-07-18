import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ShippingForm = ({ onNext, shippingData, onShippingChange }) => {
  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);

  const countryOptions = [
    { value: 'es', label: 'España' },
    { value: 'mx', label: 'México' },
    { value: 'ar', label: 'Argentina' },
    { value: 'co', label: 'Colombia' },
    { value: 'pe', label: 'Perú' },
    { value: 'cl', label: 'Chile' }
  ];

  const stateOptions = {
    es: [
      { value: 'madrid', label: 'Madrid' },
      { value: 'barcelona', label: 'Barcelona' },
      { value: 'valencia', label: 'Valencia' },
      { value: 'sevilla', label: 'Sevilla' },
      { value: 'bilbao', label: 'Bilbao' }
    ],
    mx: [
      { value: 'cdmx', label: 'Ciudad de México' },
      { value: 'guadalajara', label: 'Guadalajara' },
      { value: 'monterrey', label: 'Monterrey' }
    ]
  };

  const validateForm = () => {
    const newErrors = {};

    if (!shippingData.firstName?.trim()) {
      newErrors.firstName = 'El nombre es obligatorio';
    }

    if (!shippingData.lastName?.trim()) {
      newErrors.lastName = 'El apellido es obligatorio';
    }

    if (!shippingData.email?.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(shippingData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!shippingData.phone?.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    }

    if (!shippingData.address?.trim()) {
      newErrors.address = 'La dirección es obligatoria';
    }

    if (!shippingData.city?.trim()) {
      newErrors.city = 'La ciudad es obligatoria';
    }

    if (!shippingData.country) {
      newErrors.country = 'El país es obligatorio';
    }

    if (!shippingData.state) {
      newErrors.state = 'La provincia/estado es obligatorio';
    }

    if (!shippingData.zipCode?.trim()) {
      newErrors.zipCode = 'El código postal es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsValidating(true);

    // Simulate validation delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (validateForm()) {
      onNext();
    }

    setIsValidating(false);
  };

  const handleInputChange = (field, value) => {
    onShippingChange({ ...shippingData, [field]: value });
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const currentStateOptions = stateOptions[shippingData.country] || [];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full">
          <Icon name="truck" size={16} />
        </div>
        <h2 className="font-heading font-semibold text-xl">Información de Envío</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre"
            type="text"
            placeholder="Ingresa tu nombre"
            value={shippingData.firstName || ''}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            error={errors.firstName}
            required
          />
          <Input
            label="Apellido"
            type="text"
            placeholder="Ingresa tu apellido"
            value={shippingData.lastName || ''}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            error={errors.lastName}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            placeholder="tu@email.com"
            value={shippingData.email || ''}
            onChange={(e) => handleInputChange('email', e.target.value)}
            error={errors.email}
            required
          />
          <Input
            label="Teléfono"
            type="tel"
            placeholder="+34 600 000 000"
            value={shippingData.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            error={errors.phone}
            required
          />
        </div>

        {/* Address Information */}
        <Input
          label="Dirección"
          type="text"
          placeholder="Calle, número, piso, puerta"
          value={shippingData.address || ''}
          onChange={(e) => handleInputChange('address', e.target.value)}
          error={errors.address}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Ciudad"
            type="text"
            placeholder="Ciudad"
            value={shippingData.city || ''}
            onChange={(e) => handleInputChange('city', e.target.value)}
            error={errors.city}
            required
          />
          <Select
            label="País"
            placeholder="Selecciona país"
            options={countryOptions}
            value={shippingData.country || ''}
            onChange={(value) => {
              handleInputChange('country', value);
              handleInputChange('state', ''); // Reset state when country changes
            }}
            error={errors.country}
            required
          />
          <Select
            label="Provincia/Estado"
            placeholder="Selecciona provincia"
            options={currentStateOptions}
            value={shippingData.state || ''}
            onChange={(value) => handleInputChange('state', value)}
            error={errors.state}
            disabled={!shippingData.country}
            required
          />
        </div>

        <Input
          label="Código Postal"
          type="text"
          placeholder="28001"
          value={shippingData.zipCode || ''}
          onChange={(e) => handleInputChange('zipCode', e.target.value)}
          error={errors.zipCode}
          required
        />

        {/* Special Instructions */}
        <Input
          label="Instrucciones especiales (opcional)"
          type="text"
          placeholder="Ej: Dejar en portería, timbre 2B"
          value={shippingData.instructions || ''}
          onChange={(e) => handleInputChange('instructions', e.target.value)}
        />

        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            variant="default"
            loading={isValidating}
            iconName="arrow-right"
            iconPosition="right"
            className="min-w-[140px]"
          >
            Continuar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
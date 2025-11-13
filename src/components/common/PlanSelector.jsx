// src/components/common/PlanSelector.jsx

import React from 'react';

// Componente para los iconos (simulados)
const Icon = ({ type }) => (
    <div className={`plan-selector__icon plan-selector__icon--${type}`}>
        {/* Usar un SVG o imagen aquí para el corazón/persona */}
        {type === 'self' ? '❤️' : '👥'}
    </div>
);

const PlanSelector = ({ selected, onSelect }) => {
  return (
    <section className="plan-selector">
      
      {/* Opción Para mí */}
      <div 
        className={`plan-selector__option ${selected ? 'plan-selector__option--active' : ''}`}
        onClick={() => onSelect(true)}
      >
        <Icon type="self" />
        <div className="plan-selector__content">
          <p className="plan-selector__label">Para mí</p>
          <small>Cotiza tu seguro de salud y agrega familiares si así lo deseas.</small>
        </div>
        <span className={`plan-selector__checkmark ${selected ? 'plan-selector__checkmark--checked' : ''}`}></span>
      </div>

      {/* Opción Para alguien más */}
      <div 
        className={`plan-selector__option ${!selected ? 'plan-selector__option--active' : ''}`}
        onClick={() => onSelect(false)}
      >
        <Icon type="other" />
        <div className="plan-selector__content">
          <p className="plan-selector__label">Para alguien más</p>
          <small>Realiza una cotización para uno de tus familiares o cualquier persona.</small>
        </div>
        <span className={`plan-selector__checkmark ${!selected ? 'plan-selector__checkmark--checked' : ''}`}></span>
      </div>
    </section>
  );
};

export default PlanSelector;
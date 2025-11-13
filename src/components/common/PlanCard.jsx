// src/components/common/PlanCard.jsx

import React from 'react';
import Button from '../ui/Button';

// Iconos simulados para los planes
const Icon = ({ type }) => (
    <div className={`plan-card__icon plan-card__icon--${type}`}>
        {type === 'home' ? '🏠' : type === 'clinic' ? '🏥' : '✅'}
    </div>
);

const PlanCard = ({ plan, onSelect, isRecommended = false }) => {
  // Determinar el icono basado en el nombre del plan
  let iconType = 'home';
  if (plan.name.includes('Clínica')) iconType = 'clinic';
  
  return (
    <article className={`plan-card ${isRecommended ? 'plan-card--recommended' : ''}`}>
      {isRecommended && <span className="plan-card__tag">Plan recomendado</span>}
      
      <div className="plan-card__header">
        <h3 className="plan-card__title">{plan.name}</h3>
        <Icon type={iconType} />
      </div>

      <div className="plan-card__cost">
        <span className="plan-card__cost-label">COSTO DEL PLAN</span>
        <span className="plan-card__cost-value">S/{plan.price} al mes</span>
      </div>

      <ul className="plan-card__features">
        {plan.description.map((desc, index) => (
          <li key={index} className="plan-card__feature-item">
            {desc}
          </li>
        ))}
      </ul>
      
      <Button 
        onClick={onSelect}
        variant="select-plan" 
      >
        Seleccionar Plan
      </Button>
    </article>
  );
};

export default PlanCard;
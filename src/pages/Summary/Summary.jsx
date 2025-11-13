// /src/pages/Summary/Summary.jsx

import React from 'react';
import { useQuoting } from '../../context/QuotingContext';
import { useNavigate } from 'react-router-dom';
// import Button from '../../components/ui/Button'; // Usaremos un botón simple por ahora

// Función helper (copia de la que usamos en Quoting.jsx)
const calculateFinalPrice = (basePrice, forSelf) => {
    // Si NO es para sí mismo (forSelf es false), aplica el 5% de descuento (multiplicar por 0.95)
    if (!forSelf) {
        return basePrice * 0.95; 
    }
    return basePrice;
};


const Summary = () => {
  const { userData, quotation } = useQuoting();
  const navigate = useNavigate();

  // Guardrail: si no hay plan, volver al inicio
  if (!quotation.planChosen || !userData || !quotation.dni) {
    navigate('/');
    return null;
  }

  const { planChosen, dni, phone, forSelf } = quotation;
  
  // 1. Calcular el costo final del plan
  const finalPrice = calculateFinalPrice(planChosen.price, forSelf);
  const finalPriceFormatted = `S/${finalPrice.toFixed(2)} al mes`;


  return (
    <div className="summary-page">
      
      {/* Ajuste de la estructura del Header y Steps Bar para replicar la imagen d3cb0a.png
        El componente Quoting.jsx ya incluye el header y steps bar. Aquí, asumiré que
        la estructura visual de la imagen d3cb0a.png es una combinación del header
        global y la barra de pasos, y que el 'summary-page' solo contiene el 
        botón 'Volver' y el contenido principal.
      */}

      {/* Header (RIMAC Logo y Contacto - Lo más probable es que sean componentes globales) */}
      <header className="header">
          <div className="header__logo">
              <img src="../../assets/img/logo.png" alt="Rimac Logo"/>
          </div>
          <div className="header__contact">
              <span>¡Compra por este medio!</span>
              <a href="tel:014116001">📞 (01) 411 6001</a>
          </div>
      </header>

      {/* Barra de Pasos (Steps Bar - Similar a Quoting.jsx pero resaltando el paso 2) */}
      <div className="steps-bar">
          <div className="steps-content">
              <div className="step inactive"> {/* Paso 1: Inactivo */}
                  <span className="step-number">1</span>
                  <span className="step-text">Planes y coberturas</span>
              </div>
              <div className="step-separator">....</div>
              <div className="step active"> {/* Paso 2: Activo */}
                  <span className="step-number active-number">2</span>
                  <span className="step-text">Resumen</span>
              </div>
          </div>
      </div>
      
      {/* Contenido principal del resumen */}
      <main className="summary-page__main">
          {/* Botón Volver */}
          <button className="back-button" onClick={() => navigate('/cotizar')}>
             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="9" transform="rotate(90 10 10)" stroke="#4F4FFF" strokeWidth="2"/>
                <path d="M7.55317 9.99995L10.8094 6.74683L11.6907 7.62808L9.32192 9.99995L11.6907 12.3718L10.8094 13.2531L7.55317 9.99995Z" fill="#4F4FFF"/>
             </svg>
            <span>Volver</span>
          </button>
          
            <header className="summary-page__header">
                <h1>Resumen del seguro</h1>
            </header>

            <article className="summary-card">
                <h3 className="summary-card__title">PRECIOS CALCULADOS PARA:</h3>
                {/* Nombre del asegurado (Rocío Miranda Díaz) */}
                <div className="summary-card__section summary-card__section--personal">
                    {/* El ícono de persona, asumo que es un SVG o componente */}
                    <p className="summary-card__name">
                        <span className="summary-card__icon">
                            {/* Reemplazar con el SVG de persona */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.1463 13.7647H18.2309C16.1102 13.7647 14.4 15.4756 14.4 17.5972V22H20.1691C22.2898 22 24 20.2891 24 18.1675V17.62C24 15.4756 22.267 13.7647 20.1463 13.7647Z" fill="#141938"/>
                                <path d="M18.6 12.5882C20.2569 12.5882 21.6 11.2714 21.6 9.64706C21.6 8.02269 20.2569 6.70588 18.6 6.70588C16.9431 6.70588 15.6 8.02269 15.6 9.64706C15.6 11.2714 16.9431 12.5882 18.6 12.5882Z" fill="#141938"/>
                                <path d="M7.8 10.2353C10.1196 10.2353 12 8.39176 12 6.11765C12 3.84353 10.1196 2 7.8 2C5.4804 2 3.6 3.84353 3.6 6.11765C3.6 8.39176 5.4804 10.2353 7.8 10.2353Z" fill="#141938"/>
                                <path d="M14.4 13.3483C13.6788 12.8789 12.8134 12.5882 11.8758 12.5882H4.32721C1.94725 12.5882 0 14.399 0 16.6123V18.2442C0 20.3233 1.803 22 4.03873 22H12.1402V17.6853C12.1402 15.9416 13.0297 14.3767 14.4 13.3483Z" fill="#141938"/>
                            </svg>
                        </span> 
                        {userData.name} {userData.lastName}
                    </p>
                    <h4 className="summary-card__subtitle">Responsable de pago</h4>
                    <p>DNI: {dni}</p>
                    <p>Celular: {phone}</p>
                </div>

                <div className="summary-card__section summary-card__section--plan">
                    <h4 className="summary-card__subtitle">Plan elegido</h4>
                    <p>{planChosen.name}</p> 
                    {/* Usamos el precio final calculado */}
                    <p className="summary-card__price">Costo del Plan: {finalPriceFormatted}</p>
                </div>
        </article>
            {/* El botón "Comprar" no está en la imagen, solo el contenido del resumen */}
            {/* Si necesitas un botón de acción final, agrégalo aquí */}
            {/* <Button variant="primary">Lo quiero</Button> */}
        </main>
    </div>
);
};

export default Summary;
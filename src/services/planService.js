// /src/services/planService.js

const DISCOUNT_RATE = 0.05;

/**
 * Calcula el costo final del plan aplicando el descuento si es necesario.
 * @param {number} basePrice - Precio base del plan.
 * @param {string} cotizacionType - Tipo de cotización ('Para mí' o 'Para alguien más').
 * @returns {number} Precio final redondeado.
 */
export const calculateFinalPrice = (basePrice, cotizacionType) => {
    let finalPrice = basePrice;
    
    // Aplicar descuento SOLO si el plan es 'Para alguien más'
    if (cotizacionType === 'Para alguien más') {
        const discountAmount = basePrice * DISCOUNT_RATE;
        finalPrice = basePrice - discountAmount;
    }

    // Redondear a dos decimales
    return parseFloat(finalPrice.toFixed(2));
};
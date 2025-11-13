// /src/context/QuotingContext.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
// Asumo que 'apiService' tiene fetchUser y fetchPlans
import { fetchUser, fetchPlans } from '../api/apiService'; 

const QuotingContext = createContext();
const USER_DATA_KEY = 'cotizacionForm'; 

// --- Funciones de Lógica de Negocio (Helper) ---

// Función para calcular el precio final con el descuento del 5%
const calculateFinalPrice = (basePrice, forSelf) => {
    // Si NO es 'Para mí' (es 'Para alguien más'), aplica el descuento.
    if (!forSelf) {
        return basePrice * 0.95; // Aplica 5% de descuento
    }
    return basePrice;
};

// ... calculateAge (la dejo igual)
const calculateAge = (birthDay) => {
    if (!birthDay) return 40; 
    const parts = birthDay.split('-');
    if (parts.length !== 3) return 40;

    const birthYear = parseInt(parts[2]);
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
};

// --- Provider Component ---

export const QuotingProvider = ({ children }) => {
    // Inicialización del estado del formulario (DNI/Teléfono)
    const initialFormState = JSON.parse(localStorage.getItem(USER_DATA_KEY)) || {
        dni: '',
        phone: '',
        documentType: 'DNI', 
    };

    // 🚨 CRÍTICO: Inicializamos userData a un objeto vacío {} o a null, 
    // pero el useEffect lo poblará con datos de Rocío.
    const [userData, setUserData] = useState(null); 
    const [plans, setPlans] = useState([]); 
    const [quotation, setQuotation] = useState({
        ...initialFormState,
        planChosen: null, 
        forSelf: true, 
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Cargar datos de APIs al inicio (Rocío y Planes)
    useEffect(() => {
        async function loadData() {
            try {
                // Ejecutar ambas llamadas simultáneamente
                const [userResponse, plansResponse] = await Promise.all([fetchUser(), fetchPlans()]);
                
                setUserData(userResponse); 
                setPlans(plansResponse.list);
                
            } catch (err) {
                console.error("Error al cargar APIs:", err);
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        loadData();
    }, []);

    // 2. Persistencia: Guardar DNI/Teléfono en localStorage cuando cambian
    useEffect(() => {
        const { dni, phone, documentType } = quotation;
        localStorage.setItem(USER_DATA_KEY, JSON.stringify({ dni, phone, documentType }));
    }, [quotation.dni, quotation.phone, quotation.documentType]);

    // Función para actualizar los datos del formulario (Página de Inicio)
    const setPersonalInfo = ({ dni, phone, documentType = 'DNI' }) => {
        // Solo actualizamos la data del formulario (quotation)
        setQuotation(prev => ({ 
            ...prev, 
            dni, 
            phone,
            documentType,
        }));
    };

    // Función para elegir el plan (Paso 2) - **Aplica la lógica del descuento**
    const selectPlan = (basePlan, forSelf) => {
        
        // 🚨 LÓGICA DE DESCUENTO: 
        // Llama a la función helper con el estado forSelf
        const finalPrice = calculateFinalPrice(basePlan.price, forSelf);

        // Crear el objeto del plan con el precio final calculado
        const planWithPrice = {
            ...basePlan,
            price: finalPrice, 
            basePrice: basePlan.price,
            discountApplied: !forSelf, // True si es 'Para alguien más'
        };

        setQuotation(prev => ({ 
            ...prev, 
            planChosen: planWithPrice, 
            forSelf: forSelf, // Guardar la selección para el resumen
        }));
    };
    
    // ... userAge
    const userAge = calculateAge(userData?.birthDay);

    const value = {
        userData, 
        userAge, 
        plans, 
        quotation, // 🚨 Incluye dni, phone, planChosen
        isLoading,
        error,
        setPersonalInfo,
        selectPlan,
    };

    // Muestra el loader mientras se cargan los datos de Rocío y los planes
    if (isLoading) return <div>Cargando información inicial...</div>;
    if (error) return <div>Error: No se pudo cargar la información de las APIs.</div>;

    return (
        <QuotingContext.Provider value={value}>
            {children}
        </QuotingContext.Provider>
    );
};

export const useQuoting = () => useContext(QuotingContext);
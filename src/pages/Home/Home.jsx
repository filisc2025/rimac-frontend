// /src/pages/Home/Home.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuoting } from '../../context/QuotingContext';

// NOTA: No necesitamos Input/Button personalizados si usamos los nativos
// import Input from '../../components/ui/Input'; 
// import Button from '../../components/ui/Button';

const Home = () => {
    const navigate = useNavigate();
    const { setPersonalInfo } = useQuoting(); 
    const [searchParams] = useSearchParams(); 

    const [formData, setFormData] = useState({
        documentType: 'DNI', 
        dni: '',
        phone: '',
        privacyAccepted: false, 
        commsAccepted: false,
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        
        setErrors(prev => ({ ...prev, [name]: '' }));
        
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validate = () => {
        let newErrors = {};
        
        if (formData.documentType === 'DNI' && formData.dni.length !== 8) {
            newErrors.dni = "El DNI debe tener 8 dígitos exactos.";
        } else if (formData.documentType !== 'DNI' && formData.dni.length < 9) {
            newErrors.dni = "El Nro. de documento debe tener al menos 9 caracteres.";
        }
        
        if (formData.phone.length !== 9) {
            newErrors.phone = "El celular debe tener 9 dígitos exactos.";
        }
        
        if (!formData.privacyAccepted) {
            newErrors.privacyAccepted = "Debes aceptar la Política de Privacidad.";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitAndNavigate = ({ dni, phone, documentType }) => {
        // Guardar los datos del formulario en el contexto
        setPersonalInfo({ 
            dni: dni, 
            phone: phone,
            documentType: documentType
        }); 
        
        // Navegar a la ruta correcta definida en el router
        navigate('/planes-detallados'); 
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        
        if (validate()) { 
            submitAndNavigate(formData);
        }
    };

    // --- Lógica para Deep Link (URL Parameters) ---
    useEffect(() => {
        const dni = searchParams.get('document-number');
        const phone = searchParams.get('phone-number');
        const documentType = searchParams.get('document-type');
        const privacy = searchParams.get('policy-privacy');

        if (dni && phone && documentType && privacy === 'on') {
            
            const urlData = {
                documentType: documentType.toUpperCase(),
                dni: dni,
                phone: phone,
                privacyAccepted: privacy === 'on',
                commsAccepted: searchParams.get('communications') === 'on',
            };

            if (urlData.dni.length === 8 && urlData.phone.length === 9 && urlData.privacyAccepted) {
                
                setFormData(urlData);
                
                setTimeout(() => {
                    submitAndNavigate(urlData);
                }, 50); 
            } else {
                console.warn("Deep link: Datos de URL inválidos, cargando formulario.");
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams]); 


    return (
        // 🛑 TODO EL MARKUP MOVIDO DEL INDEX.HTML COMIENZA AQUÍ 🛑
        <>
            <header className="header">
                <div className="header__logo">
                    {/* Reemplaza con tu componente Logo si existe, o solo la etiqueta img */}
                    <img src="./src/assets/img/logo.png" alt="Rimac Logo"/>
                </div>
                <div className="header__contact">
                    <span>¡Compra por este medio!</span>
                    <a href="tel:014116001">📞 (01) 411 6001</a>
                </div>
            </header>

            <main className="main-content">
                <section className="hero-image">
                    <div className="hero-image-seccion">
                        <img src="./src/assets/img/fondo.jpg" alt="Familia feliz con seguro Rimac"/>
                    </div>
                </section>

                <section className="form-section">
                    <div className="form-card">
                        <span className="tag">Seguro Salud Flexible</span>
                        <h1 className="title">Creado para ti y tu<br/> familia</h1>
                        <p className="subtitle">Tú eliges cuánto pagar. Ingresa tus datos, cotiza y <br/>recibe nuestra asesoría, 100% online.</p>
                        <form onSubmit={handleSubmit} id="cotizer-form">
                            
                            {/* Grupo DNI/CEX y Número */}
                            <div className="input-group">
                                <div className="select-wrapper">
                                    <select 
                                        name="documentType" 
                                        id="document-type" 
                                        value={formData.documentType}
                                        onChange={handleChange}
                                    >
                                        <option value="DNI">DNI</option>
                                        <option value="CEX">CEX</option>
                                    </select>
                                </div>
                                <div className={`floating-label-group ${errors.dni ? 'has-error' : ''}`}>
                                    <input 
                                        type="text" 
                                        id="document-number" 
                                        name="dni" 
                                        value={formData.dni} 
                                        onChange={handleChange} 
                                        required
                                        maxLength={formData.documentType === 'DNI' ? 8 : 12}
                                        pattern="\d*"
                                    />
                                    <label htmlFor="document-number">Nro. de documento</label>
                                    {errors.dni && <span className="input-error">{errors.dni}</span>}
                                </div>
                            </div>

                            {/* Celular */}
                            <div className="input-group">
                                <div className={`floating-label-group full-width ${errors.phone ? 'has-error' : ''}`}>
                                    <input 
                                        type="tel" 
                                        id="phone-number" 
                                        name="phone" 
                                        value={formData.phone} 
                                        onChange={handleChange} 
                                        required
                                        maxLength={9}
                                        pattern="\d*"
                                    />
                                    <label htmlFor="phone-number">Celular</label>
                                    {errors.phone && <span className="input-error">{errors.phone}</span>}
                                </div>
                            </div>

                            {/* Checkboxes de Políticas */}
                            <div className="checkbox-group">
                                <input 
                                    type="checkbox" 
                                    id="policy-privacy" 
                                    name="privacyAccepted" 
                                    checked={formData.privacyAccepted}
                                    onChange={handleChange}
                                />
                                <label htmlFor="policy-privacy">Acepto la Política de Privacidad</label>
                                {errors.privacyAccepted && <p className="input-error">{errors.privacyAccepted}</p>}
                            </div>
                            
                            <div className="checkbox-group">
                                <input 
                                    type="checkbox" 
                                    id="communications" 
                                    name="commsAccepted" 
                                    checked={formData.commsAccepted}
                                    onChange={handleChange}
                                />
                                <label htmlFor="communications">Acepto la Política de Comunicaciones Comerciales</label>
                            </div>
                            <p className="terms">Aplican Términos y Condiciones.</p>

                            <button type="submit" className="btn-primary">Cotiza aquí</button>
                        </form>
                    </div>
                </section>
            </main>

            <footer className="footer">
                <div className="footer__logo">
                    <img src="./src/assets/img/logo-white.png" alt="Rimac Logo Blanco"/>
                </div>
                <p className="footer__copyright">© 2023 RIMAC Seguros y Reaseguros.</p>
            </footer>
        </>
        // 🛑 FIN DEL MARKUP 🛑
    );
};

export default Home;
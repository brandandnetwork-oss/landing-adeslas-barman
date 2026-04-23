document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const totalSteps = 5;
    
    // REEMPLAZA ESTA URL CON LA URL DE TU APLICACIÓN WEB DE GOOGLE APPS SCRIPT
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwQFZjS6J3j84SoEprKLecwiNFBxnPay_B6lrf-MTS5WjC3y3D53ckbHi-w6PEN2Si4aA/exec";
    
    // Elements
    const stepIndicatorNum = document.getElementById('step-indicator-num');
    const stepIndicatorTitle = document.getElementById('step-indicator-title');
    const progressBar = document.getElementById('progress-bar');
    
    // Inputs
    const inputNombre = document.getElementById('input-nombre');
    const inputTelefono = document.getElementById('input-telefono');
    const inputEmail = document.getElementById('input-email');
    const inputCiudad = document.getElementById('input-ciudad');
    const inputPrivacy = document.getElementById('privacy-wizard');
    
    // Forms/Steps
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');
    const step4 = document.getElementById('step-4');
    const step5 = document.getElementById('step-5');

    const btnNext1 = document.getElementById('btn-next-1');
    const btnNext2 = document.getElementById('btn-next-2');
    const btnNext3 = document.getElementById('btn-next-3');
    const btnNext4 = document.getElementById('btn-next-4');
    const btnSubmit = document.getElementById('btn-submit');

    const updateProgress = (step) => {
        if(progressBar) progressBar.style.width = `${(step / totalSteps) * 100}%`;
        if(stepIndicatorNum) stepIndicatorNum.innerHTML = `Paso ${step} <span class="text-outline-variant font-normal text-lg">/ 5</span>`;
        
        if(stepIndicatorTitle) {
            if(step === 1) stepIndicatorTitle.innerText = "Nombre completo";
            else if(step === 2) stepIndicatorTitle.innerText = "Teléfono";
            else if(step === 3) stepIndicatorTitle.innerText = "Correo electrónico";
            else if(step === 4) stepIndicatorTitle.innerText = "Ciudad";
            else if(step === 5) stepIndicatorTitle.innerText = "Conexión a WhatsApp";
        }
    };

    const hideAllSteps = () => {
        [step1, step2, step3, step4, step5].forEach(step => {
            if(step) {
                step.classList.remove('step-visible');
                step.classList.add('step-hidden', 'hidden');
            }
        });
    };

    const showStep = (step) => {
        hideAllSteps();
        if(step === 1 && step1) {
            step1.classList.remove('step-hidden', 'hidden');
            step1.classList.add('step-visible');
            if(inputNombre) inputNombre.focus();
        } else if(step === 2 && step2) {
            step2.classList.remove('step-hidden', 'hidden');
            step2.classList.add('step-visible');
            if(inputTelefono) inputTelefono.focus();
        } else if(step === 3 && step3) {
            step3.classList.remove('step-hidden', 'hidden');
            step3.classList.add('step-visible');
            if(inputEmail) inputEmail.focus();
        } else if(step === 4 && step4) {
            step4.classList.remove('step-hidden', 'hidden');
            step4.classList.add('step-visible');
            if(inputCiudad) inputCiudad.focus();
        } else if(step === 5 && step5) {
            step5.classList.remove('step-hidden', 'hidden');
            step5.classList.add('step-visible');
        }
        updateProgress(step);
    };

    if(btnNext1) {
        btnNext1.addEventListener('click', () => {
            if (!inputNombre.value.trim()) return alert("Por favor, introduce tu nombre.");
            currentStep = 2;
            showStep(currentStep);
        });
    }

    if(btnNext2) {
        btnNext2.addEventListener('click', () => {
            if (!inputTelefono.value.trim()) return alert("Por favor, introduce tu teléfono.");
            currentStep = 3;
            showStep(currentStep);
        });
    }

    if(btnNext3) {
        btnNext3.addEventListener('click', () => {
            if (!inputEmail.value.trim() || !inputEmail.value.includes('@')) return alert("Por favor, introduce un correo electrónico válido.");
            currentStep = 4;
            showStep(currentStep);
        });
    }

    if(btnNext4) {
        btnNext4.addEventListener('click', () => {
            if (!inputCiudad.value.trim()) return alert("Por favor, introduce tu ciudad.");
            currentStep = 5;
            showStep(currentStep);
        });
    }

    if(btnSubmit) {
        btnSubmit.addEventListener('click', async () => {
            if (!inputPrivacy.checked) return alert("Debes aceptar la política de privacidad para continuar.");
            
            const originalBtnText = btnSubmit.innerHTML;
            btnSubmit.innerHTML = 'Enviando... <span class="material-symbols-outlined text-lg animate-spin">sync</span>';
            btnSubmit.disabled = true;

            const nombre = inputNombre.value.trim();
            const telefono = inputTelefono.value.trim();
            const email = inputEmail.value.trim();
            const ciudad = inputCiudad.value.trim();
            
            // 1. Enviar datos a Google Sheets
            if (GOOGLE_SCRIPT_URL !== "AQUI_TU_URL") {
                try {
                    await fetch(GOOGLE_SCRIPT_URL, {
                        method: 'POST',
                        body: JSON.stringify({
                            nombre: nombre,
                            telefono: telefono,
                            email: email,
                            ciudad: ciudad
                        })
                    });
                } catch (error) {
                    console.error("Error al enviar a Google Sheets:", error);
                    // Continuamos a WhatsApp aunque falle el registro para no bloquear al usuario
                }
            } else {
                console.warn("GOOGLE_SCRIPT_URL no está configurada. No se guardará en Google Sheets.");
            }

            // 2. Redirigir a WhatsApp
            const text = `Hola estoy viendo la web de TuOficinaLocal Barman Group y quiero información. Soy ${nombre} de ${ciudad}.`;
            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/34692220930?text=${encodedText}`;
            
            btnSubmit.innerHTML = originalBtnText;
            btnSubmit.disabled = false;
            
            window.open(whatsappUrl, '_blank');
        });
    }

    // Handle Enter key
    const inputs = [
        { input: inputNombre, btn: btnNext1 },
        { input: inputTelefono, btn: btnNext2 },
        { input: inputEmail, btn: btnNext3 },
        { input: inputCiudad, btn: btnNext4 }
    ];
    
    inputs.forEach(({ input, btn }) => {
        if(input && btn) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    btn.click();
                }
            });
        }
    });

    // Init
    showStep(currentStep);
});

document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const totalSteps = 4;
    
    // Elements
    const stepIndicatorNum = document.getElementById('step-indicator-num');
    const stepIndicatorTitle = document.getElementById('step-indicator-title');
    const progressBar = document.getElementById('progress-bar');
    
    // Inputs
    const inputNombre = document.getElementById('input-nombre');
    const inputTelefono = document.getElementById('input-telefono');
    const inputCiudad = document.getElementById('input-ciudad');
    const inputPrivacy = document.getElementById('privacy-wizard');
    
    // Forms/Steps
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');
    const step4 = document.getElementById('step-4');

    const btnNext1 = document.getElementById('btn-next-1');
    const btnNext2 = document.getElementById('btn-next-2');
    const btnNext3 = document.getElementById('btn-next-3');
    const btnSubmit = document.getElementById('btn-submit');

    const updateProgress = (step) => {
        if(progressBar) progressBar.style.width = `${(step / totalSteps) * 100}%`;
        if(stepIndicatorNum) stepIndicatorNum.innerHTML = `Paso ${step} <span class="text-outline-variant font-normal text-lg">/ 4</span>`;
        
        if(stepIndicatorTitle) {
            if(step === 1) stepIndicatorTitle.innerText = "Nombre completo";
            else if(step === 2) stepIndicatorTitle.innerText = "Teléfono";
            else if(step === 3) stepIndicatorTitle.innerText = "Ciudad";
            else if(step === 4) stepIndicatorTitle.innerText = "Conexión a WhatsApp";
        }
    };

    const hideAllSteps = () => {
        [step1, step2, step3, step4].forEach(step => {
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
            if(inputCiudad) inputCiudad.focus();
        } else if(step === 4 && step4) {
            step4.classList.remove('step-hidden', 'hidden');
            step4.classList.add('step-visible');
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
            if (!inputCiudad.value.trim()) return alert("Por favor, introduce tu ciudad.");
            currentStep = 4;
            showStep(currentStep);
        });
    }

    if(btnSubmit) {
        btnSubmit.addEventListener('click', () => {
            if (!inputPrivacy.checked) return alert("Debes aceptar la política de privacidad para continuar.");
            
            const nombre = inputNombre.value.trim();
            const telefono = inputTelefono.value.trim();
            const ciudad = inputCiudad.value.trim();
            
            const text = `Hola, soy ${nombre}, de ${ciudad}. Me gustaría recibir más información sobre Adeslas Plena con las tarifas exclusivas de Barman Group. Mi teléfono es ${telefono}.`;
            
            const encodedText = encodeURIComponent(text);
            const whatsappUrl = `https://wa.me/34692220930?text=${encodedText}`;
            
            window.open(whatsappUrl, '_blank');
        });
    }

    // Handle Enter key
    const inputs = [
        { input: inputNombre, btn: btnNext1 },
        { input: inputTelefono, btn: btnNext2 },
        { input: inputCiudad, btn: btnNext3 }
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

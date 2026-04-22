document.addEventListener('DOMContentLoaded', () => {
    let currentStep = 1;
    const totalSteps = 4;
    
    // Elements
    const stepIndicatorNum = document.getElementById('step-indicator-num');
    const stepIndicatorTitle = document.getElementById('step-indicator-title');
    const progressBar = document.getElementById('progress-bar');
    
    // Inputs
    const inputNombre = document.getElementById('input-nombre');
    const inputEdad = document.getElementById('input-edad');
    const inputTelefono = document.getElementById('input-telefono');
    const inputLugar = document.getElementById('input-lugar');
    
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
        progressBar.style.width = `${(step / totalSteps) * 100}%`;
        stepIndicatorNum.innerHTML = `Paso ${step} <span class="text-outline-variant font-normal text-lg">/ 4</span>`;
        
        if(step === 1) stepIndicatorTitle.innerText = "Nombre completo";
        else if(step === 2) stepIndicatorTitle.innerText = "Edad";
        else if(step === 3) stepIndicatorTitle.innerText = "Teléfono móvil";
        else if(step === 4) stepIndicatorTitle.innerText = "Lugar de trabajo";
    };

    const hideAllSteps = () => {
        step1.classList.remove('step-visible');
        step1.classList.add('step-hidden');
        step2.classList.remove('step-visible');
        step2.classList.add('step-hidden');
        step3.classList.remove('step-visible');
        step3.classList.add('step-hidden');
        step4.classList.remove('step-visible');
        step4.classList.add('step-hidden');
    };

    const showStep = (step) => {
        hideAllSteps();
        if(step === 1) {
            step1.classList.remove('step-hidden');
            step1.classList.add('step-visible');
        } else if(step === 2) {
            step2.classList.remove('step-hidden');
            step2.classList.add('step-visible');
            inputEdad.focus();
        } else if(step === 3) {
            step3.classList.remove('step-hidden');
            step3.classList.add('step-visible');
            inputTelefono.focus();
        } else if(step === 4) {
            step4.classList.remove('step-hidden');
            step4.classList.add('step-visible');
            inputLugar.focus();
        }
        updateProgress(step);
    };

    btnNext1.addEventListener('click', () => {
        if (!inputNombre.value.trim()) return alert("Por favor, introduce tu nombre.");
        currentStep = 2;
        showStep(currentStep);
    });

    btnNext2.addEventListener('click', () => {
        if (!inputEdad.value.trim()) return alert("Por favor, introduce tu edad.");
        currentStep = 3;
        showStep(currentStep);
    });

    btnNext3.addEventListener('click', () => {
        if (!inputTelefono.value.trim()) return alert("Por favor, introduce tu teléfono.");
        currentStep = 4;
        showStep(currentStep);
    });

    btnSubmit.addEventListener('click', () => {
        if (!inputLugar.value.trim()) return alert("Por favor, introduce tu lugar de trabajo.");
        
        const nombre = inputNombre.value.trim();
        const edad = inputEdad.value.trim();
        const telefono = inputTelefono.value.trim();
        const lugar = inputLugar.value.trim();
        
        // "Hola, soy [Nombre], de [Edad] años. Trabajo en [Lugar de Trabajo] y me gustaría recibir más información sobre Adeslas Plena. Mi teléfono es [Teléfono]."
        const text = `Hola, soy ${nombre}, de ${edad} años. Trabajo en ${lugar} y me gustaría recibir más información sobre Adeslas Plena. Mi teléfono es ${telefono}.`;
        
        const encodedText = encodeURIComponent(text);
        const whatsappUrl = `https://wa.me/34692220930?text=${encodedText}`;
        
        window.open(whatsappUrl, '_blank');
    });

    // Handle Enter key
    const inputs = [inputNombre, inputEdad, inputTelefono, inputLugar];
    const buttons = [btnNext1, btnNext2, btnNext3, btnSubmit];
    
    inputs.forEach((input, index) => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                buttons[index].click();
            }
        });
    });

    // Init
    showStep(currentStep);
});

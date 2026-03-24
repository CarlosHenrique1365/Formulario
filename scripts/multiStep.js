export default function multiStep() { 

  const steps = document.querySelectorAll(".step");
  const btnNext = document.querySelectorAll(".proximo");
  const btnPrev = document.querySelectorAll(".voltar");

  const progress = document.getElementById("progress");
  const stepNumber = document.getElementById("stepNumber");

  let currentStep = 0;
  const totalSteps = steps.length;

  function updateStep() {
    steps.forEach((step, index) => {
      step.classList.remove("active");

      if (index === currentStep) {
        step.classList.add("active");
      }
    });

    stepNumber.textContent = currentStep + 1;

    let percent = ((currentStep + 1) / totalSteps) * 100;
    progress.style.width = percent + "%";

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // validar campos do step atual
  function validateStep() {
    const currentFields = steps[currentStep].querySelectorAll("input, textarea, select");

    for (let field of currentFields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        return false;
      }
    }

    return true;
  }

  // botão próximo
  btnNext.forEach(button => {
    button.addEventListener("click", () => {
      if (!validateStep()) return;

      if (currentStep < totalSteps - 1) {
        currentStep++;
        updateStep();
      }
    });
  });

  // botão voltar
  btnPrev.forEach(button => {
    button.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        updateStep();
      }
    });
  });

  updateStep();
}
export default function multiStep() { 

  const steps = document.querySelectorAll('.step');
  const btnProximo = document.querySelectorAll('.proximo');
  const btnVoltar = document.querySelectorAll('.voltar');
  const btnEnviar = document.querySelector('.enviar');

  let stepAtual = 0;

  const spanAtual = document.getElementById('step-atual');
  const spanTotal = document.getElementById('total-steps');

  spanTotal.textContent = steps.length;
  spanAtual.textContent = 1;

  function mostrarStep(index) {

    if (index < 0 || index >= steps.length) return;

    steps.forEach(step => step.classList.remove('ativo'));
    steps[index].classList.add('ativo');

    spanAtual.textContent = index + 1;

    const ultimoStep = steps.length - 1;

    if (index === ultimoStep) {
      btnEnviar.classList.remove('oculto');

      btnProximo.forEach(btn => {
        btn.classList.add('oculto');
      });

    } else {
      btnEnviar.classList.add('oculto');

      btnProximo.forEach(btn => {
        btn.classList.remove('oculto');
      });
    }
  }

  function validarStepAtual() {

    const campos = steps[stepAtual].querySelectorAll('[required]');

    for (let campo of campos) {

      // radio ou checkbox
      if (campo.type === "radio" || campo.type === "checkbox") {

        const nome = campo.name;
        const marcado = steps[stepAtual].querySelector(`input[name="${nome}"]:checked`);

        if (!marcado) {
          alert("Preencha todos os campos obrigatórios.");
          return false;
        }

      } else if (!campo.value.trim()) {

        alert("Preencha todos os campos obrigatórios.");
        campo.focus();
        return false;

      }
    }

    return true;
  }

  btnProximo.forEach(btn => {
    btn.addEventListener('click', () => {

      if (!validarStepAtual()) return;

      if (stepAtual < steps.length - 1) {
        stepAtual++;
        mostrarStep(stepAtual);
      }

    });
  });

  btnVoltar.forEach(btn => {
    btn.addEventListener('click', () => {

      if (stepAtual > 0) {
        stepAtual--;
        mostrarStep(stepAtual);
      }

    });
  });

  mostrarStep(stepAtual);
}
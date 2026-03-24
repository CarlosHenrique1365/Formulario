export default function submitForm() {
  const form = document.getElementById('formAnamnese');

  if (!form) return;

  const inputs = form.querySelectorAll('input, textarea, select');

  function gerarJSONDataLabels() {
    const dataLabels = {};

    inputs.forEach((input) => {
      const dataLabel = input.getAttribute('data-label');
      const name = input.name;

      if (!name || !dataLabel || input.disabled) return;

      if (input.type === 'checkbox') {
        if (input.checked) {
          if (!dataLabels[dataLabel]) {
            dataLabels[dataLabel] = [];
          }

          const valor = input.value.trim();

          if (valor !== '') {
            dataLabels[dataLabel].push(valor);
          }
        }
      } else if (input.type === 'radio') {
        if (input.checked) {
          const valor = input.value.trim();

          if (valor !== '') {
            dataLabels[dataLabel] = valor;
          }
        }
      } else {
        const valor = input.value.trim();

        if (valor !== '') {
          dataLabels[dataLabel] = valor;
        }
      }
    });

    return dataLabels;
  }

  function mostrarJSONNoConsole() {
    const json = gerarJSONDataLabels();
    console.clear();
    console.log(JSON.stringify(json, null, 2));
  }

  inputs.forEach((input) => {
    input.addEventListener('change', mostrarJSONNoConsole);

    if (
      input.type !== 'checkbox' &&
      input.type !== 'radio' &&
      input.tagName.toLowerCase() !== 'select'
    ) {
      input.addEventListener('input', mostrarJSONNoConsole);
    }
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = gerarJSONDataLabels();

    console.clear();
    console.log(JSON.stringify(data, null, 2));

    try {
      const response = await fetch('https://n8n-n8n.gfzm83.easypanel.host/webhook/Anamnese_Infantil', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        window.location.href = 'sucesso.html';
      } else {
        alert('Erro ao enviar.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro na requisição.');
    }
  });
}
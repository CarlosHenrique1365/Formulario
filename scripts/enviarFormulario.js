export default function submitForm() {
  const form = document.getElementById('formAnamnese');

  if (!form) return;

  const inputs = form.querySelectorAll('input, textarea, select');

  function gerarJSONDataLabels() {
    const dataLabels = {};

    inputs.forEach((input) => {
      const dataLabel = input.getAttribute('data-label');
      const name = input.name;

      if (!name || !dataLabel) return;

      if (input.type === 'checkbox') {
        if (!dataLabels[dataLabel]) {
          dataLabels[dataLabel] = [];
        }

        if (input.checked) {
          dataLabels[dataLabel].push(input.value);
        }
      } else if (input.type === 'radio') {
        if (!(dataLabel in dataLabels)) {
          dataLabels[dataLabel] = '';
        }

        if (input.checked) {
          dataLabels[dataLabel] = input.value;
        }
      } else {
        dataLabels[dataLabel] = input.value;
      }
    });

    return JSON.stringify(dataLabels, null, 2);
  }

  inputs.forEach((input) => {
    input.addEventListener('change', () => {
      console.clear();
      console.log(gerarJSONDataLabels());
    });

    input.addEventListener('input', () => {
      console.clear();
      console.log(gerarJSONDataLabels());
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const json = gerarJSONDataLabels();

    console.clear();
    console.log(json);

    alert('Teste realizado. Nada foi enviado ao webhook.');

    window.location.href = 'sucesso.html';
  });
}
  // try {
  //   const response = await fetch('https://n8n-n8n.gfzm83.easypanel.host/webhook/Anamnese_Infantil', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   });

  //   if (response.ok) {
  //     alert('Enviado com sucesso!');
  //   } else {
  //     alert('Erro ao enviar.');
  //   }

  // } catch (error) {
  //   console.error(error);
  //   alert('Erro na requisição');
  // }
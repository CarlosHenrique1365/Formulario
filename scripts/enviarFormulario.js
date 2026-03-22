export default function submitForm() {
  const form = document.getElementById('formAnamnese');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {};
    const inputs = form.querySelectorAll('input, textarea, select');

    inputs.forEach((input) => {
      const name = input.name;

      if (!name) return;

      if (input.type === 'checkbox') {
        if (!data[name]) data[name] = [];

        if (input.checked) {
          data[name].push(input.value);
        }
      } else if (input.type === 'radio') {
        if (input.checked) {
          data[name] = input.value;
        }
      } else {
        data[name] = input.value;
      }
    });

    console.log('JSON enviado:', data);
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
export default function alterarCores() {

  document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('formulario');
    const radios = document.querySelectorAll('input[name="sexo_crianca"]');

    function mudarColor() {
      const sexoCriança = document.querySelector('input[name="sexo_crianca"]:checked');

      if (!sexoCriança) {
        document.body.classList.remove('masculino', 'feminino');
        document.body.classList.add('padrao');
        return;
      }

      const sexoSelecionado = sexoCriança.value;

      document.body.classList.remove('masculino', 'feminino', 'padrao');

      if (sexoSelecionado === 'masculino') {
        document.body.classList.add('masculino');
      } else if (sexoSelecionado === 'feminino') {
        document.body.classList.add('feminino');
      }
    }

    // Evento para mudar cor ao selecionar
    radios.forEach(radio => {
      radio.addEventListener('change', mudarColor);
    });

    // Submit do formulário
    form.addEventListener('submit', function(event) {
      event.preventDefault();

      const dados = new FormData(form);
      const objeto = Object.fromEntries(dados.entries());

      console.log(objeto);

      enviarParaBackend(objeto);
    });

  });

}

export default function controlarRadios() {
  document.addEventListener('change', function (event) {

    if (!event.target.matches('input[type="radio"], input[type="checkbox"]')) return;

    const input = event.target;
    const nomeGrupo = input.name;

    const inputsDoGrupo = document.querySelectorAll(`input[name="${nomeGrupo}"]`);
    
    inputsDoGrupo.forEach(item => {
      const targetId = item.dataset.target;
      if (!targetId) return;

      const div = document.getElementById(targetId);
      if (!div) return;

      div.classList.remove('exibir');
      div.classList.add('ocultar');
    });

    inputsDoGrupo.forEach(item => {
      if (!item.checked) return;

      const targetId = item.dataset.target;
      if (!targetId) return;

      const div = document.getElementById(targetId);
      if (!div) return;

      div.classList.remove('ocultar');
      div.classList.add('exibir');
    });

  });
}
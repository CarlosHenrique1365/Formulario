
function mudarColor() {
    const sexoCriança = document.querySelector('input[name="sexo_crianca"]:checked');
    if (!sexoCriança) return; // se nenhum estiver marcado, não faz nada

    const sexoSelecionado = sexoCriança.value;

    document.body.classList.remove('masculino', 'feminino', 'padrao')

    if (sexoSelecionado === 'masculino') {
       document.body.classList.add('masculino');
    } else if (sexoSelecionado === 'feminino') {
        document.body.classList.add('feminino');
    } else {
        document.body.classList.add('padrao');
    }
}

const radios = document.querySelectorAll('input[name="sexo_crianca"]');

radios.forEach(radio => {
    radio.addEventListener('change', mudarColor);
});

const radioSexo = document.querySelector('input[name="sexo_crianca"]');
radioSexo.addEventListener('click', mudarColor())


const form = document.getElementById('formulario');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const dados = new FormData(form);

    const objeto = Object.fromEntries(dados.entries());
    console.log(dados)

    console.log(objeto);

    enviarParaBackend(objeto);
});

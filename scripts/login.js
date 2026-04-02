function verificarAcesso() {
  const loginForm = document.getElementById("loginForm");
  const emailInput = document.getElementById("email");
  const senhaInput = document.getElementById("senha");
  const toggleSenha = document.getElementById("toggleSenha");
  const mensagemErro = document.getElementById("mensagemErro");
  const mensagemSucesso = document.getElementById("mensagemSucesso");
  const btnLogin = document.getElementById("btnLogin");

  // URL DO WEBHOOK DO N8N
  const WEBHOOK_LOGIN = "SEU_WEBHOOK_AQUI";

  // MOSTRAR / OCULTAR SENHA
  toggleSenha.addEventListener("click", () => {
    const tipoAtual = senhaInput.getAttribute("type");

    if (tipoAtual === "password") {
      senhaInput.setAttribute("type", "text");
      toggleSenha.textContent = "Ocultar";
    } else {
      senhaInput.setAttribute("type", "password");
      toggleSenha.textContent = "Mostrar";
    }
  });

  // ENVIAR LOGIN PARA O N8N
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const senha = senhaInput.value.trim();

    mensagemErro.textContent = "";
    mensagemSucesso.textContent = "";

    if (!email || !senha) {
      mensagemErro.textContent = "Preencha todos os campos.";
      return;
    }

    btnLogin.disabled = true;
    btnLogin.textContent = "Entrando...";

    try {
      const response = await fetch(WEBHOOK_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao conectar com o servidor.");
      }

      const data = await response.json();

      /*
      O n8n deve retornar algo assim:
      {
        "acesso": true,
        "mensagem": "Login autorizado",
        "token": "abc123"
      }

      ou

      {
        "acesso": false,
        "mensagem": "E-mail ou senha inválidos"
      }
    */

      if (data.acesso === true) {
        mensagemSucesso.textContent =
          data.mensagem || "Login realizado com sucesso.";

        // GUARDA SOMENTE A SESSÃO / TOKEN, NÃO EMAIL E SENHA
        sessionStorage.setItem("usuarioAutorizado", "true");

        if (data.token) {
          sessionStorage.setItem("tokenLogin", data.token);
        }

        setTimeout(() => {
          window.location.href = "index.html";
        }, 1000);
      } else {
        mensagemErro.textContent =
          data.mensagem || "E-mail ou senha inválidos.";
      }
    } catch (error) {
      console.error("Erro no login:", error);
      mensagemErro.textContent =
        "Não foi possível fazer login agora. Tente novamente.";
    } finally {
      btnLogin.disabled = false;
      btnLogin.textContent = "Entrar";
    }
  });
}

function exibirSaudacao() {
  const hora = new Date().getHours();
  let saudacao = '';
  let emoji = '';
 
  if (hora >= 5 && hora < 12) {
    saudacao = 'Bom dia';
    emoji = '☀️';
  } else if (hora >= 12 && hora < 18) {
    saudacao = 'Boa tarde';
    emoji = '🌤️';
  } else {
    saudacao = 'Boa noite';
    emoji = '🌙';
  }
 
  const banner = document.getElementById('saudacaoBanner');
  const texto = document.getElementById('saudacaoTexto');
 
  texto.textContent = `${emoji} ${saudacao}! Seja bem-vindo à Tech ES.`;
  banner.style.display = 'flex';
 
  document.getElementById('fecharSaudacao').addEventListener('click', () => {
    banner.style.animation = 'slideUp 0.4s ease forwards';
    setTimeout(() => banner.style.display = 'none', 400);
  });
}
 
exibirSaudacao();
 
 
// ============================================================
// FUNCIONALIDADE 1: MODO CLARO / ESCURO
// ============================================================
 
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;
 
// Carrega tema salvo (se houver)
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
themeIcon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';
 
themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
 
  html.setAttribute('data-theme', next);
  themeIcon.textContent = next === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('theme', next);
});
 
 
// ============================================================
// FUNCIONALIDADE 2: FORMULÁRIO COM VALIDAÇÃO E MENSAGEM DE SUCESSO
// ============================================================
 
function enviarFormulario() {
  const nome = document.getElementById('nome');
  const email = document.getElementById('email');
  const mensagem = document.getElementById('mensagem');
  const successMsg = document.getElementById('successMsg');
 
  // Limpa erros anteriores
  clearErrors();
 
  let valido = true;
 
  // Validação do nome
  if (nome.value.trim().length < 3) {
    showError(nome, 'nomeError');
    valido = false;
  }
 
  // Validação do e-mail
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value.trim())) {
    showError(email, 'emailError');
    valido = false;
  }
 
  // Validação da mensagem
  if (mensagem.value.trim().length < 10) {
    showError(mensagem, 'mensagemError');
    valido = false;
  }
 
  // Se tudo válido, mostra mensagem de sucesso e limpa o form
  if (valido) {
    successMsg.style.display = 'block';
    nome.value = '';
    email.value = '';
    mensagem.value = '';
 
    // Esconde a mensagem depois de 5 segundos
    setTimeout(() => {
      successMsg.style.display = 'none';
    }, 5000);
  }
}
 
function showError(input, errorId) {
  input.classList.add('error');
  document.getElementById(errorId).style.display = 'block';
}
 
function clearErrors() {
  ['nome', 'email', 'mensagem'].forEach(id => {
    document.getElementById(id).classList.remove('error');
  });
  ['nomeError', 'emailError', 'mensagemError'].forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
  document.getElementById('successMsg').style.display = 'none';
}
 
 
// ============================================================
// BÔNUS: CONTADOR ANIMADO NOS STATS
// ============================================================
 
function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');
 
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;
 
    const update = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };
 
    update();
  });
}
 
// Dispara o contador quando a seção home aparecer na tela
const homeSection = document.getElementById('home');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
 
if (homeSection) observer.observe(homeSection);
 
 
// ============================================================
// FUNCIONALIDADE 3: ANIMAÇÃO AO SCROLL
// ============================================================
 
// Adiciona a classe 'scroll-hidden' em todos os elementos animáveis
const scrollElements = document.querySelectorAll(
  'section, .service-card, .stat-card, .form-container, .robo-img, table'
);
 
scrollElements.forEach(el => {
  el.classList.add('scroll-hidden');
});
 
// Observer que revela os elementos conforme entram na tela
const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('scroll-visible');
      entry.target.classList.remove('scroll-hidden');
      scrollObserver.unobserve(entry.target); // anima só uma vez
    }
  });
}, { threshold: 0.12 });
 
scrollElements.forEach(el => scrollObserver.observe(el));
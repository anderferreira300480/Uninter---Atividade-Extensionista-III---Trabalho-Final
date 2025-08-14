/* Função de logout */
function logout() {
  // Remover usuário logado (caso exista)
  localStorage.removeItem('usuarioLogado');
  
  // Redirecionar para a página inicial
  window.location.href = 'index1.html';
}
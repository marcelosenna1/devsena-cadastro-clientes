class Validacao {
    /**
     * Valida os dados de um usuário.
     * @param {Object} data - Dados do usuário.
     * @param {string} data.nome - Nome do usuário.
     * @param {number} data.idade - Idade do usuário.
     * @param {string} data.email - Email do usuário.
     * @returns {string[]} - Lista de erros encontrados.
     */
    static validarCliente(data) {
      const erros = [];
  

      if (!data.nome || data.nome.trim() === '') {
        erros.push('O nome do cliente é obrigatório.');
      } else if (/[^a-zA-ZÀ-ÿ\s]/.test(data.nome)) {
        erros.push('O nome do cliente não pode conter caracteres especiais ou números.');
      }
  
      
      if (!data.idade || isNaN(data.idade) || data.idade <= 0) {
        erros.push('A idade do cliente deve ser um número maior que zero.');
      }
  
      
      if (!data.email || data.email.trim() === '') {
        erros.push('O email do cliente é obrigatório.');
      } else if (!/\S+@\S+\.\S+/.test(data.email)) {
        erros.push('O email do cliente deve conter um endereço válido.');
      }
      return erros;
    }
  }
  
  export default Validacao;
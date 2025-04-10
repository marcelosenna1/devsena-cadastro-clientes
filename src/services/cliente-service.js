import api from './api.js'

class ClienteService {
    async obterUsuarios() {
      const response = await api.get('/api/v1/cliente');
      return  response.data || [];
    }
  
    async criarUsuario(data) {
      await api.post('/api/v1/cliente', data);
    }
  
    async deletarUsuario(id) {
      await api.delete(`/api/v1/cliente/${id}`);
    }
  }
  
  export default new ClienteService();
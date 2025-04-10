import api from './api.js'

class ClienteService {
    async listarClientes() {
      const response = await api.get('/api/v1/cliente');
      return  response.data || [];
    }
  
    async cadastrarCliente(data) {
      await api.post('/api/v1/cliente', data);
    }
  
    async deletarCliente(id) {
      await api.delete(`/api/v1/cliente/${id}`);
    }
  }
  
  export default new ClienteService();
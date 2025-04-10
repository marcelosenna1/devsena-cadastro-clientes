import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import ClienteService from '../../services/cliente-service'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import Validacao from '../../utils/validacao';

function Home() {

  const [users, setUsers] = useState([])

  const inputNome = useRef();
  const inputIdade = useRef();
  const inputEmail = useRef();


  async function obterUsuarios() {
    const usuarios = await ClienteService.obterUsuarios()
    setUsers(usuarios)
    console.log(users)
  }

  async function criarUsuarios() {

    const data = {
      nome: inputNome.current.value,
      idade: inputIdade.current.value,
      email: inputEmail.current.value
    }

    const erros = Validacao.validarCliente(data);

    /**if (erros.length > 0) {
      toast.error(erros.join(' '));
      return;
    }**/

    if (erros.length > 0) {
      erros.forEach((erro) => toast.error(erro)); // Exibe os erros como alertas
      return;
    }

    try {
      await ClienteService.criarUsuario(data)
      await obterUsuarios();
      limparCampos();
      toast.success('Usuário cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      toast.error('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
    }

  }

  async function deletarUsuario(id) {

    const confirmacao = await Swal.fire({
      title: 'Tem certeza que deseja deletar este usuário?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    });

    if (!confirmacao.isConfirmed) {
      return;
    }

    try {
      await ClienteService.deletarUsuario(id)
      await obterUsuarios()
      toast.success('Usuário deletado com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      toast.error('Erro ao deletar usuário. Tente novamente.');
    }

  }


  function limparCampos() {
    inputNome.current.value = ''
    inputIdade.current.value = ''
    inputEmail.current.value = ''
  }

  useEffect(() => {
    obterUsuarios()
  }, [])


  return (
    <>
      <div className='container'>
        <form>
          <h1>Cadastro de Usuários</h1>
          <input placeholder='Nome' name='Nome' type='text' ref={inputNome} />
          <input placeholder='Idade' name='Idade' type='number' ref={inputIdade} />
          <input placeholder='Email' name='Email' type='email' ref={inputEmail} />
          <button type='button' onClick={criarUsuarios} >Cadastrar</button>
        </form>

        {users.map(user => (
          <div key={user.id} className='card'>
            <div>
              <p>Nome: <span>{user.nome}</span></p>
              <p>Idade: <span>{user.idade}</span></p>
              <p>Email: <span>{user.email}</span></p>
            </div>
            <button type='button' onClick={() => deletarUsuario(user.id)}>
              <img src={Trash} />
            </button>
          </div>
        ))}

      </div>
    </>
  )
}

export default Home

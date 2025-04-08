import './style.css'
import Trash from '../../assets/trash.svg'

function Home() {

  const users = [
    {
      id: '2sdaf',
      name: 'Marcelo',
      age: 33,
      email: 'marcelo.sena@gmail.com'
    },
    {
      id: '2sd2f',
      name: 'Zeus',
      age: 33,
      email: 'zeus.senna@gmail.com'
    }
  ]

  return (
    <>
      <div className='container'>
        <form>
          <h1>Cadastro de Usuários</h1>
          <input placeholder='Nome' name='Nome' type='text' />
          <input placeholder='Idade' name='Idade' type='number' />
          <input placeholder='Email' name='Email' type='email' />
          <button type='button'>Cadastrar</button>
        </form>

        {users.map(user => (
          <div key={user.id} className='card'>
            <div>
              <p>Nome: <span>{user.name}</span></p>
              <p>Idade: <span>{user.age}</span></p>
              <p>Email: <span>{user.email}</span></p>
            </div>
            <button>
              <img src={Trash} />
            </button>
          </div>
        ))}

      </div>
    </>
  )
}

export default Home

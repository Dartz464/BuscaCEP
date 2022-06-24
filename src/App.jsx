import { useState } from 'react';
import './style.css';
import {FiSearch} from 'react-icons/fi';
import api from './services/api';

function App() {

  const [input, setInput] = useState("")
  const [cep, setCep] = useState({});

  async function handleSearch(){
    if(input === ''){
      alert("Preencha algum CEP")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("")
    }catch{
      alert("Erro ao buscar")
      setInput("")
    }
  }

  return (
    <div className="container">
      <h1 className="title">BuscaCEP</h1>
      <h3>Busque detalhes de um CEP</h3>
      <div className="containerInput">
        <input type="text" placeholder='Digite o CEP' value={input} onChange={(e) => setInput(e.target.value)}/>
        <button className="btnSearch"><FiSearch size={25} color="#fff" onClick={handleSearch} /></button>
      </div>
      
      {Object.keys(cep).length > 0 &&(
        <main className='main'>
        <h2>CEP: {cep.cep}</h2>
        <span>{cep.localidade} - {cep.uf}</span>
        <span>{cep.logradouro}</span>
        <span>{cep.bairro}</span>
        <span>{cep.complemento}</span>
      </main>
      )}
      
    </div>
  )
}

export default App;

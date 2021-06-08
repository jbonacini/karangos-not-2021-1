import { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import InputMask from 'react-input-mask'
import InputAdornment from '@material-ui/core/InputAdornment'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import axios from 'axios'

const useStyles = makeStyles(() => ({
  form: {
    maxWidth: '80%',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    '& .MuiFormControl-root': {
      minWidth: '200px',
      maxWidth: '500px',
      marginBottom: '24px',
    }
  },
  toolbar: {
    marginTop: '36px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around'
  },
  checkbox: {
    alignItems: 'center'
  }
}))
const formatChars = {
  'A': '[A-Za-z]',
  '0': '[0-9]',
  '#': '[0-9A-Ja-j]'
}

const cpfMask = '000.000.000-00'
const rgMask = '00.000.000 AAA/AA'
const telefoneMask = '(00) 0000-0000'

export default function ClientesForm() {
  const classes = useStyles()
  
  const [clientes,setClientes]= useState({
    id: null,
    nome: '',
    cpf: '',
    rg: '',
    logradouro: '',
    num_imovel: '',
    complemento: '',
    bairro: '',
    municipio: '',
    uf: '',
    telefone: '',
    email: ''
  })
  const [currentId, setCurrentId] = useState()

  function handleInputChange(event, property) {
    console.log(event.target.id,property)
    // Se houver id no event.target, ele será o nome da propriedade
    // senão, usaremos o valor do segundo parâmetro
    if(event.target.id) property = event.target.id

    if(property === 'cpf') {
      setClientes({...clientes, [property]: event.target.value}) 
    }
    else if(property === 'rg') {
      setClientes({...clientes, [property]: event.target.value.toUpperCase()}) 
    } else if(property === 'telefone') {
      setClientes({...clientes, [property]: event.target.value.toUpperCase()}) 
    }
    else {
      // Quando o nome de uma propriedade de um objeto aparece entre [],
      // isso se chama "propriedade calculada". O nome da propriedade vai
      // corresponder à avaliação da expressão entre os colchetes
      setCurrentId(event.target.id)
      setClientes({...clientes, [property]: event.target.value})
    }
  }
  async function saveData() {
    try {
      await axios.post('https://api.faustocintra.com.br/clientes', clientes)
      alert('Dados salvos com sucesso!')
      // A FAZER: retornar à página de listagem
    }
    catch(error) {
      alert('ERRO: ' + error.message)
    }
  }

  function handleSubmit(event) {
    
    event.preventDefault() // Evita o recarregamento da página

    saveData()
    
  } 
  return (
    <>
      <h1>Cadastrar Novo Cliente</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField id="nome" label="Nome" variant="filled" value={clientes.nome} onChange={handleInputChange} fullWidth/>
        {/* <TextField id="cpf" label="Cpf" variant="filled" value={clientes.cpf} onChange={handleInputChange}/> */}
        <InputMask 
          formatChars={formatChars} 
          mask={cpfMask} 
          fullWidth
          id="cpf" 
          onChange={event => handleInputChange(event, 'cpf')} 
          value={clientes.cpf}
        >
          {() => <TextField label="Cpf" variant="filled" fullWidth />}
        </InputMask>
        {/* <TextField id="rg" label="Rg" variant="filled" value={clientes.rg} onChange={handleInputChange} />*/}
        <InputMask  
          formatChars={formatChars} 
          mask={rgMask}
          fullWidth 
          id="rg" 
          onChange={event => handleInputChange(event, 'rg')} 
          value={clientes.rg}
        >
          {() => <TextField label="RG" variant="filled" fullWidth />}
        </InputMask>
        <TextField id="logradouro" label="Logradouro" variant="filled" value={clientes.logradouro} onChange={handleInputChange} fullWidth/>
        <TextField id="num_imovel" label="Número imovel" variant="filled" value={clientes.num_imovel} onChange={handleInputChange} fullWidth/>
        <TextField id="complemento" label="Complemento" variant="filled" value={clientes.complemento} onChange={handleInputChange} fullWidth/>
        <TextField id="bairro" label="Bairro" variant="filled" value={clientes.bairro} onChange={handleInputChange} fullWidth/>
        <TextField id="municipio" label="municipio" variant="filled" value={clientes.municipio} onChange={handleInputChange} fullWidth/>
        <TextField id="uf" label="Estado" variant="filled" value={clientes.uf} onChange={event => handleInputChange(event, 'uf')} select fullWidth>
          <MenuItem value="AC">Acre</MenuItem>
          <MenuItem value="AL">Alagoas</MenuItem>
          <MenuItem value="AP">Amapá</MenuItem>
          <MenuItem value="AM">Amazonas</MenuItem>
          <MenuItem value="BA">Bahia</MenuItem>
          <MenuItem value="CE">Ceará</MenuItem>
          <MenuItem value="DF">Distrito Federal</MenuItem>
          <MenuItem value="ES">Espírito Santo</MenuItem>
          <MenuItem value="GO">Goiás</MenuItem>
          <MenuItem value="MA">Maranhão</MenuItem>
          <MenuItem value="MT">Mato Grosso</MenuItem>
          <MenuItem value="MS">Mato Grosso do Sul</MenuItem>
          <MenuItem value="MG"> Minas Gerais</MenuItem>
          <MenuItem value="PA">Pará</MenuItem>
          <MenuItem value="PB">Paraíba</MenuItem>
          <MenuItem value="PR">Paraná</MenuItem>
          <MenuItem value="PE">Pernambuco</MenuItem>
          <MenuItem value="PI">Piauí</MenuItem>
          <MenuItem value="RJ">Rio de Janeiro</MenuItem>
          <MenuItem value="RN">Rio Grande do Norte</MenuItem>
          <MenuItem value="RS">Rio Grande do Sul</MenuItem>
          <MenuItem value="RO">Rondônia</MenuItem>
          <MenuItem value="RR">Roraima</MenuItem>
          <MenuItem value="SC">Santa Catarina</MenuItem>
          <MenuItem value="SP">São Paulo</MenuItem>
          <MenuItem value="SE">Sergipe</MenuItem>
          <MenuItem value="TO">Tocantins</MenuItem>
        </TextField>
        <InputMask  
          formatChars={formatChars} 
          mask={telefoneMask}
          fullWidth 
          id="telefone" 
          onChange={event => handleInputChange(event, 'telefone')} 
          value={clientes.telefone}
        >
          {() => <TextField label="Telefone" variant="filled" fullWidth />}
        </InputMask>
        <TextField id="email" label="Email" variant="filled" value={clientes.email} onChange={handleInputChange} fullWidth/>
        <Toolbar className={classes.toolbar} >
          <Button variant="contained" color="secondary" type="submit">Enviar</Button>
          <Button variant="contained">Voltar</Button>
        </Toolbar>
      
        <div>{JSON.stringify(clientes)}</div>
      </form>
    </>
    )
  }
import axios from 'axios'
import {useEffect, useState} from 'react'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox'
import {useHistory} from 'react-router-dom';
import ConfirmDialog from '../ui/ConfirmDialog'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme)=>({
  table: {
    minWidth: 650,
  },
  tableRow:{
   '& button':{
      visibility: 'hidden'
    },
    '&:hover':{
      backgroundColor:theme.palette.action.hover
    },
    '&:hover button':{
      visibility:'visible'
    }
  },
  toolbar:{
    justifyContent:'flex-end',
    paddingRight:0
  }

}));


export default function KarangosList() {
  const classes = useStyles();

  const history = useHistory();

  const [karangos, setKarangos]= useState([])
  const [dialogOpen, setDialogOpen]= useState(false)
  const [deletable,setDeletable]= useState()//cód do registro a ser excluido]
  const [snackState,setSnackState]=useState({
    open:false,
    severity:'success',
    message:'Karangos excluídos com sucesso'
  })
  function handleDialogClose(result){
    setDialogOpen(false)
    if(result) deleteItem()
  }

  function handleDeleteClick(id){
    setDeletable(id)
    setDialogOpen(true)
  }

  async function deleteItem(){
    try{
      await axios.delete(`https://api.faustocintra.com.br/karangos/${deletable}`)
      getData()
      setSnackState({...snackState, open:true})//Exibe a snackbar
    }
    catch(error){
      //Mostra a snackbar de erro
      setSnackState({
        open:true,
        severity:'error',
        message:'ERRO: ' + error.message
      })

    }
  }

  useEffect(() => {
    getData()
  },[])

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  

  async function getData(){
    try{
      let response = await axios.get('https://api.faustocintra.com.br/karangos?by=marca,modelo')
     if(response.data.length >0) setKarangos(response.data)
    }
    catch(error){
      console.error(error)
    }
  }

  function handleSnackClose(event, reason){
    if(reason === 'clickaway') return
    setSnackState({...snackState, open:false})
  }

  return (
    <>
      <ConfirmDialog isOpen={dialogOpen} onClose={handleDialogClose}>
        Deseja realmente excluir este karango?
      </ConfirmDialog>

      <Snackbar open={snackState.open} autoHideDuration={6000} onClose={handleSnackClose}>
        <Alert onClose={handleSnackClose} severity={snackState.severity}>
          {snackState.message}
        </Alert>
      </Snackbar>

      <h1>Listagem de Karangos</h1>
      <Toolbar className={classes.toolbar}>
          <Button color="secondary" variant="contained" size="large"
           startIcon={<AddBoxIcon/>} onClick={()=> history.push("/new")}>Novo Karango
          </Button>
      </Toolbar>
      {/* {karangos.map(karango => <div>{karango.modelo}</div>)} */}
      <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Cód.</TableCell>
            <TableCell>Marca</TableCell>
            <TableCell>Modelo</TableCell>
            <TableCell>Cor</TableCell>
            <TableCell align="center">Ano</TableCell>
            <TableCell align="center">Importado</TableCell>
            <TableCell align="center">Placa</TableCell>
            <TableCell align="right">Preço</TableCell>
            <TableCell align="center">Editar</TableCell>
            <TableCell align="center">Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            karangos.map(karango=>
              <TableRow key={karango.id} className={classes.tableRow}>
                <TableCell align="right">{karango.id}</TableCell>
                <TableCell>{karango.marca}</TableCell>
                <TableCell>{karango.modelo}</TableCell>
                <TableCell>{karango.cor}</TableCell>
                <TableCell align="center">{karango.ano_fabricacao}</TableCell>
                <TableCell align="center">
                  <Checkbox checked={karango.importado==='1'} readOnly/>
                </TableCell>
                <TableCell align="center">{karango.placa}</TableCell>
                <TableCell align="right">
                  {Number(karango.preco).toLocaleString('pt-br', {style: 'currency', currency:'BRL'})}   
                </TableCell>
                <TableCell align="center">
                  <IconButton aria-label="edit">
                  <EditIcon />
                  </IconButton>
                  </TableCell>
                  <TableCell align="center">
                  <IconButton aria-label="delete" onClick={()=> handleDeleteClick(karango.id)}>
                  <DeleteIcon color="error" />
                  </IconButton>
                  </TableCell>
              </TableRow>
            )
          }         
        </TableBody>
      </Table>
    </TableContainer>
      {/* <div>{JSON.stringify(karangos)}</div> */}
    </>
    )
}
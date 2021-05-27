import axios from 'axios'
import { useEffect, useState } from 'react'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Checkbox } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import { useHistory } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    table: {
        minWidth: 650,
    },
    tableRow: {
            '& button': {
            visibility: 'hidden'
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
            '& button': {
                visibility: 'visible'
            }
        }
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingRight: 0,

    }
}));

export default function KarangosList() {
    const classes = useStyles();

    const history = useHistory()

    // É importante que esta variavel de estado seja inicializada com um vetor vazio
    const [karangos, setKarangos] = useState([])

    useEffect(() => {
        const getData = async () => {
            // tudo o que está em try{} será tentado
            try {
                let response = await axios.get('https://api.faustocintra.com.br/karangos')
                setKarangos(response.data)
            }
            // caso de erro no try{}, vai cair no bloco catch{}, nesse caso, retornando o erro no console
            catch(error) {
                console.error(error)
            }
        }

        getData()

    }, []) 
    // Quando a dependencia de um useEffect é um vetor vazio, isso indica
    // que será execulado apenas uma vez, na inicialização do componente



    return (
        <>
            <h1>Listagem de karangos</h1>
            <Toolbar className={classes.toolbar}>
                
                <Button 
                    color="secondary" 
                    variant="contained" 
                    size="large" 
                    startIcon={<AddIcon />}
                    onClick={() => history.push('/new')}
                >
                    Novo karango
                </Button>
            </Toolbar>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="right">Código</TableCell>
                            <TableCell>Marca</TableCell>
                            <TableCell>Modelo</TableCell>
                            <TableCell>Cor</TableCell>
                            <TableCell align="center">Ano</TableCell>
                            <TableCell align="center">Importado?</TableCell>
                            <TableCell align="center">Placa</TableCell>
                            <TableCell align="right">Preço</TableCell>
                            <TableCell align="center">Editar</TableCell>
                            <TableCell align="center">Excluir</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            karangos.map(karango => (
                                <TableRow key={karango.id} className={classes.tableRow}>
                                    <TableCell align="right">{karango.id}</TableCell>
                                    <TableCell>{karango.marca}</TableCell>
                                    <TableCell>{karango.modelo}</TableCell>
                                    <TableCell>{karango.cor}</TableCell>
                                    <TableCell align="center">{karango.ano_fabricacao}</TableCell>
                                    <TableCell align="center">
                                        <Checkbox color="primary" checked={karango.importado === '1'} readOnly></Checkbox>
                                    </TableCell>
                                    <TableCell align="center">{karango.placa}</TableCell>
                                    <TableCell align="right">
                                        { Number(karango.preco).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'}) }
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="edit">
                                            <EditIcon color="primary"/>
                                        </IconButton>
                                    </TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="delete">
                                            <DeleteIcon color="error"/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>

            
        </>
    )
}
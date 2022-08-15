import React, {useState, useEffect, ChangeEvent} from 'react'
import { Container, Typography, TextField, Button } from "@mui/material"
import Tema from '../../../models/Tema';
import { buscaId, post, put } from '../../../services/Service';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/tokensReducer';
import { toast } from 'react-toastify';

function CadastroTema() {
    let navigate = useNavigate();
    const { id } = useParams<{ id: string }>(); // id do tema a ser editado
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
      );
  
    const [tema, setTema] = useState<Tema>({
      id: 0,
      descricao: ""
    });
  
    useEffect(() => {
      if(token == ""){
        toast.error('Você precisa estar logado.', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: "colored",
            progress:  undefined,
          })
          navigate("/login");
      }
      }, [token]);
  
      useEffect(() => {
          if(id != undefined){
              findById(id);
          }
      }, [id]);
  
      const findById = async (id: string) => {
          //adicionar try catch
          buscaId(`/temas/${id}`, setTema, {
              headers: {
                  'Authorization': token
              }
          })
      };
  
      const updatedTema = async (e: ChangeEvent<HTMLInputElement>) => {
          setTema({
              ...tema,
              [e.target.name]: e.target.value,
          })
      }
  
      async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
          e.preventDefault()
          console.log("tema " + JSON.stringify(tema))
  
          if (id !== undefined) {
              console.log(tema)
              put(`/temas`, tema, setTema, {
                  headers: {
                      'Authorization': token
                  }
              })
              toast.success('Tema atualizada com sucesso.', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress:  undefined,
              })
          } else {
              post(`/temas`, tema, setTema, {
                  headers: {
                      'Authorization': token
                  }
              })
              toast.success('Tema cadastrado com sucesso.', {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: "colored",
                progress:  undefined,
              })
          }
          back()
  
      }
  
      function back() {
          navigate('/temas')
      }
  
  
      return (
          <Container maxWidth="sm" className="topo">
              <form onSubmit={onSubmit}>
                  <Typography variant="h3" color="textSecondary" component="h1" align="center" >Formulário de cadastro tema</Typography>
                  <TextField value={tema.descricao} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedTema(e)} id="descricao" label="descricao" variant="outlined" name="descricao" margin="normal" fullWidth />
                  <Button type="submit" variant="contained" color="primary">
                      Finalizar
                  </Button>
              </form>
          </Container>
      )
  }
  
  export default CadastroTema;
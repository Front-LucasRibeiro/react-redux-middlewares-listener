import Button from 'components/Button';
import Header from 'components/Header';
import Input from 'components/Input';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { carregarCategorias, loadOneCategory } from 'store/reducers/categorias';
import { cadastrarItem } from 'store/reducers/itens';
import styles from './Anuncie.module.scss';

export default function Anuncie() {
  const dispatch = useDispatch();
  const { categoryName = '' } = useParams();
  const categorias = useSelector(state => state.categorias.map(({ nome, id }) => ({ nome, id })));
  const { register, handleSubmit } = useForm({
    defaultValues: {
      categoria: categoryName
    }
  });

  function cadastrar(data) {
    dispatch(cadastrarItem(data));
  }

  useEffect(() => {
    dispatch(categoryName 
      ? loadOneCategory(categoryName) 
      : carregarCategorias
    )
  }, [dispatch, categoryName])

  return (
    <div className={styles.container}>
      <Header
        titulo='Anuncie aqui!'
        descricao='Anuncie seu produto no melhor site do Brasil!'
      />
      <form className={styles.formulario} onSubmit={handleSubmit(cadastrar)}>
        <Input {...register('titulo', { required: true })} placeholder='Nome do produto' alt='nome do produto' />
        <Input {...register('descricao', { required: true })} placeholder='Descrição do produto' alt='descrição do produto' />
        <Input {...register('foto', { required: true })} placeholder='URL da imagem do produto' alt='URL da imagem do produto' />
        <select
          {...register('categoria', { required: true })}
          disabled={categoryName}
        >
          <option value='' disabled > Selecione a categoria </option>
          {categorias.map(categoria => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
        <Input {...register('preco', { required: true, valueAsNumber: true })} type='number' placeholder='Preço do produto' />
        <Button type='submit'>
          Cadastrar produto
        </Button>
      </form>
    </div>
  )
}
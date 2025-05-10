import Button from 'components/Button';
import Header from 'components/Header';
import Item from 'components/Item';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './Categoria.module.scss';
import { useEffect } from 'react';
import { loadOneCategory } from 'store/reducers/categorias';

export default function Categoria() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { nameCategory } = useParams();
  const { categoria, itens } = useSelector(state => {
    const regexp = new RegExp(state.busca, 'i');
    return {
      categoria: state.categorias.find(categoria => categoria.id === nameCategory) || {},
      itens: state.itens.filter(item => item.categoria === nameCategory && item.titulo.match(regexp))
    }
  });

  useEffect(() => {
    dispatch(loadOneCategory(nameCategory))
  }, [dispatch, nameCategory])

  return (
    <div>
      <Header
        titulo={categoria.nome}
        descricao={categoria.descricao}
        imagem={categoria.header}
      >
        <Button onClick={() => navigate(`/anuncie/${nameCategory}`)}>
          Quero anunciar
        </Button>
      </Header>
      <div className={styles.itens}>
        {itens?.map(item => (
          <Item key={item.id} {...item} />
        ))}
      </div>
    </div>
  )
}
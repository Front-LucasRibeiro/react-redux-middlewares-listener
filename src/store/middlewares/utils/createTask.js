import { createStandaloneToast } from "@chakra-ui/toast";

const { toast } = createStandaloneToast();

export default async function createTask({
  fork,
  dispatch,
  search,
  action,
  textLoading,
  textSuccess,
  textError,
}) {
  toast({
    title: 'Carregando',
    description: textLoading,
    status: 'loading',
    duration: 2000,
    isClosable: true
  })

  // criando uma task 

  // fork - criar e iniciar uma task assíncrona isolada, que pode ser controlada (cancelada, aguardada, etc.) separadamente da execução principal do listener.
  // O fork cria uma tarefa que nos facilita fazer chamadas assíncronas e nos dá inúmeros benefícios e abstrações no desenvolvimento!
  const task = fork(async api => {
    await api.delay(1000)
    return await search();
  })

  const result = await task.result

  if (result.status === 'ok') {
    toast({
      title: 'Sucesso!',
      description: textSuccess,
      status: 'success',
      duration: 2000,
      isClosable: true
    })

    // retorno dos dados da api
    dispatch(action(result.value))
  }

  if (result.status === 'rejected') {
    toast({
      title: 'Erro',
      description: textError,
      status: 'error',
      duration: 2000,
      isClosable: true
    })
  }

  return result
}
import { createContext, useEffect, useState, ReactNode, useContext } from 'react';
import { api } from '../services/api';

interface Transaction{
    id:number;
    title:string;
    amount:number;
    type:string;
    category:string;
    createdAt:string;
}
interface TransactionsProviderProps{
    children: ReactNode;
}
interface TransactionsContextData{ //o nome é "irrelevante"
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}
// interface TransactionInput{
//     title:string;
//     amount:number;
//     type:string;
//     category:string;
// }
type TransactionInput = Omit<Transaction,'id'|'createdAt'> // vão ser passados todos os dados da interface Transaction menos id e createdAt

const TransactionsContext = createContext<TransactionsContextData>(
    {} as TransactionsContextData
);
export function TransactionsProvider({children}: TransactionsProviderProps){
    const[transactions,setTransactions]=useState<Transaction[]>([]); // como são várias transactions, precisa começar com o array vazio

  useEffect(() => {
      api.get('transactions') 
      .then(response => setTransactions(response.data.transactions)) //salva os dados no estado
  },[]);

  async function createTransaction(transactionInput: TransactionInput){ //async é pra que a função espere a entrada de dados para fechar (fechar ao cadastrar)
    const response = await api.post('/transactions',{
        ...transactionInput,
        createdAt: new Date(),
    }) //importa a API / post é pq é inserção / transactions é a rota / data são os dados para inserção 
    //await para aguardar a entrada de dados para fechar
    const{transaction} = response.data; //response.data é onde ficam os dados do axios

    setTransactions([
        ...transactions,
        transaction,
    ]);
  }

  return (
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
        {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions(){ //um hook no react sempre pode utilizar de outros hooks
    const context = useContext(TransactionsContext);

    return context;
}
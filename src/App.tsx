import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";
import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { NewTransactionModal } from "./components/NewTransactionModal";
import { TransactionsProvider } from './hooks/useTransactions';
import { api } from "./services/api";
Modal.setAppElement('#root');


export function App() {
  const[isNewTransactionModalOpen,setIsNewTransactionModalOpen] = useState(false); // false pq a aplicação abre com o 'nova transação' fechado.
  
  
    function handleOpenNewTransactionModal(){
        setIsNewTransactionModalOpen(true);
    }

    function handleCloseNewTransactionModal(){
        setIsNewTransactionModalOpen(false);
    }
    
    return (
      <TransactionsProvider // para consumir o contexto dentro da aplicação (O QUÊ?) - Coloca em volta de todos os componentes, qualquer um pode consumir o contexto (O QUÊ?)
      > 
        <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
        <Dashboard />
        <NewTransactionModal 
          isOpen={isNewTransactionModalOpen}
          onRequestClose={handleCloseNewTransactionModal}
        />
        

        <GlobalStyle />
      </TransactionsProvider>
    );
}

export default App;
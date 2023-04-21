import incomeImg from '../../assets/entradas.svg';
import outcomeImg from '../../assets/saidas.svg'
import closeImg from '../../assets/botaoFechar.svg'
import Modal from 'react-modal';
import { Container , TransactionTypeContainer , RadioBox } from './styles';
import { FormEvent, useState, useContext } from 'react';
import { api } from '../../services/api';
import { useTransactions } from '../../hooks/useTransactions';
interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose:()=>void;
}

export function NewTransactionModal({isOpen,onRequestClose}:NewTransactionModalProps){
    const { createTransaction } = useTransactions();
    const[title,setTitle]=useState('');
    const[amount,setAmount]=useState(0);
    const[category,setCategory]=useState('');
    const[type,setType]=useState('deposit');

    async function handleCreateNewTransaction(event: FormEvent){ //vai ser usado para salvar os inputs -- handle vem de uma função do usuário -- toda vez que der enter no submit vai executar essa função
        event.preventDefault(); // toda vez que dá enter, o site recarrega. Para prevenir isso, usa o evento preventDefault (prevenir funcionamento padrão)
        //async é pra que a função espere a entrada de dados para fechar (fechar ao cadastrar)
        //await para aguardar a entrada de dados para fechar

        await createTransaction({
            title,
            amount,
            category,
            type,
        })

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        onRequestClose();
    }
    return(
        <Modal 
        isOpen={isOpen} //quando clicar no botao, abre o modal
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >
            <button //botão de fechar o modal
            type="button" 
            onClick={onRequestClose} 
            className="react-modal-close"
            >
                <img src={closeImg} alt="Fechar" />
            </button>

            <Container //formulário de dados
            onSubmit={handleCreateNewTransaction} // quando der enter, chama a função
            > 
                <h2>Cadastrar transação</h2>

                <input //entrada de dados 1
                    placeholder='Título' 
                    value={title} 
                    onChange={event => setTitle(event.target.value)} // pega o valor que está sendo digitado salva o valor dentro da propriedade title, que é armazenada no estado
                />

                <input //entrada de dados 2
                    type="number" 
                    placeholder="Valor"
                    value={amount} 
                    onChange={event => setAmount(Number(event.target.value))} //precisa converter o valor digitado para um número, pq o event recebe sempre uma string
                /> 

                <TransactionTypeContainer>
                    <RadioBox //botão de acrescentar valor 
                        type="button" 
                        onClick={()=>{setType('deposit')}}
                        isActive={type==='deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox //botão de retirar valor
                        type="button" 
                        onClick={()=>{setType('withdraw')}}
                        isActive={type==='withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>
                <input //entrada de dados 3
                    placeholder="categoria" 
                    value={category} 
                    onChange={event => setCategory(event.target.value)}
                />
                <button //botão final, para encerrar o acréscimo/retirada
                type="submit"
                >Cadastrar</button>
            </Container>
        </Modal>
    );
}
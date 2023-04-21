import incomeImg from '../../assets/entradas.svg';
import outcomeImg from '../../assets/saidas.svg'
import totalImg from '../../assets/total.svg'

import React,{useContext} from 'react';
import { Container } from "./styles";
import { useTransactions } from '../../hooks/useTransactions';

export function Summary(){
    const {transactions} = useTransactions();
    // const totalDeposits = transactions.reduce((acc,transaction)=>{
    //     if(transaction.type === 'deposit'){
    //         return acc+transaction.amount;
    //     }
    //     return acc;
    // },0);
    const summary = transactions.reduce((acc,transaction)=>{
        if(transaction.type==='deposit'){
            acc.deposits+=transaction.amount;
            acc.total+=transaction.amount;
        } else{
            acc.withdraws += transaction.amount;
            acc.total-=transaction.amount;
        }
        return acc;
    },{
        deposits:0,
        withdraws:0,
        total:0,
    })

    return(
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="Entradas" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', { //formata para aparecer R$6.000,00 bunitim
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.deposits)
                    }
                </strong>
            </div>

            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="Saídas" />
                </header>
                <strong>
                    -
                    {new Intl.NumberFormat('pt-BR', { //formata para aparecer R$6.000,00 bunitim
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.withdraws)
                    }
                </strong>
            </div>

            <div className = "highlight-background">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="Total" />
                </header>
                <strong>
                    {new Intl.NumberFormat('pt-BR', { //formata para aparecer R$6.000,00 bunitim
                        style: 'currency',
                        currency: 'BRL'
                    }).format(summary.total)
                    }
                </strong>
            </div>
        </Container>
    );
}
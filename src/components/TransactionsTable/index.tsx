import { useContext, useEffect, useState } from "react";
import { Container } from "./styles";
import { useTransactions } from "../../hooks/useTransactions";



export function TransactionsTable(){
    const {transactions} = useTransactions();;

    return(
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.map(transaction => {
                        return(
                            <tr key={transaction.id}>
                            <td>{transaction.title}</td>
                            <td className={transaction.type}>
                                {new Intl.NumberFormat('pt-BR', { //formata para aparecer R$6.000,00 bunitim
                                    style: 'currency',
                                    currency: 'BRL'
                                }).format(transaction.amount)}
                            </td>
                            <td>{transaction.category}</td>
                            <td>
                                {new Intl.DateTimeFormat('pt-BR').format(
                                    new Date(transaction.createdAt) //converte para o formato padrão de data
                                )}
                            </td>
                        </tr>
                        )
                    })}
                </tbody>

            </table>
        </Container>
    );
}
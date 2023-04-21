import React from 'react';
import ReactDOM from 'react-dom/client';
import { Model, createServer } from 'miragejs';
import App from './App';

createServer({
  models:{ //acessar o banco de dados do mirage
    transaction: Model
  },

  seeds(server){ // tornando a aplicação mais amigável - salvando o bd com alguns dados já de início
    server.db.loadData({ //aqui insere o nome da tabela no plural(nome do model)
      transactions: [
        {
          id:1,
          title: 'Freelance de website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00'),
        },
        {
          id:2,
          title: 'Aluguel',
          type: 'withdraw',
          category: 'Moradia',
          amount: 1100,
          createdAt: new Date('2021-01-14 11:08:54'),
        }
      ]
    })
  },

  routes() {
    this.namespace='api';
    this.get('/transactions',() => {
      return this.schema.all('transaction') //vai retornar todas as transações que tem dentro do bd
    })

    this.post('/transactions', (schema,request)=>{ // o request tem os dados 
      const data = JSON.parse(request.requestBody) // o JSON.parse é pq os dados pelo request vem em forma de texto, mas a comunicação é em JSON

      return schema.create('transaction',data); //schema é o bd / 1 - model que está inserindo (transaction) 2 - dados
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

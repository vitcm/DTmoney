import styled from "styled-components";
import { darken , transparentize } from "polished";

export const Container=styled.form`
    h2{
        color:var(--text-title);
        font-size: 1.5rem;
        margin-bottom: 2rem;
    }

    input{
        width: 100%; //define que vai ocupar a largura máxima permitida
        padding: 0 1.5rem; // coloca o texto padrão dentro da caixa mais longe da borda
        height: 4rem; //aumenta a altura da caixa de texto
        border-radius: 0.25rem; // coloca curva nas pontas das caixas de texto
        border: 1px solid #d7d7d7; //edita a linha da borda da caixa de texto 
        background: #e7e9ec;
        font-weight: 400;
        font-size: 1rem;

        &::placeholder{
            color: var(--text-body);
        }

        & + input{
            margin-top: 1rem;
        }
    }
    button[type="submit"]{
        width: 100%;
        padding: 0 1.5rem;
        height: 4rem;
        background: var(--green);
        color: #FFF;
        border-radius: 0.25rem;
        border:0;
        font-size:1rem;
        margin-top: 1.5rem;
        font-weight: 600;

        transition: filter 0.2s;

        &:hover{
            filter: brightness(0.9);
        }
    }
`;

export const TransactionTypeContainer = styled.div`
    margin: 1rem 0; // distancia dos outros componentes
    display: grid; //deixa o botão no tamanho da largura total
    grid-template-columns: 1fr 1fr; // coloca duas colunas, uma pra cada botão
    gap: 0.5rem; //separa um botão do outro
`;

interface RadioBoxProps{
    isActive:boolean;
    activeColor:'green'  | 'red'; //define que as cores que podem ser aceitas recebem o nome de 'green' e 'red'
}

const colors={ //define as corees que vao no botão
    green:'#33cc95',
    red:'#E62E4D'
}

export const RadioBox = styled.button<RadioBoxProps>`
    height: 4rem;
    border: 1px solid #d7d7d7;
    border-radius: 0.25rem;
    background:${(props)=>props.isActive 
    ? transparentize(0.7, colors[props.activeColor]) //deixa o fundo do botão com 70% de transparência
    : 'transparent' // background:${()=> a ? b : b} significa: se a, então b, senão c
    };
    display: flex;
    align-items: center;
    justify-content: center;

    //transition: border-color 0.9s;
    &:hover{
        border-color: ${darken(0.1,'#d7d7d7')};
    }

    img{
        width: 20px;
        height: 20px;
    }

    span{ //edita o texto dentro dos botões
        display: inline-block;
        margin-left: 1rem;
        font-size: 1rem;
        color: var(--text-title);
    }
`;
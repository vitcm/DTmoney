import styled from "styled-components";

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr); // três colunas, todas de tamanhos iguais
    gap: 2rem; // espaçamento entre os itens do grid
    margin-top: -7rem; // coloca ele em cima do header

    div{
        background: var(--shape);
        padding: 1.5rem 2rem;
        border-radius: 0.25rem;
        color: var(--text-title);
    
        header{
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        strong{
            display: block;
            margin-top: 1rem;
            font-size: 2rem;
            //font-weight: normal;
            line-height: 3rem;
        }

        &.highlight-background{
            background: var(--green);
            color: #fff;
        }
    }
`
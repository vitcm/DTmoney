import styled from "styled-components";

export const Container = styled.header`
 background: var(--blue);
`

export const Content = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    padding: 2rem 1rem 12rem;
    display: flex; 
    align-items: center; // alinha a logo e o botão verticalmente no centro
    justify-content: space-between; // espaço entre o botão e a logo
    
    button{
        font-size: 1rem;
        color: #fff;
        background: var(--blue-light);
        border: 0;
        padding: 0 2rem;
        border-radius: 0.25rem;
        height: 3rem;

        transition: filter 0.2s;

        &:hover{
            filter: brightness(0.9)
        }
    }
`
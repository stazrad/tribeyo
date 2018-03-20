import styled from 'styled-components'

export const Loader = styled.div`
    display: ${props => props.loading ? 'block' : 'block'};
    position: absolute;
    background-image: url('images/spinner.svg');
    z-index: 999;
    width: 15%;
    min-width: 100px;
    max-width: 180px;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
`

import styled from 'styled-components'

export const Loader = styled.div`
    display: ${props => !props.loading ? 'block' : 'none'};
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 998;
    background-color: rgb(0, 0, 0, 0.8);
    &:after {
        position: absolute;
        content: url('images/spinner.svg');
        z-index: 999;
        width: 15%;
        min-width: 100px;
        max-width: 180px;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
    }
`

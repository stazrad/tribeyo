import styled from 'styled-components'

export const Input = styled.input`
  display: block;
  border-radius: 5px;
  color: ${props => props.theme.alt};
  border: 3px solid
    ${props => (props.error ? props.theme.error : props.theme.neutral)};
  outline: none;
  font-size: 16px;
  margin: auto;
  margin-top: 16px;
  width: 92%;
  height: 20px;
  padding: 10px;
  transition: all 0.2s;
`

export const Loader = styled.div`
  display: ${props => (props.loading ? 'block' : 'none')};
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 998;
  background-color: rgb(0, 0, 0, 0.8);
  &:after {
    position: absolute;
    display: block;
    content: url(images/spinner.svg);
    z-index: 999;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    padding-top: 50%;
    margin: auto;
  }
`

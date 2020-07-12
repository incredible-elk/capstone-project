import styled from 'styled-components'
import imagePathPlus from '../images/plus.svg'

const Button = styled.button`
  margin: 10px 0 0 20px;
  padding: 5px;
  width: 75%;
  height: 30px;
  background: var(--summergreen);
  opacity: 90%;
  border: none;
  border-radius: 4px;
  text-align: center;
  font-family: var(--app);
  font-size: 1rem;
  color: var(--background);
`

export const AddButton = styled(Button)`
  background: url(${imagePathPlus}) no-repeat;
  background-position: left 5px top 7px;
  color: var(--summergreen);
  text-align: start;
  padding-left: 36px;

  :focus {
    outline: 1px var(--background) solid;
  }
`

export default Button

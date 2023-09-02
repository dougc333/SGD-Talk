import styled, {css} from 'styled-components'


export const MessageStyles = styled.div`
  border:1px solid white;
  border-radius:4px;
  padding:10px;
  box-sizing: border-box;
  margin: 5px 0;
`
type ContextMenuProps = {
  top: number;
  left: number;
}
export const ContentMenu = styled.div<ContextMenuProps>`
  box-sizing: border-box;
  border-radius:4px;
  padding:10px;
  position:absolute;
  width:200px;
  background-color:#383838;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.1);
  ${({top, left})=>css`
  top:${top}px;
  left:${left}px; /* left out the semicolon difficult to debug*/
  `}
`


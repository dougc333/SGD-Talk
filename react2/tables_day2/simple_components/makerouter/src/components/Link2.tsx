


export const Link2 = ({to,children})=>{
  const prevDefault=((e)=>{
    e.preventDefault();
    window.history.pushState({},"",to)
    const loc=new PopStateEvent('navigate')
    window.dispatchEvent(loc)
  })
  return (<a href = {to} onClick = {prevDefault}>{children}</a>)
}

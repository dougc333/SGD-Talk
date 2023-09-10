

export const Link = ({to, children})=>{
  console.log("Link to:",to)
  console.log("Link children:",children)
  
  const preventReload=(e)=>{
    e.preventDefault()
    console.log("preventReload")
    window.history.pushState({},"",to)
    const navigationEvent = new PopStateEvent("navigate")
    window.dispatchEvent(navigationEvent)

  }

  return(
    <a href={to} onClick={preventReload}>
      {children}
    </a>
  )
}

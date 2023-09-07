import './FlexOneLevel.css'



export const FlexOneLevel = ()=>{
  return(
  <>
  <div className="parent">
    <div className="custom" >One</div>
    <div className="custom" style={{width:100, height:100, border:'1px solid red' }}>Two</div>
    <div className="custom" style={{width:100, height:100, border:'1px solid red' }}>Three</div>
  </div>
  <div>
   <div>First Level(One)</div>
   <div>Second Level(Two)</div>
   <div>Third Level(Three)</div>
  </div>
 </>
  )
}
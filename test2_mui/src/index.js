import * as React from 'react'
import Button from '@mui/material/Button'
import * as ReactDOM from "react-dom/client";

export default function MyApp(){
  return (
    <div>
      <Button variant="contained">asdfads</Button>

    </div>
  );
}


ReactDOM.createRoot(document.querySelector("#app")).render(
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>
);

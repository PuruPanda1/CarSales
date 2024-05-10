import React, {useEffect, useState} from "react";

function App() {
  
  const [data, setData] = useState([{}])

  // calling API for the information
  useEffect(()=>{
    fetch("/info").then(
      response => response.json()
    ).then(
      backendData => {
        setData(backendData)
      }
    )
  },[])

  return (
    <div>
      Working
    </div>
  )
}

export default App
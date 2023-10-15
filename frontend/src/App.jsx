import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'



function MyButton(){
  function handleClick(e){
    fetch('http://127.0.0.1:3000/api/user/info').then((res)=>{
      res.json().then(data =>{
        console.log(data)
      })
    })
  }

  return(
    <Button variant='primary'>Click Me</Button>
  )
}


function App() {
  

  return (
    <>
    <div>
      <MyButton />
    </div>
    </>
  )
}

export default App

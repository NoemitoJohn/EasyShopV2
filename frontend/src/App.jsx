import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'


function Login(e){

  function handleSubmit(e){
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    console.log(formData.entries())
    // const formJson = Object.fromEntries();
    // console.log(formJson)
  }

  return(
    <form method="post" onSubmit={handleSubmit}>
      
        <input type="email" name="email" placeholder='test@gmail.com'/>
        <input type="password" name="password"/>
        <input type="submit" value="login" />
    </form>
  )

}


function MyButton(){
  function handleClick(e){
    fetch('http://127.0.0.1:3000/api/user/info').then((res)=>{
      res.json().then(data =>{
        console.log(data)
      })
    })
  }

  return(
    <button onClick={handleClick}>Get Products</button>
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

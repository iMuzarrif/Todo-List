import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'

function App() {
  const [display, setDisplay] = useState('')
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  function complete(){
    
  }
  function handleAdd(e) {
    if(!todo.trim()==''){
      setTodos([...todos, { todo, isCompleted: false}])
    }
    setTodo('')
  }
  function handleDelete() {
    setDisplay('')
  }
  function handleChange(e) {
    setTodo(e.target.value)
  }
  function handleEdit() {

  }

  return (
    <>
      <Navbar />
      <div className='relative todoContainer min-h-110 w-1/2 text-white   bg-gray-900 mx-auto my-2 p-1'>
        <div className="head flex w-8/9 mx-auto justify-between ">
          <div className="left flex flex-col gap-2">
            <h2 className=' text-3xl'>Daily Todo List</h2>
            <p className=' text-xs'>Practice Design Everyday</p>
          </div>
          <div className=""><img className='w-20' src="https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png" alt="" /></div>
        </div>
        {/* Horizontal Line */}
        <hr className='w-8/9 mx-auto mt-3' />

        {/* Todo List.......... */}

        <h2 className=' text-center'>To do list</h2>
        {todos.map((items) => {
          return (
            <div className=" text-white todoList w-8/9 mx-auto my-2 flex justify-between">
              <div className="todo flex w-full gap-3 ">
                <svg className='invert' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="24" color="#000000" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                </svg>
                <p className={items.isCompleted? " line-through":""}> {items.todo}</p>
                
                {/* <button className='cursor-pointer mr-0.5 hover:border-1 h-[30px] sm:h-[30px] max-w-24 w-1/4 md:h-[30px] bg-violet-300' onClick={handleDelete}></button> */}
                {/* <button onClick={handleEdit}>Edit</button> */}
              </div>
              <span><svg onClick={complete} className=' cursor-pointer relative left-0 invert' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="24" color="#000000" fill="none">
                  <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg></span>
            </div>
          )
        })}

        {/* Input Field */}
        <div className=" absolute bottom-0 w-8/9 left-1/2 -translate-x-1/2 text-black items-center flex gap-2 m-3">
          <input onChange={handleChange} value={todo} className=' overflow-hidden text-white placeholder:text-blue-400 w-3/4  bg-gray-600 h-[50px] sm:h-[35px] md:h-[45px] p-1 rounded-l px-2  outline-none ' type="text" placeholder=' Add a task' name="" id="" />
          <button onClick={handleAdd} className=' cursor-pointer mr-0.5 hover:border-1 h-[50px] sm:h-[35px] max-w-24 w-1/4 md:h-[40px] bg-violet-300 p-1'>Add Task</button>
        </div>
      </div>
    </>
  )
}

export default App

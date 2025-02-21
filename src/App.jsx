import { useEffect, useState, useRef } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
// ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

function App() {
  // const [display, setDisplay] = useState('')
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const inputRef = useRef(null)
  const [finished, setfinished] = useState(false);


  // To get the list from local storage
  useEffect(() => {
    let todosString = localStorage.getItem('todos')
    if (todosString) {
      console.log(todosString);
      let todos = JSON.parse(todosString)
      setTodos(todos)


    }
  }, [])

  const toggleFinished=(()=>{
    setfinished(!finished)
    
  })

  const saveTodos = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  // Adding list through handleadd function
  function handleAdd() {
    if (todo.trim() !== '') {
      const newTodo = { id: uuidv4(), todo, isCompleted: false };

      setTodos((prevTodos) => {
        const updatedTodos = [...prevTodos, newTodo];
        localStorage.setItem("todos", JSON.stringify(updatedTodos)); // Save immediately
        return updatedTodos;
      });

      setTodo('');
    }
  }

  function handleDelete(id) {
    setTodos(todos.filter((item) => {
      return (item.id !== id)
    }))

    saveTodos()
  }
  function handleChange(e) {
    setTodo(e.target.value)
  }

  function handleEdit(id) {
    let todoItem = todos.find((item) => item.id === id);
    if (todoItem) {
      setTodo(todoItem.todo);
      setTodos(todos.filter((item) => item.id !== id));
    }
    setTimeout(() => {
      inputRef.current.focus()
    }, 0);
    saveTodos()
  }
  function complete(id) {
    setTodos(todos.map((todo) => {
      return todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo;
    }));
    saveTodos()
  }
  // useEffect(() => {
  //   localStorage.setItem('todos', JSON.stringify(todos));
  // }, [todos]); // Runs whenever `todos` changes


  return (
    <>
      <Navbar />
      <div className='relative main h-[90vh] max-h-[95vh] min-h[60vh] w-3/5 text-white   bg-gray-900 mx-auto my-2 p-1'>
        <div className="head sticky h-[14%] z-10 flex w-8/9 mx-auto top-0 justify-between ">
          <div className="left flex flex-col gap-2">
            <h2 className=' text-3xl'>Daily Todo List</h2>
            <p className=' text-xs'>Practice Design Everyday</p>
          </div>
          <div className=""><img className='w-20' src="https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png" alt="" /></div>
        </div>


        <div className=" h-[7%]">
          <hr className='w-8/9 mx-auto mt-3' />
          <h2 className=' text-center mt-1'>To do list</h2>
          <input onChange={toggleFinished} className=' ml-6' type="checkbox" checked id="" /> Checkbox
        </div>


        <div className="todolistContainer -z-10  h-[67%] customScrollbar overflow-y-scroll">
          {todos.length === 0 && <div className='m-5  '>Set Your To Do</div>}
          {todos.map((items) => {
            return (
              <div className="  text-white todoList break-words  w-8/9 mx-auto my-3 flex justify-between">
                <div className="todo flex w-full gap-3 ">
                  <svg onClick={() => complete(items.id)} className='cursor-pointer invert' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="24" color="#000000" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                  </svg>
                  <p className={items.isCompleted ? " line-through break-words max-w-[87.5%]" : "break-words max-w-[87.5%]"}> {items.todo}</p>
                  {/* <button className='cursor-pointer mr-0.5 hover:border-1 h-[30px] sm:h-[30px] max-w-24 w-1/4 md:h-[30px] bg-violet-300' onClick={handleDelete}></button> */}
                  {/* <button onClick={handleEdit}>Edit</button> */}
                </div>
                <span className='flex gap-3'>
                  <svg onClick={() => handleDelete(items.id)} className=' cursor-pointer relative  invert' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="24" color="#000000" fill="none">
                    <path d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <svg onClick={() => handleEdit(items.id)} className='invert cursor-pointer' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                    <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M11 20H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                  </svg>
                </span>
              </div>
            )
          })}
        </div>

        {/* Input Field */}
        <div className=" absolute bottom-0 w-8/9 left-1/2 -translate-x-1/2 text-black items-center flex gap-2 z-10 mb-4">
          <input onChange={handleChange} value={todo} ref={inputRef} className=' overflow-hidden text-white placeholder:text-blue-400 w-3/4  bg-gray-600 h-[50px] sm:h-[35px] md:h-[45px] p-1 rounded-l px-2  outline-none ' type="text" placeholder=' Add a task' name="" id="" />
          <button onClick={handleAdd} className=' cursor-pointer mr-0.5 hover:border-1 h-[50px] sm:h-[35px] max-w-24 w-1/4 md:h-[40px] bg-violet-300 p-1'>Add Task</button>
        </div>
      </div>
    </>
  )
}

export default App

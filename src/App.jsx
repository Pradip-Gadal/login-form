import React, { useReducer } from 'react'

const initialState = {
  userName: '',
  password: '',
  logIn: false,
  err: false,
}

const reducer = (state, action) => {
  switch(action.type){
    case 'USERNAME':
      return {
        ...state,
        userName: action.payload,
        err: false
      }
    case 'PASSWORD':
      return {
        ...state,
        password: action.payload,
        err: false
      }
    case 'LOGIN':
      return {
        ...state,
        logIn: action.payload,
        err: false,
      }
    case 'ERROR':
      return {
        ...state,
        err: action.payload,
      }
    case 'LOGOUT':
      return{
        ...state,
        logIn: false,
        userName: '',
        password: '',
      }
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  console.log(state)

  // on Submitting form
  const formHandler = (e) => {
    e.preventDefault();
    
    (state.userName ==='Admin' && state.password === 'React@')
    ? dispatch({type: 'LOGIN', payload: true})
    : dispatch({type: 'ERROR', payload: 'username and password invalid'})
  }

  return (
    <section className='flex m-auto justify-center items-center h-screen w-screen bg-gradient-to-bl from-yellow-300 to-gray-900'>
      {state.logIn
      ? <div className='flex flex-col gap-10 justify-center items-center'>
          <h1 className='text-3xl font-bold'>hello! {state.userName}, you have sucessfully login.....</h1>
          <button onClick={() => 
          dispatch({type: 'LOGOUT'})}
          className='m-auto px-6 py-1 bg-red-500 border-2 border-black font-bold'>Logout!</button>
        </div>
      : <form onSubmit={formHandler}
          className='flex flex-col gap-5'>
          <div className='text-sm text-red-500'>{state.err}</div>
          <input type='text' placeholder='username' onChange={(e) => 
          dispatch({type:'USERNAME', payload: e.target.value})}
          className='px-1 placeholder:px-1'
          />
          <input type='text' placeholder='password' onChange={(e) => 
          dispatch({type: 'PASSWORD', payload: e.target.value})}
            className='px-1 placeholder:px-1'
          />
          <input type='submit'
            className='border border-black bg-gray-600 text-white font-bold'
          />
        </form>}
    </section>
  )
}

export default App

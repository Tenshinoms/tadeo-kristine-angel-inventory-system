import { useState } from "react"
import { login } from "./api/users";
import { useNavigate } from "react-router-dom";

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    
    if (username == '' || password == '') {
      setErrorMessage("Username and Password is required!");
      setShowMessage(true);
    }
    else {
      const response = await login(username, password);

      if (response) {
        navigate('/inventory');
      }

      else {
        setErrorMessage("Invalid Username or Password!");
      }

      setShowMessage(true);
    }
  }

  return (
    <>
      <div className="w-screen h-screen bg-zinc-900 p-5 font-mono">
      <div className="pt-16 pb-6 text-4xl font-bold font-serif tracking-wider text-center text-white">Pluton Technologies</div>

      <div className="flex justify-center item-center">
        <div className="bg-gradient-to-b from-zinc-800 to-zinc-700  text-white rounded-2xl border-2 border-white w-[30%] h-[300px] m-5 content-center self-center">
          <h1 className="p-2 m-2 text-3xl tracking-wide font-bold font-serif text-center text-sky-500">User Login</h1>

        {
          showMessage &&
          (
          <div className= "m-2 px-3 rounded-lg text-center bg-red-200 text-red-700" >
            { errorMessage }
          </div>
          )
        }
          

          <div className="flex gap-3 m-5 justify-center">
            <p className="text-md">Username</p>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="ml-3 p-1 rounded border border-gray-500 text-black"></input>
          </div>

          <div className="flex gap-4 m-5 justify-center">
            <p className="text-md">Password</p>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="ml-3 p-1 rounded border border-gray-500 text-black"></input>
          </div>

        <div className="flex justify-center">
          <button onClick={handleLogin} className="bg-sky-300 text-sky-950 font-medium text-lg p-3 px-32 m-3 rounded-xl hover:bg-sky-500 hover:text-white hover:cursor-pointer">Login</button>
        </div>

        </div>
        </div>
      </div>
    </>
  )
}

export default App;
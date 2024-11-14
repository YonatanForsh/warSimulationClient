import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redax/store';
import { useNavigate } from 'react-router-dom';
import { fetchLogin } from '../../redax/slices/attackSlice';

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.user);
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    if (!user?._id) return
    {!user.org.name.includes("IDF") && navigate('/controlAttack')
      user.org.name.includes("IDF") && navigate('/controldefence')
    }
  }, [user]);

  return (
    <div className='login'>
      <h1>War Simulator</h1>
      <h2>Login</h2>
      <p>User Name</p>
      <input type="text" placeholder='user name' value={username} onChange={(e) => setUserName(e.target.value)}/>
      <p>Password</p>
      <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      <button  onClick={() => dispatch(fetchLogin({ username , password }))}>Login</button>
    </div>
  )
}

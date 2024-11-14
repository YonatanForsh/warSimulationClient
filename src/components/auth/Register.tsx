import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redax/store';
import { useNavigate } from 'react-router-dom';
import { fetchRegister } from '../../redax/slices/attackSlice';

function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const { user } = useAppSelector((state) => state.user);
  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [selectedOrg, setSelectedOrg] = useState("");
  const [selectedLoc, setSelectedLoc] = useState("");

  const handleOrgChange = (e: any) => {
    setSelectedOrg(e.target.value);
  };

  const handleLocChange = (e: any) => {
    setSelectedLoc(e.target.value);
    setSelectedOrg("IDF - " + e.target.value)
  };


  return (
    <div>
      <div className='register'>
        <h1>War Simulator</h1>
        <h2>Register</h2>
        <p>User Name</p>
        <input type="text" placeholder='user name' value={username} onChange={(e) => setUserName(e.target.value)}/>
        <p>Password</p>
        <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
        <p>Organization</p>
        <select name="organization" onChange={handleOrgChange}>
          <option value="IDF">IDF</option>
          <option value="Hezbollah">Hezbollah</option>
          <option value="Hamas">Hamas</option>
          <option value="IRGC">IRGC</option>
          <option value="Houthis">Houthis</option>
        </select>  
        { selectedOrg.includes("IDF") && (
          <>
            <p>Area</p>
            <select name="area" onChange={handleLocChange}>
              <option value="North">North</option>
              <option value="South">South</option>
              <option value="Center">Center</option>
              <option value="West Bank">West Bank</option>
            </select>
          </>
        )}
      </div>
      <button  onClick={() => dispatch(fetchRegister({ username , password, org: selectedOrg, location: selectedLoc }))}>Register</button>
    </div>
  );
}

export default Register;

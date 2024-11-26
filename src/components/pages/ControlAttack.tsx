import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redax/store';
import { useNavigate } from 'react-router-dom';
import { fetchAttackShut } from '../../redax/slices/actionSlice';

export default function ControlAttack() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.user);
  const [selectedLoc, setSelectedLoc] = useState("North");
  const ammo = user?.org.resources
  const org = user?.org.name

  useEffect(() => {
    if (!user?._id)
      navigate("/login")
  }, [])


  const shutAttack = (missileName: string) => {
    if (user?._id) {
      dispatch(fetchAttackShut({ user_id: user?._id, missileName: missileName, area: selectedLoc }))
    }
  }

  const handleLocChange = (e: any) => {
    setSelectedLoc(e.target.value);
  };

  return (
    <div className='controlAttack'>
      Control Attak
      <h2>Organization: {org}</h2>
      <p>available ammo</p>
      <div className='headAttack'>
        <select name="" id="" onChange={handleLocChange}>
          <option value="">North</option>
          <option value="">South</option>
          <option value="">Center</option>
          <option value="">West Bank</option>
        </select>
        {
          ammo?.map((a: any, index) => (
            <p key={index} onClick={() => shutAttack(a.name)}>{a.name}{a.amount}</p>
          ))
        }
      </div>
      <div>
        <p>Launched Rockets</p>
        <table>
          all missiles
        </table>
      </div>
    </div>
  )
}

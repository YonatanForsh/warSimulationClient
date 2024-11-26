import { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../redax/store';
import { fetchActions, fetchIntercept } from '../../redax/slices/actionSlice';
import { IAction } from '../../types/redux';
import { socket } from '../../main';
import { useNavigate } from 'react-router-dom';

export default function ControlDefence() {
  const { user } = useAppSelector((state) => state.user);
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const { action } = useAppSelector((state) => state.action);
  const [attacks, setAttacks] = useState<IAction[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const org = user?.org.name;

  useEffect(() => {
    if (!user?._id)
      navigate("/login")
  }, [])


  useEffect(() => {
    dispatch(fetchActions());
  }, [dispatch]);


  socket.on("returnAttack", () => {    
    dispatch(fetchActions())
  })


  useEffect(() => {
    if (action && action.length > 0) {
      setAttacks(action);
    }
  }, [action]);

  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setAttacks((prevAttacks) =>
          prevAttacks.map((attack) =>
            attack.speed > 0
              ? { ...attack, speed: attack.speed - 1 }
              : attack
          )
        );
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  if (!attacks || attacks.length === 0) {
    return <p>Loading actions...</p>;
  }

  const intercept = (actionId: string) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null; 
    }
    if (user){
    dispatch(fetchIntercept({ action_id: actionId, intercept_id: user?._id  }));
    }
  };

  return (
    <div className='controlDefence'>
      <h2>Organization: {org}</h2>
      <div>
        <p>available ammo</p>
        <select name="" id="">
          <option value="">North</option>
          <option value="">South</option>
          <option value="">Center</option>
          <option value="">West Bank</option>
        </select>
      </div>
      <div>
        <p>Launched Rockets</p>
        <table>
          <thead>
            <tr>
              <th>ROCKETS</th>
              <th>TIMETOHIT</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {attacks.map((item, index) => (
              <tr key={index}>
                <td>{item.missile}</td>
                <td>{item.speed > 0 ? item.speed : '0'}</td>
                <td onClick={() => intercept(item._id)}>
                  {item.status} {item.status === 'inAir' && '❌'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redax/store';
import { fetchActions, fetchIntercept } from '../../redax/slices/actionSlice';
import { IAction } from '../../types/redux';

export default function ControlDefence() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { action } = useAppSelector((state) => state.action);
  const [attacks, setAttacks] = useState<IAction[]>([]);
  const org = user?.org.name;

  useEffect(() => {
    dispatch(fetchActions());
  }, [dispatch]);

  useEffect(() => {
    if (action && action.length > 0) {
      setAttacks(action);
    }
  }, [action]);

  if (!attacks || attacks.length === 0) {
    return <p>Loading actions...</p>;
  }

  const intercept = (actionId: string) => {
    dispatch(fetchIntercept({ action_id: actionId }))
  }


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
                <td>{1}</td>
                <td onClick={ () => intercept(item._id)}>{item.status} {item.status == "inAir" && "❌"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

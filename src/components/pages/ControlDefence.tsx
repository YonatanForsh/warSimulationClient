import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redax/store';
import { fetchActions } from '../../redax/slices/actionSlice';
import { socket } from '../../main';
import { IAction } from '../../types/redux';

export default function ControlDefence() {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { action } = useAppSelector((state) => state.action);
  const [attacks, setAttacks] = useState<IAction[]>([])
  const org = user?.org.name;

  useEffect( () => {
    socket.on("attacks", (attack) => {
      console.log(attack);
      setAttacks(attack)
    })
  }, []);

  console.log(attacks);

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
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

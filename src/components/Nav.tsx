import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redax/store'
import { RootState } from '../redax/store'
import { useDispatch } from 'react-redux'
import userSlice from '../redax/slices/attackSlice'

export default function Nav() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const user = useAppSelector((state: RootState) => state.user)
    const logOutUser = async () => {
        localStorage.removeItem("token")
        dispatch(userSlice.actions.logOut())
        navigate("/")
    }
    return (
        <div className='nav'>
            {user.user ? (
                <>
                    {/* <NavLink to={"controlAttack"}>ControlBoard</NavLink> */}
                    {!user.user.org.name.includes("IDF") && navigate('/controlAttack')}
                    {user.user.org.name.includes("IDF") && navigate('/controldefence')}
                    <button onClick={logOutUser}>Logout</button>
                </>
            ) :
                (
                    <>
                        <NavLink to={"login"}>Login</NavLink>
                        <NavLink to={"register"}>Register</NavLink>
                    </>
                )
            }
        </div>
    )
}

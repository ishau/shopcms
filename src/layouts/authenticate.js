import React,{useEffect,useContext} from 'react'
import { AppContext } from '../contexts/AppContext';
import Simplemain from './simplemain';
import Main from './main'


export default function Authenticate() {
    const { state: appState, dispatch } = useContext(AppContext)

         useEffect(() => {
            const crapToken =localStorage.getItem('token')
            let param={
                token:crapToken,
                user:appState.user
            }
            if (crapToken && appState){
                dispatch({
                    type: 'TOKEN',
                    payload:param
                })
            }
        }, [])



        const logout =()=>{
            localStorage.removeItem('token')
            window.location.href = '/';
        }

    
      if (appState.isAuth===false){
          return (
              <div><Simplemain /></div>
          )
      } 

      if (appState.isAuth===true) {
          return (
              <div>
                <Main logout={logout}/>
              </div>
          )
      }
    
}

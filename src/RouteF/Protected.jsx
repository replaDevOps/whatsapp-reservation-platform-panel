import { useEffect } from "react"
import { isUnAuthorize } from "../shared"
import { LoginPage } from "../pages/LoginPage"

const Protected = ({ children }) => {

    useEffect(()=>{
        if(isUnAuthorize())
            localStorage.clear()
    },[])

      if (isUnAuthorize()) {
        return <LoginPage/>
    
      }
      return children
}
export default Protected;

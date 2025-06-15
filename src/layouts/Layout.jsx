import logo from "../assets/images/speaklogo.png"
import { useUser } from "../context/userContext"

const Layout = ({ children }) => {
  const { logoutUser } = useUser()
  
  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-8">
      <div className="flex justify-between items-center">
          
        <div className="flex justify-center">
            <img src={logo} alt="logo" className="w-24" />
        </div>

        <button onClick={logoutUser} className="bg-red-500 rounded hover:bg-red-600">Logout</button>
      </div>
          
      {children}
        
    </div>
  );
};

export default Layout;

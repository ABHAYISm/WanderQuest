import React, { useState,useEffect } from "react";
import COVER_IMAGE from "../../assets/lifestyle-summer-scene-with-cartoon-design.jpg";
import PuffLoader from "react-spinners/PuffLoader";
import { useAuth } from "./service/AuthService";
import { SiYourtraveldottv } from "react-icons/si";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {

  const [email,setEmail]=useState('')
  const [password,setpassword]=useState('')
  const {login,loading,error,token,user,message,isLoggedin,isUser}=useAuth()
  const isuser=false


  useEffect(()=>{
    console.log('Loading:', loading);
    console.log('Error:', error);
    console.log('Token:', token);
    console.log('User:', user);
    console.log('Message:', message);
    console.log("isLoggedin",isLoggedin)
    console.log("isUser",isUser)
  },[loading])

  const navigate = useNavigate();

  const handleLogin=()=>{
      login(email,password,"company/login",isuser)    
    // else{
    //   login(email,password,"company/login")
    // }
    navigate('/');
  }
  const [loadingPage, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center mt-28">
          <PuffLoader color="black" loading={loading} size={100} />
        </div>
      ) : (
        <div className="w-full h-screen flex items-start p-10 bg-[#28282B]">
          <div className="w-full h-full bg-[#D8DCDB] flex rounded-[25px]">
            <div className="w-1/2 h-full flex flex-col md:block hidden">
              <img
                src={COVER_IMAGE}
                className="w-full h-full object-cover rounded-[25px] p-4"
              />
            </div>
            <div className="md:w-1/2 h-full flex flex-col p-20 bg-[#D8DCDB] justify-between items-center rounded-[25px]">
              <h1 className="text-4xl text-[#060606] font-bold mb-5">
              <div className="flex">
                  <SiYourtraveldottv className="mr-5" />
                  <a href="/">Netropolis</a>
                </div>
              </h1>

              <div className="w-full flex flex-col max-w-[600px]">
                <div className="w-full flex flex-col mb-2">
                  <h3 className="text-3xl font-semibold mb-2">Admin Login</h3>
                  <p className="text-base mb-2">
                    Welcome Back!! Please enter your details.
                  </p>
                </div>
                <div className="w-full flex flex-col">
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    onChange={(e)=>setEmail(e.target.value)}
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none text-[17px]"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e)=>setpassword(e.target.value)}
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none text-[17px]"
                  />
                </div>

                <div className="w-full flex flex-col my-4">
                  <button className="w-full bg-[#060606] rounded-full text-white font-semibold p-4 my-2 hover:scale-105 hover:opacity-90 duration-300 mt-5" onClick={handleLogin}>
                    Login
                  </button>
                  <button className="w-full bg-white rounded-full text-[#060606] border-2 border-black font-semibold p-4 my-2 hover:scale-105 hover:opacity-80 duration-300">
                    <a href="/adminsignup">Register</a>
                  </button>
                </div>
              </div>
              <div className="w-full items-center flex justify-center">
                <p className="text-sm font-normal text-[#060606]">
                  Login as a User {"- "}
                  <span className="font-semibold underline underline-offset-2 cursor-pointer">
                    <a href="/login">User Login</a>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLogin;

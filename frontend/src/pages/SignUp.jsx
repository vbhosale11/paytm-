import Button from "../components/Button";
import Header from "../components/Header";
import Inputs from "../components/Inputs";
import SubHeading from "../components/SubHeading";
import Footer from "../components/Footer";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useState} from "react";

export const SignUp = () => {
  const [firstName, setFirstName]=useState("");
  const [lastName, setLastName]=useState("");
  const [userName, setUserName]=useState("");
  const [password, setPassword]=useState("");
  const navigate = useNavigate();


  return (
    <div className="bg-slate-300 h-screen  flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center px-4">
          <Header title="Sign Up" />
          <SubHeading text={"Enter your information to create an account"} />
          <Inputs onChange={(e)=>{
            setFirstName(e.target.value)
          
          }} label={"First Name"} placeholder={"Joe"} />
          <Inputs onChange={(e)=>{
            setLastName(e.target.value)
          
          }} label={"Last Name"} placeholder={"Doe"} />
          <Inputs onChange={(e)=>{
            setUserName(e.target.value)
          
          }} label={"Email"} placeholder={"johndoe@example.com"} />
          <Inputs onChange={(e)=>{
            setPassword(e.target.value)
          
          }} label={"Password"} placeholder={"Enter your password"} />
          <div className="pt-4">
            <Button title={"Sign Up"} onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
              userName,
              firstName,
              lastName,
              password
            });
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
          }}/>
          </div>
          <Footer
            footer_line={"Already have an account?"}
            link_text={"Login"}
            link_to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

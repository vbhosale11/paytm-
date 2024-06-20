import Header from "../components/Header";
import SubHeading from "../components/SubHeading";
import Inputs from "../components/Inputs";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="bg-slate-300 h-screen  flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center px-4 pb-4">
          <Header title="Sign In" />
          <SubHeading text={"Enter your credentials to access your account"} />
          <Inputs
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            label={"Email"}
            placeholder={"Enter your email"}
          />
          <Inputs
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            label={"Password"}
            placeholder={"Enter your password"}
          />
          <div className="pt-4">
            <Button
              onClick={async () => {
                const response = await axios.post(
                  "http://localhost:3000/api/v1/user/signin",
                  {
                    userName,
                    password,
                  }
                );
                localStorage.setItem("token", response.data.token);
                navigate("/dashboard");
              }}
              title={"Sign In"}
            />
          </div>

          <Footer
            footer_line={"Already have an account?"}
            link_text={"Sign Up"}
            link_to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;

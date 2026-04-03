"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage(){
  const router = useRouter();
  const [loading,setLoading] = useState(false);
  const [errorMsg,setErrorMsg] = useState("");
  const [success,setSuccess] = useState(false);

  async function onSubmit(event:React.SyntheticEvent<HTMLFormElement, SubmitEvent>){
    event.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccess(false);

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try{
      const response = await fetch("/api/login",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data),
      });

      const result = await response.json();

      if(!response.ok){
        if(result.errors){
          const firstError = Object.values(result.error)[0] as string[];
          setErrorMsg(firstError[0]|| "Validation failed check inputs.");
        }else{
          setErrorMsg(result.message || "An unknown error occurred.");
        }
      }else{
        setSuccess(true);
        setTimeout(()=>{
         router.push("/dashboard"); 
        },2000);
      }
    }catch(err:any) {
       setErrorMsg("Failed to connect to the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
    {errorMsg && (
        <div>
          {errorMsg}
        </div>
      )}
    {success &&(
      <div>
        <span>Login done</span>
      </div>
    )}
    <form onSubmit={onSubmit} >
       <div>
        <label htmlFor='email'>
          Email Address
        </label>
        <input type='email' id='email' name='email' placeholder='elon@spacex.com'
        autoComplete='email'required/>
       </div>
        <div>
        <label htmlFor='password'>
          Email Address
        </label>
        <input type='password' id='password' name='passowrd' placeholder="••••••••" autoComplete="new-password" required/>
       </div>
       <button 
       type="submit"
       disabled={loading || success}>
        <span>
          {loading ? (
            <> Processing..</>
           
          ):(
            "Create Account"
          )}
        </span>
       </button>
    </form>
    <div>
      <p>
        Don't have an account?{" "}
        <Link href="/register">Sign in</Link>
      </p>
    </div>
    </div>
  )
}
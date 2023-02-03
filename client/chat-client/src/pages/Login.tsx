import { FormEvent, useRef } from "react";

//Context
import { useAuth } from "../context/AuthContext";

//Components
import { Button } from "../components/Button";
import { Input } from "../components/Input";

const Signup = () => {
  const { login } = useAuth();
  const usernameRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (login.isLoading) return;

    const username = usernameRef.current?.value;

    if (username == null || username === "" || name == null || name === "") {
      return;
    }

    login.mutate(username);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center">Sign Up</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end"
      >
        <label htmlFor="userName">Username</label>
        <Input id="userName" required ref={usernameRef} />

        <Button
          disabled={login.isLoading}
          type="submit"
          className="col-span-full"
        >
          {login.isLoading ? "Loading..." : "Log In"}
        </Button>
      </form>
    </>
  );
};

export default Signup;

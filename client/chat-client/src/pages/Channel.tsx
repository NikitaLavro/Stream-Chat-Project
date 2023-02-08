import React from "react";

//Components
import { FullScreenCard } from "../components/FullScreenCard";
import { Link } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

const Channel = () => {
  return (
    <FullScreenCard>
      <FullScreenCard.Body>
        <>
          <h1 className="text-3xl font-bold mb-8 text-center">
            New Converstaion
          </h1>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end"
          >
            <label htmlFor="userName">Name</label>
            <Input id="userName" required ref={nameRef} />
            <Button
              disabled={createChannel.isLoading}
              type="submit"
              className="col-span-full"
            >
              {createChannel.isLoading ? "Loading.." : "Log In"}
            </Button>
          </form>
        </>
      </FullScreenCard.Body>
      <FullScreenCard.BelowCard>
        <Link to="/">Back</Link>
      </FullScreenCard.BelowCard>
    </FullScreenCard>
  );
};

export default Channel;

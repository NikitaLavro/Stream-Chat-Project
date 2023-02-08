import React, { useRef } from "react";

//Components
import { FullScreenCard } from "../components/FullScreenCard";
import { Link } from "react-router-dom";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

//React Query
import { useMutation } from "@tanstack/react-query";

//React Select
import Select from "react-select";

const Channel = () => {
  const createChannel = useMutation({
    mutationFn: () => Promise.resolve(),
  });

  const nameRef = useRef<HTMLInputElement>(null);
  const imageUrlRef = useRef<HTMLInputElement>(null);

  return (
    <FullScreenCard>
      <FullScreenCard.Body>
        <>
          <h1 className="text-3xl font-bold mb-8 text-center">
            New Converstaion
          </h1>
          <form className="grid grid-cols-[auto,1fr] gap-x-3 gap-y-5 items-center justify-items-end">
            <label htmlFor="name">Name</label>
            <Input id="name" required ref={nameRef} />
            <label htmlFor="imageUrl">Name</label>
            <Input id="imageUrl" required ref={imageUrlRef} />
            <label htmlFor="members">Members</label>

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

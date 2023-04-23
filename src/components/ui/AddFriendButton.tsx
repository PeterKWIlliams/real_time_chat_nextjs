"use client";

import { FC, useState } from "react";
import Button from "./Button";
import { addFriendValidator } from "@/lib/add-friend";
import axios, { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { type } from "os";

interface AddFriendButtonProps {}

type FormData = z.infer<typeof addFriendValidator>;

const AddFriendButton: FC<AddFriendButtonProps> = ({}) => {
  const { register, setError, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(addFriendValidator),
  });

  const [showSuccessState, setShowSuccessState] = useState<boolean>(false);

  const addFriend = async (email: string) => {
    try {
      const valitdatedEmail = addFriendValidator.parse({ email });

      await axios.post("/api/friends/add", { email: valitdatedEmail });
      setShowSuccessState(true);
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError("email", { message: error.message });
        return;
      }
      if (error instanceof AxiosError) {
        setError("email", { message: error.response?.data });
        return;
      }
      setError("email", { message: "Something went wrong" });
    }
  };
  const onSubmit = (data: FormData) => {
    addFriend(data.email);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm">
      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        Add friend by email
      </label>
      <div className="mt-2 flex gap-4">
        <input
          {...register("email")}
          type="text"
          className="ring-focus: ms block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-indigo-500 sm:text-sm sm:leading-6"
          placeholder="you@example.com "
        />
        <Button>Add</Button>
      </div>
    </form>
  );
};

export default AddFriendButton;

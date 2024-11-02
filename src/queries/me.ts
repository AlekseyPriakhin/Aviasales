import { useCreateSingleQuery } from "@/queries";
import type { IUser } from "@/types/user";
import { useSession } from "next-auth/react";
import { useState } from "react";

const URL = '/users';

export const useMe = async () => {

  const {status} = useSession();

  return useCreateSingleQuery<IUser>({
    key: ['me'],
    url: '/users',
    itemId: 1,
    enabled: status === 'authenticated',
  });
};
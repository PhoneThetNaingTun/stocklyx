"use client";

import {
  useLazyGetMeQuery,
  useRefreshTokenMutation,
} from "@/store/Apis/authApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  removeToken,
  removeUser,
  setToken,
  setUser,
} from "@/store/Slices/authSlice";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { token } = useAppSelector((state) => state.AuthSlice);
  const [refreshAccessToken] = useRefreshTokenMutation();
  const [getMe] = useLazyGetMeQuery();

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const loadAuth = async () => {
      try {
        let accessToken = token;

        if (!accessToken) {
          const { data } = await refreshAccessToken("");
          if (!data?.accessToken) {
            dispatch(removeToken(null));
            dispatch(removeUser(null));
            router.replace("/login");
            return;
          }
          dispatch(setToken(data.accessToken));
        }

        const { data: user } = await getMe("");
        dispatch(setUser(user));

        setChecking(false);
      } catch {
        dispatch(removeToken(null));
        dispatch(removeUser(null));
        router.replace("/login");
      }
    };

    loadAuth();
  }, [token, dispatch, router, refreshAccessToken, getMe]);

  if (checking) return null;

  return <>{children}</>;
};

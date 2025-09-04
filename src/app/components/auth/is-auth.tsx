"use client";

import { FC, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getItem } from "../../helpers";



const IsAuthenticatedPage = (Component: FC) => {
  return function AuthenticatedPage(props: any) {
    const { replace } = useRouter();
    const authenticatedUser = getItem('clientD');
    const user = useMemo(() => {
      return authenticatedUser ?? null;
    }, [authenticatedUser]);

    const notify = (type: string, msg: string) => {
      if (type === "success") {
          toast.success(msg, {
          // position: toast.POSITION.TOP_RIGHT
          });
      }

      if (type === "error") {
          toast.error(msg, {
          // position: toast.POSITION.TOP_RIGHT,
          });
      }
    };

    useEffect(() => {
      if (!user) {
        notify("error", "You are not logged in!");
        replace("/login");
      }
      if (user && user.role !== 'admin') {
        notify("error", "You can not access this page!");
        replace("/login");
      }
    }, [user, replace]);

    if (!user) return null;


    if (user && user.role === 'admin') return (
      <>
        <Component {...props} />
        <ToastContainer />
      </>
    )
  };
}

export default IsAuthenticatedPage;

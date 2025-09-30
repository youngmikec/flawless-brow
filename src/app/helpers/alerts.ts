import { toast } from "react-toastify";

export const _notifySuccess = (msg: string) => toast(msg, {
    type: "success",
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
})

export const _notifyError = (msg: string) => toast(msg, {
    type: "error",
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
})
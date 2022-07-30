import React,{ useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastsMessage() {

    useEffect(() => {
        notify();
    }, [])
    
    const notify = () => toast("Feel free to Reach team PERLASO to get more features");

  return (
    <div>
      <ToastContainer
        position="bottom-right"
        autoClose={7000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
    </div>
  );
}

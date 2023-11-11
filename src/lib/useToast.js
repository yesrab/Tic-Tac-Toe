import { useEffect, useState } from "react";

export const useToast = () => {
  const [trigger, setTrigger] = useState(false);
  const [showtoast, setShowtoast] = useState(false);
  const [toastText, setToastText] = useState("Invite Link copied");

  useEffect(() => {
    if (trigger) {
      setShowtoast(true);
      var mytimeout = setTimeout(() => {
        setShowtoast(false);
      }, 5000);
    }

    return () => {
      clearTimeout(mytimeout);
    };
  }, [trigger]);

  return [showtoast, setTrigger, toastText, setToastText];
};

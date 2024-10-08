import { useEffect } from "react";

//handle dropdown on onclick outside event
// The eventlistner monitor whether the button is being clicked then triggers the handleClickOutside funtion
// The function checks if the button clicked is the current the component we want to check if not then triggers the the handler funtion
const useOutsideClick = ({ ref, handler }) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handler]);
};

export default useOutsideClick;

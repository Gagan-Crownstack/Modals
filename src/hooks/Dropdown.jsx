import { useEffect, useRef, useState } from "react";
import useOutsideClick from "./useOutsideClick";

const Dropdown = ({ id, data, selectedId, onSelect }) => {
  const [isSelected, setIsSelected] = useState();
  const [isopen, setIsOpen] = useState(false);

  //set color
  const handleClick = (color) => {
    setIsSelected(color);
    setIsOpen(!isopen);
    // set colot which will be changed globally
    onSelect(color.id);
  };

  useEffect(() => {
    //check if there is a previously Color Id then If yes then set the Id
    if (selectedId && data) {
      const newSelectedItem = data.find((item) => item.id === selectedId);
      newSelectedItem && setIsSelected(newSelectedItem);
      console.log(newSelectedItem);
      console.log(data);
    } else if (data && data.length > 0) {
      setIsSelected(data[0]);
      console.log("data", data[0]);
    }
  }, []);

  const dropdownRef = useRef(null);

  //check if the button is clicked outside then closee the dropdown
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  return (
    <div className="w-full" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isopen)} className="w-full">
        {isSelected && (
          <div className="flex items-center p-2 w-full gap-4">
            <div
              className={`w-4 h-4 rounded-full`}
              style={{ backgroundColor: `${isSelected.id}` }}
            ></div>
            <span>{isSelected.name}</span>
          </div>
        )}
      </button>
      {isopen && (
        <div className="absolute w-[269px] mt-1 rounded-md h-54 z-100 bg-white drop-shadow-xl shadow-md">
          {data &&
            data.map((color) => {
              return (
                <div
                  className="flex items-center px-4 py-2 gap-2 hover:bg-slate-200 cursor-pointer active:opacity-65"
                  key={color.id}
                  onClick={() => handleClick(color)}
                >
                  <div
                    className={`w-4 h-4 rounded-full`}
                    style={{ backgroundColor: color.id }}
                  ></div>
                  <span>{color.name}</span>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

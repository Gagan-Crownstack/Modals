import { colors } from "../common/data";
import { IoIosMail } from "react-icons/io";
import Dropdown from "../hooks/Dropdown";
import { useState } from "react";

const AdFrind = () => {
  const [formColor, setFormColor] = useState("#1e90ff"); //global color state
  return (
    <div className="p-2 h-full mt-4 flex flex-col gap-4">
      {/* heading */}
      <div className="text-4xl mb-2 font-semibold">Add Chat list</div>

      <div className="flex gap-2">
        <div className="flex flex-col w-1/2">
          <label className="font-semibold" htmlFor="">
            Name :
          </label>
          <input
            className="p-2 border-2 rounded-md"
            type="text"
            placeholder="Title"
          />
        </div>
        {/* Dropdown make a custom dropdown component */}
        <div className="flex flex-col w-1/2">
          <label className="font-semibold" htmlFor="">
            Color :
          </label>
          <div className="w-full border-2 rounded-md" name="colors" id="color">
            <Dropdown
              id="dropdown"
              data={colors}
              selectedId={formColor}
              onSelect={(color) => setFormColor(color)}
            />
          </div>
        </div>
      </div>

      {/* email div */}
      <div className="mt-4 flex flex-col gap-4">
        <label className="font-semibold" htmlFor="">
          Invite team member
        </label>
        <div className="inputDiv flex border-2 rounded-md p-2 items-center">
          <span className="text-3xl">
            <IoIosMail />
          </span>
          <input
            className="pl-4 w-11/12 h-full border-none focus:outline-none focus:border-rose-400"
            type="text"
            placeholder="Email, comma separated"
            onFocus={() => {
              document
                .querySelector(".inputDiv")
                .classList.add("border-rose-400");
            }}
            onBlur={() => {
              document
                .querySelector(".inputDiv")
                .classList.remove("border-rose-400");
            }}
          />
        </div>
      </div>

      {/* submit */}

      <div className="absolute right-6 bottom-8">
        <div className="flex gap-3 justify-end">
          <button className="px-4 py-2 border-2 font-semibold rounded-lg hover:border-red-600 active:text-white active:bg-red-600">
            Cancel
          </button>
          <button
            style={{ backgroundColor: formColor }}
            className="px-4 py-2 font-semibold text-white rounded-md hover:opacity-90 active:opacity-70"
          >
            Add List
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdFrind;

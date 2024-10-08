import { colors, peopleData } from "../common/data";
import { IoIosMail } from "react-icons/io";
import Dropdown from "../hooks/Dropdown";
import useOutsideClick from "../hooks/useOutsideClick";
import { useState, useEffect, useRef } from "react";
import Tag from "./Tag";

const AdFrind = () => {
  const [formColor, setFormColor] = useState("#1e90ff"); //global color state
  const [friendList, setfriendList] = useState([]); //display selected friendList
  const [selectedfriendList, setselectedfriendList] = useState([]); //display selected friendList
  const [query, setquery] = useState("");
  const [isSelectedUser, setIsSelectedUser] = useState(null);

  const dropdownsearchRef = useRef();

  // handle outside click
  useOutsideClick({
    ref: dropdownsearchRef,
    handler: () => setfriendList([]),
  });

  // handle search filter out on basis of name and email
  const handleSearch = () => {
    if (query && peopleData) {
      const searchData = peopleData.filter((people) => {
        const byName = people.name.toLowerCase().includes(query.toLowerCase());
        const byEmail = people.email
          .toLowerCase()
          .includes(query.toLowerCase());

        return (byName || byEmail) && people;
      });
      setfriendList(searchData);
      console.log(searchData);
    } else {
      setfriendList([]);
    }
  };

  const handleCancelBtn = () => {
    setquery("");
    setIsSelectedUser(null);
    setselectedfriendList([]);
    console.log("helloo");
  };

  const handleOnAddPerson = (person) => {
    const isExist = selectedfriendList.find((id) => person === id);
    if (!isExist) {
      setselectedfriendList((prev) => [...prev, person]);
    }
  };

  const handleOnClose = (person) => {
    if (person) {
      const data = selectedfriendList.filter((id) => id !== person);
      setselectedfriendList(data);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch();
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

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
      {/* display the selected users */}
      <div className="mt-2 flex gap-2 w-full overflow-auto">
        {selectedfriendList &&
          selectedfriendList.length > 0 &&
          selectedfriendList.map((friend, i) => {
            return (
              <Tag
                key={i}
                friend={friend}
                onClose={(person) => handleOnClose(person)}
                onSelect={(person) => setIsSelectedUser(person)}
                isSelected={isSelectedUser}
                color={formColor}
              />
            );
          })}
      </div>
      {/* email div */}
      <div className="mt-2 flex flex-col gap-4">
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
            value={query}
            onChange={(e) => setquery(e.target.value)}
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
        {/* show similar query  */}

        {friendList && friendList.length > 0 && (
          <div
            ref={dropdownsearchRef}
            className="absolute bg-white shadow-lg drop-shadow-lg w-11/12 h-[168px] rounded-md mt-[90px]"
          >
            <div className="h-full overflow-y-scroll">
              {friendList.map((person) => {
                return (
                  <div
                    key={person.id}
                    className="flex items-center px-4 py-2 gap-2 hover:bg-slate-200 cursor-pointer active:opacity-65"
                    onClick={() => handleOnAddPerson(person)}
                  >
                    <div className="w-8 h-8 rounded-full border-2">
                      <img src={`${person.url}`} alt="" />
                    </div>
                    <div>
                      <div className="text-md font-semibold">{person.name}</div>
                      <div className="text-xs ">{person.email}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {/* Manage permissions */}
      {isSelectedUser && (
        <div className="flex w-full items-center  hover:bg-slate-200 cursor-pointer">
          <div className="flex w-full px-4 py-2 gap-2 active:opacity-65">
            <div className="w-8 h-8 rounded-full border-2">
              <img src={`${isSelectedUser.url}`} alt="" />
            </div>
            <div>
              <div className="text-md font-semibold">{isSelectedUser.name}</div>
              <div className="text-xs ">{isSelectedUser.email}</div>
            </div>
          </div>
          <div>
            <select className="p-2 bg-transparent" name="" id="">
              <option value="">Can view</option>
              <option value="">Full access</option>
            </select>
          </div>
        </div>
      )}

      {/* submit */}

      <div className="absolute right-6 bottom-8">
        <div className="flex gap-3 justify-end">
          <button
            onClick={handleCancelBtn}
            className="px-4 py-2 border-2 font-semibold rounded-lg hover:border-red-600 active:text-white active:bg-red-600"
          >
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

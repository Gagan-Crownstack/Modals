import { useCallback, useState } from "react";
import toast from "react-hot-toast";
import { userSchema } from "../common/Schemas";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  // input dynamically
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShowPassword = () => {
    let pass = document.getElementById("password");
    if (pass.type === "password") {
      pass.type = "text";
    } else {
      pass.type = "password";
    }
  };

  // Handle validation and return the pass the data further
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      try {
        userSchema.parse(formData);
        console.log("Form data is valid:", formData);
        toast.success("Valid Credentials");
        setError({});
      } catch (err) {
        const fieldErrors = err.errors.reduce((acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        }, {});
        setError(fieldErrors);
      }
    },
    [formData]
  );

  return (
    <div className="h-full flex flex-col mt-4 items-center justify-center gap-5">
      <div className="text-4xl font-semibold">Sign Up</div>
      <div className="flex flex-col w-5/6 gap-2">
        <label className="font-semibold mt-2" htmlFor="username">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          className={`p-2 rounded-sm border-2 bg-gray-100 ${
            error.username ? "border-red-500" : ""
          }`}
          id="username"
          name="username"
          value={formData.username}
          type="text"
          placeholder="enter your Name"
          onChange={handleOnChange}
        />
        {error.username && (
          <span className="text-sm text-red-500">{error.username}</span>
        )}
        <label className="font-semibold mt-2" htmlFor="email">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          className={`p-2 rounded-sm border-2 bg-gray-100 ${
            error.email ? "border-red-500" : ""
          }`}
          type="email"
          name="email"
          id="email"
          value={formData.email}
          placeholder="enter your email"
          onChange={handleOnChange}
        />
        {error.email && (
          <span className="text-sm text-red-500">{error.email}</span>
        )}
        <label
          className="flex font-semibold mt-2 justify-between"
          htmlFor="password"
        >
          Password
          {/* showpasword component */}
          <span className="flex text-gray-500 gap-1 items-center">
            <input
              className="w-4 h-4"
              type="checkbox"
              name=""
              id="showPass"
              onClick={handleShowPassword}
            />
            <span>Show password</span>
          </span>
        </label>
        <input
          className={`p-2 rounded-sm border-2 bg-gray-100 ${
            error.password ? "border-red-500" : ""
          }`}
          type="password"
          name="password"
          id="password"
          value={formData.password}
          placeholder="enter your password"
          onChange={handleOnChange}
        />
        {error.password && (
          <span className="text-sm text-red-500">{error.password}</span>
        )}
        <span className="text-sm text-gray-500">* Required field</span>
        <span className="text-sm text-gray-500">
          * Password must be 6 character long
        </span>

        <button
          onClick={handleSubmit}
          className="w-max text-xl text-white rounded-md font-semibold hover:opacity-90 active:opacity-70 bg-zinc-500 mt-10 py-2 px-6 mx-auto"
        >
          {" "}
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;

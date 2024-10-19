import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handlePatientSignup } from "../Services/patientService";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    age: "",
    address: "",
    contactNumber: "",
    email: "",
    password: "",
    closestPerson: {
      firstName: "",
      lastName: "",
      address: "",
      contactNumber: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("closestPerson")) {
      const fieldName = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        closestPerson: {
          ...prevData.closestPerson,
          [fieldName]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await handlePatientSignup(formData);
      console.log("Signup response:", response.status);

      if (response.status === 201) {
        console.log("Response is 201, navigating...");
        const result = response.data;
        console.log("Signup successful:", result);
        navigate("/login");
      } else {
        const errorData = await response.data; // Adjust based on how you return error data
        console.error("Signup failed:", errorData);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      // Handle network or server errors (e.g., display generic error message)
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="mb-4 text-2xl font-bold">Patient Signup</h2>
      <form onSubmit={handleSubmit}>
        <h3 className="mb-2 text-xl font-bold">Your Details</h3>
        <div className="mb-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="date"
            name="dateOfBirth"
            placeholder="Date of Birth"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-bold text-gray-700">Gender</label>
          <div className="flex flex-row gap-2">
            <input
              type="radio"
              name="gender"
              value="Male"
              onChange={handleChange}
              required
            />
            <label>Male</label>
            <input
              type="radio"
              name="gender"
              value="Female"
              onChange={handleChange}
              required
            />
            <label>Female</label>
            <input
              type="radio"
              name="gender"
              value="Other"
              onChange={handleChange}
              required
            />
            <label>Other</label>
          </div>
        </div>
        <div className="mb-4">
          <input
            type="number"
            name="age"
            placeholder="Age"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="address"
            placeholder="Address"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />
        </div>
        <h3 className="mb-2 text-xl font-bold">
          Closest Person&apos;s Details
        </h3>
        <div className="mb-4">
          <input
            type="text"
            name="closestPerson.firstName"
            placeholder="First Name"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="closestPerson.lastName"
            placeholder="Last Name"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="closestPerson.address"
            placeholder="Address"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            name="closestPerson.contactNumber"
            placeholder="Contact Number"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;

import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import countryList from "country-list";
import Editor from "@/components/Editor"; 
import { debounce } from "lodash";

const PostJobPage = () => {
  const [jobData, setJobData] = useState({
    job_title: "",
    company_name: "",
    employment_type: "",
    experience: "",
    salary: "",
    job_location: "",
    departments: "",
    key_skills: [],
    opening: 0,
    job_description: "",
  });
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const countriesList = countryList.getData(); // Get the list of countries
    setCountries(countriesList);
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setJobData({ ...jobData, [name]: value });
  };

  const handleCommaSeparatedChange = (name, e) => {
    const value = e.target.value.split(",").map((item) => item.trim());
    setJobData({ ...jobData, [name]: value });
  };

  const handleEditorChange = useCallback(
    debounce((value) => {
      // Assuming `value` might contain HTML tags
      const cleanValue = value.replace(/<[^>]+>/g, ''); // This regex removes all HTML tags
      setJobData((prevData) => ({
        ...prevData,
        job_description: cleanValue,
      }));
    }, 300), // Adjust the debounce delay as needed
    []
  );  


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/job/",
        jobData
      );
      console.log(response);
      if (response.status === 200) {
        toast.success(response?.data?.message);
        // Optionally reset form after successful submission
        setJobData({
          job_title: "",
          company_name: "",
          employment_type: "",
          experience: "",
          salary: "",
          job_location: "",
          departments: "",
          key_skills: [],
          opening: 0,
          job_description: "",
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error?.message);
    }
  };

  return (
    <div className="container mx-auto w-full lg:max-w-5xl py-10 flex flex-col items-center justify-center">
      <div className="bg-[#020817] py-5 rounded-lg border">
        <h2 className="text-center text-4xl font-semibold">Post a Job</h2>
        <form className="mt-10" onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-2 p-4">
            {/* Job Title */}
            <div className="mb-2">
              <label>Job Title</label>
              <select
                name="job_title"
                onChange={handleChange}
                className="w-full mt-2 bg-transparent border p-2 rounded-lg"
                required
              >
                <option className="text-black" value="">
                  Select a job title
                </option>
                <option value="Software Engineer" className="text-black">
                  Software Engineer
                </option>
                <option value="Frontend Developer" className="text-black">
                  Frontend Developer
                </option>
                <option value="Backend Developer" className="text-black">
                  Backend Developer
                </option>
                <option value="DevOps Engineer" className="text-black">
                  DevOps Engineer
                </option>
                <option value="Cloud Engineer" className="text-black">
                  Cloud Engineer
                </option>
                <option value="UI/UX DESIGNER" className="text-black">
                  UI/UX DESIGNER
                </option>
              </select>
            </div>
            {/* Company Name */}
            <div className="mb-2">
              <label>Company Name</label>
              <input
                type="text"
                name="company_name"
                onChange={handleChange}
                className="w-full mt-2 bg-transparent border p-2 rounded-lg"
                placeholder="Enter company name"
                required
              />
            </div>
            {/* Employment Type */}
            <div className="mb-2">
              <label>Employment Type</label>
              <select
                name="employment_type"
                onChange={handleChange}
                className="w-full mt-2 bg-transparent border p-2 rounded-lg"
                required
              >
                <option className="text-black" value="">
                  Select an employment type
                </option>
                <option value="Full-Time" className="text-black">
                  Full-Time
                </option>
                <option value="Part-Time" className="text-black">
                  Part-Time
                </option>
                <option value="Freelance" className="text-black">
                  Freelance
                </option>
                <option value="Internship" className="text-black">
                  Internship
                </option>
              </select>
            </div>
            {/* Experience Level */}
            <div className="mb-2">
              <label>Experience Level</label>
              <select
                name="experience"
                onChange={handleChange}
                className="w-full mt-2 bg-transparent border p-2 rounded-lg"
                required
              >
                <option className="text-black" value="">
                  Select an experience level
                </option>
                <option value="Entry Level" className="text-black">
                  Entry Level
                </option>
                <option value="Junior Level" className="text-black">
                  Junior Level
                </option>
                <option value="Mid Level" className="text-black">
                  Mid Level
                </option>
                <option value="Senior Level" className="text-black">
                  Senior Level
                </option>
              </select>
            </div>
            {/* Salary */}
            <div className="mb-2">
              <label>Salary</label>
              <input
                type="number"
                name="salary"
                onChange={handleChange}
                className="w-full mt-2 bg-transparent border p-2 rounded-lg"
                placeholder="Enter salary"
                required
              />
            </div>
            {/* Job Location */}
            <div className="mb-2">
              <label>Job Location</label>
              <select
                name="job_location"
                onChange={handleChange}
                className="w-full mt-2 bg-transparent border p-2 rounded-lg"
                required
              >
                <option className="text-black" value="">
                  Select a job location
                </option>
                {countries.map((country) => (
                  <option
                    key={country.code}
                    value={country.name}
                    className="text-black"
                  >
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            {/* Department */}
            <div className="mb-2">
              <label>Department</label>
              <select
                name="departments"
                onChange={handleChange}
                className="w-full mt-2 bg-transparent border p-2 rounded-lg"
                required
              >
                <option className="text-black" value="">
                  Select a department
                </option>
                <option value="IT" className="text-black">
                  IT
                </option>
                <option value="HR" className="text-black">
                  HR
                </option>
                <option value="Marketing" className="text-black">
                  Marketing
                </option>
              </select>
            </div>
            {/* Key Skills */}
            <div className="mb-2">
              <label>Key Skills (comma separated)</label>
              <input
                type="text"
                name="key_skills"
                onChange={(e) => handleCommaSeparatedChange("key_skills", e)}
                className="w-full mt-2 bg-transparent border p-2 rounded-lg"
                placeholder="Enter key skills"
                required
              />
            </div>
            {/* Vacancy */}
            <div className="mb-2 col-span-2">
              <label>Vacancy</label>
              <input
                type="number"
                name="opening"
                onChange={handleChange}
                className="w-full mt-2 bg-transparent border p-2 rounded-lg"
                placeholder="Enter job vacancy"
                required
              />
            </div>
            {/* Job Description */}
            <div className="mb-2 col-span-2">
              <label>Job Description</label>
              <Editor
                value={jobData.job_description} // Pass the job description
                onChange={handleEditorChange} // Pass the onChange handler
              />
            </div>
          </div>
          {/* Submit Button */}
          <div className="mb-2">
            <button
              type="submit"
              className="bg-white px-4 py-2 rounded-lg text-black ml-5"
            >
              Submit
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default PostJobPage;

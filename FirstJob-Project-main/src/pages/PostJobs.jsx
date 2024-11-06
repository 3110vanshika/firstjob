import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, BookMarked } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

const PostJobs = () => {
  const [allJobs, setAllJobs] = useState([]); // State for all fetched jobs
  const [featuredJobs, setFeaturedJobs] = useState([]); // State for currently displayed jobs
  const [filters, setFilters] = useState({ // State for filters
    jobTitleSkillsCompany: "",
    jobLocation: "",
  });

  // useEffect to fetch job posts
  useEffect(() => {
    const fetchJobPosts = async () => {
      const response = await axios.get("http://localhost:8000/api/job/");
      const fetchedJobs = response.data.data;
      const reversedJobs = [...fetchedJobs].reverse(); // Reverse the order of jobs
      setAllJobs(reversedJobs); // Store all jobs in reversed order
      setFeaturedJobs(reversedJobs); // Initially display all jobs in reversed order
    };
    fetchJobPosts();
  }, []);

  // Function to handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    
    // If input is cleared, show all jobs
    if (value === "") {
      setFeaturedJobs(allJobs); // Show all jobs when input is cleared
    }
  };

  // Function to filter jobs based on the search criteria
  const handleSearch = () => {
    const filteredJobs = allJobs.filter((job) => {
      const jobTitleSkillsCompanyMatch =
        job.job_title.toLowerCase().includes(filters.jobTitleSkillsCompany.toLowerCase()) ||
        job.skills?.some(skill => skill.toLowerCase().includes(filters.jobTitleSkillsCompany.toLowerCase())) ||
        job.company_name.toLowerCase().includes(filters.jobTitleSkillsCompany.toLowerCase());

      const jobLocationMatch =
        job.job_location.toLowerCase().includes(filters.jobLocation.toLowerCase());

      return jobTitleSkillsCompanyMatch && jobLocationMatch;
    });

    setFeaturedJobs(filteredJobs); // Update the displayed jobs with filtered results
  };

  return (
    <main className="flex-grow">
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6 text-center">Find Your Dream Job</h1>
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            {/* Input for job title, skills, or company */}
            <Input
              type="text"
              name="jobTitleSkillsCompany"
              placeholder="Job title, skills, or company"
              className="flex-grow bg-slate-600 text-foreground"
              value={filters.jobTitleSkillsCompany}
              onChange={handleFilterChange} // Handle input change
            />
            {/* Input for location */}
            <Input
              type="text"
              name="jobLocation"
              placeholder="City, state, or zip code"
              className="flex-grow bg-slate-600 "
              value={filters.jobLocation}
              onChange={handleFilterChange} // Handle input change
            />
            {/* Search button */}
            <Button className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white " onClick={handleSearch}>
              <Search className="mr-2 h-5 w-5 " />
              Search Jobs
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-6">Featured Job Postings</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{job.job_title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{job.company_name}</p>
                    </div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={job.logo} alt={`${job.company_name} logo`} />
                      {/* <AvatarFallback>{job.company_name?.substring(0, 2).toUpperCase()}</AvatarFallback> */}
                    </Avatar>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {job.job_location}
                  </p>
                  <p className="text-sm">{job.experience} experience • {job.employment_type} • {job.salary}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {job.skills?.map((skill, index) => (
                      <span key={index} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <BookMarked className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button size="sm">
                      <Link to={`/JobPage/${job.id}`}>Apply Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PostJobs;

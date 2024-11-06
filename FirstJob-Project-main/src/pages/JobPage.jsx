import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookMarked } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function JobPage() {
  const { id } = useParams();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/job/single-post/${id}`);
        setJobs(response.data.data);
        console.log(response.data.data); // Check if the data is fetched correctly
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };
    fetchJobs();
  }, [id]);

  // Render loading or error state while fetching data
  if (jobs.length === 0) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  const renderJobDescription = (description) => {
    // Split the description into sections using custom delimiters
    const sections = description.split(/(Responsibilities:|Qualifications:|How to Apply:)/g).filter(Boolean);
    
    return (
      <div className="space-y-4">
        <p>{sections[0].trim()}</p> {/* Introduction */}

        {sections.map((section, index) => {
          if (section === "Responsibilities:") {
            return (
              <div key={index}>
                <h3 className="font-bold">{section}</h3>
                <ul className="list-disc pl-5">
                  {sections[index + 1]?.split('\n').filter(Boolean).map((point, idx) => (
                    <li key={idx}>{point.trim()}</li>
                  ))}
                </ul>
              </div>
            );
          } else if (section === "Qualifications:") {
            return (
              <div key={index}>
                <h3 className="font-bold">{section}</h3>
                <ul className="list-disc pl-5">
                  {sections[index + 1]?.split('\n').filter(Boolean).map((point, idx) => (
                    <li key={idx}>{point.trim()}</li>
                  ))}
                </ul>
              </div>
            );
          } else if (section === "How to Apply:") {
            return (
              <div key={index}>
                <h3 className="font-bold">{section}</h3>
                <p>{sections[index + 1]?.trim()}</p>
              </div>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <main className="flex-grow container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <section>
            <h1 className="text-3xl font-bold mb-4 text-white">{jobs[0].company_name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div>
                <h2 className="text-xl font-semibold">{jobs[0].job_title}</h2>
                <p className="text-muted-foreground">{jobs[0].job_location}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-6">
              <span className="text-sm border px-3 py-1 rounded-full">{jobs[0].employment_type}</span>
              <span className="text-sm border px-3 py-1 rounded-full">{jobs[0].experience} experience</span>
              <span className="text-sm border px-3 py-1 rounded-full">{jobs[0].salary}</span>
            </div>
            <div className="flex space-x-4">
              <Button>Apply Now</Button>
              <Button variant="outline">
                <BookMarked className="mr-2 h-4 w-4" />
                Save Job
              </Button>
            </div>
          </section>

          <Card>
            <CardHeader>
              <CardTitle>Job Description</CardTitle>
            </CardHeader>
            <CardContent>
              {renderJobDescription(jobs[0].job_description)}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>Department:</strong> {jobs[0].departments}</p>
                <p><strong>Job Type:</strong> {jobs[0].employment_type}</p>
                <p><strong>Experience:</strong> {jobs[0].experience}</p>
                <p><strong>Salary Range:</strong> {jobs[0].salary}</p>
                <p><strong>Posted Date:</strong> {new Date(jobs[0].posted_date).toLocaleDateString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default JobPage;

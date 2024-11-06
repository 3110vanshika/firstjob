import React from 'react'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bookmark, Trash2} from "lucide-react"
import { Link } from 'react-router-dom'
import jobDatabase from '@/data/jobDatabase'

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState(jobDatabase)
  const removeJob = (id) => {
    setSavedJobs(savedJobs.filter(job => job.id !== id))
  };

  return (
    <main className="flex-grow">
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-6">Saved Jobs</h1>
            {savedJobs.length === 0 ? (
              <div className="text-center py-8">
                <Bookmark className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-xl font-semibold text-gray-600">No saved jobs yet</p>
                <p className="mt-2 text-gray-500">Jobs you save will appear here</p>
                <Button className="mt-4">
                  <Link href="/PostJob">Find Jobs</Link>
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {savedJobs.map((job) => (
                  <Card key={job.id} className="border">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{job.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={job.logo} alt={`${job.company} logo`} />
                          <AvatarFallback>{job.company.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        {job.location.city}, {job.location.state}
                      </p>
                      <p className="text-sm">{job.salary}</p>
                      <p className="text-sm text-muted-foreground mt-2">Saved on: {job.dateAdded}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm" onClick={() => removeJob(job.id)}>
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove
                      </Button>
                      <Button size="sm">Apply Now</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
  )
}

export default SavedJobs;
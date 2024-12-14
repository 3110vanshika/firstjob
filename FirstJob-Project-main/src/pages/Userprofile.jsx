// ./src/ProfilePage.js
import React from 'react';
import avtar from '../assets/avtar.png';

const Userprofile = () => {
  return (
    <div className="min-h-screen p-4 flex gap-4">
      {/* Sidebar */}
      <aside className="w-1/4 bg-[#020817] border rounded-lg shadow p-4">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center">
          <img
            src={avtar}
            alt="User Avatar"
            className="w-24 h-24 rounded-full border-4"
          />
          <h2 className="mt-4 text-lg font-semibold">Name</h2>
          <p className="text-gray-600 text-sm">Designation</p>
          <p className="text-xs text-gray-400">Last updated today</p>
          <button className="mt-4 bg-blue-600 text-white text-sm py-2 px-4 rounded-lg">
            View profile
          </button>
        </div>
        

        {/* Navigation Links */}
        <nav className="mt-6 space-y-4 text-gray-700">
          <div className="flex items-center space-x-2 cursor-pointer">
            <span>🏠</span>
            <span>My home</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <span>💼</span>
            <span>Jobs</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <span>🏢</span>
            <span>Companies</span>
          </div>
          <div className="flex items-center space-x-2 cursor-pointer">
            <span>📄</span>
            <span>Blogs</span>
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">

        {/* Recommended Jobs Section */}
        <section className="bg-[#020817] border rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Recommended jobs for you</h3>
            <a href="#" className="text-blue-600 text-sm">View all</a>
          </div>
          <div className="flex space-x-4 overflow-x-auto">
            {/* Job Cards */}
            {[
              { title: "React JS Developer", company: "Integral Info", location: "Delhi / NCR", rating: 1.5 },
              { title: "Jr. Frontend Developer", company: "Transverser Labs", location: "Remote", rating: 0 },
              { title: "Technical Frontend", company: "Proveway", location: "Remote", rating: 5.0 },
            ].map((job, index) => (
              <div key={index} className="border border-gray-200 p-4 rounded-lg w-48">
                <h4 className="font-semibold text-sm">{job.title}</h4>
                <p className="text-xs text-gray-500">{job.company}</p>
                <p className="text-xs text-gray-500">{job.location}</p>
                <p className="text-yellow-500 text-sm mt-1">⭐ {job.rating}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Userprofile;

// // Importing necessary React and icon components
// import React from 'react';
// import {
//   FaDribbbleSquare,
//   FaFacebookSquare,
//   FaGithubSquare,
//   FaInstagram,
//   FaTwitterSquare,
// } from 'react-icons/fa';
// // Reusable SocialIcon component with hover effect
// const SocialIcon = ({ icon: Icon }) => (
//   <Icon className="social-icon hover:text-[#00df9a]" size={30} />
// );
// // Footer component
// const Footer = () => {
//   // Array defining the content and structure of the footer
//   const items = [
//     // Social media icons
//     { type: 'icon', icon: FaFacebookSquare },
//     { type: 'icon', icon: FaInstagram },
//     { type: 'icon', icon: FaTwitterSquare },
//     { type: 'icon', icon: FaGithubSquare },
//     { type: 'icon', icon: FaDribbbleSquare },
//     // Footer sections
//     { type: 'section', title: 'Solutions', items: ['Analytics', 'Marketing', 'Commerce', 'Insights'] },
//     { type: 'section', title: 'Support', items: ['Pricing', 'Documentation', 'Guides', 'API Status'] },
//     { type: 'section', title: 'Company', items: ['About', 'Blog', 'Jobs', 'Press', 'Careers'] },
//     { type: 'section', title: 'Legal', items: ['Claim', 'Policy', 'Terms'] },
//   ];
//   // JSX structure of the footer
//   return (
//     <div className='bg-[#000300] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300'>
//       {/* Left section with brand and social icons */}
//       <div>
//       <img src='/src/assets/logo.png' alt='Logo' className='w-20 lg:w-32 xl:w-40' />
//         <p className='py-4'>
//           Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id odit ullam iste repellat consequatur libero reiciendis, blanditiis accusantium.
//         </p>
//         <div className='flex justify-between md:w-[75%] my-6'>
//           {/* Mapping over social icons and rendering the SocialIcon component */}
//           {items.map((item, index) => (
//             item.type === 'icon' ? (
//               <SocialIcon key={index} icon={item.icon} />
//             ) : null
//           ))}
//         </div>
//       </div>
//       {/* Right section with footer content organized in sections */}
//       <div className='lg:col-span-2 flex justify-between mt-6'>
//         {/* Mapping over sections and rendering content */}
//         {items.map((item, index) => (
//           item.type === 'section' ? (
//             <div key={index}>
//               <h6 className="font-medium text-gray-100 text-xl">{item.title}</h6>
//               <ul>
//                 {/* Mapping over items in each section */}
//                 {item.items.map((subItem, subIndex) => (
//                   <li key={subIndex} className='py-2 text-sm'>{subItem}</li>
//                 ))}
//               </ul>
//             </div>
//           ) : null
//         ))}
//       </div>
//     </div>
//   );
// };
// export default Footer;
import logo from '../assets/logo.png';
import React, { useState, useEffect } from "react";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Slider from "react-slick";

// Import slick-carousel styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FooterSection = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 py-4 md:border-none">
      <button
        className="flex w-full items-center justify-between md:cursor-default"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="font-semibold">{title}</h3>
        <span className="md:hidden">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      <ul className={`mt-2 space-y-2 ${isOpen ? "block" : "hidden"} md:block`}>
        {links.map((item, i) => (
          <li key={i}>
            <a href="#" className="hover:text-blue-400">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Footer = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const businessSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const brandSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  const footerSections = [
    {
      title: "About us",
      links: ["Careers", "Employer home", "Sitemap"],
    },
    {
      title: "Help center",
      links: ["Summons/Notices", "Grievances", "Report issue"],
    },
    {
      title: "Privacy policy",
      links: ["Terms & conditions", "Fraud alert", "Trust & safety"],
    },
  ];

  return (
    <footer>
      <div class="bg-gray-800 py-4 text-gray-400">
        <div class="container px-4 mx-auto">
          <div class="-mx-4 flex flex-wrap justify-between">
            <div class="px-4 my-4 w-full xl:w-1/5">
              <a href="/" class="block w-44 mb-10">
                <div className="container mx-auto">
                  <img src={logo} alt="Logo" className="w-full h-auto" />
                </div>
              </a>
              <p class="text-justify">
             At FirstJob, we believe in empowering the next generation of professionals and fostering long-term partnerships that drive success for both individuals and organizations.
              </p>
            </div>

            <div class="px-4 my-4 w-full sm:w-auto">
              <div>
                <h2 class="inline-block text-2xl pb-4 mb-4 border-b-4 border-blue-600">Company</h2>
              </div>
              <ul class="leading-8">
                <li><a href="#" class="hover:text-blue-400">About Us</a></li>
                <li><a href="#" class="hover:text-blue-400">Terms &amp; Conditions</a></li>
                <li><a href="#" class="hover:text-blue-400">Privacy Policy</a></li>
                <li><a href="#" class="hover:text-blue-400">Contact Us</a></li>
              </ul>
            </div>
            <div class="px-4 my-4 w-full sm:w-auto">
              <div>
                <h2 class="inline-block text-2xl pb-4 mb-4 border-b-4 border-blue-600">Blog</h2>
              </div>
              <ul class="leading-8">
                <li><a href="#" class="hover:text-blue-400">Getting Started With HTML and CSS</a></li>
                <li><a href="#" class="hover:text-blue-400">What Is Flex And When to Use It?</a></li>
                <li><a href="#" class="hover:text-blue-400">How TailwindCSS Can Help Your Productivity?</a></li>
                <li><a href="#" class="hover:text-blue-400">5 Tips to Make Responsive Website</a></li>
                <li><a href="#" class="hover:text-blue-400">See More</a></li>
              </ul>
            </div>
            <div class="px-4 my-4 w-full sm:w-auto xl:w-1/5">
              <div>
                <h2 class="inline-block text-2xl pb-4 mb-4 border-b-4 border-blue-600">Connect With Us</h2>
              </div>
              <a href="#" class="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                  <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"></path>
                </svg>
              </a>
              <a href="#" class="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                </svg>
              </a>
              <a href="#" class="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                </svg>
              </a>
              <a href="#" class="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full mr-1 hover:text-blue-400 hover:border-blue-400">
                <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                  <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
                </svg>
              </a>
              <a href="#" class="inline-flex items-center justify-center h-8 w-8 border border-gray-100 rounded-full hover:text-blue-400 hover:border-blue-400">
                <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                  <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-indigo-700 py-4 text-gray-100">
        <div class="container mx-auto px-4">
          <div class="-mx-4 flex flex-wrap justify-between">

            <div class="px-4 w-full text-center sm:w-auto sm:text-left">
              Copyright © 2020
              <script>new Date().getFullYear() > 2020 && document.write("- " + new Date().getFullYear())</script>- 2022
              FirstJob. All Rights Reserved.
            </div>
            <div class="px-4 w-full text-center sm:w-auto sm:text-left">
              Made with ❤️ From India.
            </div>
          </div>
        </div>
      </div>
    </footer>
    // <footer className="bg-gray-600 text-gray-100 py-8 mt-auto">
    //   <div className="container mx-auto px-4">
    //     <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
    //       {/* Logo and Social Links */}
    //       <div className="col-span-1 md:col-span-2">
    //         <div className="mb-4">
    //           <span className="text-3xl font-bold text-blue-600">naukri</span>
    //         </div>
    //         <h3 className="font-semibold mb-2">Connect with us</h3>
    //         <div className="flex space-x-4">
    //           <a href="#" className="text-blue-600 hover:text-blue-800">
    //             <Facebook size={20} />
    //           </a>
    //           <a href="#" className="text-blue-600 hover:text-blue-800">
    //             <Instagram size={20} />
    //           </a>
    //           <a href="#" className="text-blue-600 hover:text-blue-800">
    //             <Twitter size={20} />
    //           </a>
    //           <a href="#" className="text-blue-600 hover:text-blue-800">
    //             <Linkedin size={20} />
    //           </a>
    //         </div>
    //       </div>

    //       {/* Footer Links */}
    //       <div className="col-span-1 md:col-span-3">
    //         {footerSections.map((section, index) => (
    //           <FooterSection
    //             key={index}
    //             title={section.title}
    //             links={section.links}
    //           />
    //         ))}
    //       </div>
    //     </div>

    //     {/* App Download Section */}
    //     <div className="mt-8 text-center md:text-left">
    //       <h3 className="font-semibold mb-2">Apply on the go</h3>
    //       <p className="mb-4">Get real-time job updates on our App</p>
    //       <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2">
    //         <div className="bg-black text-white px-4 py-2 rounded-md inline-block">
    //           Get it on Google Play
    //         </div>
    //         <div className="bg-black text-white px-4 py-2 rounded-md inline-block">
    //           Download on the App Store
    //         </div>
    //       </div>
    //     </div>

    //     {/* Bottom Section */}
    //     <div className="mt-8 pt-8 border-t border-gray-300">
    //       <div className="flex flex-col md:flex-row justify-between items-center">
    //         <div className="w-full md:w-auto mb-4 md:mb-0 text-center md:text-left">
    //           <div className="text-xl font-semibold mb-2">infoedge</div>
    //           <p className="text-sm mt-2">
    //             All trademarks are the property of their respective owners
    //           </p>
    //           <p className="text-sm">
    //             All rights reserved © 2024 Info Edge (India) Ltd.
    //           </p>
    //         </div>
    //         <div className="w-full md:w-auto">

    //           <h3 className="font-semibold mb-2 text-center md:text-left">
    //             Our businesses
    //           </h3>
    //           {mounted && (
    //             <Slider
    //               {...businessSettings}
    //               className="w-[600px] mx-auto"
    //             >
    //               <div className="flex justify-center items-center h-14 mx-2"> {/* Added mx-2 for horizontal margin */}
    //                 <img src="/amazon.svg" alt="Business 1" className="h-full object-contain" />
    //               </div>

    //               <div className="flex justify-center items-center h-14 mx-2"> {/* Added mx-2 for horizontal margin */}
    //                 <img src="/google.webp" alt="Business 2" className="h-full object-contain" />
    //               </div>

    //               <div className="flex justify-center items-center h-14 mx-2"> {/* Added mx-2 for horizontal margin */}
    //                 <img src="/atlassian.svg" alt="Business 3" className="h-full object-contain" />
    //               </div>

    //               <div className="flex justify-center items-center h-14 mx-2"> {/* Added mx-2 for horizontal margin */}
    //                 <img src="/microsoft.webp" alt="Business 4" className="h-full object-contain" />
    //               </div>

    //             </Slider>
    //           )}

    //         </div>
    //       </div>
    //     </div>

    //     {/* Brand Logos Carousel */}
    //     <div className="mt-8 pt-8 border-t border-gray-300">
    //       <h4 className="font-semibold mb-4 text-center">
    //         Trusted by leading brands
    //       </h4>
    //       {mounted && (
    //         <Slider {...brandSettings} className="w-full">
    //           <div className="flex justify-center px-2">
    //             <img
    //               src="/meta.svg"
    //               alt="Google"
    //               width={120}
    //               height={40}
    //               className="object-contain"
    //             />
    //           </div>
    //           <div className="flex justify-center px-2">
    //             <img
    //               src="/amazon.svg"
    //               alt="Microsoft"
    //               width={120}
    //               height={40}
    //               className="object-contain"
    //             />
    //           </div>
    //           <div className="flex justify-center px-2">
    //             <img
    //               src="/google.webp"
    //               alt="Amazon"
    //               width={120}
    //               height={40}
    //               className="object-contain"
    //             />
    //           </div>
    //           <div className="flex justify-center px-2">
    //             <img
    //               src="/microsoft.webp"
    //               alt="Apple"
    //               width={120}
    //               height={40}
    //               className="object-contain"
    //             />
    //           </div>
    //           <div className="flex justify-center px-2">
    //             <img
    //               src="/netflix.png"
    //               alt="Facebook"
    //               width={120}
    //               height={40}
    //               className="object-contain"
    //             />
    //           </div>
    //           <div className="flex justify-center px-2">
    //             <img
    //               src="/ibm.svg"
    //               alt="IBM"
    //               width={120}
    //               height={40}
    //               className="object-contain"
    //             />
    //           </div>
    //           <div className="flex justify-center px-2">
    //             <img
    //               src="/uber.svg"
    //               alt="Intel"
    //               width={120}
    //               height={40}
    //               className="object-contain"
    //             />
    //           </div>
    //         </Slider>
    //       )}
    //     </div>
    //   </div>
    // </footer>
  );
};

export default Footer;

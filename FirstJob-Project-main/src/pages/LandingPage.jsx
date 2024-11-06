import React from 'react'
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"
import logo from '../assets/logo.png'
import Footer from '@/components/footer';


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-[100dvh] ">
      <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20 px-6">

        <section className="text-center ">
          <h1 className="flex flex-col items-center justify-center gradient-title font-extrabold text-4xl sm:text-6xl lg:text-8xl tracking-tighter py-4">
            Find Your Dream Job
            <span className="flex items-center gap-2 sm:gap-6">
              and get
              <img
                src="/logo.png"
                className="h-14 sm:h-24 lg:h-32"
                alt="Hirrd Logo"
              />
            </span>
          </h1>
          <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
            Explore thousands of job listings or find the perfect candidate
          </p>
        </section>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
          <Link to={"/PostJob"}>
            <Button
              variant="blue"
              className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-60 h-14 flex items-center justify-center font-semibold text-xl"
            >
              Find Jobs
            </Button>
          </Link>
          <Link to={"/postJobPage"}>
            <Button
              variant="destructive"
              className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-60 h-14 flex items-center justify-center font-semibold text-xl"
            >
              Post a Job
            </Button>
          </Link>
        </div>
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          className="w-full py-10"
        >
          <CarouselContent className="flex gap-5 sm:gap-20 items-center">
            {companies.map(({ name, id, path }) => (
              <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
                <img
                  src={path}
                  alt={name}
                  className="h-9 sm:h-14 object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <img src="/banner.jpeg" className="w-full" />

        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-bold">For Job Seekers</CardTitle>
            </CardHeader>
            <CardContent>
              Search and apply for jobs, track applications, and more.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-bold">For Employers</CardTitle>
            </CardHeader>
            <CardContent>
              Post jobs, manage applications, and find the best candidates.
            </CardContent>
          </Card>
        </section>
        <Accordion type="multiple" className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-base">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
      <Footer />
    </div>
  )

};
export default LandingPage;

import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import companies from '../data/companies.json'
import faqs from '../data/faq.json'
import Autoplay from 'embla-carousel-autoplay'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

function LandingPage() {
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  const handleFindJobs = () => {
    if (!user) {
      // Agar logout hai to login modal/page open karo
      navigate('/?sign-in=true')
    } else if (user) {
      // Student ke liye job listing open karo
      navigate('/job-listing')
    } else {
      // Agar recruiter hai aur find jobs pe click kiya
      alert('Only students can access the Find Jobs page.')
    }
  }

  const handlePostJobs = () => {
    if (!user) {
      // Agar logout hai to login modal/page open karo
      navigate('/?sign-in=true')
    } else if (user) {
      // Recruiter ke liye post job page open karo
      navigate('/post-job')
    } else {
      // Agar student hai aur post job pe click kiya
      alert('Only recruiters can access the Post Job page.')
    }
  }

  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl sm:text-4xl lg:text-8xl font-extrabold leading-[1.5]">
          Find Your Dream Job{' '}
          <span className="flex items-center gap-2 sm:gap-6">
            and get <img className='w-15 md:w-20 mt-5' src="https://cdn-icons-png.flaticon.com/512/17215/17215332.png" alt="logo" />
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>

      <div className="flex gap-6 justify-center">
        {/* Buttons with role-based click handlers */}
        <Button variant="blue" size="xl" onClick={handleFindJobs}>
          Find Jobs
        </Button>
        <Button variant="destructive" size="xl" onClick={handlePostJobs}>
          Post Jobs
        </Button>
      </div>

      {/* Carousel */}
      <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full py-10">
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map((item) => (
            <CarouselItem key={item.id} className="basis-1/3 lg:basis-1/6">
              <img className="h-9 sm:h-14 object-contain" src={item.path} alt={item.name} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Banner image */}
      <img className="w-full" src="ai-generated.jpg" alt="" />

      {/* Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>For job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Search and apply for jobs, track applications, and more.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Post jobs, manage applications, and find the best candidates.</p>
          </CardContent>
        </Card>
      </section>

      {/* Accordion for FAQs */}
      <section className="w-full">
        <Accordion type="multiple" className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
      <CardFooter>
        <div className="text-center text-gray-500">
          <p className="text-md flex justify-between items-center mx-auto">© 2023 Job Portal. All rights reserved.</p>
        </div>
      </CardFooter>
    </main>
  )
}

export default LandingPage

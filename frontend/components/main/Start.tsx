import Hero from "@/components/main/Hero";
import Services from "@/components/main/Services";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";
import Contact from "@/components/main/Contact";
import About from "@/pages/about";

export default function Start() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
       <Navbar/>

         <Hero />
        <Services/>
        <About/>
        <Contact/>
        <Footer/>  

        
      </div>
    </main>
  );
}
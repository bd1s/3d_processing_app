import Hero from "@/components/main/Hero";
import Services from "@/components/main/Services";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";
import Contact from "@/components/main/Contact";


export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
      <Navbar/>

        <Hero />
        <Services/>
        <Contact/>
        <Footer/>
        
      </div>
    </main>
  );
}
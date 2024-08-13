import Hero from "@/components/main/Hero";
import Services from "@/components/main/Services";
import Navbar2 from "@/components/main/Navbar2";
import Footer from "@/components/main/Footer";
import Contact from "@/components/main/Contact";

export default function Home1() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Navbar2/>
        <Hero />
        <Services/>
        <Contact/>
        <Footer/>
      </div>
    </main>
  );
}

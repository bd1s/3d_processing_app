import Hero from "@/components/main/Hero";
import Services from "@/components/main/Services";


export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-20">
        <Hero />
        <Services/>
        
      </div>
    </main>
  );
}
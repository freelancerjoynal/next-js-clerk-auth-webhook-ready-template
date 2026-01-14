import Image from "next/image";
import Intro from "./components/Intro";


export default function Home() {
  return (
    <>
      <Intro />
      <div className="h-screen bg-[#0a0a0a]">
        section 1
      </div>
      <div className="h-screen bg-[#1a1a1a]">
        section 2
      </div>
    </>
  );
}

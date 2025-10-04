import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center h-[90dvh] w-[90vw] gap-12 md:gap-24">
        <div className="flex flex-col text-center">
          <h1 className="font-black text-[clamp(1rem,10vw,5rem)] md:text-[5rem] lg:text-[6rem] uppercase">Procrastimate</h1>
          <p className="text-[clamp(0.5rem,5vw,3rem)] md:text-[2.5rem] lg:text-[3.5rem]">Get things done!... eventually</p>
        </div>
        <Link href="/login" className="cursor-pointer text-[clamp(0.5rem,3vw,3rem)] px-[10vw] py-[3vw] rounded-[10vw] green-to-white md:text-[1.5rem] lg:text-[2rem] md:px-[6rem] md:py-[1.25rem] md:rounded-[3rem]">{`Try Now >`}</Link>
      </div>
      <footer className="text-[clamp(0.5rem,3vw,3rem)] md:text-[1.5rem] lg:text-[1.5rem]">
        By Mark Pakingan
      </footer>
    </div>
  );
}

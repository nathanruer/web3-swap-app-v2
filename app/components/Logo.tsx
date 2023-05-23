'use client';

import { useRouter } from "next/navigation";
import { GiSpaceship } from "react-icons/gi"

const Logo = () => {
  const router = useRouter();

  return ( 
    <div className="flex gap-1 items-center cursor-pointer hover:opacity-80
    hover:scale-110 transition" 
    onClick={() => router.push('/')}>
      <GiSpaceship color="white" size={25} />
      <div className="hidden lg:block">
        <p className="text-white font-semibold">NATHAN</p>
      </div>
    </div>
   );
}
 
export default Logo;

import Image from "next/image";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const Logo = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <div className="bg-white rounded-full p-1">
        <Image src="/logo.svg" alt="streamhub" height="80" width="80" />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-xl font-semibold text-blue-500">StreamHub</p>
      </div>
    </div>
  );
};

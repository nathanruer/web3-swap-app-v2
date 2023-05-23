import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Swap from "./components/Swap";

interface IPathParams {
  from?: string;
  to?: string;
}

interface HomeProps {
  searchParams: IPathParams
};

const Home = async ({ searchParams }: HomeProps) => {
  return(
    <>
      <Navbar />
      <Swap 
        tokenInAddress={searchParams.from}
        tokenOutAddress={searchParams.to}
      />
      <Footer />
    </>
  )
}

export default Home;

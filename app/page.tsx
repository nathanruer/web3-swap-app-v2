import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Swap from "./components/Swap";

export const metadata = {
  title: 'Swap App',
  description: 'By Nathan Ruer',
}

interface IPathParams {
  chain?: string;
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
        chain={searchParams.chain}
        tokenInAddress={searchParams.from}
        tokenOutAddress={searchParams.to}
      />
      <Footer />
    </>
  )
}

export default Home;

import Carrousel from "@/components/Carrousel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProductList from "@/components/ProductList";
import Search from "@/components/Search";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
  <>
    <Header />
    <Carrousel />
    {/* <Search/> */}
    <ProductList />
    <Testimonials />
    <Footer/>
  </>
  );
}

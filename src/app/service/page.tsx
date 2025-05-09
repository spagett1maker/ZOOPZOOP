
import QASection from "@/components/qa";
import Blog from "@/components/blog";
import BrandAboutSection from "@/components/brand";
import CTASectionWithImage from "@/components/cta";
import CollaboSection from "@/components/collabo";
import Headers from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero";

export default function Service() {
  return (
    <>
    <Headers />
    <div>
      <HeroSection />
      <CollaboSection />

      <BrandAboutSection />
      <Blog />
      <QASection />
      <CTASectionWithImage />
    </div>
    <Footer />
    </>

  );
}

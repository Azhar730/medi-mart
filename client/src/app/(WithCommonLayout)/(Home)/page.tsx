import Banner from "@/components/modules/home/Banner";
import CategoriesSection from "@/components/modules/home/CategoriesSection";
import FeaturedMedicines from "@/components/modules/home/FeaturedMedicines";
import ReviewSection from "@/components/modules/home/ReviewSection";
import Newsletter from "@/components/modules/home/NewsletterSection";
import Offers from "@/components/modules/home/Offers";
import Blogs from "@/components/modules/home/Blogs";
import Services from "@/components/modules/home/Services";

const HomePage = () => {
    return (
        <div>
            <Banner/>
            <FeaturedMedicines/>
            <CategoriesSection/>
            <Offers/>
            <Blogs/>
            <Services/>
            <ReviewSection/>
            <Newsletter/>
        </div>
    );
};

export default HomePage;
import { Link } from "react-router-dom";
import Carousel from "../components/home/carousel";
import CEOCard from "../components/home/ceoCard";
import Counter from "../components/home/counter";
import Toper from "../components/home/topper";
import Map from "../components/map";
import Courses from "./courses";
import Contact from "../components/home/contact";
import Footer from "../components/footer";










export default () => {

    return (
        <div className="home bg-[#F0FFFF]" >
            <Carousel />
            <Courses />
            <Counter />
            <Toper />
            <CEOCard />
            <Map />
            <Contact />
            <Footer />
        </div>
    )
}
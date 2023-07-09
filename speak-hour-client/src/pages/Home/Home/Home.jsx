import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import PopularClasses from "../PopularClasses/PopularClasses";
import PopularInstructor from "../PopularInstructor/PopularInstructor";
import State from "../State/State";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>
                    SpeakHour | Home
                </title>
            </Helmet>
            <Banner></Banner>
            <PopularClasses></PopularClasses>
            <PopularInstructor></PopularInstructor>
            <State></State>
        </div>
    );
};

export default Home;
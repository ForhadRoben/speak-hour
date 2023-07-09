import { Helmet } from "react-helmet-async";
import useClasses from "../../hooks/useClasses";
import InstructorCard from "./InstructorCard";

const Instructors = () => {
    const [classes] = useClasses();
    return (
        <div>
            <Helmet>
                <title>
                    SpeakHour | Instructors
                </title>
            </Helmet>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    classes.map(item => <InstructorCard
                        key={item._id}
                        item={item}
                    >
                    </InstructorCard>)
                }
            </div>
        </div>
    );
};

export default Instructors;
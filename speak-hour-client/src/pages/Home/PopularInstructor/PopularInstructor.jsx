
import SectionTitle from "../../../components/SectionTitle";

import InstructorItem from "../../Shared/InstructorItem/InstructorItem";
import useClasses from "../../../hooks/useClasses";

const PopularInstructor = () => {
    const [classes] = useClasses();

    const popularInstructor = [...classes].sort((a, b) => b.no_of_classes_by_instructor - a.no_of_classes_by_instructor);

    return (
        <div>
            <SectionTitle heading='Popular Instructors'></SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    popularInstructor.slice(0, 6).map(item => <InstructorItem
                        key={item._id}
                        item={item}
                    >

                    </InstructorItem>)
                }
            </div>

        </div>
    );
};

export default PopularInstructor;
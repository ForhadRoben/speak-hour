
import SectionTitle from "../../../components/SectionTitle";
import ClassItem from "../../Shared/ClassItem/ClassItem";
import useClasses from "../../../hooks/useClasses";


const PopularClasses = () => {
    const [classes] = useClasses();
    const popularClasses = [...classes].sort((a, b) => b.enrolled_student - a.enrolled_student);
    return (
        <div>
            <SectionTitle
                heading='Popular Classes' >
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    popularClasses.slice(0, 6).map(item => <ClassItem
                        key={item._id}
                        item={item}
                    >
                    </ClassItem>)
                }
            </div>


        </div>
    );
};

export default PopularClasses;
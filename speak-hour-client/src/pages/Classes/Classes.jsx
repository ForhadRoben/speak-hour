import { Helmet } from "react-helmet-async";
import useClasses from "../../hooks/useClasses";
import ClassCard from "./ClassCard";

const Classes = () => {
    const [classes] = useClasses();

    return (
        <div>
            <Helmet>
                <title>
                    SpeakHour | Classes
                </title>
            </Helmet>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    classes.map(item => <ClassCard
                        key={item._id}
                        item={item}
                    >
                    </ClassCard>)
                }
            </div>
        </div>
    );
};

export default Classes;
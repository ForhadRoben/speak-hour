
const InstructorItem = ({ item }) => {

    return (
        <div className="card lg:card-side bg-red-200 w-48 md:w-full mx-auto">
            <img src={item.instructor_img} alt="" />
            <div className="card-body">
                <h2 className="card-title">{item.instructor_name}</h2>
                <p >Total Classes: {item.no_of_classes_by_instructor}</p>
            </div>
        </div>
    );
};

export default InstructorItem;
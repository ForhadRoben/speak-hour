
const ClassItem = ({ item }) => {
    // console.log(item);
    const { course_name, image, available_seats, enrolled_student } = item;
    return (
        <div className="card lg:card-side bg-red-100">
            <figure className="w-full"><img src={image} alt="image" /></figure>
            <div className="card-body">
                <h2 className="card-title">{course_name}</h2>
                <p>Available seats:{available_seats}</p>
                <p>Enrolled student:{enrolled_student}</p>
            </div>
        </div>
    );
};

export default ClassItem;
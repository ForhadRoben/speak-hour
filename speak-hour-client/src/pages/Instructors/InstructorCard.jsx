
const InstructorCard = ({ item }) => {
    const { instructor_img, instructor_name, instructor_email, enrolled_student, no_of_classes_by_instructor } = item;
    return (
        <div>
            <div className="card lg:card-side  bg-red-50  md:w-full mx-auto mt-8">
                <img className="w-48 h-60 rounded" src={instructor_img} alt="instructor_image" />
                <div className="card-body">
                    <h2 className="card-title">{instructor_name}</h2>
                    <p >Email: {instructor_email}</p>
                    <p >Total Classes: {no_of_classes_by_instructor}</p>
                    <p >Enrolled Student: {enrolled_student}</p>
                    <div className="card-actions justify-end">
                        <button className="text-white btn btn-accent">See Classes</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InstructorCard;
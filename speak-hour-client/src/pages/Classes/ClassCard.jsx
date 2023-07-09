import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useSelects from "../../hooks/useSelects";

const ClassCard = ({ item }) => {
    const { image, course_name, available_seats, instructor_name, course_price, enrolled_student, _id } = item;

    const { user } = useContext(AuthContext);
    const [, refetch] = useSelects();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSelectClass = id => {
        console.log(id);
        if (user && user.email) {
            const selectItem = { classItemId: _id, course_name, image, course_price, available_seats, instructor_name, enrolled_student, email: user.email }
            fetch('https://speak-hour-server.vercel.app/selects', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(selectItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        refetch();
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'class selected !',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Please login to select the class',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now!'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }


    }
    return (
        <div className="card lg:card-side bg-red-50 w-full mx-auto mt-8">
            <img className="w-48 h-60 rounded" src={image} alt="instructor_image" />
            <div className="card-body">
                <h2 className="card-title">{course_name}</h2>
                <p >Instructor: {instructor_name}</p>
                <p >Available Seats: {available_seats}</p>
                <p >Enrolled Student: {enrolled_student}</p>
                <p >Course Price: ${course_price}</p>
                <div className="card-actions ">
                    <button onClick={() => handleSelectClass(item)} className="text-white btn btn-accent">Select</button>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;
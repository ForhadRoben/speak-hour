
import { Helmet } from "react-helmet-async";

import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useSelects from "../../../hooks/useSelects";
import SectionTitle from "../../../components/SectionTitle";

const MySelectedClasses = () => {
    const [select, refetch] = useSelects();
    // console.log(select);


    const handleDelete = item => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/selects/${item._id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your selected class has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }

    return (
        <div className="w-full">
            <Helmet>
                <title>SpeakHour | My Selected Classes</title>
            </Helmet>
            <SectionTitle heading={'My selected Classes'}></SectionTitle>
            <div className="uppercase font-semibold text-center">
                <h3 className="text-3xl">Total Items: {select.length}</h3>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Course Name</th>
                            <th>Available Seat</th>
                            <th>Instructor</th>
                            <th>Price</th>
                            <th>PAY</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            select.map((item, index) => <tr
                                key={item._id}
                            >
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle w-12 h-12">
                                            <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item.course_name}
                                </td>
                                <td>
                                    {item.available_seats}
                                </td>
                                <td>
                                    {item.instructor_name}
                                </td>

                                <td className="text-end">${item.course_price}</td>
                                <td ><button className="btn btn-accent text-white btn-sm">PAY</button></td>
                                <td>
                                    <button onClick={() => handleDelete(item)} className="btn btn-ghost bg-red-600  text-white"><FaTrashAlt></FaTrashAlt></button>
                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySelectedClasses;
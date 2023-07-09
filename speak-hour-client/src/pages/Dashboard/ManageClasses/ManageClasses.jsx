

import SectionTitle from "../../../components/SectionTitle";
import useClasses from "../../../hooks/useClasses";

const ManageClasses = () => {
    const [classes] = useClasses()


    return (
        <div className="w-full bg-red-50">
            <SectionTitle heading="Manage Classes" ></SectionTitle>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Class name</th>
                            <th>Instructor name</th>
                            <th>Instructor email</th>
                            <th>Available seats</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Button</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.map((item, index) =>
                                <tr key={item._id}>
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
                                        {item.instructor_name}
                                    </td>
                                    <td>
                                        {item.instructor_email}
                                    </td>
                                    <td>
                                        {item.available_seats}
                                    </td>
                                    <td>
                                        {item.course_price}
                                    </td>

                                    {/* <td className="text-right">${item.price}</td> */}
                                    <td>
                                        <select className="select btn-sm">
                                            <option disabled selected>show status</option>
                                            <option>Pending</option>
                                            <option>Approved</option>
                                            <option>Denied</option>

                                        </select>
                                    </td>
                                    <td>
                                        <div className="btn-group btn-xs btn-group-vertical ">
                                            <button className="btn btn-active">Approve</button>
                                            <button className="btn">Deny</button>
                                            <button className="btn">Send Feedback</button>
                                        </div>
                                    </td>
                                </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageClasses;
import { Helmet } from "react-helmet-async";
import SectionTitle from "../../../components/SectionTitle";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiossSecure";
import Swal from "sweetalert2";

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;
const AddAClass = () => {

    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();
    const { user } = useContext(AuthContext);
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`

    const onSubmit = (data) => {
        console.log(data);

        const formData = new FormData();
        formData.append('image', data.image[0]);

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                if (imgResponse.success) {
                    const imgURL = imgResponse.data.display_url;
                    const { course_name, instructor_email, instructor_name, course_price, available_seats } = data;
                    const newItem = { course_name, instructor_email, instructor_name, course_price: parseFloat(course_price), available_seats: parseFloat(available_seats), image: imgURL }
                    console.log(newItem)
                    axiosSecure.post('/classes', newItem)
                        .then(data => {
                            console.log('after posting new class item', data.data)
                            if (data.data.insertedId) {
                                reset();
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'class Item added successfully',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            })
    }
    return (
        <div className="w-full px-10 bg-red-50 py-10">
            <Helmet>
                <title>
                    SpeakHour | Add A Class
                </title>
            </Helmet>
            <SectionTitle heading="Add A Class" ></SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex my-4">
                    <div className="form-control w-full mb-4 p-4">
                        <label className="label">
                            <span className="label-text font-semibold">Class Name</span>
                        </label>
                        <input type="text" placeholder="Class Name"
                            {...register("course_name", { required: true })}
                            className="input input-bordered w-full " />
                    </div>

                    <div className="form-control w-full my-4 p-4">
                        <label className="label">
                            <span className="label-text">Class Image</span>
                        </label>
                        <input type="file" {...register("image", { required: true })} className="file-input file-input-bordered w-full " />
                    </div>
                </div>
                <div className="flex my-4">
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text font-semibold">Instructor Name</span>
                        </label>
                        <input type="text" defaultValue={user?.displayName} placeholder="instructor_name"
                            {...register("instructor_name", { required: true })}
                            className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full mb-4">
                        <label className="label">
                            <span className="label-text font-semibold">Instructor Email</span>
                        </label>
                        <input type="text" defaultValue={user?.email} placeholder="email"
                            {...register("instructor_email", { required: true })}
                            className="input input-bordered w-full " />
                    </div>
                </div>

                <div className="flex my-4">
                    <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text font-semibold">Course Price</span>
                        </label>
                        <input type="number" {...register("course_price", { required: true })} placeholder="Type here" className="input input-bordered w-full " />
                    </div>
                    <div className="form-control w-full ml-4">
                        <label className="label">
                            <span className="label-text font-semibold">Available Seats</span>
                        </label>
                        <input type="number" {...register("available_seats", { required: true })} placeholder="Type here" className="input input-bordered w-full " />
                    </div>
                </div>


                <input className="btn btn-sm mt-4" type="submit" value="Add A Class" />
            </form>
        </div>
    );
};

export default AddAClass;
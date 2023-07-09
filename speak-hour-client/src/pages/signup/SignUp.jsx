import React, { useContext } from 'react';
import { AiFillEye, AiFillEyeInvisible, AiFillGoogleCircle } from "react-icons/ai";
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from "react";
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet-async';

const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();

    const { createUser, updateUserProfile, logOut, signInWithGoogle } = useContext(AuthContext);

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const password = React.useRef({});
    password.current = watch('password', '');

    const onSubmit = (data) => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoUrl)
                    .then(() => {
                        // console.log('user profile info updated')
                        const saveUser = { name: data.name, email: data.email }
                        fetch('https://speak-hour-server.vercel.app/users', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });

                                    logOut()
                                        .then(() => {
                                            navigate('/login');
                                        })
                                        .catch(error => console.log(error));

                                }

                            })

                    })
                    .catch(error => console.log(error))

            })

    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email }
                fetch('https://speak-hour-server.vercel.app/users', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })
            })
    }
    return (
        <>
            <div className="hero min-h-screen bg-red-200">
                <Helmet>
                    <title>SpeakHour | Sign Up</title>
                </Helmet>
                <div className="hero-content flex flex-col md:flex-row">
                    <div className="text-center lg:text-left w-full md:w-1/2">
                        <h1 className="text-5xl font-bold">Register Now!</h1>
                    </div>
                    <div className="card w-full md:w-3/4 bg-red-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input
                                    type="text" name="name" placeholder="name" className="input input-bordered"
                                    {...register('name', { required: 'name is required' })}
                                />
                                {errors.name && <p className="text-red-600">{errors.name.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">PhotoURL</span>
                                </label>
                                <input
                                    type="text" name="photoUrl" placeholder="photoUrl" className="input input-bordered"
                                    {...register('photoUrl', { required: 'photoUrl is required' })}
                                />
                                {errors.photoUrl && <p className="text-red-600">{errors.photoUrl.message}</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input
                                    type="email" name="email" placeholder="email" className="input input-bordered"
                                    {...register('email', { required: 'Email is required' })}
                                />
                                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <div className='flex items-center'>
                                    <input name="password" placeholder="password" className="input input-bordered w-full"
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('password', {
                                            required: 'Password is required',
                                            minLength: 6,
                                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                                        })}
                                    />
                                    <span className='-ms-8 text-2xl ' onClick={togglePasswordVisibility}>
                                        {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                                    </span>
                                </div>
                                {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase  and one special character.</p>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <div className='flex items-center'>
                                    <input name="password" placeholder="re-type password" className="input input-bordered w-full"
                                        type={showPassword ? 'text' : 'password'}
                                        {...register('confirmPassword', {
                                            required: 'confirm Password is required',
                                            validate: value => value === password.current || 'Password do not match'
                                        })}
                                    />
                                    <span className='-ms-8 text-2xl ' onClick={togglePasswordVisibility}>
                                        {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                                    </span>
                                </div>
                                {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
                            </div>
                            <div className='flex gap-2 xs:w-1/2 lg:w-full'>
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Gender</span></label>
                                    <select name="gender" placeholder="gender" className="input input-bordered" {...register('gender')}>
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                    </select>
                                </div>
                                <div className="form-control">
                                    <label className="label"><span className="label-text">Phone Number</span></label>
                                    <input type="tel" name="phone" className="input input-bordered" placeholder="phone number" {...register('phoneNumber')} />
                                </div>

                            </div>
                            <div className="form-control">
                                <label className="label"><span className="label-text">Address</span></label>
                                <textarea type="tel" name="address" className="input input-bordered" placeholder="address"  {...register('address')} />
                            </div>

                            <div className="form-control mt-6">
                                <input className="btn btn-error" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className="text-center py-4 "><small>Already have an account <Link to="/login" className="text-red-500 font-semibold">Login Now</Link></small></p>
                        <div className='text-center'>
                            <p className="divider">OR</p>
                            <button onClick={handleGoogleSignIn} className=" btn mb-8"><span className='text-xl text-red-400'><AiFillGoogleCircle></AiFillGoogleCircle></span> Login with Google</button>
                        </div>
                    </div>
                </div >

            </div >
        </>
    );
};

export default SignUp;
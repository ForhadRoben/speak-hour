import { useContext, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible, AiFillGoogleCircle } from 'react-icons/ai';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const { signIn, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = (data) => {
        console.log(data);

        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user);
                Swal.fire(
                    'Good job!',
                    'user login successfully!',
                    'success'
                )
                navigate(from, { replace: true });
            })
    };

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <Helmet>
                <title>SpeakHour | Login</title>
            </Helmet>
            <div className="hero min-h-screen bg-red-200">
                <div className="hero-content flex flex-col md:flex-row">
                    <div className="text-center">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                    </div>
                    <div className="card w-full shadow-2xl bg-red-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
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
                                        {...register('password', { required: 'Password is required' })}
                                    />
                                    <span className='-ms-8 text-2xl ' onClick={togglePasswordVisibility}>
                                        {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                                    </span>
                                </div>
                                {errors.password && <p className="text-red-600">{errors.password.message}</p>}
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn btn-error" type="submit" value="Login" />
                            </div>
                        </form>
                        <p className="text-center py-4 "><small>Don't have an account <Link to="/signup" className="text-red-500 font-semibold">Register Now</Link></small></p>
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

export default Login;
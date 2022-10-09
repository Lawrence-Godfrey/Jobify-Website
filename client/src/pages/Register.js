import { useEffect, useState } from 'react';
import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
}

const Register = () => {
    const navigate = useNavigate();

    // Local variables
    const [values, setValues] = useState(initialState)

    // Global variables
    const { user, isLoading, showAlert, displayAlert, clearAlert, registerUser, loginUser } = useAppContext()

    const toggleMember = () => {
        setValues({ ...values, isMember: !values.isMember })
    }

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault()

        // Check that all the values that need to be submitted are present.
        // Only need to check the name if it's not a member, i.e., the
        // user is registering and not logging in.
        const { name, email, password, isMember } = values
        if (!email || !password || (!name && !isMember)) {
            displayAlert()
            clearAlert()
        }

        const currentUser = { name, email, password }

        if (isMember) {
            loginUser(currentUser)
        } else {
            registerUser(currentUser)
        }
    }

    // Navigate to the home page if the user object is not null.
    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user, navigate])

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <form className='mt-8 space-y-6' onSubmit={onSubmit}>
                    <Logo />
                    <h3 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        { values.isMember ? 'Login' : 'Register'}
                    </h3>

                    { showAlert && <Alert /> }

                    <div className="rounded-md shadow-sm -space-y-px">
                        { !values.isMember && (
                            <FormRow type='text' name='name' value={values.name} handleChange={handleChange} />
                        )}

                        <FormRow type='email' name='email' value={values.email} handleChange={handleChange} />
                        <FormRow type='password' name='password' value={values.password} handleChange={handleChange} />
                    </div>

                    <button type='submit' className='btn btn-block' disabled={isLoading}>
                        submit
                    </button>

                    <p>
                        { values.isMember ? 'Not a member?' : 'Already a member?'}
                        <button type='button' onClick={toggleMember} className='member-btn'>
                            { values.isMember ? 'Register' : 'Login' }
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;
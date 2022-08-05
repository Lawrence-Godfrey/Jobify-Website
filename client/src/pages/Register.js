import { useState } from 'react';
import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from "../context/appContext";

const initialState = {
    name: '',
    email: '',
    password: '',
    isMember: true,
}

const Register = () => {
    const [values, setValues] = useState(initialState)

    const { isLoading, showAlert, displayAlert, clearAlert, registerUser } = useAppContext()

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
            console.log('Already a member')
        } else {
            console.log('Not a member');
            registerUser(currentUser)
        }
    }

    return (
        <Wrapper className='full-page'>
            <form className='form' onSubmit={onSubmit}>
                <Logo />
                <h3>{ values.isMember ? 'Login' : 'Register'}</h3>

                { showAlert && <Alert /> }

                { !values.isMember && (
                    <FormRow type='text' name='name' value={values.name} handleChange={handleChange} />
                )}

                <FormRow type='email' name='email' value={values.email} handleChange={handleChange} />
                <FormRow type='password' name='password' value={values.password} handleChange={handleChange} />

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
        </Wrapper>
    );
}

export default Register;
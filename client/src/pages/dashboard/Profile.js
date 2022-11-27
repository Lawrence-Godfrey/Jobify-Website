import { useState } from 'react'
import { FormRow, Alert } from '../../components'
import { useAppContext } from "../../context/appContext";
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const Profile = () => {

    const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext()

    const [name, setName] = useState(user?.name)
    const [lastName, setLastName] = useState(user?.lastName)
    const [location, setLocation] = useState(user?.location)
    const [email, setEmail] = useState(user?.email)

    const handleSubmit = (e) => {
        e.preventDefault()
        updateUser({ name, lastName, location, email })
    }

    return (
        <Wrapper>
            <form className='form' onSubmit={handleSubmit}>
                <h3>Profile</h3>
                {showAlert && <Alert />}
                <div className='form-center'>
                    <FormRow type='text' labelText='Name' name='name' value={name} handleChange={(e) => setName(e.target.value)} />
                    <FormRow type='text' labelText='Last Name' name='lastName' value={lastName} handleChange={(e) => setLastName(e.target.value)} />
                    <FormRow type='text' labelText='Location' name='location' value={location} handleChange={(e) => setLocation(e.target.value)} />
                    <FormRow type='email' labelText='Email' name='email' value={email} handleChange={(e) => setEmail(e.target.value)} />

                    <button type='submit' className='btn btn-block' disabled={isLoading}>
                        { isLoading ? 'Please Wait...' : 'Save Changes' }
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}

export default Profile;
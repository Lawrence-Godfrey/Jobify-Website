

const FormRow = ({ type, name, value, handleChange, labelText }) => {
    return (
        <div>
            <label htmlFor={name} className="sr-only">
                { labelText || name }
            </label>
            <input
                type={type}
                value={value}
                name={name}
                onChange={handleChange}
                placeholder={labelText || name}
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
            />
        </div>
    )
}

export default FormRow;
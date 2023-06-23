import React from 'react';

const Input = ({placeholder, label, type, onChange, value, name, required}) => {
    return (
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={label}>
                {label}
            </label>
            {type === 'textarea' ? (
                <textarea
                    name={name}
                    className="shadow appearance-none border rounded w-[100%] min-w-[280px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
            ) : type === 'file' ? (
                <div
                    className="shadow appearance-none border rounded w-[100%] lg:w-[580px] min-w-[280px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    <input
                        name={name}
                        className="hidden"
                        type="file"
                        id={label}
                        onChange={onChange}
                        required={required}
                    />
                    <label
                        className="shadow appearance-none rounded min-w-[380px] py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline0 cursor-pointer"
                        htmlFor={label}
                    >
                        {value ? value.name : placeholder}
                    </label>
                </div>
            ) : (
                <input
                    name={name}
                    className="shadow appearance-none border rounded w-full min-w-[280px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                />
            )}
        </div>
    );
};

export default Input;

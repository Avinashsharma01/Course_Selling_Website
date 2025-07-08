const Register = () => {
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <form className="space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full border p-2 rounded"
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border p-2 rounded"
                />
                <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;

const Dashboard = () => {
  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">👤 Your Dashboard</h2>
      <p>Welcome back! Here’s your enrolled courses:</p>

      <ul className="mt-4 space-y-2">
        <li className="border p-3 rounded">Course 1</li>
        <li className="border p-3 rounded">Course 2</li>
      </ul>
    </div>
  );
};
export default Dashboard;

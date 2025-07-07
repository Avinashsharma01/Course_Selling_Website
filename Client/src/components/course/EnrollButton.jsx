const EnrollButton = () => {
  const handleEnroll = () => {
    alert('Enrolled! (placeholder)');
  };

  return (
    <button onClick={handleEnroll} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
      Enroll Now
    </button>
  );
};

export default EnrollButton;

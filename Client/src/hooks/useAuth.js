// dummy auth hook for testing UI

const useAuth = () => {
  // fake user for UI testing
  return {
    user: {
      name: 'Ishika',
      isAdmin: true, // change to false to test normal user
    },
    logout: () => alert('Logout clicked (dummy)')
  };
};

export default useAuth;
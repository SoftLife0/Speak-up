class UserService {
    getUser() {
        try {
            const user = sessionStorage.getItem('user');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error('Error parsing user data from sessionStorage:', error);
            return null;
        }
    }

    saveUser(user) {
        try {
            sessionStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            console.error('Error saving user data to sessionStorage:', error);
        }
    }

    clearUser() {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('userData');
        sessionStorage.removeItem('resettoken');
    }

    getToken() {
        return sessionStorage.getItem('resettoken'); // Always fetch fresh token
    }
}

const userService = new UserService();
export { userService };

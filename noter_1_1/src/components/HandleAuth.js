import { registerStudent, loginStudent } from '../services/studentApi';
import { registerEducator, loginEducator } from '../services/educatorApi';

const HandleAuth = ({ setUser, setUserType, isLogin }) => {
    const handleAuth = async (credentials, userType) => {
        try {
            let response;
            if (userType === 'student') {
                response = isLogin
                    ? await loginStudent(credentials)
                    : await registerStudent(credentials);
                    
                if (response?.data) {
                    //console.log('Student auth successful:', response.data);
                    setUser(response.data);
                    setUserType('student');
                } else {
                    throw new Error('Invalid response from server');
                }
            } else {
                response = isLogin
                    ? await loginEducator(credentials)
                    : await registerEducator(credentials);
                    
                if (response?.data) {
                    //console.log('Educator auth successful:', response.data);
                    setUser(response.data);
                    setUserType('educator');
                } else {
                    throw new Error('Invalid response from server');
                }
            }
        } catch (error) {
            console.error(`${isLogin ? 'Login' : 'Registration'} failed:`, error);
            const errorMessage = error.response?.data?.message || 
                               error.message || 
                               `${isLogin ? 'Login' : 'Registration'} failed. Please try again.`;
            alert(errorMessage);
        }
    };

    return { handleAuth };
};

export default HandleAuth; 
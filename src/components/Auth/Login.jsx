import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const success = await login(email, password);
    setLoading(false);
    
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-md">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-gray-600">Don't have an account? <Link to="/register" className="text-blue-600 hover:text-blue-800">Register</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
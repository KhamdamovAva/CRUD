import React, { useState, useEffect } from 'react';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';

function ShowUser() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' });
  const [selectedUser, setSelectedUser] = useState(null); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await fetch(`http://localhost:3001/users/${id}`, {
          method: 'DELETE',
        });
        setUsers(users.filter(user => user.id !== id));
        console.log(`User with ID ${id} deleted`);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setUserData({ name: user.name, email: user.email, phone: user.phone });
  };

  const handleView = (user) => {
    setSelectedUser(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3001/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      setUsers(users.map(user => (user.id === editingUser.id ? { ...user, ...userData } : user)));
      setEditingUser(null); // Reset editing user
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <>
      <div className='bg-slate-600 min-h-[100vh]'>
        <div className="flex items-center justify-center pt-[160px]">
          <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden">
            {editingUser && (
              <form onSubmit={handleSubmit} className="p-4 bg-gray-100 mb-4">
                <h2 className="text-lg font-bold mb-2">Edit User</h2>
                <input
                  type="text"
                  placeholder="Name"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  required
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  required
                  className="border p-2 mb-2 w-full"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  required
                  className="border p-2 mb-2 w-full"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                <button type="button" onClick={() => setEditingUser(null)} className="ml-2 text-red-500">Cancel</button>
              </form>
            )}
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {user.id}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {user.name}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {user.email}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      {user.phone}
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm flex space-x-2 relative top-[6px]">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEdit(user)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-gray-500 hover:text-gray-700"
                        onClick={() => handleView(user)}
                      >
                        <FaEye />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(user.id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {selectedUser && (
              <div className="mt-4 p-4 border border-gray-200 bg-gray-100 rounded">
                <h3 className="font-bold text-lg">User Details</h3>
                <p><strong>ID:</strong> {selectedUser.id}</p>
                <p><strong>Name:</strong> {selectedUser.name}</p>
                <p><strong>Email:</strong> {selectedUser.email}</p>
                <p><strong>Phone:</strong> {selectedUser.phone}</p>
                <button onClick={() => setSelectedUser(null)} className="mt-2 text-red-500">Close</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowUser;

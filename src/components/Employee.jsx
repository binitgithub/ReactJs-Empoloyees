import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Employee = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentRecord, setCurrentRecord] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch employees on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5205/api/Employee');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleAdd = () => {
    setIsEditMode(false);
    setCurrentRecord({});
    setShowModal(true);
  };

  const handleEdit = (record) => {
    setIsEditMode(true);
    setCurrentRecord(record);
    setShowModal(true);
  };

  const handleDelete = async (Id) => {
    try {
      await axios.delete(`http://localhost:5205/api/Employee/${Id}`);
      setData(data.filter(record => record.id !== Id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        // Update existing record
        await axios.put(`http://localhost:5205/api/Employee/${currentRecord.id}`, currentRecord);
        setData(data.map(item => (item.id === currentRecord.id ? currentRecord : item)));
      } else {
        // Add new record
        const response = await axios.post('http://localhost:5205/api/Employee', currentRecord);
        setData([...data, response.data]);
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <div className="bg-white p-4">
      <div className="flex justify-between">
        <h1 className="text-xl font-bold">Employee Records</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAdd}>Add Employee</button>
      </div>
      <table className="table-auto w-full mt-4 border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">First Name</th>
            <th className="px-4 py-2">Last Name</th>
            <th className="px-4 py-2">Email</th>
            <th className="px-4 py-2">Phone</th>
            <th className="px-4 py-2">DOB</th>
            <th className="px-4 py-2">DOJ</th>
            <th className="px-4 py-2">Department</th>
            <th className="px-4 py-2">Position</th>
            <th className="px-4 py-2">Salary</th>
            <th className="px-4 py-2">IsActive</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record) => (
            <tr key={record.id} className="border-t">
              <td className="px-4 py-2">{record.firstName}</td>
              <td className="px-4 py-2">{record.lastName}</td>
              <td className="px-4 py-2">{record.email}</td>
              <td className="px-4 py-2">{record.phoneNumber}</td>
              <td className="px-4 py-2">{record.dateOfBirth}</td>
              <td className="px-4 py-2">{record.dateOfJoining}</td>
              <td className="px-4 py-2">{record.department}</td>
              <td className="px-4 py-2">{record.position}</td>
              <td className="px-4 py-2">{record.salary}</td>
              <td className="px-4 py-2">{record.isActive ? 'Active' : 'Inactive'}</td>
              <td className="px-4 py-2">
                <button className="bg-green-500 text-white px-2 py-1 mr-2 rounded" onClick={() => handleEdit(record)}>Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(record.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Popup Form */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-4 md:mx-auto">
            <h2 className="text-xl mb-4">{isEditMode ? 'Edit Employee' : 'Add Employee'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">First Name</label>
                <input
                  type="text"
                  value={currentRecord.firstName || ''}
                  onChange={(e) => setCurrentRecord({ ...currentRecord, firstName: e.target.value })}
                  className="border rounded w-full py-2 px-3"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Last Name</label>
                <input
                  type="text"
                  value={currentRecord.lastName || ''}
                  onChange={(e) => setCurrentRecord({ ...currentRecord, lastName: e.target.value })}
                  className="border rounded w-full py-2 px-3"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={currentRecord.email || ''}
                  onChange={(e) => setCurrentRecord({ ...currentRecord, email: e.target.value })}
                  className="border rounded w-full py-2 px-3"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  value={currentRecord.phoneNumber || ''}
                  onChange={(e) => setCurrentRecord({ ...currentRecord, phoneNumber: e.target.value })}
                  className="border rounded w-full py-2 px-3"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  value={currentRecord.dateOfBirth || ''}
                  onChange={(e) => setCurrentRecord({ ...currentRecord, dateOfBirth: e.target.value })}
                  className="border rounded w-full py-2 px-3"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Date of Joining</label>
                <input
                  type="date"
                  value={currentRecord.dateOfJoining || ''}
                  onChange={(e) => setCurrentRecord({ ...currentRecord, dateOfJoining: e.target.value })}
                  className="border rounded w-full py-2 px-3"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Department</label>
                <input
                  type="text"
                  value={currentRecord.department || ''}
                  onChange={(e) => setCurrentRecord({ ...currentRecord, department: e.target.value })}
                  className="border rounded w-full py-2 px-3"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Position</label>
                <input
                  type="text"
                  value={currentRecord.position || ''}
                  onChange={(e) => setCurrentRecord({ ...currentRecord, position: e.target.value })}
                  className="border rounded w-full py-2 px-3"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Salary</label>
                <input
                  type="number"
                  value={currentRecord.salary || ''}
                  onChange={(e) => setCurrentRecord({ ...currentRecord, salary: e.target.value })}
                  className="border rounded w-full py-2 px-3"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700">Active Status</label>
                <select
                  value={currentRecord.isActive || false}
                  onChange={(e) => setCurrentRecord({ ...currentRecord, isActive: e.target.value === 'true' })}
                  className="border rounded w-full py-2 px-3"
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  {isEditMode ? 'Update Employee' : 'Add Employee'}
                </button>
                <button type="button" className="ml-2 bg-gray-500 text-white px-4 py-2 rounded" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employee;

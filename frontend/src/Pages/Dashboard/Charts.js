import React, { useEffect, useState } from 'react';

//import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Charts = () => {
  // Sample data - replace with actual data from your backend
  // In your component
const [propertyData, setPropertyData] = useState([]);

useEffect(() => {
  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost:3001/property/getAllProperties');
      const data = await response.json();

      const soldCount = data.filter(p => p.status === 'Sold').length;
      const availableCount = data.filter(p => p.status === 'Available').length;

      setPropertyData([
        { name: 'Sold', value: soldCount },
        { name: 'Available', value: availableCount },
      ]);
    } catch (error) {
      console.error('Error fetching property data:', error);
    }
  };

  fetchProperties();
}, []);


const [bookingData, setBookingData] = useState([]);

useEffect(() => {
  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:3001/booking/getAllBookings');
      const data = await response.json();

      // Count each booking status
      const confirmed = data.filter(b => b.Bookingstatus === 'Confirmed').length;
      const cancelled = data.filter(b => b.Bookingstatus === 'Cancelled').length;
      const completed = data.filter(b => b.Bookingstatus === 'Completed').length;

      setBookingData([
        { name: 'Confirmed', value: confirmed },
        { name: 'Cancelled', value: cancelled },
        { name: 'Completed', value: completed },
      ]);
    } catch (error) {
      console.error('Error fetching booking data:', error);
    }
  };

  fetchBookings();
}, []);
const [projectData, setProjectData] = useState([]);

useEffect(() => {
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:3001/project/getAllProjects');
      const data = await response.json();

      const ongoing = data.filter(p => p.status === 'Ongoing').length;
      const completed = data.filter(p => p.status === 'Completed').length;
      const upcoming = data.filter(p => p.status === 'Upcoming').length;

      setProjectData([
        { name: 'Ongoing', value: ongoing },
        { name: 'Completed', value: completed },
        { name: 'Upcoming', value: upcoming },
      ]);
    } catch (error) {
      console.error('Error fetching project data:', error);
    }
  };

  fetchProjects();
}, []);


  const [financeData, setFinanceData] = useState([]);
  useEffect(() => {
    const fetchFinance = async () => {
      try {
        const response = await fetch('http://localhost:3001/finance/getAllfinances');
        const data = await response.json();
  
        // Filter completed transactions and group by month
        const filtered = data.filter(f => f.status === 'Completed');
  
        const monthlyTotals = {};
  
        filtered.forEach(item => {
          const date = new Date(item.transactionDate);
          const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
          const amount = parseFloat(item.Amount);
  
          if (!monthlyTotals[month]) {
            monthlyTotals[month] = 0;
          }
          monthlyTotals[month] += amount;
        });
  
        // Convert to array for recharts
        const result = Object.entries(monthlyTotals).map(([month, amount]) => ({
          date: month,
          amount,
        }));
  
        // Sort by date
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
  
        setFinanceData(result);
      } catch (error) {
        console.error('Error fetching finance data:', error);
      }
    };
  
    fetchFinance();
  }, []);
  const [leaseData, setLeaseData] = useState([]);

  useEffect(() => {
    const fetchLeases = async () => {
      try {
        const response = await fetch('http://localhost:3001/lease/getAllLeases');
        const data = await response.json();
  
        const active = data.filter(l => l.LeaseStatus === 'Active').length;
        const expired = data.filter(l => l.LeaseStatus === 'Expired').length;
        const terminated = data.filter(l => l.LeaseStatus === 'Terminated').length;
  
        setLeaseData([
          { name: 'Active', value: active },
          { name: 'Expired', value: expired },
          { name: 'Terminated', value: terminated },
        ]);
      } catch (error) {
        console.error('Error fetching lease data:', error);
      }
    };
  
    fetchLeases();
  }, []);
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div 
    sx={{overflowy:"auto"}}className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {/* Property Status Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Property Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={propertyData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {propertyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Booking Status Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Booking Status</h3>
        <ResponsiveContainer width="100%" height={300}>
  <BarChart data={bookingData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="value" fill="#8884d8" />
  </BarChart>
</ResponsiveContainer>

      </div>

      {/* Project Status Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Project Status</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={projectData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {projectData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Finance Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Finance Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={financeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* lease Chart */}
      {/* Lease Status Chart */}
<div className="bg-white p-4 rounded-lg shadow-md">
  <h3 className="text-lg font-semibold mb-4">Lease Status</h3>
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={leaseData}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
      >
        {leaseData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </ResponsiveContainer>
</div>

    </div>
  );
};

export default Charts; 
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

const DeliveryDashboard = () => {



  const navigate = useNavigate(); // ✅ Initialize navigate
  const earningsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Earnings",
        data: [10, 15, 25, 20, 30, 35, 45],
        borderColor: "#1E3A8A",
        backgroundColor: "rgba(30, 58, 138, 0.5)",
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  const orderDistributionData = {
    labels: ["Delivered", "In Transit", "Pending"],
    datasets: [
      {
        label: "Order Status",
        data: [65, 20, 15],
        backgroundColor: ["#4CAF50", "#FFEB3B", "#F44336"],
      },
    ],
  };

  const analyticsData = [
    { title: "Total Orders", value: "254", icon: "📦" },
    { title: "Active Deliveries", value: "7", icon: "🚴" },
    { title: "Avg Delivery Time", value: "25 min", icon: "⏳" },
    { title: "Customer Satisfaction", value: "92%", icon: "😊" },
  ];

  return (
    <div className="p-6 bg-[#FDF7F3] min-h-screen font-sans text-[#1E3A8A]">
      <nav className="bg-[#1E3A8A] text-white p-4 rounded-xl flex justify-between items-center shadow-lg">
        <span className="text-2xl font-bold">Campus Cravings</span>
        <ul className="flex gap-6">
          <li className="cursor-pointer hover:underline" onClick = {()=> navigate("/")}>Home</li>
          <li className="cursor-pointer hover:underline" onClick={() => navigate("/delreq")}>
  Orders
</li>
          <li className="cursor-pointer hover:underline">Analytics</li>
        </ul>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="p-6 bg-white shadow-lg rounded-xl text-center">
          <p className="text-gray-600">Deliveries</p>
          <h2 className="text-3xl font-bold text-[#1E3A8A]">12</h2>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-xl text-center">
          <p className="text-gray-600">Earnings</p>
          <h2 className="text-3xl font-bold text-green-600">$87.50</h2>
        </div>
        <div className="p-6 bg-white shadow-lg rounded-xl text-center">
          <p className="text-gray-600">Rating</p>
          <h2 className="text-3xl font-bold text-yellow-500">4.8 ⭐</h2>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Earnings Over Time</h2>
          <Line data={earningsData} />
        </div>
        <div className="p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Order Distribution</h2>
          <Pie data={orderDistributionData} />
        </div>
      </div>

      <div className="mt-8 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Recent Deliveries</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="p-3">Order</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-100">
              <td className="p-3">#1012 Salad</td>
              <td>Isabella Moore</td>
              <td className="text-green-600 font-semibold">Delivered</td>
              <td>10 min ago</td>
            </tr>
            <tr className="border-b hover:bg-gray-100">
              <td className="p-3">#1007 Sandwich</td>
              <td>Henry Gutierrez</td>
              <td className="text-yellow-500 font-semibold">In Transit</td>
              <td>25 min ago</td>
            </tr>
            <tr className="border-b hover:bg-gray-100">
              <td className="p-3">#1005 Tacos</td>
              <td>William Cox</td>
              <td className="text-green-600 font-semibold">Delivered</td>
              <td>1 hour ago</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        {analyticsData.map((item, index) => (
          <div key={index} className="p-6 bg-white shadow-lg rounded-xl flex flex-col items-center">
            <div className="text-4xl">{item.icon}</div>
            <p className="text-gray-600 mt-2">{item.title}</p>
            <h2 className="text-2xl font-bold text-[#1E3A8A]">{item.value}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryDashboard;

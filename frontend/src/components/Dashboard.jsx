import WidgetCard from "./WidgetCard";

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-3 gap-4">
        <WidgetCard title="Appointments" count={5} />
        <WidgetCard title="Mood Score" count={7.5} />
      </div>
    </div>
  );
};

export default Dashboard;

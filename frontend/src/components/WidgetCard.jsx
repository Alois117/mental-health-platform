const WidgetCard = ({ title, count }) => {
    return (
      <div className="bg-white shadow-md p-4 rounded-md">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-2xl font-bold">{count}</p>
      </div>
    );
  };
  
  export default WidgetCard;
  
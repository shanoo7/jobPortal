export  const InfoBlock = ({ icon, label, value }) => {
  if (!value) return null;
  return (
    <div className="flex items-start gap-3">
      <div className="p-2 bg-blue-100 rounded-full">{icon}</div>
      <div>
        <h4 className="text-sm text-gray-500">{label}</h4>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
};

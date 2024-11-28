const RoleCard = ({ title, totalUsers, avatars }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-gray-600 text-sm">Total {totalUsers} users</p>
        </div>
        <div className="flex">
          {avatars.slice(0, 3).map((avatar, index) => (
            <div
              key={index}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 -ml-2"
            >
              {avatar}
            </div>
          ))}
          {avatars.length > 3 && (
            <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-300 -ml-2">
              +{avatars.length - 3}
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 text-blue-600 text-sm cursor-pointer">Edit Role</div>
    </div>
  );
};

export default RoleCard;

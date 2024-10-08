const Tag = ({ friend, onClose, onSelect, isSelected, color }) => {
  return (
    <div
      className={`flex justify-between border-2 p-2 cursor-pointer rounded-2xl min-w-[150px] ${
        isSelected?.id === friend?.id ? "border-transparent" : ""
      }`}
      style={{
        backgroundColor: isSelected?.id === friend?.id ? color : "transparent",
      }}
    >
      <div onClick={() => onSelect(friend)} className="flex gap-1">
        <span className="w-6 h-6 rounded-full overflow-hidden">
          <img src={friend.url} alt="" />
        </span>
        <span>{friend.name}</span>
      </div>
      <button onClick={() => onClose(friend)} className="px-2">
        x
      </button>
    </div>
  );
};

export default Tag;

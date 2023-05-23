interface LoadingProps {
  width: string;
  height: string;
}

const Loading: React.FC<LoadingProps> = ({
  width,
  height,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className={`animate-pulse ${width} ${height} bg-gray-600/20 rounded-xl`}></div>
    </div>
  );
};

export default Loading;

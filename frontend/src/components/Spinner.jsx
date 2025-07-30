import { ClipLoader } from 'react-spinners';

export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-40">
      <ClipLoader color="#2563eb" size={50} />
    </div>
  );
}
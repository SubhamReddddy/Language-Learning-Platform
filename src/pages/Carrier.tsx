import { useSelector } from "react-redux";
import Card from "../components/Card";
import { ReduxStateType } from "../redux/store";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Carrier = () => {
  const { carrier } = useSelector((state: ReduxStateType) => state);
  useEffect(() => {
    if (carrier.length == 0)
      toast.info("you have not completed any Assingment!");
  });
  return (
    <div className="mt-20 w-full grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6  justify-items-center mb-10">
      {carrier.map((ele, index) => {
        return <Card key={ele._id} title={index} />;
      })}
    </div>
  );
};

export default Carrier;

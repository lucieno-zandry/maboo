import userType from "../../../../../utilities/helpers/userType";
import Fade from "../../../../../utilities/minitiatures/Fade/Fade";
import DiagramBlock from "./DiagramBlock/DiagramBlock";
import RecentOrders from "./RecentOrders/RecentOrders";
import TopSellingProducts from "./TopSellingProducts/TopSellingProducts";
import TotalSales from "./TotalSales/TotalSales";
import UserStatistics from "./UserStatistics/UserStatistics";

const Overview = () => {
  return (
    <Fade className="container mt-4" show>
      <div className="row gy-4">
        <div className="col-md-6 col-lg-4">
          <TotalSales />
        </div>
        {userType() === 'admin' && <>
          <div className="col-md-6 col-lg-4">
            <UserStatistics />
          </div>
        </>}
        <div className="col">
          <TopSellingProducts />
        </div>
        <div className="col-8">
          <RecentOrders />
        </div>
        <div className="col-md-6 col-lg-4">
          <DiagramBlock />
        </div>
      </div>
    </Fade>
  );
};

export default Overview;

import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import WithdrawMoney from "../../components/Shop/WithdrawMoney.jsx";

function WithdrawMoneyPage() {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[100px] 800px:w-[330px]">
          <DashboardSidebar active={7} />
        </div>
        <div className="flex w-full justify-center">
          <WithdrawMoney />
        </div>
      </div>
    </div>
  );
}

export default WithdrawMoneyPage;

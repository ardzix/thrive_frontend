// import dayjs from "dayjs";
import { rupiahFormat } from "../../../lib/helper";
import CustomLayout from "../../shared/components/CustomLayout";
import HeaderCustom from "../../shared/components/HeaderCustom";

export default function DashboardFinanceContainer() {
    // const categories = ["Jan", "Feb", "Mar", "Apr", "May"];
    // const series = [
    //     {
    //        name: "Data Series",
    //        data: [30, 40, 35, 50, 40, 49]
    //     },
    //     {
    //        name: "Data Series",
    //        data: [20 , 10, 25, 15, 30, 40]
    //     }
    // ];

    // const customOptions = {
    //   tooltip: {
    //     theme: "dark",
    //   },
    // };

    // const handleMonthChange = (date: dayjs.Dayjs | null) => {
    //     console.log("Selected month:", date ? date.format("YYYY-MM") : "No month selected");
    //   };

    return (
        <CustomLayout>
            <main className="space-y-5">
                <HeaderCustom
                    title="Dashboard Finance"
                    breadcrumbItems={[
                        { title: "Finance" },
                        { title: "Dashboard" },
                    ]}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Stat Boxes */}
                    <div className="bg-white rounded-lg p-3 space-y-5">
                        <h5>Title</h5>
                        <p>{rupiahFormat(1000000)}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 space-y-5">
                        <h5>Title</h5>
                        <p>{rupiahFormat(1000000)}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 space-y-5">
                        <h5>Title</h5>
                        <p>{rupiahFormat(1000000)}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 space-y-5">
                        <h5>Title</h5>
                        <p>{rupiahFormat(1000000)}</p>
                    </div>

                    {/* <div className="bg-white rounded-lg p-5 col-span-1 md:col-span-2 lg:col-span-3">
                        <AreaChart
                            title="Monthly Data Overview"
                            categories={categories}
                            series={series}
                            onMonthChange={handleMonthChange}
                        />
                    </div> */}
                </div>
            </main>
        </CustomLayout>
    );
}

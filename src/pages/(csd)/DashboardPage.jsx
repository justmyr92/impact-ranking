import BatStateUSDGScoreChart from "../../components/BatStateUSDGScoreChart";
import CampusScoreperSDGChart from "../../components/CampusScoreperSDGChart";
import ScorePerCampusChart from "../../components/ScorePerCampusChart";
import CampusSDGScoreChart from "../../components/CampusSDGScorePage";
import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";

const DashboardPage = () => {
    const [sdOfficers, setSdOfficers] = useState([]);
    useEffect(() => {
        const getSDOfficers = async () => {
            try {
                const response = await fetch(
                    "http://localhost:9000/api/get/sd-office"
                );
                const jsonData = await response.json();
                setSdOfficers(jsonData);
            } catch (err) {
                console.error(err.message);
            }
        };
        getSDOfficers();
    }, []);

    return (
        <section className="h-screen flex">
            <Sidebar />
            <main className="h-full w-[80%] border overflow-auto">
                <div className="header py-5 px-7 flex justify-between items-center">
                    <h1 className="text-2xl text-gray-900">Dashboard</h1>

                    <select
                        name="sd-officer"
                        id="sd-officer"
                        className="border p-2 rounded"
                    >
                        <option value="all">All</option>
                        {sdOfficers.map((officer) => (
                            <option
                                key={officer.user_id}
                                value={officer.user_id}
                            >
                                {officer.name}
                            </option>
                        ))}
                    </select>
                </div>
                <hr className="w-full border my-4" />
                <div className="flex gap-4 mb-4">
                    <ScorePerCampusChart />
                    <BatStateUSDGScoreChart />
                </div>
                <div className="flex gap-4 mb-2">
                    <CampusScoreperSDGChart />
                    <CampusSDGScoreChart />
                </div>
            </main>
        </section>
    );
};

export default DashboardPage;

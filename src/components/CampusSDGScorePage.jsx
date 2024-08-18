// 'use client';

import { useState, useEffect } from "react";
import { BarList, Card } from "@tremor/react";

const CampusSDGScoreChart = () => {
    const [campuses, setCampuses] = useState([]);
    const [sdgs, setSdgs] = useState([
        { sdg_id: "SDG01", no: 1, title: "No Poverty", color: "#E5243B" },
        { sdg_id: "SDG02", no: 2, title: "Zero Hunger", color: "#DDA63A" },
        {
            sdg_id: "SDG03",
            no: 3,
            title: "Good Health and Well-being",
            color: "#4C9F38",
        },
        {
            sdg_id: "SDG04",
            no: 4,
            title: "Quality Education",
            color: "#C5192D",
        },
        { sdg_id: "SDG05", no: 5, title: "Gender Equality", color: "#FF3A21" },
        {
            sdg_id: "SDG06",
            no: 6,
            title: "Clean Water and Sanitation",
            color: "#26BDE2",
        },
        {
            sdg_id: "SDG07",
            no: 7,
            title: "Affordable and Clean Energy",
            color: "#FCC30B",
        },
        {
            sdg_id: "SDG08",
            no: 8,
            title: "Decent Work and Economic Growth",
            color: "#A21942",
        },
        {
            sdg_id: "SDG09",
            no: 9,
            title: "Industry, Innovation, and Infrastructure",
            color: "#FD6925",
        },
        {
            sdg_id: "SDG10",
            no: 10,
            title: "Reduced Inequality",
            color: "#DD1367",
        },
        {
            sdg_id: "SDG11",
            no: 11,
            title: "Sustainable Cities and Communities",
            color: "#FD9D24",
        },
        {
            sdg_id: "SDG12",
            no: 12,
            title: "Responsible Consumption and Production",
            color: "#BF8B2E",
        },
        { sdg_id: "SDG13", no: 13, title: "Climate Action", color: "#3F7E44" },
        {
            sdg_id: "SDG14",
            no: 14,
            title: "Life Below Water",
            color: "#0A97D9",
        },
        { sdg_id: "SDG15", no: 15, title: "Life on Land", color: "#56C02B" },
        {
            sdg_id: "SDG16",
            no: 16,
            title: "Peace, Justice, and Strong Institutions",
            color: "#00689D",
        },
        {
            sdg_id: "SDG17",
            no: 17,
            title: "Partnerships for the Goals",
            color: "#19486A",
        },
    ]);

    useEffect(() => {
        const getCampuses = async () => {
            try {
                const response = await fetch(
                    "http://localhost:9000/api/get/campuses"
                );
                const jsonData = await response.json();
                console.log(jsonData.length);
                jsonData.forEach((campus) => {
                    campus.value = (Math.random() * 100).toFixed(2);
                });
                setCampuses(jsonData);
            } catch (err) {
                console.error(err.message);
            }
        };
        getCampuses();
    }, []);
    return (
        <>
            <Card className="w-[30%]">
                <div className="flex items-center justify-between border-b border-tremor-border p-6 dark:border-dark-tremor-border">
                    <p className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                        Top 4 Campuses
                    </p>
                    <p className="text-tremor-label font-medium uppercase text-tremor-content dark:text-dark-tremor-content">
                        Score
                    </p>
                </div>

                <BarList
                    data={campuses
                        .map((campus) => ({
                            name: campus.name
                                .replace("Campus", "")
                                .replace("BatStateU - ", ""),
                            value: campus.value,
                        }))
                        .sort((a, b) => b.value - a.value)
                        .slice(0, 4)}
                />
            </Card>
        </>
    );
};

export default CampusSDGScoreChart;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom"; // Assuming you use React Router for navigation
import {
    faBook,
    faBuilding,
    faChartSimple,
    faClipboard,
    faList,
    faRankingStar,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
    const location = useLocation();

    const links = [
        {
            title: "Dashboard",
            icon: faChartSimple,
            isMultilevel: true,
            children: [
                {
                    title: "Impact Ranking",
                    icon: faRankingStar,
                    url: "/csd/impact-ranking",
                },
                {
                    title: "Record Tracks",
                    icon: faClipboard,
                    url: "/csd/record-tracks",
                },
            ],
        },
        {
            title: "SD Office",
            icon: faBuilding,
            isMultilevel: false,
            url: "/csd/sd-office",
        },
        {
            title: "Annual Reports",
            icon: faBook,
            isMultilevel: false,
            url: "/csd/annual-reports",
        },
        {
            title: "Instruments",
            icon: faList,
            isMultilevel: false,
            url: "/csd/instruments",
        },
        {
            title: "Records",
            icon: faList,
            isMultilevel: false,
            url: "/csd/records",
        },
    ];

    return (
        <aside className="bg-[#e5243b] w-[20%] h-full">
            <div className="h-full mx-auto p-5">
                <h1 className="text-white text-lg font-bold">CSDO Dashboard</h1>
                <h1 className="text-white text-sm">SD Office - Alangilan</h1>
                <hr className="border border-white my-3" />
                <nav>
                    <ul className="space-y-2">
                        {links.map((link, index) => (
                            <li key={index}>
                                <div
                                    className={`flex items-center p-2 rounded-lg text-white ${
                                        link.isMultilevel
                                            ? "cursor-pointer"
                                            : ""
                                    }`}
                                >
                                    <FontAwesomeIcon
                                        icon={link.icon}
                                        className="text-white mr-3"
                                    />
                                    {link.isMultilevel ? (
                                        <span className="font-medium">
                                            {link.title}
                                        </span>
                                    ) : (
                                        <Link
                                            to={link.url}
                                            className=" font-medium"
                                        >
                                            {link.title}
                                        </Link>
                                    )}
                                </div>
                                {link.isMultilevel && (
                                    <ul className="ml-4 mt-2 space-y-1">
                                        {link.children.map(
                                            (child, childIndex) => (
                                                <li key={childIndex}>
                                                    <Link
                                                        to={child.url}
                                                        className="flex items-center p-2 text-white hover:bg-[#e9244a] rounded-lg"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={child.icon}
                                                            className="mr-2"
                                                        />
                                                        {child.title}
                                                    </Link>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;

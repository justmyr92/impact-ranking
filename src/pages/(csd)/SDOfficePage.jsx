import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus, faEdit } from "@fortawesome/free-regular-svg-icons";
import { getAllSdOffices, validateToken } from "../../services/service";
import AddSDOfficeModal from "../../components/AddSDOfficeModal";

const SDOfficePage = () => {
    const [sdOffice, setSdOffices] = useState([]);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [reload, setReload] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const runValidation = async () => {
            try {
                const isVerified = await validateToken();
                if (
                    !isVerified ||
                    localStorage.getItem("role").toString() !== "0"
                ) {
                    window.location.href = "/login";
                }
            } catch (error) {
                console.error("Error during token validation:", error);
                return {
                    error: "An error occurred during token validation.",
                };
            }
        };

        const getSDOffices = async () => {
            try {
                const sd_office = await getAllSdOffices();

                if (reload === true || searchQuery === "") {
                    setSdOffices(sd_office);
                }

                if (searchQuery !== "") {
                    const filteredSdOffice = sd_office.filter(
                        (sd_office) =>
                            sd_office.name
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                            sd_office.email
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase()) ||
                            sd_office.campus_name
                                .toLowerCase()
                                .includes(searchQuery.toLowerCase())
                    );

                    setSdOffices(filteredSdOffice);
                }

                setReload(false);
            } catch (error) {
                console.error("Error fetching SD Offices:", error);
                return {
                    error: "An error occurred while fetching SD Offices.",
                };
            }
        };

        runValidation();
        getSDOffices();
    }, [reload, searchQuery]);

    return (
        <section className="h-screen flex">
            <Sidebar />
            <main className="h-full w-[80%] border overflow-auto">
                <div className="header py-5 px-7 flex justify-between items-center">
                    <h1 className="text-2xl text-gray-900">SD Office</h1>
                    <button
                        className="bg-blue-600 text-white text-base px-6 py-2"
                        onClick={() => setIsAddModalOpen(true)}
                    >
                        <FontAwesomeIcon icon={faSquarePlus} /> Add New Office
                    </button>
                </div>
                <hr />
                <div className="py-5 px-7">
                    <div className="flex flex-wrap mb-4">
                        <input
                            className="form__input border block w-[16rem] px-6 py-4 rounded-md shadow-sm sm:text-sm focus:outline-none"
                            type="search"
                            placeholder="Search SD Office"
                            onChange={(e) => setSearchQuery(e.target.value)}
                            value={searchQuery}
                        />
                    </div>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider">
                                    #
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Campus Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {sdOffice ? (
                                sdOffice.map((row, index) => (
                                    <tr key={row.user_id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {row.name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {row.email}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {row.campus_name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                className="text-blue-600 hover:text-blue-900"
                                                onClick={() =>
                                                    console.log(
                                                        `Edit ${row.user_id}`
                                                    )
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    icon={faEdit}
                                                />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="px-6 py-4 whitespace-nowrap text-center"
                                    >
                                        No Data Found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
            {isAddModalOpen && (
                <AddSDOfficeModal
                    setIsAddModalOpen={setIsAddModalOpen}
                    setReload={setReload}
                />
            )}
        </section>
    );
};

export default SDOfficePage;

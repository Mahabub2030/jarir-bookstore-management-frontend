import { Button } from "@/components/ui/button";
import { useGetEmployeesQuery } from "@/redux/features/employee/employee.api";
import html2pdf from "html2pdf.js";
import { Link } from "react-router";
import * as XLSX from "xlsx";

export default function Employees() {
  const { data, isLoading, isError } = useGetEmployeesQuery({
    page: 1,
    limit: 10,
  });

  if (isLoading)
    return <p className="text-center py-10">Loading employees...</p>;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">
        Failed to load employees . with minit & check with developer.
      </p>
    );
  if (!data?.length)
    return <p className="text-center py-10">No employees found.</p>;

  // Excel Export
  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      data.map((emp: any, idx: number) => ({
        "Sr.No": idx + 1,
        Name: emp.name,
        "Job Title": emp.jobTitle,
        "Employee ID": emp.employeeId,
        "ID Number": emp.idNumber,
        Nationality: emp.nationality,
        "Work Location": emp.workLocation,
        "Joining Date": new Date(emp.joiningDate).toLocaleDateString(),
        Status: emp.status,
      })),
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Employees");
    XLSX.writeFile(wb, "employees.xlsx");
  };

  // PDF Export
  const exportToPDF = () => {
    const element = document.getElementById("employee-table");
    if (element) {
      html2pdf()
        .from(element)
        .set({
          margin: 10,
          filename: "employees.pdf",
          html2canvas: { scale: 2 },
          jsPDF: { orientation: "landscape", unit: "mm", format: "a4" },
        })
        .save();
    }
  };

  return (
    <div className="py-8 px-2 sm:px-4 md:px-8 container mx-auto ">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
        <div className="flex items-center gap-2">
          <label className="font-medium">Show</label>
          <select className="border rounded px-2 py-1 text-sm sm:text-base">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span>entries</span>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-2 py-1 text-sm sm:text-base w-full sm:w-auto"
          />
        </div>
      </div>

      {/* Download Buttons */}
      <div className="flex gap-2 mb-4 cursor-po">
        <button
          onClick={exportToExcel}
          className="px-3 py-1   rounded text-white text-sm sm:text-base cursor-pointer bg-[#4F2176] hover:"
        >
          Excel
        </button>
        <button
          onClick={exportToPDF}
          className="px-3 py-1  text-white rounded text-sm sm:text-base cursor-pointer bg-[#4F2176] hover:text-white transition"
        >
          PDF
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded" id="employee-table">
        <table className="min-w-full divide-y divide-gray-200 text-sm  dark:text-black sm:text-base ">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-2 sm:px-4 py-2 text-left font-semibold bg-[#4F2176] text-white">
                Sr.No
              </th>
              <th className="px-2 sm:px-4 py-2 text-left font-semibold bg-[#4F2176] text-white">
                Name
              </th>
              <th className="px-2 sm:px-4 py-2 text-left font-semibold bg-[#4F2176] text-white">
                Job Title
              </th>
              <th className="px-2 sm:px-4 py-2 text-left font-semibold bg-[#4F2176] text-white">
                Employee ID
              </th>
              <th className="px-2 sm:px-4 py-2 text-left font-semibold hidden md:table-cell bg-[#4F2176] text-white">
                ID Number
              </th>
              <th className="px-2 sm:px-4 py-2 text-left font-semibold hidden lg:table-cell bg-[#4F2176] text-white">
                Nationality
              </th>
              <th className="px-2 sm:px-4 py-2 text-left font-semibold hidden lg:table-cell bg-[#4F2176] text-white">
                Work Location
              </th>
              <th className="px-2 sm:px-4 py-2 text-left font-semibold hidden xl:table-cell bg-[#4F2176] text-white">
                Joining Date
              </th>
              <th className="px-2 sm:px-4 py-2 text-left font-semibold bg-[#4F2176] text-white">
                Status
              </th>
              <th className="px-2 sm:px-4 py-2 text-left font-semibold bg-[#4F2176] text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((employee: any, idx: number) => (
              <tr
                key={employee._id}
                className={idx % 2 === 0 ? "bg-gray-50" : ""}
              >
                <td className="px-2 sm:px-4 py-2">{idx + 1}</td>
                <td className="px-2 sm:px-4 py-2">{employee.name}</td>
                <td className="px-2 sm:px-4 py-2">{employee.jobTitle}</td>
                <td className="px-2 sm:px-4 py-2">{employee.employeeId}</td>
                <td className="px-2 sm:px-4 py-2 hidden md:table-cell">
                  {employee.idNumber}
                </td>
                <td className="px-2 sm:px-4 py-2 hidden lg:table-cell">
                  {employee.nationality}
                </td>
                <td className="px-2 sm:px-4 py-2 hidden lg:table-cell">
                  {employee.workLocation}
                </td>
                <td className="px-2 sm:px-4 py-2 hidden xl:table-cell">
                  {new Date(employee.joiningDate).toLocaleDateString()}
                </td>
                <td className="px-2 sm:px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm sm:text-sm font-normal ${
                      employee.status === "ACTIVE"
                        ? "bg-green-400 text-black"
                        : employee.status === "INACTIVE"
                        ? "bg-red-900 text-black"
                        : employee.status === "TRANSFER"
                        ? "bg-red-500 text-black"
                        : "bg-yellow-300 text-black" // default fallback
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td className="px-2 sm:px-4 py-2">
                  <Button asChild size="sm">
                    <Link to={`/employees/${employee._id}`}>View</Link>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 text-sm sm:text-base text-gray-600 gap-2 sm:gap-0">
        <span>Showing 1 to 10 of {data.length} entries</span>
        <div className="flex gap-1">
          <button className="px-3 py-1 border rounded text-sm sm:text-base">
            Prev
          </button>
          <button className="px-3 py-1 border rounded text-sm sm:text-base">
            1
          </button>
          <button className="px-3 py-1 border rounded text-sm sm:text-base">
            2
          </button>
          <button className="px-3 py-1 border rounded text-sm sm:text-base">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

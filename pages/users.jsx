import { useState } from "react";
import BaseApi from "@/lib/api/_base.api";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

import modalState from "@/lib/store/modalState";
export default function Users() {
  // Filter states
  const [verifiedFilter, setVerifiedFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [purokFilter, setPurokFilter] = useState("");

  // Construct query parameters
  const queryParams = new URLSearchParams({
    ...(verifiedFilter !== "" && { verified: verifiedFilter }),
    ...(statusFilter !== "" && { status: statusFilter }),
    ...(nameFilter && { name: nameFilter }),
    ...(purokFilter && { purok: purokFilter }),
  }).toString();

  const { data, error, isLoading, mutate } = BaseApi.swr(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users?${queryParams}`,
    fetcher
  );

  const {
    data: purokData,
    error: purokError,
    isLoading: purokLoading,
    mutate: purokMutate,
  } = BaseApi.swr(`${process.env.NEXT_PUBLIC_API_URL}/api/purok`, fetcher);
  return (
    <div className="container">
      <div className="mb-4">
        <div className="flex gap-4">
          {/* Verified Filter */}
          <select
            className="border p-2"
            value={verifiedFilter}
            onChange={(e) => setVerifiedFilter(e.target.value)}
          >
            <option value="">All Verified</option>
            <option value="1">Verified</option>
            <option value="0">Not Verified</option>
          </select>

          <select
            id="purok"
            name="purok"
            className="border p-2"
            onChange={(e) => setPurokFilter(e.target.value)}
            value={purokFilter}
          >
            <option value="">All Purok</option>
            {purokData?.data?.map((item, index) => (
              <option key={index} value={item?.id}>
                {item?.name}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            className="border p-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="1">Activated</option>
            <option value="0">Disabled</option>
          </select>

          {/* Name Filter */}
          <input
            type="text"
            className="border p-2"
            placeholder="Search by Name"
            value={nameFilter}
            onChange={(e) => setNameFilter(e.target.value)}
          />
        </div>
      </div>

      {isLoading && <div>Loading...</div>}

      {!isLoading && data?.length > 0 && (
        <Table className="text-left w-full">
          <Thead className="text-left bg-[linear-gradient(360deg,_#F1D396_13.75%,_#DD8023_100%)] text-secondary sticky top-0 border-b border-[#3E150A]">
            <Tr>
              <Th className="p-[10px] border border-[#3E150A]">ID</Th>
              <Th className="p-[10px] border border-[#3E150A]">Name</Th>
              <Th className="p-[10px] border border-[#3E150A]">Purok</Th>
              <Th className="p-[10px] border border-[#3E150A]">Email</Th>
              <Th className="p-[10px] border border-[#3E150A]">Birthday</Th>
              <Th className="p-[10px] border border-[#3E150A]">Gender</Th>
              <Th className="p-[10px] border border-[#3E150A]">Verified</Th>
              <Th className="p-[10px] border border-[#3E150A]">Status</Th>
              <Th className="p-[10px] border border-[#3E150A]">Role</Th>
              <Th className="p-[10px] border border-[#3E150A]">More Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((item, index) => (
              <Tr className="hover:bg-[#F5F4F1]" key={index}>
                <Td className="p-[10px] border border-black text-secondary">
                  {item?.id}
                </Td>
                <Td className="p-[10px] border border-black text-secondary">
                  {item?.first_name} {item?.middle_name} {item?.last_name}
                </Td>
                <Td className="p-[10px] border border-black">
                  {item?.purok_name}
                </Td>
                <Td className="p-[10px] border border-black">{item?.email}</Td>
                <Td className="p-[10px] border border-black">
                  {item?.birthday}
                </Td>
                <Td className="p-[10px] border border-black">
                  {item?.gender_name}
                </Td>
                <Td className="p-[10px] border border-black">
                  {item?.verified ? "Yes" : "No"}
                </Td>
                <Td className="p-[10px] border border-black">
                  {item?.status ? "Activated" : "Disabled"}
                </Td>
                <Td className="p-[10px] border border-black">
                  {item?.role === 1 ? "Admin" : "Member"}
                </Td>
                <Td className="p-[10px] border border-black">
                  <div className="flex gap-[15px]">
                    <span
                      className="edit cursor-pointer"
                      onClick={() => {
                        modalState.setState({
                          modalOpen: true,
                          modalInfo: {
                            type: "edit-info",
                            // title: `<div class="text-[#6D2E1A]">ACCOUNT DATA OR INFORMATION</div>`,
                            id: "user-edit",
                            item: item,
                            endpoint: `${process.env.NEXT_PUBLIC_API_URL}/api/users?${queryParams}`,
                          },
                        });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M21 22H3C2.59 22 2.25 21.66 2.25 21.25C2.25 20.84 2.59 20.5 3 20.5H21C21.41 20.5 21.75 20.84 21.75 21.25C21.75 21.66 21.41 22 21 22Z"
                          fill="#292D32"
                        />
                        <path
                          d="M19.02 3.47991C17.08 1.53991 15.18 1.48991 13.19 3.47991L11.98 4.68991C11.88 4.78991 11.84 4.94991 11.88 5.08991C12.64 7.73991 14.76 9.85991 17.41 10.6199C17.45 10.6299 17.49 10.6399 17.53 10.6399C17.64 10.6399 17.74 10.5999 17.82 10.5199L19.02 9.30991C20.01 8.32991 20.49 7.37991 20.49 6.41991C20.5 5.42991 20.02 4.46991 19.02 3.47991Z"
                          fill="#292D32"
                        />
                        <path
                          d="M15.61 11.53C15.32 11.39 15.04 11.25 14.77 11.09C14.55 10.96 14.34 10.82 14.13 10.67C13.96 10.56 13.76 10.4 13.57 10.24C13.55 10.23 13.48 10.17 13.4 10.09C13.07 9.81005 12.7 9.45005 12.37 9.05005C12.34 9.03005 12.29 8.96005 12.22 8.87005C12.12 8.75005 11.95 8.55005 11.8 8.32005C11.68 8.17005 11.54 7.95005 11.41 7.73005C11.25 7.46005 11.11 7.19005 10.97 6.91005C10.9488 6.86465 10.9283 6.81949 10.9084 6.77458C10.7608 6.44127 10.3262 6.34382 10.0684 6.60158L4.33995 12.33C4.20995 12.46 4.08995 12.71 4.05995 12.88L3.51995 16.71C3.41995 17.39 3.60995 18.03 4.02995 18.46C4.38995 18.81 4.88995 19 5.42995 19C5.54995 19 5.66995 18.99 5.78995 18.97L9.62995 18.43C9.80995 18.4 10.06 18.28 10.18 18.15L15.9013 12.4287C16.1608 12.1692 16.0629 11.7237 15.7253 11.5797C15.6873 11.5634 15.6489 11.5469 15.61 11.53Z"
                          fill="#292D32"
                        />
                      </svg>
                    </span>
                    {/* <span
                      className="user-list cursor-pointer"
                      onClick={() => {
                        modalState.setState({
                          modalOpen: true,
                          modalInfo: {
                            type: "listing",
                            title: `<div class="text-[#A2441B]"><span class="font-bold mr-[50px] text-secondary">ID: ${item?.id}</span> ${item?.name}</div>`,
                            id: "event-participants",
                            item: item,
                          },
                        });
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                        />
                      </svg>
                    </span> */}
                    <span className="delete cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </span>
                  </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      {!error && !isLoading && data?.length == 0 && <div>No users found.</div>}
    </div>
  );
}

import BaseApi from "@/lib/api/_base.api";
import modalState from "@/lib/store/modalState";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { useState } from "react";
const fetcher = (url) => fetch(url).then((res) => res.json());
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
export default function ParticipantsList() {
  const [searchTerm, setSearchTerm] = useState("");
  const modalInfo = modalState((state) => state.modalInfo);
  const { data, error, isLoading, mutate } = BaseApi.swr(
    process.env.NEXT_PUBLIC_API_URL +
      `/api/member-events/${modalInfo?.item?.id}/participants?s=${searchTerm}`,
    fetcher
  );

  return (
    <div className="pb-[30px] px-[30px]">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-[20px] p-[10px] border border-[#3E150A] w-full"
      />
      {data?.length > 0 ? (
        <>
          <Table className="text-left">
            <Thead className="sticky top-0 bg-white border-b border-[#3E150A]">
              <Tr>
                <Th className="p-[10px] border border-[#3E150A]">ID</Th>
                <Th className="p-[10px] border border-[#3E150A]">Name</Th>
                <Th className="p-[10px] border border-[#3E150A]">Purok</Th>
                <Th className="p-[10px] border border-[#3E150A]">Status</Th>
                <Th className="p-[10px] border border-[#3E150A]">
                  More Actions
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((item, index) => (
                <Tr key={index}>
                  <Td className="p-[10px] border border-[#3E150A]">
                    {item.user_id}
                  </Td>
                  <Td className="p-[10px] border border-[#3E150A]">
                    {item.first_name} {item.last_name}
                  </Td>
                  <Td className="p-[10px] border border-[#3E150A]">
                    {item.purok_name}
                  </Td>
                  <Td className={`p-[10px] border border-[#3E150A]`}>
                    <span
                      className={`w-full inline-block rounded-[10px] leading-normal px-[15px] py-[3px] text-white text-center ${
                        item.status === "partial"
                          ? "bg-primary  "
                          : "bg-[#086433]"
                      }`}
                    >
                      {item.status}
                    </span>
                  </Td>
                  <Td className="p-[10px] border border-[#3E150A]">
                    <div className="flex flex-wrap gap-[15px]">
                      {item?.generated_code && (
                        <>
                          <Tooltip
                            id="viewcode-tooltip"
                            place="top"
                            effect="solid"
                          />
                          <span
                            className="cursor-pointer"
                            data-tooltip-id="viewcode-tooltip"
                            data-tooltip-content="View Generated Code"
                            onClick={() => {
                              modalState.setState({
                                modalOpen: true,
                                modalInfo: {
                                  searchTerm: searchTerm,
                                  type: "message",
                                  title: `Generated Code:`,
                                  id: "gencode-message",
                                  message: item?.generated_code,
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
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                              />
                            </svg>
                          </span>
                        </>
                      )}
                      {item.status === "partial" &&
                        item?.event_status === "ongoing" && (
                          <>
                            <Tooltip
                              id="my-tooltip"
                              place="top"
                              effect="solid"
                            />
                            <span
                              className="cursor-pointer"
                              data-tooltip-id="my-tooltip"
                              data-tooltip-content="Generate Code"
                              onClick={() => {
                                modalState.setState({
                                  modalOpen: true,
                                  modalInfo: {
                                    searchTerm: searchTerm,
                                    type: "confirmation",
                                    title: `Are you sure you want to generate code for <strong>${item?.first_name}</strong> user?`,
                                    id: "generate-code",
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
                                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                />
                              </svg>
                            </span>
                          </>
                        )}
                    </div>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </>
      ) : (
        <>No users found.</>
      )}
    </div>
  );
}

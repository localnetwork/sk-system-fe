import BaseApi from "@/lib/api/_base.api";
import modalState from "@/lib/store/modalState";
import { useState } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
const fetcher = (url) => fetch(url).then((res) => res.json());
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import Image from "next/image";
import Head from "next/head";
export default function Reward() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, error, isLoading, mutate } = BaseApi.swr(
    process.env.NEXT_PUBLIC_API_URL + `/api/rewards?s=${searchTerm}`,
    fetcher
  );

  return (
    <div className="py-[50px]">
      <Head>
        <title>Manage Rewards</title>
      </Head>
      <button
        className="bg-secondary text-white px-[20px] py-[10px] rounded-md"
        onClick={() => {
          modalState.setState({
            modalOpen: true,
            modalInfo: {
              searchTerm: searchTerm,
              title: `<span class="text-secondary font-bold">Add Reward</span>`,
              type: "reward-form",
              id: "add-reward",
            },
          });
        }}
      >
        Add Reward
      </button>

      <div className="mt-[50px] pb-[30px]">
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
              <Thead className="sticky top-0 text-left bg-[linear-gradient(360deg,_#F1D396_13.75%,_#DD8023_100%)] text-secondary border-b border-[#3E150A]">
                <Tr>
                  <Th className="p-[10px] border border-[#3E150A]">ID</Th>
                  <Th className="p-[10px] border border-[#3E150A]">Name</Th>
                  <Th className="p-[10px] border border-[#3E150A]">Image</Th>
                  <Th className="p-[10px] border border-[#3E150A]">
                    More Actions
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((item, index) => (
                  <Tr key={index}>
                    <Td className="p-[10px] border border-[#3E150A]">
                      {item.id}
                    </Td>
                    <Td className="p-[10px] border border-[#3E150A]">
                      {item.name}
                    </Td>
                    <Td className="p-[10px] border border-[#3E150A]">
                      <Image
                        src={process.env.NEXT_PUBLIC_API_URL + item.image}
                        width={150}
                        height={150}
                        alt="Hello World"
                        className="w-[100px] h-[50px] object-cover"
                      />
                    </Td>
                    <Td className="p-[10px] border border-[#3E150A]">
                      <div className="flex flex-wrap gap-[15px]">
                        <span className="edit cursor-pointer">
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
          </>
        ) : (
          <>No rewards found.</>
        )}
      </div>
    </div>
  );
}

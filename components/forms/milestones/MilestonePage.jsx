import BaseApi from "@/lib/api/_base.api";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const fetcher = (url) => fetch(url).then((res) => res.json());
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
export default function MilestonePage() {
  const [threshold, setThreshold] = useState(0);
  const [rewardsCount, setRewardsCount] = useState(0);
  const [products, setProducts] = useState({});
  const [selectedThreshold, setSelectedThreshold] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resLoading, setResloading] = useState(false);

  const { data, error, isLoading, mutate } = BaseApi.swr(
    process.env.NEXT_PUBLIC_API_URL + `/api/rewards`,
    fetcher
  );

  const {
    data: settingsRewardData,
    error: settingsRewardError,
    isLoading: settingsRewardIsloading,
    mutate: settingsRewardMutate,
  } = BaseApi.swr(process.env.NEXT_PUBLIC_API_URL + `/api/settings`, fetcher);

  useEffect(() => {
    if (settingsRewardData?.rewards_number) {
      setRewardsCount(settingsRewardData.rewards_number);
    }
  }, [settingsRewardData]);

  // Second SWR request
  const {
    data: thresholdsData,
    error: thresholdsError,
    isLoading: thresholdsLoading,
    mutate: mutateThresholds,
  } = BaseApi.swr(
    process.env.NEXT_PUBLIC_API_URL + `/api/milestones/thresholds`,
    fetcher
  );

  useEffect(() => {
    if (thresholdsData) {
      setThreshold(thresholdsData.length);
      const initialProducts = {};
      thresholdsData.forEach((item) => {
        if (item.productName) {
          initialProducts[item.threshold_level - 1] = item.productName;
        }
      });
      setProducts(initialProducts);
    }
  }, [thresholdsData]);

  const productList = data || [];
  useEffect(() => {
    // Remove extra products if rewardsCount decreases
    if (Object.keys(products).length > rewardsCount) {
      setProducts((prev) => {
        const updatedProducts = { ...prev };
        const excessKeys = Object.keys(updatedProducts)
          .slice(rewardsCount)
          .map(Number);
        excessKeys.forEach((key) => delete updatedProducts[key]);
        return updatedProducts;
      });
    }
  }, [rewardsCount]);

  const openModal = (index) => {
    // Only check if you're adding a new product
    if (!products[index] && Object.keys(products).length >= rewardsCount) {
      alert("You have reached the maximum number of rewards.");
      return;
    }
    setSelectedThreshold(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedThreshold(null);
  };

  const handleProductSelect = (product) => {
    setProducts((prev) => ({
      ...prev,
      [selectedThreshold]: product.name, // Replaces the product at the selected threshold
    }));
    closeModal();
  };

  const handleRemoveProduct = (index) => {
    setProducts((prev) => {
      const updatedProducts = { ...prev };
      delete updatedProducts[index]; // Remove the product at the selected index
      return updatedProducts;
    });
  };

  const availableProducts = productList.filter(
    (product) => !Object.values(products).includes(product.name)
  );

  const remainingProducts = rewardsCount - Object.keys(products).length;

  const thresholdsWithProducts = Array.from(
    { length: threshold },
    (_, index) => {
      const productName = products[index]?.trim();
      const matchedProduct = data?.find((p) => p.name.trim() === productName);
      return {
        threshold: index + 1,
        product: matchedProduct || null,
        productId: matchedProduct?.id || null,
      };
    }
  );

  const handleSubmit = async () => {
    setResloading(true);
    toast.dismiss();
    try {
      const res = await BaseApi.put(
        process.env.NEXT_PUBLIC_API_URL + `/api/milestones/thresholds`,
        {
          thresholds: thresholdsWithProducts,
          thresholdCount: threshold,
        }
      );
      // rewardsCount
      mutateThresholds(
        process.env.NEXT_PUBLIC_API_URL + "/api/milestones/thresholds"
      );
      settingsRewardMutate(process.env.NEXT_PUBLIC_API_URL + "/api/settings");

      const settingsRes = await BaseApi.put(
        process.env.NEXT_PUBLIC_API_URL + `/api/settings/reward-count`,
        {
          rewardsCount,
        }
      );

      if (res?.status === 200 && settingsRes?.status === 200) {
        toast.success("Settings updated successfully.");
      }
      setResloading(false);
    } catch (error) {
      console.error("Error updating thresholds", error);
      toast.error(error.message);
      setResloading(false);
    }
  };

  return (
    <div className="mt-[50px] flex flex-col gap-[20px]">
      <div className="flex gap-[15px]">
        {/* Threshold input */}
        <div className="inline-flex items-center gap-[20px]">
          REWARD THRESHOLD:
          <div className="relative inline-block">
            <div
              className="absolute select-none cursor-pointer left-[5px] top-[5px]"
              onClick={() => {
                setThreshold(Math.max(0, threshold - 1));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-[15px] h-[15px]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M5 12h14"
                ></path>
              </svg>
            </div>
            <input
              type="number"
              className="px-[30px] text-center max-w-[100px] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border w-full"
              value={threshold}
              name="threshold"
              id="threshold"
              onChange={(e) =>
                setThreshold(Math.max(0, parseInt(e.target.value) || 0))
              }
            />
            <div
              className="absolute select-none cursor-pointer right-[5px] top-[5px]"
              onClick={() => {
                setThreshold(threshold + 1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-[15px] h-[15px]"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Rewards input */}
        <div className="inline-flex items-center gap-[20px]">
          # OF REWARDS:
          <div className="relative inline-block">
            <div
              className="absolute select-none cursor-pointer left-[5px] top-[5px]"
              onClick={() => {
                setRewardsCount(Math.max(0, rewardsCount - 1));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[15px] h-[15px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14"
                />
              </svg>
            </div>
            <input
              type="number"
              className="px-[30px] text-center max-w-[100px] appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none border w-full"
              value={rewardsCount}
              name="rewardsCount"
              id="rewardsCount"
              onChange={(e) =>
                setRewardsCount(Math.max(0, parseInt(e.target.value) || 0))
              }
            />
            <div
              className="absolute select-none cursor-pointer right-[5px] top-[5px]"
              onClick={() => {
                setRewardsCount(rewardsCount + 1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[15px] h-[15px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div>
        SET REWARD PINPOINTS:{" "}
        <span className="text-[#C3601C]">{`(Remaining: ${remainingProducts})`}</span>
      </div>

      {/* Render thresholds */}
      {threshold > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-[10px] bg-[#DD8023] p-[15px]">
          {Array.from({ length: threshold }, (_, index) => (
            <div
              key={index}
              className="border w-full min-h-[45px] flex flex-col items-center justify-center relative bg-white"
            >
              <Tooltip id="replace-tooltip" place="top" effect="solid" />
              <Tooltip id="remove-tooltip" place="top" effect="solid" />
              <button
                className="absolute top-[10px] right-2 text-[#333] rounded-full"
                onClick={() => openModal(index)}
              >
                {products[index] ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-[15px] h-[15px] text-primary"
                    data-tooltip-id="replace-tooltip"
                    data-tooltip-content="Replace Reward"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                    data-tooltip-id="replace-tooltip"
                    data-tooltip-content="Add Reward"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                )}
              </button>
              {products[index] && (
                <button
                  className="absolute top-[10px] right-[40px] text-[#c51515]"
                  onClick={() => handleRemoveProduct(index)}
                  data-tooltip-id="remove-tooltip"
                  data-tooltip-content="Remove Reward"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-[15px] h-[15px]"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </button>
              )}
              <span className="text-center text-sm">
                {products[index] ? (
                  <div className="min-h-[100px] text-secondary flex items-center">
                    {products[index]}
                  </div>
                ) : (
                  ""
                )}
              </span>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end">
        <button
          className={`inline-flex rounded-[10px] bg-[linear-gradient(180deg,_#F1D396_0%,_#DD8022_100%)] min-w-[150px] text-center justify-center items-center px-[15px] py-[15px] w-auto flex-wrap gap-[10px]  text-white ${
            resLoading ? "pointer-events-none opacity-50" : ""
          }`}
          onClick={() => {
            handleSubmit();
          }}
        >
          Save
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg">
            <h2 className="text-lg font-bold mb-4">Select a reward</h2>
            <div className="flex flex-col gap-2">
              {availableProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex justify-between items-center border p-2 rounded"
                >
                  <span>{product.name}</span>
                  <button
                    className="bg-blue-500 text-white px-4 py-1 rounded"
                    onClick={() => handleProductSelect(product)}
                  >
                    Select
                  </button>
                </div>
              ))}
              {availableProducts.length === 0 && (
                <p className="text-center text-gray-500">
                  No products available
                </p>
              )}
            </div>
            <button
              className="mt-4 bg-gray-500 text-white px-4 py-2 rounded w-full"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

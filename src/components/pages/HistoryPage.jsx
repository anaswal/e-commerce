import React, { useEffect, useState } from "react";
import SignedInPage from "../guard/SignedInPage";
import HistoryItem from "../HistoryItem";
import { useSelector } from "react-redux";
import { axiosInstance } from "@/lib/axios";
import { format } from "date-fns";

const HistoryPage = () => {
  const [transactions, setTransactions] = useState([]);
  const userSelector = useSelector((state) => state.user);

  const fetchHistoryTransactions = async () => {
    const transactionResponse = await axiosInstance.get("/transactions", {
      params: {
        userId: userSelector.id,
      },
    });
    setTransactions(transactionResponse.data);
  };

  useEffect(() => {
    fetchHistoryTransactions();
  }, []);

  return (
    <SignedInPage>
      <main className="min-h-screen max-w-screen-lg mx-auto px-4 mt-8">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <div className="flex flex-col gap-24 mt-8">
          {transactions.map((transaction) => {
            return (
              <HistoryItem
                id={transaction.id}
                date={format(transaction.transactionDate, "dd/MM/yyyy")}
                totalPrice={transaction.totalPrice}
                tax={transaction.tax}
                items={transaction.items}
              />
            );
          })}
        </div>
      </main>
    </SignedInPage>
  );
};

export default HistoryPage;

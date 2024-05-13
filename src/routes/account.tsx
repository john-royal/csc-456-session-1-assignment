import React, { useState, useEffect } from "react";
import { Button } from "~/components/ui/button";
import { doc, setDoc, getDoc, updateDoc} from "firebase/firestore"; 
import { db } from "~/lib/firebase";
import { useUser } from "~/lib/auth";

interface Transaction {
  id: number;
  amount: number;
  date: string;
  description: string;
}

interface AccountPageProps {
  initialBalance: number; // Initial balance passed as props
}

const AccountPage: React.FC<AccountPageProps> = ({ initialBalance }) => {
  const [balance, setBalance] = useState<number>(0);
  const [addAmount, setAddAmount] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const user = useUser();

  // Fetch balance and transactions from Firebase when the page reloads or when balance/transactions change
  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        const accountRef = doc(db, "accounts", user.uid);
        const accountDoc = await getDoc(accountRef);
  
        if (accountDoc.exists()) {
          const accountData = accountDoc.data();
          console.log("Account data:", accountData); // Log the retrieved account data
          if (accountData) {
            setBalance(accountData.balance || 0);
            console.log("Transactions array:", accountData.transactions); // Log the retrieved transactions array
            const transactionsArray = Array.isArray(accountData.transactions) ? accountData.transactions : [];
            setTransactions(transactionsArray);
          }
        }
      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    }
    fetchAccountData();
  },[]);

  const handleAddBalance = async () => {
    if (addAmount <= 0) {
      alert('Please enter a valid amount to add.');
      return;
    }

    const newBalance = balance + addAmount;
    setBalance(newBalance);

    const newTransaction: Transaction = {
      id: transactions.length + 1,
      amount: addAmount,
      description: "You added: ",
      date: new Date().toLocaleDateString()
    };

    const updatedTransactions = [...transactions, newTransaction]; // Append new transaction to existing transactions

    // Update transactions array in state
    setTransactions(updatedTransactions);
    setAddAmount(0);

    // Update transactions array in Firestore
    try {
      const accountRef = doc(db, "accounts", user.uid);
      const accountDoc = await getDoc(accountRef);

      if (accountDoc.exists()) {
        await updateDoc(accountRef, {
          balance: newBalance,
          transactions: updatedTransactions
        });
      } else {
        await setDoc(doc(db, "accounts", user.uid), {
          balance: newBalance,
          transactions: updatedTransactions
        });
      }
    } catch (error) {
      console.error('Error adding balance:', error);
    }
  };

  return (
    <div className="container mx-auto mt-8 pt-8">
      <div className="mx-auto max-w-3xl">
        {/* Balance section */}
        <div className="mb-8 overflow-hidden rounded-xl bg-white shadow-md">
          <div className="p-6 text-center">
          <p className="text-5xl font-bold">${balance}</p>
            <div className="mx-auto flex w-fit gap-x-2">
              <input
                type="number"
                value={addAmount}
                onChange={(e) => setAddAmount(parseFloat(e.target.value))}
              />
              <Button onClick={handleAddBalance}>Add Balance</Button>
            </div>
          </div>
        </div>

        {/* Transaction section */}
        <div className="overflow-hidden rounded-xl bg-white shadow-md">
          <h2 className="mb-4 ml-4 mt-4 text-xl font-bold">Transaction History</h2>
          <div className="p-6">
            <ul className="divide-y divide-gray-200">
              {transactions.map((transaction, index) => (
                <li key={index} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <p className="text-lg font-semibold">{transaction.date}</p>
                      <p className="text-gray-500">{transaction.description} ${transaction.amount}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;

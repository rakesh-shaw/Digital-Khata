import { useState } from "react";
import { Box, Typography, Stack } from "@mui/material";
import { motion } from "framer-motion";
import AppCard from "../../components/ui/AppCard";
import AppButton from "../../components/ui/AppButton";
import AppDialog from "../../components/ui/AppDialog";
import PageTransition from "../../components/animations/PageTransition";
import { useLocation } from "react-router-dom";

type TxType = "credit" | "debit";

interface Transaction {
  id: number;
  date: string;
  description: string;
  type: TxType;
  amount: number;
}

const initialTransactions: Transaction[] = [
  { id: 1, date: "10 Jan", description: "Milk Purchase", type: "debit", amount: 1200 },
  { id: 2, date: "11 Jan", description: "Cash Paid", type: "credit", amount: 500 },
  { id: 3, date: "12 Jan", description: "Groceries", type: "debit", amount: 800 },
];

export default function CustomerDetailPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [openDialog, setOpenDialog] = useState(false);
  const [amount, setAmount] = useState<number>(0);
  const location = useLocation()

  const getCustomerName = () => {
    const customerName = (decodeURI(location.pathname))
    return (customerName.substring(customerName.lastIndexOf('/')+1))
  }

 
  let runningBalance = 0;
  const ledgerWithBalance = transactions.map(tx => {
    if (tx.type === "debit") {
      runningBalance += tx.amount;   // customer owes more
    } else {
      runningBalance -= tx.amount;   // customer paid
    }

    return {
      ...tx,
      balance: runningBalance,
    };
  });

  const latestBalance =
    ledgerWithBalance.length > 0
      ? ledgerWithBalance[ledgerWithBalance.length - 1].balance
      : 0;

 
  const addTransaction = (type: TxType) => {
    if (amount <= 0) return;

    const newTx: Transaction = {
      id: Date.now(),
      date: "Today",
      description: type === "credit" ? "Amount Received" : "Amount Given",
      type,
      amount,
    };

    setTransactions(prev => [...prev, newTx]);
    setAmount(0);
    setOpenDialog(false);
  };

  return (
    <PageTransition>
      <Box sx={{ p: 3 }}>

        {/* Header */}
        <Typography variant="h5" fontWeight={600}>
          {getCustomerName()}
        </Typography>

        <Typography variant="body2" sx={{ mb: 3, color: "text.secondary" }}>
          💡 Double-click anywhere to add Credit or Debit
        </Typography>

        {/* Current Balance */}
        <AppCard
          sx={{
            p: 2,
            mb: 4,
            background:
              latestBalance > 0
                ? "linear-gradient(135deg,#FFE5E5,#FFB3B3)"
                : "linear-gradient(135deg,#E6FFFA,#B2F5EA)",
          }}
        >
          <Typography variant="subtitle2">Current Balance</Typography>
          <Typography variant="h6">
            ₹{Math.abs(latestBalance)}{" "}
            {latestBalance > 0 ? "(Due)" : "(Advance)"}
          </Typography>
        </AppCard>

        {/* Ledger */}
        <Typography variant="h6" sx={{ mb: 2 }}>
          Ledger
        </Typography>

        {ledgerWithBalance.map((tx, index) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <AppCard
              onDoubleClick={() => setOpenDialog(true)}
              sx={{
                p: 2,
                mb: 2,
                cursor: "pointer",
                borderLeft: `6px solid ${
                  tx.type === "debit" ? "#EF4444" : "#22C55E"
                }`,
                "&:hover": { backgroundColor: "#F9FAFB" },
              }}
            >
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography fontWeight={500}>{tx.description}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {tx.date}
                  </Typography>
                </Box>

                <Stack alignItems="flex-end">
                  <Typography fontWeight={600}>
                    {tx.type === "debit" ? "-" : "+"}₹{tx.amount}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Balance: ₹{Math.abs(tx.balance)}{" "}
                    {tx.balance > 0 ? "(Due)" : "(Advance)"}
                  </Typography>
                </Stack>
              </Stack>
            </AppCard>
          </motion.div>
        ))}

        {/* Credit / Debit Dialog */}
        <AppDialog
          open={openDialog}
          title="Add Transaction"
          onClose={() => setOpenDialog(false)}
          actions={
            <Stack direction="row" spacing={2}>
              <AppButton color="success" onClick={() => addTransaction("credit")}>
                Credit
              </AppButton>
              <AppButton color="error" onClick={() => addTransaction("debit")}>
                Debit
              </AppButton>
            </Stack>
          }
        >
          <Typography sx={{ mb: 1 }}>Enter amount</Typography>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
        </AppDialog>
      </Box>
    </PageTransition>
  );
}

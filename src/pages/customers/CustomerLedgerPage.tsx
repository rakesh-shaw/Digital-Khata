import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Divider,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import AppCard from "../../components/ui/AppCard";
import AppButton from "../../components/ui/AppButton";
import AppDialog from "../../components/ui/AppDialog";
import PageTransition from "../../components/animations/PageTransition";
import type { Customer } from "../dashboard/DashboardPage";

/* ================= TYPES ================= */

type Transaction = {
  id: string;
  type: "credit" | "debit";
  amount: number;
  balanceAfter: number;
  date: string;
};

type LedgerState = {
  balance: number;
  transactions: Transaction[];
};

/* ================= STORAGE HELPERS ================= */

const getLedgerKey = (id: string) => `ledger_${id}`;

const loadLedger = (customer: Customer): LedgerState => {
  const raw = localStorage.getItem(getLedgerKey(customer.id));
  if (!raw) {
    return {
      balance: customer.balance,
      transactions: [],
    };
  }
  return JSON.parse(raw);
};

const saveLedger = (id: string, data: LedgerState) => {
  localStorage.setItem(getLedgerKey(id), JSON.stringify(data));
};

/* ================= COMPONENT ================= */

export default function CustomerLedgerPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const customer = state as Customer;

  const [balance, setBalance] = useState<number>(customer.balance);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [open, setOpen] = useState(false);

  /* Load ledger on mount */
  useEffect(() => {
    const ledger = loadLedger(customer);
    setBalance(ledger.balance);
    setTransactions(ledger.transactions);
  }, [customer]);

  /* Persist on change */
  useEffect(() => {
    saveLedger(customer.id, { balance, transactions });
  }, [balance, transactions, customer.id]);

  const handleCredit = () => {
    if (amount <= 0) return;

    const newBalance = balance + amount;

    const tx: Transaction = {
      id: crypto.randomUUID(),
      type: "credit",
      amount,
      balanceAfter: newBalance,
      date: new Date().toLocaleString(),
    };

    setTransactions((prev) => [tx, ...prev]);
    setBalance(newBalance);
    setAmount(0);
    setOpen(false);
  };

  const handleDebit = () => {
    if (amount <= 0) return;

    const newBalance = balance - amount;

    const tx: Transaction = {
      id: crypto.randomUUID(),
      type: "debit",
      amount,
      balanceAfter: newBalance,
      date: new Date().toLocaleString(),
    };

    setTransactions((prev) => [tx, ...prev]);
    setBalance(newBalance);
    setAmount(0);
    setOpen(false);
  };

  return (
    <PageTransition>
      <Box sx={{ p: 3 }}>
        <AppButton variant="text" onClick={() => navigate(-1)}>
          ← Back
        </AppButton>

        <Typography variant="h5" fontWeight={600} mt={2}>
          {customer.name}
        </Typography>

        {/* Balance */}
        <AppCard sx={{ mt: 3, p: 2 }}>
          <Typography variant="subtitle2">Current Balance</Typography>
          <Typography
            variant="h6"
            fontWeight={600}
            color={balance < 0 ? "error.main" : "success.main"}
          >
            ₹{Math.abs(balance)} {balance < 0 ? "Due" : "Advance"}
          </Typography>
        </AppCard>

        {/* Actions */}
        <Stack direction="row" spacing={2} mt={3}>
          <AppButton color="success" fullWidth onClick={() => setOpen(true)}>
            Credit
          </AppButton>
          <AppButton color="error" fullWidth onClick={() => setOpen(true)}>
            Debit
          </AppButton>
        </Stack>

        {/* Transactions */}
        <Typography variant="h6" mt={4} mb={1}>
          Transactions
        </Typography>

        {transactions.length === 0 && (
          <Typography color="text.secondary">
            No transactions yet.
          </Typography>
        )}

        {transactions.map((tx, index) => (
          <motion.div
            key={tx.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <AppCard sx={{ p: 2, mb: 2 }}>
              <Stack direction="row" justifyContent="space-between">
                <Box>
                  <Typography fontWeight={500}>
                    {tx.type === "credit" ? "Credit" : "Debit"} ₹{tx.amount}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {tx.date}
                  </Typography>
                </Box>

                <Typography
                  fontWeight={600}
                  color={
                    tx.balanceAfter < 0
                      ? "error.main"
                      : "success.main"
                  }
                >
                  ₹{Math.abs(tx.balanceAfter)}
                </Typography>
              </Stack>
            </AppCard>
          </motion.div>
        ))}

        {/* Dialog */}
        <AppDialog open={open} title="Enter Amount" onClose={() => setOpen(false)}>
          <TextField
            fullWidth
            type="number"
            label="Amount"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            sx={{ mb: 2 }}
          />

          <Divider sx={{ mb: 2 }} />

          <Stack direction="row" spacing={2}>
            <AppButton color="success" fullWidth onClick={handleCredit}>
              Credit
            </AppButton>
            <AppButton color="error" fullWidth onClick={handleDebit}>
              Debit
            </AppButton>
          </Stack>
        </AppDialog>
      </Box>
    </PageTransition>
  );
}

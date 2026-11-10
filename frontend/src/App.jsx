import { useEffect, useState } from 'react';
import { createExpense, getExpenses, deleteExpense, updateExpense } from './services/expenseService.js';
import ExpenseForm from './components/ExpenseForm.jsx';
import ExpenseList from './components/ExpenseList.jsx';

function App() {
  const [expenses, setExpenses] = useState([]);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const [editingExpense, setEditingExpense] = useState(null);

  // Run once when component loads
  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const data = await getExpenses();
        setExpenses(data);
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    loadExpenses();
  }, []);

  const resetForm = () => {
      setTitle('');
      setAmount('');
      setCategory('');
    };

  // Create or update an expense
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingExpense) {
      const updatedExpense = {
        title,
        amount: Number(amount),
        category,
      };

      try {
        const data = await updateExpense(editingExpense.id, updatedExpense);

        setExpenses((prevExpenses) =>
          prevExpenses.map((expense) =>
            expense.id === editingExpense.id ? data : expense));

        resetForm();
        setEditingExpense(null);

      } catch (error) {
        console.error('Error updating expense:', error);
      }
    } else {
      const newExpense = {
        title,
        amount: Number(amount),
        category,
      };

      try {
        const data = await createExpense(newExpense);

        setExpenses((prevExpenses) => [...prevExpenses, data]);
        resetForm();

      } catch (error) {
        console.error('Error adding expense:', error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      setExpenses((prevExpenses) =>
        prevExpenses.filter(
          expense => Number(expense.id) !== Number(id)));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  // Enter editing mode and populate the form with the selected expense
  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setTitle(expense.title);
    setAmount(expense.amount);
    setCategory(expense.category);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Expense Tracker</h1>

      <ExpenseForm
        onSubmit={handleSubmit}
        title={title}
        amount={amount}
        category={category}
        onTitleChange={setTitle}
        onAmountChange={setAmount}
        onCategoryChange={setCategory}
        isEditing={editingExpense !== null}
      />

      <hr />

      <h2>Expenses</h2>

      <ExpenseList
        expenses={expenses}
        onDelete={handleDelete}
        onEdit={handleEdit} />
    </div>
  );
}

export default App;
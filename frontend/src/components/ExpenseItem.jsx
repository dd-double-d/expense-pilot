function ExpenseItem({
  expense,
  onDelete,
  onEdit }) {
  return (
    <div>
      <p>
        <strong>{expense.title}</strong> — ${expense.amount} (
        {expense.category})
      </p>
      <button onClick={() => onDelete(expense.id)}>
        Delete
      </button>
      <button onClick={() => onEdit(expense)}>
        Edit
      </button>
    </div>
  );
}

export default ExpenseItem;
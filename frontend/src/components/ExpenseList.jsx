import ExpenseItem from "./ExpenseItem";

function ExpenseList({
	expenses,
	onDelete,
	onEdit}) {
    if (!expenses || expenses.length === 0) {
        return <p>No expenses found.</p>;
    }

	return (
		<>
			{expenses.map((expense) => (
				<ExpenseItem
					key={expense.id}
					expense={expense}
					onDelete={onDelete}
					onEdit={onEdit}
				/>
			))}
		</>
  );
}

export default ExpenseList;
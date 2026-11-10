function ExpenseForm({
  title,
  amount,
  category,
  onTitleChange,
  onAmountChange,
  onCategoryChange,
  onSubmit,
  isEditing,
 }) {
    return (
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => onAmountChange(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        />

        <button type="submit">{isEditing ? 'Save Changes' : 'Add Expense'}</button>
      </form>
    )
}

export default ExpenseForm;
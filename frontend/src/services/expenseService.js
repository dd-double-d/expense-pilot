const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const checkResponse = (response) => {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

export const getExpenses = async () => {
  try {
    const response = await fetch(`${API_URL}/expenses`);
    checkResponse(response);

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error fetching expenses:', error);
    throw error;
  }
};

export const createExpense = async (newExpense) => {
  try {
    const response = await fetch(`${API_URL}/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newExpense),
    });
    checkResponse(response);

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error creating expense:', error);
    throw error;
  }
};

export const deleteExpense = async (id) => {
  try {
    const response = await fetch(`${API_URL}/expenses/${id}`, {
      method: 'DELETE',
    });
    checkResponse(response);

  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};

export const updateExpense = async (id, updatedExpense) => {
  try {
    const response = await fetch(`${API_URL}/expenses/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedExpense),
    });
    checkResponse(response);

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }
};

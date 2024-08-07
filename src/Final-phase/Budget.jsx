import React, { useState, useCallback } from 'react';
import 'boxicons/css/boxicons.min.css';
import '../Final-phase/Budget.css';

const Budget = () => {
  const [budgetAmount, setBudgetAmount] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
  const [percentageUsed, setPercentageUsed] = useState(0);
  const [selectAddExpense, setSelectAddExpense] = useState(false);
  const [newExpenseAmount, setNewExpenseAmount] = useState('');
  const [newExpenseCategory, setNewExpenseCategory] = useState('');
  const [newExpenseDescription, setNewExpenseDescription] = useState('');
  const [selectEditButton, setSelectEditButton] = useState(false);

  const selectAddExpenseclick = useCallback(() => {
    setSelectAddExpense(prevState => !prevState);
  }, []);


    const handleRemoveExpense = useCallback((indexToRemove) => {
    setExpenses(prevExpenses => {
      const newExpenses = prevExpenses.filter((_, index) => index !== indexToRemove);
      const amountToRemove = prevExpenses[indexToRemove].amount;

     
      setTotalExpenseAmount((prevAmount) => {
       
        const updatedAmount = Math.max(prevAmount - amountToRemove, 0);
      
      
        const newPercentage = Math.min((updatedAmount / budgetAmount) * 100, 100);
      
        setPercentageUsed(newPercentage);
      
        return updatedAmount;
      });
      return newExpenses;
    });
  }, [budgetAmount]);

  const handleSaveExpense = useCallback(() => {
    if (newExpenseAmount && newExpenseCategory && newExpenseDescription) {
      const amount = parseFloat(newExpenseAmount);
      setExpenses(prevExpenses => [
        ...prevExpenses,
        {
          amount,
          category: newExpenseCategory,
          description: newExpenseDescription,
        },
      ]);

      
      setTotalExpenseAmount(prevAmount => {
        const updatedAmount = prevAmount + amount;
      
        const newPercentage = Math.min((updatedAmount / budgetAmount) * 100, 100);
        setPercentageUsed(newPercentage);
        return updatedAmount;
      });

      setNewExpenseAmount('');
      setNewExpenseCategory('');
      setNewExpenseDescription('');
      setSelectAddExpense(false);
    }
  }, [newExpenseAmount, newExpenseCategory, newExpenseDescription, budgetAmount]);

  const getCategoryIcon = useCallback((category) => {
    switch (category) {
      case 'food':
        return <i className='bx bxs-bowl-rice'></i>;
      case 'transport':
        return <i className='bx bxs-car'></i>;
      case 'utilities':
        return <i className='bx bxs-home'></i>;
      case 'entertainment':
        return <i className='bx bxs-movie'></i>;
      case 'health':
        return <i className='bx bxs-heart'></i>;
      default:
        return <i className='bx bx-question-mark'></i>;
    }
  }, []);

  const handleEditBBudgetButton = useCallback(() => {
    setSelectEditButton(prevState => !prevState);
  }, []);

  const selectEditButtonclick = useCallback(() => {
    setSelectEditButton(false);
  }, []);
  
  const handleSaveClick = useCallback((event) => {
    if (event.key === "Enter") {
      const newBudgetAmount = parseFloat(event.target.value);
      setBudgetAmount(newBudgetAmount);

      setPercentageUsed((totalExpenseAmount / newBudgetAmount) * 100);
    }
  }, [totalExpenseAmount]);

  return (
    <>
      <div className="budget-planner "id="expense">
        <div className="budget-header">
          <div className="budget-h1">
            <h1>Budgeting</h1>
          </div>
          <div className="expense-button">
            <button
              className="expense-button1"
              onClick={selectAddExpenseclick}
              style={{ cursor: 'pointer' }}
            >
              Add Expense
            </button>
          </div>
        </div>
        <div className="budget-setter">
          <div className="budget-container">
            <div className="budget-amount">
              <div
                className="expenseAmount"
                style={{ height: '70px', fontSize: '45px', padding: '10px' }}
              >
                ${totalExpenseAmount.toLocaleString()}
              </div>
              <div
                className="budget-percentage"
                style={{ padding: '0 0px 0 15px' }}
              >
                <div
                  className="percentageb"
                  style={{
                    backgroundColor: 'gray',
                    width: '95%',
                    height: '6px',
                    borderRadius: '10px',
                  }}
                >
                  <div
                    className="real-percentage"
                    style={{
                      backgroundColor: 'blue',
                      width: `${percentageUsed}%`,
                      height: '100%',
                      borderRadius: '10px',
                      maxWidth: '100%'
                    }}
                  ></div>
                </div>
              </div>
              <div
                className="budget-amount"
                style={{
                  height: '50px',
                  textAlign: 'right',
                  padding: '10px 5px',
                }}
              >
                <span style={{ fontSize: '20px', marginTop: '15px' }}>
                  Budget: ${budgetAmount}
                </span>
              </div>
            </div>
            <div className="budget-currency">
              <div className="b11">
                <button className="edit-budget" onClick={handleEditBBudgetButton}>
                  Edit Budget
                </button>
              </div>
              <div className="b22">
                <button className="currency-setting">Setting</button>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <div className="budget-expense" style={{ paddingBottom: '100px' }}>
          <div className="expenses-header" >
            <span className='ex-head'>Expenses</span>
          </div>
          <div className="expense-list" style={{  }}>
            {expenses.map((expense, index) => (
              <div key={index} className="expense-item" style={{ paddingTop: '20px' }}>
                <div className="expense-description">
                  <div className="description-Icon">
                    <div className="expense-category1">
                      {getCategoryIcon(expense.category)}
                    </div>
                    <div className="description-title" style={{ padding: '10px' }}>
                      <strong>Description:</strong> {expense.description}
                      <br />
                      <strong>Category:</strong> {expense.category}
                    </div>
                  </div>
                </div>
                <div className="expense-amount">
                  $ {expense.amount}
                  <button className="remove-expense" onClick={() => handleRemoveExpense(index)}>
                  <i class='bx bx-trash'></i>
                </button>
                </div>
               


              </div>
            ))}
          </div>
        </div>
      </div>

      {selectAddExpense && (
        <div className="Add-expense-background">
          <div
            className="Add-expense"
           
          >
            <button
              className="cancel-expense"
              style={{
               
                border:'none',
                backgroundColor:'white',
                cursor:'pointer'
                
              }}
              onClick={selectAddExpenseclick}
            >
              X
            </button>
            <div
              className="addexpbox"
              style={{ marginTop: '-40px', width: '80%' }}
            >
              <h1
                style={{ marginTop: '0px', textAlign: 'center', width: '100%' }}
              >
                Add Expenses
              </h1>
            </div>
            <div className="addexpbox">
              <input
                type="number"
                className="amountSelector"
             
                placeholder="Enter amount"
                value={newExpenseAmount}
                onChange={(e) => setNewExpenseAmount(e.target.value)}
              />
            </div>
            <div className="addexpbox" >
              <select
                className="expense-category"
              
                value={newExpenseCategory}
                onChange={(e) => setNewExpenseCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                <option value="food">Food</option>
                <option value="transport">Transport</option>
                <option value="utilities">Utilities</option>
                <option value="entertainment">Entertainment</option>
                <option value="health">Health</option>
              </select>
            </div>
            <div className="addexpbox" >
              <input
                type="text"
                className="descriptionSelector"
                style={{ width: '95%' ,height:'50px',borderRadius:'20px'}}
                placeholder="Enter description"
                value={newExpenseDescription}
                onChange={(e) => setNewExpenseDescription(e.target.value)}
              />
            </div>
            <div className="addexpbox">
              <button className="addexbutton" onClick={handleSaveExpense}  >
                <span style={{ marginLeft: '160px'}}>Save</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {selectEditButton && (
        <div className="Add-expense-background">
          <div
            className="Add-expense"
            style={{
              backgroundColor: "white",
              width: "450px",
              height: "200px",
              padding: '20px'
            }}
          >
            <h2 className="set-budget-heading" style={{ textAlign: "center", margin: "0px 0" }}>Set Budget</h2>
            <input
              type="text"
              placeholder="Enter budget amount"
              className="expense-input"
              style={{ marginTop: '0px', width: '300px', height: '30px' }}
              onKeyDown={(event) => handleSaveClick(event)}
            />
            <button
              className="editbuttonclose"
              onClick={selectEditButtonclick}
              style={{ backgroundColor: 'red', height: '40px', color: 'white', fontWeight: 'bold', borderRadius: '20px', border: 'none' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Budget;

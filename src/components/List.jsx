import React, { useContext } from "react";
import { ThemeContext } from "./ThemeProvider";
import "./TodoList.css";

const List = () => {
  const {
    theme,
    toggleTheme,
    handleSearch,
    handleSortChange,
    sortOrder,
    handleStatusFilterChange,
    statusFilter,
    isEditMode,
    handleAddingData,
    formData,
    setFormData,
    handleInput,
    setIsEdit,
    setIsEditMode,
    filteredTodos,
    handleEdit,
    handleDelete,
  } = useContext(ThemeContext);

  const getStatusClass = (status) => {
    return status === "Completed" ? "status-completed" : "status-in-progress";
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className={`todo-app ${theme}`}>
      <div className="container">
        <header className="app-header">
          <h1>Todo Manager</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>
        </header>

        <section className="search-filters">
          <div className="search-container">
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Search todos..."
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="filters-container">
            <div className="filter-group">
              <label>Sort by:</label>
              <select
                onChange={handleSortChange}
                value={sortOrder}
                className="filter-select"
              >
                <option value="none">Date (Default)</option>
                <option value="recent">Most Recent</option>
                <option value="older">Oldest First</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Status:</label>
              <select
                onChange={handleStatusFilterChange}
                value={statusFilter}
                className="filter-select"
              >
                <option value="none">All Tasks</option>
                <option value="In-Progress">In-Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        </section>

        <section className="form-section">
          <h2 className="section-title">
            {isEditMode ? "Edit Todo" : "Add New Todo"}
          </h2>
          <form onSubmit={handleAddingData} className="todo-form">
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                placeholder="What needs to be done?"
                onChange={handleInput}
                className="form-control"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                placeholder="Add details about your task"
                onChange={handleInput}
                className="form-control"
                rows="3"
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInput}
                className="form-control"
              >
                <option value="In-Progress">In-Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="date">Due Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleInput}
                className="form-control"
              />
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className={`btn btn-primary ${
                  isEditMode ? "btn-update" : "btn-add"
                }`}
              >
                {isEditMode ? "Update Todo" : "Add Todo"}
              </button>

              {isEditMode && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsEdit(null);
                    setIsEditMode(false);
                    setFormData({
                      title: "",
                      description: "",
                      status: "In-Progress",
                      date: "",
                    });
                  }}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="todos-section">
          <h2 className="section-title">Todo List</h2>

          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <p>No todos found.</p>
              {statusFilter !== "none" || sortOrder !== "none" ? (
                <p className="empty-state-hint">Try adjusting your filters</p>
              ) : null}
            </div>
          ) : (
            <div className="todos-container">
              {filteredTodos.map((item) => (
                <div
                  key={item.firebaseId}
                  className={`todo-card ${
                    item.status === "Completed" ? "completed" : ""
                  }`}
                >
                  <div className="todo-content">
                    <h3 className="todo-title">{item.title}</h3>
                    <p className="todo-description">{item.description}</p>
                    <div className="todo-meta">
                      <span
                        className={`todo-status ${getStatusClass(item.status)}`}
                      >
                        {item.status}
                      </span>
                      <span className="todo-date">
                        {item.id ? formatDate(item.id) : ""}
                      </span>
                    </div>
                  </div>

                  <div className="todo-actions">
                    <button
                      onClick={() => handleEdit(item)}
                      className="btn btn-edit"
                      aria-label="Edit todo"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="btn btn-delete"
                      aria-label="Delete todo"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default List;
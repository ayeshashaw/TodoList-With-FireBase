import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "In-Progress",
    date: "",
  });
  const [theme, setTheme] = useState("light");
  const [todoList, setTodoList] = useState([]);
  const [isEdit, setIsEdit] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("none");
  const [statusFilter, setStatusFilter] = useState("none");
  const [dateFilter, setDateFilter] = useState("");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // Fetch todos from Firebase
  const fetchingData = async () => {
    try {
      const res = await axios.get(
        "https://todo-763d2-default-rtdb.asia-southeast1.firebasedatabase.app/todo.json"
      );

      if (res.data) {
        const loadedData = Object.entries(res.data).map(
          ([firebaseId, value]) => ({
            firebaseId,
            ...value,
          })
        );
        setTodoList(loadedData);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  // Handle input change
  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleAddingData = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      return alert("Please enter both title and description.");
    }

    try {
      if (isEditMode && isEdit) {
        const updatedTask = {
          id: isEdit.id,
          ...formData,
        };

        await axios.put(
          `https://todo-763d2-default-rtdb.asia-southeast1.firebasedatabase.app/todo/${isEdit.firebaseId}.json`,
          updatedTask
        );

        const updatedList = todoList.map((item) =>
          item.id === isEdit.id
            ? { ...updatedTask, firebaseId: item.firebaseId }
            : item
        );
        setTodoList(updatedList);
      } else {
        const newTask = {
          id: Date.now(),
          ...formData,
        };

        const res = await axios.post(
          "https://todo-763d2-default-rtdb.asia-southeast1.firebasedatabase.app/todo.json",
          newTask
        );

        const newTodo = { ...newTask, firebaseId: res.data.name };
        setTodoList([...todoList, newTodo]);
      }

      // Reset form
      setFormData({
        title: "",
        description: "",
        status: "In-Progress",
        date: "",
      });
      setIsEdit(null);
      setIsEditMode(false);
    } catch (err) {
      console.error("Error saving data:", err);
    }
  };

  // Handle edit
  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      description: item.description,
      status: item.status,
    });
    setIsEdit(item);
    setIsEditMode(true);
  };

  // Handle delete
  const handleDelete = async (item) => {
    try {
      await axios.delete(
        `https://todo-763d2-default-rtdb.asia-southeast1.firebasedatabase.app/todo/${item.firebaseId}.json`
      );

      const updatedList = todoList.filter(
        (t) => t.firebaseId !== item.firebaseId
      );
      setTodoList(updatedList);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  // Handle search
  const handleSearch = (e) => {
    const input = e.target.value.toLowerCase();
    setQuery(input);
  };

  // Filtered list for rendering
  const filteredTodos = todoList
    .filter(
      (item) =>
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query)
    )
    .filter((item) => {
      if (!dateFilter) return true;
      return item.date === dateFilter;
    })

    .filter((item) =>
      statusFilter === "none" ? true : item.status === statusFilter
    )
    .sort((a, b) => {
      if (sortOrder === "recent") return b.id - a.id;
      if (sortOrder === "older") return a.id - b.id;

      return 0;
    });

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <div>
      <ThemeContext.Provider
        value={{
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
          dateFilter,
          setDateFilter,
        }}
      >
        {children}
      </ThemeContext.Provider>
    </div>
  );
};

export default ThemeProvider;

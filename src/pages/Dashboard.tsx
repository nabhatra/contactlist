import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { useAppSelector } from "../app/hooks";
import { logout, selectAuth } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { name } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    toast.success("User Logout Successfully");
    navigate("/auth");
  };

  type Contact = {
    id: number;
    name: string;
    email: string;
    category: string;
  };

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [nameFilter, setNameFilter] = useState<string>("");
  const [alphabetFilter, setAlphabetFilter] = useState<string>("All");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");

  useEffect(() => {
    axios
      .get<Contact[]>("http://localhost:3001/contacts")
      .then((response) => setContacts(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleNameFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNameFilter(e.target.value);
    setAlphabetFilter("All");
  };

  // Extract unique starting letters from contact names
  const alphabetOptions = Array.from(
    new Set(contacts.map((contact) => contact.name[0]))
  ).sort();

  const filteredContacts = contacts.filter(
    (contact) =>
      (contact.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
        contact.email.toLowerCase().includes(nameFilter.toLowerCase())) &&
      (alphabetFilter === "All" ||
        contact.name.toLowerCase().startsWith(alphabetFilter.toLowerCase())) &&
      (categoryFilter === "All" || contact.category === categoryFilter)
  );

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand" href="#">
            Welcome {name} to Dashboard
          </a>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={() => handleLogout()}
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="vh-100 gradient-custom">
        <div className="container py-4 h-100">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title fw-bold mb-3">Contact List</h2>
              {/* Search Box */}
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search contacts"
                  value={nameFilter}
                  onChange={handleNameFilterChange}
                />
              </div>

              {/* Alphabet Filter */}
              <select
                value={alphabetFilter}
                onChange={(e) => setAlphabetFilter(e.target.value)}
              >
                <option value="All">Search by Alphabet</option>
                {alphabetOptions.map((letter) => (
                  <option key={letter} value={letter}>
                    {letter}
                  </option>
                ))}
              </select>
              <div>
                <button
                  className="btn btn-secondary mt-2"
                  onClick={() => {
                    setNameFilter("");
                    setAlphabetFilter("All");
                    setCategoryFilter("All");
                  }}
                >
                  Clear Filters
                </button>
              </div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredContacts.map((contact) => (
                    <tr key={contact.id}>
                      <td>{contact.name}</td>
                      <td>{contact.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;





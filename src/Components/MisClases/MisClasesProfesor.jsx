import React from 'react';
import './MisClases.css';
import CardClases from '../Card/Card';


function MisClasesProfesor() {
            return (
          <div className="App">
            <h1>React CRUD App</h1>
            <h3>Employee List</h3>
            <div className="form">
              <input
                type="text"
                placeholder="Enter Employee Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Employee Age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <input

                type="text"
                placeholder="Enter Employee Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Employee Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
              />
              <input

                type="text"
                placeholder="Enter Employee Wage"
                value={wage}
                onChange={(e) => setWage(e.target.value)}
              />
              <button onClick={addEmployee}>Add Employee</button>
            </div>
            <div className="employees">
              {employees.map((val, key) => {
                return (
                  <div className="employee">
                    <h3>{val.name}</h3>
                    <h4>{val.age}</h4>
                    <h4>{val.country}</h4>
                    <h4>{val.position}</h4>
                    <h4>{val.wage}</h4>
                    <button
                      onClick={() => {
                        deleteEmployee(val.id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        updateEmployee(val.id);
                      }}
                    >
                      Update
                    </button>
                  </div>
                );
              }
              )}
            </div>
          </div>
          );
          }


export default MisClasesProfesor;
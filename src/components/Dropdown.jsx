import React, { useEffect, useState, useContext } from "react";
import { client } from "../Client/contentful";
import { ContentfulContext } from "./ContentfulContext";
import "../css/dropdown.css";

function Dropdown({ setSelectedItem }) {
  const { data: ListItems } = useContext(ContentfulContext);

  const getCategoryname = () => {
    //creating Categorynames
      const categories = ListItems.map((item) => {
      let Names = item.fields.blogCategory;
      return Names;
    });
    /*By using the forEach() method, we can iterate over the elements in the array,
       and we will push into the new array if it doesn’t exist in the array.*/

    const getUniqueCategories = () => {
        const uniqueNames = [];
        categories.forEach((name) => {
        if (!uniqueNames.includes(name)) {
        uniqueNames.push(name);
        }
      });
      return uniqueNames;
    };
    //initializing UniqueCategories

    const UniqueCategories = getUniqueCategories();
     return UniqueCategories;
  };
  const Categorynames = getCategoryname();

  const handleSelect = (name) => {
    const item = ListItems.find((item) => item.fields.blogCategory === name);
    setSelectedItem(item);
  };

  const handleChange = (event) => {
    const selectedCategory = event.target.value;

    if (selectedCategory === "default") {
      return;
    }
    const item = ListItems.find((item) => {
      return item.fields.blogCategory === selectedCategory;
    });
    setSelectedItem(item);
    console.log("Selected Item:", item);
  };

  return (
    <select className="dropdown-menu" onChange={handleChange}>
      <option value="default">Blogs</option>
      {Categorynames.map((name, id) => {
        return (
          <option key={id} value={name}>
            {name}
          </option>
        );
      })}
    </select>
  );
}
export default Dropdown;

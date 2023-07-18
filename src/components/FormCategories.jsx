import { useState, useEffect } from "react";
import { useTrivia } from "../contexts/TriviaContext";

function FormCategories() {
  const [categories, setCategories] = useState([]);
  const { category, dispatch, status } = useTrivia();

  useEffect(
    function () {
      async function fetchCategories() {
        try {
          const res = await fetch(`https://opentdb.com/api_category.php`);
          const data = await res.json();
          setCategories(data.trivia_categories);
          dispatch({
            type: "categories/loaded",
          });
        } catch (error) {
          dispatch({ type: "dataFailed" });
        }
      }
      fetchCategories();
    },
    [dispatch]
  );

  if (status === "loading") return;

  return (
    <select
      id="category"
      name="category"
      value={category}
      onChange={(e) =>
        dispatch({ type: "category/changed", payload: e.target.value })
      }
    >
      <option value="">Any Category</option>

      {categories.map((category) => (
        <option value={category.id} key={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}

export default FormCategories;

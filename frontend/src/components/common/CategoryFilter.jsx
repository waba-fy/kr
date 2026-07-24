const CategoryFilter = ({
  value = "All",
  onChange,
  options = [],
  allLabel = "All Categories",
  disabled = false,
  id = "category-filter",
  label = "Category",
}) => {
  return (
    <div className="kr-category-filter">
      <label htmlFor={id}>{label}</label>

      <select
        id={id}
        value={value}
        onChange={(event) =>
          onChange?.(event.target.value)
        }
        disabled={disabled}
      >
        <option value="All">{allLabel}</option>

        {options.map((option) => {
          const optionValue =
            typeof option === "string"
              ? option
              : option.value;

          const optionLabel =
            typeof option === "string"
              ? option
              : option.label;

          return (
            <option
              key={optionValue}
              value={optionValue}
            >
              {optionLabel}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CategoryFilter;
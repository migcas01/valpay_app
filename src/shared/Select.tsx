import ReactSelect, {
  type Props,
  components,
  type DropdownIndicatorProps,
} from "react-select";
import { ChevronsUpDown, type LucideIcon } from "lucide-react";

const selectStyles = {
  size: {
    small: {
      control: "py-1 px-1",
      label: "text-xs",
      option: "px-2 py-1.5 text-xs",
      input: "text-xs",
      singleValue: "text-xs",
    },
    medium: {
      control: "py-2 px-2.5",
      label: "text-sm",
      option: "p-3 py-2 text-sm",
      input: "text-sm",
      singleValue: "text-sm",
    },
    large: {
      control: "py-3 px-2",
      label: "text-base",
      option: "px-4 py-3 text-base",
      input: "text-base",
      singleValue: "text-base",
    },
  },
  container: "w-full",
  control: {
    base: "flex border rounded-md transition-all duration-200 outline-none bg-gray-50",
    focus: "border-amber-500",
    nonFocus: "border-transparent hover:border-gray-200",
  },
  placeholder: "text-gray-500 font-medium",
  menu: "mt-2 bg-white border border-gray-100 rounded-md z-50",
  menuList: "flex flex-col",
  option: {
    base: "cursor-pointer transition-colors rounded-md",
    focused: "bg-amber-50 text-amber-700",
    selected: "bg-amber-500 text-white",
    neutral: "bg-white text-gray-700 hover:bg-gray-100",
  },
  noOptions: "p-3 text-sm text-gray-400 text-center",
};

interface CustomSelectProps extends Props {
  label?: string;
  icon?: LucideIcon;
  size?: keyof typeof selectStyles.size;
}

export function Select({
  label,
  icon: Icon = ChevronsUpDown,
  size = "medium",
  ...props
}: CustomSelectProps) {
  const s = selectStyles.size[size];

  const DropdownIndicator = (indicatorProps: DropdownIndicatorProps) => (
    <components.DropdownIndicator {...indicatorProps}>
      <Icon size={20} className="text-gray-400" />
    </components.DropdownIndicator>
  );

  return (
    <div className={selectStyles.container}>
      {label && (
        <label
          className={`block font-medium text-left text-gray-600 mb-1.5 ${s.label}`}
        >
          {label}
        </label>
      )}
      <ReactSelect
        unstyled
        components={{ DropdownIndicator }}
        classNames={{
          control: ({ isFocused }) =>
            [
              selectStyles.control.base,
              s.control,
              isFocused
                ? selectStyles.control.focus
                : selectStyles.control.nonFocus,
            ].join(" "),
          placeholder: () => `${selectStyles.placeholder} ${s.input}`,
          input: () => `text-gray-800 ${s.input}`,
          singleValue: () => `text-gray-800 font-medium ${s.singleValue}`,
          menu: () => selectStyles.menu,
          menuList: () => selectStyles.menuList,
          option: ({ isFocused, isSelected }) =>
            [
              selectStyles.option.base,
              s.option,
              isSelected
                ? selectStyles.option.selected
                : isFocused
                  ? selectStyles.option.focused
                  : selectStyles.option.neutral,
            ].join(" "),
          noOptionsMessage: () => selectStyles.noOptions,
        }}
        {...props}
      />
    </div>
  );
}

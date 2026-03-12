import ReactSelect, {
  type Props,
  components,
  type DropdownIndicatorProps,
} from "react-select";
import { ChevronsUpDown, type LucideIcon } from "lucide-react";
import { useId } from "react";

const selectStyles = {
  size: {
    small: {
      control: "py-1.5 px-3",
      label: "text-xs",
      option: "px-3 py-1.5 text-xs",
      input: "text-xs",
      singleValue: "text-xs",
    },
    medium: {
      control: "py-2.5 px-4",
      label: "text-sm",
      option: "px-4 py-2.5 text-sm",
      input: "text-sm",
      singleValue: "text-sm",
    },
    large: {
      control: "py-3.5 px-5",
      label: "text-md",
      option: "px-5 py-3 text-base",
      input: "text-base",
      singleValue: "text-base",
    },
  },
  container: "flex flex-col gap-1.5 w-full",
  control: {
    base: "flex border rounded-xl outline-none bg-gray-50 z-50",
    focus: "ring-4 ring-amber-500/10 border-amber-500 bg-white",
    nonFocus: "border-gray-200 hover:border-gray-300",
  },
  placeholder: "text-gray-400",
  menu: "absolute -translate-y-6 pt-6 bg-white border border-gray-100 rounded-b-xl shadow-lg shadow-gray-200/50 overflow-hidden z-50",
  menuList: "p-1",
  option: {
    base: "cursor-pointer transition-colors rounded-lg mb-0.5 last:mb-0",
    focused: "bg-amber-50 text-amber-600",
    selected: "bg-amber-500 text-white",
    neutral: "bg-white text-gray-700 hover:bg-gray-50",
  },
  menuHeights: {
    small: 125,
    medium: 195,
    large: 250,
  },
  noOptions: "p-4 text-sm text-gray-400 text-center",
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
  const id = useId();

  const DropdownIndicator = (indicatorProps: DropdownIndicatorProps) => (
    <components.DropdownIndicator {...indicatorProps}>
      <div className="flex items-center justify-center">
        <Icon
          size={size === "small" ? 14 : 18}
          className={`transition-colors ${
            indicatorProps.isFocused ? "text-amber-500" : "text-gray-400"
          }`}
        />
      </div>
    </components.DropdownIndicator>
  );

  return (
    <div className={selectStyles.container}>
      {label && (
        <label
          htmlFor={id}
          className={`font-bold text-gray-400 uppercase tracking-widest ml-1 ${s.label}`}
        >
          {label}
        </label>
      )}
      <ReactSelect
        unstyled
        inputId={id}
        components={{
          DropdownIndicator,
          IndicatorSeparator: () => null,
        }}
        maxMenuHeight={selectStyles.menuHeights[size]}
        classNames={{
          control: ({ isFocused }) =>
            `
              ${selectStyles.control.base}
              ${s.control}
              ${isFocused ? selectStyles.control.focus : selectStyles.control.nonFocus}
            `,
          valueContainer: () => "p-0 gap-1",
          input: () => `m-0 p-0 text-gray-800 ${s.input}`,
          placeholder: () => `${selectStyles.placeholder} ${s.input}`,
          singleValue: () => `text-gray-800 font-medium ${s.singleValue}`,
          menu: () => selectStyles.menu,
          menuList: () => selectStyles.menuList,
          option: ({ isFocused, isSelected }) =>
            `
              ${selectStyles.option.base}
              ${s.option}
              ${
                isSelected
                  ? selectStyles.option.selected
                  : isFocused
                    ? selectStyles.option.focused
                    : selectStyles.option.neutral
              }
            `,
          noOptionsMessage: () => selectStyles.noOptions,
        }}
        {...props}
      />
    </div>
  );
}

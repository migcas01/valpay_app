import { Check } from "lucide-react";

export interface StepItem {
  label: string;
  description?: string;
}

interface StepperProps {
  steps: StepItem[];
  currentStep: number; // 0-indexed
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-center w-full">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <li
              key={step.label}
              className={["flex items-center", !isLast ? "flex-1" : ""].join(" ")}
            >
              <div className="flex flex-col items-center gap-1">
                <div
                  className={[
                    "w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all font-bold text-sm shrink-0",
                    isCompleted
                      ? "bg-amber-500 border-amber-500 text-white"
                      : isActive
                        ? "bg-white border-amber-500 text-amber-500"
                        : "bg-white border-gray-200 text-gray-400",
                  ].join(" ")}
                >
                  {isCompleted ? (
                    <Check size={16} strokeWidth={2.5} />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="text-center hidden sm:block">
                  <p
                    className={[
                      "text-xs font-semibold whitespace-nowrap",
                      isActive
                        ? "text-amber-600"
                        : isCompleted
                          ? "text-gray-700"
                          : "text-gray-400",
                    ].join(" ")}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-[10px] text-gray-400">{step.description}</p>
                  )}
                </div>
              </div>

              {!isLast && (
                <div
                  className={[
                    "flex-1 h-0.5 mx-3 mt-[-18px] sm:mt-[-32px] transition-all",
                    isCompleted ? "bg-amber-500" : "bg-gray-200",
                  ].join(" ")}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

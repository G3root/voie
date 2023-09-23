import * as React from "react";
import { Input, InputProps } from "./input";
import { Label } from "./label";
import { cx } from "class-variance-authority";

interface TextInputProps extends Omit<InputProps, "id"> {
  label: string;
  hideLabel?: boolean;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  (props, ref) => {
    const id = React.useId();
    const { label, hideLabel = false, ...rest } = props;
    return (
      <div className="flex flex-col gap-y-2">
        <Label className={cx(hideLabel && "sr-only")} htmlFor={id}>
          {label}
        </Label>
        <Input id={id} {...rest} ref={ref} />
      </div>
    );
  }
);

TextInput.displayName = "TextInput";

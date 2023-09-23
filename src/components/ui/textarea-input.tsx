import * as React from "react";
import { Textarea, TextareaProps } from "./textarea";
import { Label } from "./label";
import { cx } from "class-variance-authority";

interface TextAreaInputProps extends Omit<TextareaProps, "id"> {
  label: string;
  hideLabel?: boolean;
}

export const TextAreaInput = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaInputProps
>((props, ref) => {
  const id = React.useId();
  const { label, hideLabel = false, ...rest } = props;
  return (
    <div className="flex flex-col gap-y-2">
      <Label className={cx(hideLabel && "sr-only")} htmlFor={id}>
        {label}
      </Label>
      <Textarea id={id} {...rest} ref={ref} />
    </div>
  );
});

TextAreaInput.displayName = "TextAreaInput";

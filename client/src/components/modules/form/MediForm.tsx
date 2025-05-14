/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, FormProvider, SubmitHandler, FieldValues } from "react-hook-form";
import { Form } from "antd";
import { ReactNode, useImperativeHandle, forwardRef } from "react";
import { cn } from "@/lib/utils";

type TFormConfig = {
  defaultValues?: Record<string, any>;
  resolver?: any;
};
type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  className?: string;
} & TFormConfig;

const MediForm = forwardRef(({ onSubmit, children, defaultValues, resolver, className }: TFormProps, ref) => {
  const methods = useForm({ defaultValues, resolver });

  useImperativeHandle(ref, () => methods);

  const submit = (data: FieldValues) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <Form className={cn("", className)} layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
});

export default MediForm;

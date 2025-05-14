/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { cn } from "@/lib/utils";
// import { Form } from "antd";
// import { ReactNode } from "react";
// import {
//   FieldValues,
//   FormProvider,
//   SubmitHandler,
//   useForm,
// } from "react-hook-form";

// type TFormConfig = {
//   defaultValues?: Record<string, any>;
//   resolver?: any;
// };
// type TFormProps = {
//   onSubmit: SubmitHandler<FieldValues>;
//   children: ReactNode;
//   className: string;
// } & TFormConfig;
// const MediForm = ({
//   onSubmit,
//   children,
//   defaultValues,
//   resolver,
//   className,
// }: TFormProps) => {
//   const formConfig: TFormConfig = {
//     defaultValues,
//     resolver,
//   };
//   if (defaultValues) {
//     formConfig["defaultValues"] = defaultValues;
//   }
//   if (resolver) {
//     formConfig["resolver"] = resolver;
//   }
//   const methods = useForm(formConfig);
//   const submit = (data: FieldValues) => {
//     onSubmit(data);
//     methods.reset();
//   };
//   return (
//     <FormProvider {...methods}>
//       <Form
//         className={cn("", className)}
//         layout="vertical"
//         onFinish={methods.handleSubmit(submit)}
//       >
//         {children}
//       </Form>
//     </FormProvider>
//   );
// };

// export default MediForm;



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

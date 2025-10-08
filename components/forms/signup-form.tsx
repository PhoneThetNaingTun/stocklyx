"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { companySchema, CompanySchema } from "@/schema/companySchema";
import { RegisterSchema, registerSchema } from "@/schema/registerSchema";
import { useSignupMutation } from "@/store/Apis/authApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { showToast } from "../toaster";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Spinner } from "../ui/spinner";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [userData, setUserData] = useState<RegisterSchema>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [handleSignUp, { isLoading }] = useSignupMutation();

  // user data form
  const userDataForm = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  // company data form
  const companyDataForm = useForm<CompanySchema>({
    resolver: zodResolver(companySchema),
    defaultValues: { company_name: "", company_logo: undefined },
    mode: "onBlur",
  });
  const companyDataFileRef = companyDataForm.register("company_logo");

  const handleSubmitUserData = (value: RegisterSchema) => {
    if (value.password !== value.confirmPassword) {
      userDataForm.setError("confirmPassword", {
        message: "Password does not match",
      });

      return;
    }
    setUserData(value);
    setPage(2);
  };
  const handleSubmitCompanyData = async (value: CompanySchema) => {
    try {
      const data = await handleSignUp({
        user: userData,
        company: value,
      }).unwrap();
      showToast({ title: "Account created successfully", type: "success" });
      router.replace("/dashboard");
    } catch (error: any) {
      if (error.data) {
        showToast({
          title: "Error",
          description: error.data.message,
          type: "error",
        });
        return;
      }
      showToast({
        title: "Something went wrong",
        type: "error",
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2 min-h-96">
          {page == 1 && (
            <Form {...userDataForm}>
              <form
                className="p-6 md:p-8"
                onSubmit={userDataForm.handleSubmit(handleSubmitUserData)}
              >
                <FieldGroup>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                      Enter your email below to create your account
                    </p>
                  </div>
                  {userDataForm.formState.isValid && (
                    <div className="flex justify-end">
                      <Button
                        variant={"ghost"}
                        onClick={() => {
                          setPage(2);
                        }}
                      >
                        <IconArrowRight />
                      </Button>
                    </div>
                  )}
                  <Field>
                    <FormField
                      control={userDataForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>User Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Jhon Doe"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={userDataForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="b4y0r@example.com"
                              disabled={isLoading}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FieldDescription>
                      We&apos;ll use this to contact you. We will not share your
                      email with anyone else.
                    </FieldDescription>
                  </Field>
                  <Field>
                    <Field className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Field>
                        <FormField
                          control={userDataForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="••••••••"
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </Field>
                      <Field>
                        <FormField
                          control={userDataForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="••••••••"
                                  disabled={isLoading}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </Field>
                    </Field>
                  </Field>
                  <Field>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading && <Spinner />}Next
                    </Button>
                  </Field>

                  <FieldDescription className="text-center">
                    Already have an account? <a href="/login">Login</a>
                  </FieldDescription>
                </FieldGroup>
              </form>
            </Form>
          )}
          {page == 2 && (
            <Form {...companyDataForm}>
              <form
                className="p-6 md:p-8"
                onSubmit={companyDataForm.handleSubmit(handleSubmitCompanyData)}
              >
                <FieldGroup>
                  <div className="flex flex-col items-center gap-2 text-center">
                    <h1 className="text-2xl font-bold">Create your company</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                      Enter your company details below
                    </p>
                  </div>
                  <div>
                    <Button
                      variant={"ghost"}
                      onClick={() => {
                        setPage(1);
                      }}
                    >
                      <IconArrowLeft />
                    </Button>
                  </div>
                  <Field>
                    <FormField
                      control={companyDataForm.control}
                      name="company_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Company Name"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Field>
                  <Field>
                    <FormField
                      control={companyDataForm.control}
                      name="company_logo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Picture</FormLabel>
                          <FormControl>
                            <Input
                              {...companyDataFileRef}
                              placeholder="logo"
                              type="file"
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </Field>
                  <Field>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading && <Spinner />} Create Company
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
            </Form>
          )}
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              width={0}
              height={0}
            />
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}

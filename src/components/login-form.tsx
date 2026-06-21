import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FieldDescription } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import config from "@/config";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronLeft, KeyRound, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import Password from "./ui/Password";
const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });
  const demoUsers = [
    { label: "ADMIN", email: "super@gmail.com", password: "12345678" },
    {
      label: "User",
      email: "pogramar2050@gmail.com",
      password: "20302030@Ww",
    },
  ];
  const handleSubmit = async (data: z.infer<typeof loginSchema>) => {
    const toastId: string | number | undefined =
      toast.loading(" logging in...");
    try {
      const res = await login(data).unwrap();

      if (res.success) {
        toast.success("Welcome to Jarir books store!", { id: toastId });
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Login failed", { id: toastId });

      if (error.status === 401) {
        toast.error("Your account is not Verified");
        navigate("/verify", { state: data.email });
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6 p-6"
            >
              {/* Header Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 mb-6">
                  <Link
                    to="/"
                    className="flex items-center text-sm font-semibold text-primary hover:gap-1 transition-all"
                  >
                    <ChevronLeft className="h-4 w-4" /> Back to Home
                  </Link>
                </div>
                <h1 className="text-3xl font-black tracking-tight text-foreground">
                  Welcome <span className="text-primary">Back</span>
                </h1>
                <p className="text-muted-foreground text-sm font-medium">
                  Jarir books store .
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="name@email.com"
                            className="pl-10 h-12 bg-background border-border/50 focus-visible:ring-1 rounded-md"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Password
                        </FormLabel>
                        {/* <ForgotPasswordDialog /> */}
                      </div>
                      <FormControl>
                        <div className="relative">
                          <Password {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-base font-bold rounded-md shadow-none shadow-primary/20 hover:scale-[1.02] transition-transform active:scale-95"
              >
                Login
              </Button>

              <div className="space-y-3 pt-2">
                <p className="text-[10px] text-center font-bold uppercase tracking-widest text-muted-foreground">
                  Quick Access Demo
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {demoUsers.map((user) => (
                    <button
                      key={user.label}
                      type="button"
                      onClick={() => {
                        form.setValue("email", user.email);
                        form.setValue("password", user.password);
                      }}
                      className="px-3 py-1.5 text-xs font-bold rounded-sm border border-border hover:border-primary hover:text-primary transition-all bg-background/50"
                    >
                      {user.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="relative py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground font-semibold tracking-tighter">
                    Social Access
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                type="button"
                className="w-full h-12 rounded-md border-border/50 hover:bg-secondary font-semibold transition-all"
                onClick={() =>
                  (window.location.href = `${config.base_url}/auth/google`)
                }
              >
                Sign in with Google
              </Button>

              <p className="text-center text-sm text-muted-foreground font-medium">
                jarir books?{" "}
                <Link
                  to="/register"
                  className="text-primary font-bold hover:underline underline-offset-4"
                >
                  Create Account
                </Link>
              </p>
            </form>
          </Form>
          <div className="bg-muted relative hidden md:block">
            {/* leaft side img */}
          </div>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        {" "}
        this jarir books store
      </FieldDescription>
    </div>
  );
}

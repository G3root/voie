import { SignInForm } from "./components/form";

export default function SignUpPage() {
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className=" sm:rounded-2xl  max-w-lg w-full">
        <div className="px-4 py-8 sm:px-16">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}

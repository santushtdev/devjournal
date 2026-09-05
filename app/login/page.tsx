
"use client"

import type { FormEvent } from "react"
import { signIn } from "next-auth/react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function CardDemo() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    console.log("LOGIN RESULT:", result)

    if (result?.ok) {
      window.location.href = "/dashboard";
    }
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center px-4 py-6 sm:px-6 sm:py-8">
      <Card className="w-full max-w-sm rounded-xl">
        <CardHeader className="gap-3">
          <CardTitle className="text-xl sm:text-2xl">
            Login to your account
          </CardTitle>

          <CardDescription className="max-w-xs text-sm leading-5">
            Enter your email below to login to your account
          </CardDescription>

          <CardAction>
            <Link href="/register">
              <Button variant="link" className="px-2">
                Sign Up
              </Button>
            </Link>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">
                  Email
                </Label>

                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="min-w-0"
                />
              </div>

              <div className="grid gap-2">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  <Label htmlFor="password">
                    Password
                  </Label>

                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="min-w-0"
                />
              </div>
            </div>

            <CardFooter className="flex-col gap-2 px-0">
              <Button
                type="submit"
                className="w-full rounded-xl"
              >
                Login
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </main>
  )
}

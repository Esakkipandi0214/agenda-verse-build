"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, ArrowRight, RotateCcw } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function GoogleError() {
  const [countdown, setCountdown] = useState(10)
  const router = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router("/auth")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleRetryGoogle = () => {
    // Implement Google OAuth retry
    console.log("Retrying Google login...")
  }

  const handleGoToLogin = () => {
    router("/auth")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        </div>

        <Card className="relative backdrop-blur-sm bg-white/80 border-0 shadow-2xl">
          <CardContent className="p-8 text-center space-y-6">
            {/* Google Logo with Error State */}
            <div className="relative">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-red-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <svg className="w-8 h-8 text-white" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-3 h-3 text-white" />
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Google Sign-in Failed
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed">
                We couldn't complete your Google authentication. This might be due to account restrictions or a
                cancelled authorization.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleRetryGoogle}
                className="w-full hidden bg-gradient-to-r from-blue-600 to-red-500 hover:from-blue-700 hover:to-red-600 text-white border-0 h-12 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02]"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Try Google Again
              </Button>

              <Button
                onClick={handleGoToLogin}
                variant="outline"
                className="w-full h-12 rounded-xl border-2 border-gray-200 hover:border-gray-300 font-medium transition-all duration-200 bg-transparent"
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Go to Login Page
              </Button>
            </div>

            {/* Auto-redirect countdown */}
            <div className="pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                Redirecting to login in <span className="font-mono font-bold text-blue-600">{countdown}</span> seconds
              </p>
              <div className="w-full bg-gray-200 rounded-full h-1 mt-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-red-500 h-1 rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${((10 - countdown) / 10) * 100}%` }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

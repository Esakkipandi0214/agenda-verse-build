"use client"

import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, ArrowRight, RotateCcw, Github } from "lucide-react"

export default function GitHubError() {
  const [countdown, setCountdown] = useState(10)
  const router = useNavigate()

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router("/login")
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [router])

  const handleRetryGitHub = () => {
    // Implement GitHub OAuth retry
    console.log("Retrying GitHub login...")
  }

  const handleGoToLogin = () => {
    router("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <Card className="relative backdrop-blur-sm bg-white/10 border border-white/20 shadow-2xl">
          <CardContent className="p-8 text-center space-y-6">
            {/* GitHub Logo with Error State */}
            <div className="relative">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <Github className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-3 h-3 text-white" />
              </div>
            </div>

            {/* Error Message */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                GitHub Sign-in Failed
              </h1>
              <p className="text-gray-300 text-sm leading-relaxed">
                Unable to authenticate with GitHub. This could be due to repository access restrictions or authorization
                cancellation.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleRetryGitHub}
                className="w-full hidden bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white border-0 h-12 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02]"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Try GitHub Again
              </Button>

              <Button
                onClick={handleGoToLogin}
                variant="outline"
                className="w-full h-12 rounded-xl border-2 border-white/30 hover:border-white/50 bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-200"
              >
                <ArrowRight className="mr-2 h-4 w-4" />
                Go to Login Page
              </Button>
            </div>

            {/* Auto-redirect countdown */}
            <div className="pt-4 border-t border-white/20">
              <p className="text-xs text-gray-400">
                Redirecting to login in <span className="font-mono font-bold text-purple-400">{countdown}</span> seconds
              </p>
              <div className="w-full bg-white/20 rounded-full h-1 mt-2">
                <div
                  className="bg-gradient-to-r from-gray-500 to-purple-500 h-1 rounded-full transition-all duration-1000 ease-linear"
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

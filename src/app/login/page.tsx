'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LogIn } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock login, just redirect to dashboard
    router.push('/')
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-gradient-to-tr from-[#007AFF] to-[#5AC8FA] rounded-2xl flex items-center justify-center shadow-md">
            <span className="text-3xl font-bold text-white tracking-tight">Z</span>
          </div>
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold text-[#1D1D1F] tracking-tight">
          Sign in to ZOOKIE
        </h2>
        <p className="mt-2 text-center text-sm font-medium text-[#86868B]">
          Sports Club Management System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="mac-glass py-10 px-4 sm:rounded-3xl sm:px-10 shadow-sm border border-black/5">
          <form className="space-y-5" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#1D1D1F] ml-1">
                Apple ID or Email
              </label>
              <div className="mt-2 relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 bg-white border border-black/5 rounded-xl text-[#1D1D1F] shadow-sm placeholder-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent transition-all duration-200"
                  placeholder="admin@zookie.club"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#1D1D1F] ml-1">
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 bg-white border border-black/5 rounded-xl text-[#1D1D1F] shadow-sm placeholder-[#86868B] focus:outline-none focus:ring-2 focus:ring-[#007AFF] focus:border-transparent transition-all duration-200"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#007AFF] hover:bg-[#0056b3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#007AFF] transition-all duration-200 active:scale-[0.98]"
              >
                <LogIn className="w-5 h-5 mr-2" />
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

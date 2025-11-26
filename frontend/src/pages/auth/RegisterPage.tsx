import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useAuthStore } from '@/store/authStore'

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().optional(),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

type RegisterValues = z.infer<typeof registerSchema>

const RegisterPage = () => {
  const navigate = useNavigate()
  const registerUser = useAuthStore((state) => state.register)
  const isAuthenticating = useAuthStore((state) => state.isAuthenticating)
  const authError = useAuthStore((state) => state.error)
  const [successMessage, setSuccessMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: RegisterValues) => {
    await registerUser(values)
    if (!useAuthStore.getState().error) {
      setSuccessMessage('Workspace ready! Redirecting to your dashboard…')
      setTimeout(() => navigate('/app'), 600)
    }
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="font-display text-3xl text-slate-900 dark:text-white">Create workspace</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Invite your team, connect billing, and start sending invoices.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Full name
          </label>
          <Input placeholder="Ariana Steele" error={errors.name?.message} {...register('name')} />
        </div>
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Company
          </label>
          <Input placeholder="Invoice Generator" {...register('company')} />
        </div>
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Email
          </label>
          <Input type="email" placeholder="you@company.com" error={errors.email?.message} {...register('email')} />
        </div>
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            Password
          </label>
          <Input
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />
        </div>
        {authError ? <p className="text-sm text-rose-400">{authError}</p> : null}
        {successMessage ? <p className="text-sm text-emerald-400">{successMessage}</p> : null}
        <Button type="submit" className="w-full" isLoading={isAuthenticating}>
          Create account
        </Button>
      </form>
      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        Already onboard?{' '}
        <Link to="/auth/login" className="text-brand-300 underline">
          Log in
        </Link>
      </p>
    </section>
  )
}

export default RegisterPage

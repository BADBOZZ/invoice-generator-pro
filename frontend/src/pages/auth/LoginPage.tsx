import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useAuthStore } from '@/store/authStore'

const loginSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginValues = z.infer<typeof loginSchema>

const LoginPage = () => {
  const navigate = useNavigate()
  const authenticate = useAuthStore((state) => state.authenticate)
  const isAuthenticating = useAuthStore((state) => state.isAuthenticating)
  const authError = useAuthStore((state) => state.error)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (values: LoginValues) => {
    await authenticate(values)
    if (!useAuthStore.getState().error) {
      navigate('/app')
    }
  }

  return (
    <section className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="font-display text-3xl text-slate-900 dark:text-white">Log in</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Access invoices, approvals, and payments in seconds.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
        <Button type="submit" className="w-full" isLoading={isAuthenticating}>
          Sign in
        </Button>
      </form>
      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
        Need an account?{' '}
        <Link to="/auth/register" className="text-brand-300 underline">
          Register
        </Link>
      </p>
    </section>
  )
}

export default LoginPage

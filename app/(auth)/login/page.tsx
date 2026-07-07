'use client'
import { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import { useRouter } from 'next/navigation'
import { useForm } from '@tanstack/react-form'
import { Button } from '@/components/ui/button'
import { useUserStore } from '../../store/userStore'

function LoginForm() {
    
  const router = useRouter()
  const { UserLogin, isAuthenticated, error, loading, infoUser } = useUserStore()
  const form = useForm({
    defaultValues: { email: '', password: '' },
    onSubmit: async ({ value }) => {
      await UserLogin(value)
    },
  })

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('user', JSON.stringify(infoUser)); 
      localStorage.setItem('role', infoUser.role || ''); 
      router.push('/home')
    }
  }, [isAuthenticated, router])

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ backgroundColor: '#fffaf7' }}>
      <div className="relative z-20 flex min-h-screen items-center justify-center px-4 py-8">
        <div className="w-full max-w-5xl rounded-3xl bg-white shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            
            <div className="hidden md:flex items-center justify-center p-12">
              <div className="text-center">
                <img src="/auth.svg" alt="Auth illustration" className="w-72 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-white mb-3">Bienvenue sur Flow</h2>
                <p className="text-gray-400" >Connectez-vous pour accéder à votre espace</p>
              </div>
            </div>

            <div className="p-12 flex flex-col justify-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Connexion</h1>
              <p className="text-gray-500 mb-8">Accédez à votre espace sécurisé</p>

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  form.handleSubmit()
                }}
                className="flex flex-col gap-4"
              >
                {/* Email */}
                <form.Field
                  name="email"
                  children={(field) => (
                    <div className="flex flex-col">
                      <label htmlFor={field.name} className="mb-2 text-sm font-medium text-gray-700">Email</label>
                      <input
                        id={field.name}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="exemple@mail.com"
                        type="email"
                        required
                      />
                    </div>
                  )}
                />

                {/* Password */}
                <form.Field
                  name="password"
                  children={(field) => (
                    <div className="flex flex-col">
                      <label htmlFor={field.name} className="mb-2 text-sm font-medium text-gray-700">Mot de passe</label>
                      <input
                        id={field.name}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="••••••••"
                        type="password"
                        required
                      />
                    </div>
                  )}
                />

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-black hover:bg-black text-white mt-4 py-6"
                >
                  {loading ? 'Connexion en cours...' : 'Se connecter'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm
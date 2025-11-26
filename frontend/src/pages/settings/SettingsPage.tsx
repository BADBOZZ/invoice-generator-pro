import Button from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import PageHeader from '@/components/ui/PageHeader'

const toggles = [
  { label: 'Invoice reminders', description: 'Send automatic reminders before due dates.' },
  { label: 'Payment receipts', description: 'Email customers when payments succeed.' },
  { label: 'Weekly digest', description: 'Summaries every Monday to finance admins.' },
]

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        subtitle="Control branding, taxes, notifications, and automation rules."
      />

      <Card>
        <CardHeader className="items-center justify-between">
          <div>
            <CardTitle>Brand identity</CardTitle>
            <CardDescription>Set the logo and accent used on invoices.</CardDescription>
          </div>
          <Button size="sm" variant="secondary">
            Update
          </Button>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Input placeholder="Company name" defaultValue="Acme Studios" />
          <Input placeholder="Reply-to email" defaultValue="billing@acme.studio" />
          <Input placeholder="Support URL" defaultValue="https://support.acme.studio" />
          <Input placeholder="Primary color" defaultValue="#2563eb" />
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="items-center justify-between">
          <div>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Choose which events trigger alerts.</CardDescription>
          </div>
          <Button size="sm" variant="ghost">
            Pause all
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {toggles.map((toggle) => (
            <label
              key={toggle.label}
              className="flex items-center justify-between rounded-2xl border border-slate-200/70 bg-white p-4 dark:border-white/5 dark:bg-white/5"
            >
              <span>
                <p className="font-medium text-slate-900 dark:text-white">{toggle.label}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{toggle.description}</p>
              </span>
              <input type="checkbox" defaultChecked className="h-4 w-4 accent-brand-500" />
            </label>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="items-center justify-between">
          <div>
            <CardTitle>Automations</CardTitle>
            <CardDescription>Trigger workflows for approvals and reminders.</CardDescription>
          </div>
          <Button size="sm" variant="secondary">
            Create rule
          </Button>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-500 dark:text-slate-300">
          <div className="rounded-2xl border border-slate-200/70 bg-white p-4 dark:border-white/5 dark:bg-white/5">
            <p className="font-semibold text-slate-900 dark:text-white">Auto-remind overdue</p>
            <p>Send follow-up emails 2 days after due date with payment link.</p>
          </div>
          <div className="rounded-2xl border border-slate-200/70 bg-white p-4 dark:border-white/5 dark:bg-white/5">
            <p className="font-semibold text-slate-900 dark:text-white">Auto-assign approver</p>
            <p>Quotes over $10k route to Finance for secondary approval.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SettingsPage

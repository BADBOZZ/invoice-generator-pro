import Button from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import PageHeader from '@/components/ui/PageHeader'

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
        </CardContent>
      </Card>
    </div>
  )
}

export default SettingsPage

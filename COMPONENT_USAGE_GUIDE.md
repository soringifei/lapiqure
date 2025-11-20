# Component Usage Guide

Quick reference for using the new admin dashboard UI/UX components.

## Component Location

All components are in `/components/crm/` directory:
- `EmptyState.tsx` - Empty state views
- `StatusBadge.tsx` - Status indicators
- `SkeletonLoader.tsx` - Loading skeletons
- `PageHeader.tsx` - Page headers
- `ValidationFeedback.tsx` - Form validation feedback
- `BatchActionsToolbar.tsx` - Batch operations toolbar
- `animations.css` - Global animations (auto-imported via DashboardLayout)

## Quick Examples

### EmptyState
```tsx
import { EmptyState } from '@/components/crm/EmptyState'

<EmptyState
  icon="📭"
  title="No customers yet"
  description="Add your first customer to get started."
  primaryAction={{
    label: 'Add Customer',
    onClick: () => setShowForm(true),
  }}
  secondaryAction={{
    label: 'Import',
    onClick: () => handleImport(),
  }}
/>
```

### StatusBadge
```tsx
import { StatusBadge } from '@/components/crm/StatusBadge'

// Active status
<StatusBadge status="active" />

// Draft with tooltip
<StatusBadge 
  status="draft" 
  tooltip="Waiting for review"
/>

// Without dot indicator
<StatusBadge status="published" showDot={false} />

// Supported statuses:
// 'active' | 'inactive' | 'draft' | 'published' | 
// 'pending' | 'error' | 'processing' | 'completed' | 'cancelled'
```

### SkeletonLoader
```tsx
import { SkeletonLoader } from '@/components/crm/SkeletonLoader'

// Table loading
{loading ? (
  <SkeletonLoader variant="table" rows={5} columns={6} />
) : (
  // your table
)}

// List loading
{loading ? (
  <SkeletonLoader variant="list" rows={8} />
) : (
  // your list
)}

// Card grid loading
{loading ? (
  <SkeletonLoader variant="card" rows={3} />
) : (
  // your cards
)}

// Form loading
{loading ? (
  <SkeletonLoader variant="form" rows={4} />
) : (
  // your form
)}
```

### PageHeader
```tsx
import { PageHeader } from '@/components/crm/PageHeader'

<PageHeader
  title="Customers"
  description="Manage your customer database"
  subtitle={`${customers.length} total customers`}
  breadcrumbs={[
    { label: 'Dashboard', href: '/crm' },
    { label: 'Customers' },
  ]}
  actions={
    <Button onClick={handleAdd}>
      <Plus size={20} />
      Add Customer
    </Button>
  }
/>
```

### ValidationFeedback
```tsx
import { ValidationFeedback } from '@/components/crm/ValidationFeedback'

<div>
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
  {email && !isValidEmail(email) && (
    <ValidationFeedback
      state="error"
      message="Please enter a valid email address"
    />
  )}
  {email && isValidEmail(email) && (
    <ValidationFeedback
      state="success"
      message="Email looks good!"
    />
  )}
</div>

// States: 'success' | 'error' | 'warning' | 'info' | 'none'
```

### BatchActionsToolbar
```tsx
import { BatchActionsToolbar } from '@/components/crm/BatchActionsToolbar'

<BatchActionsToolbar
  selectedCount={selectedIds.length}
  actions={[
    {
      id: 'delete',
      label: 'Delete',
      icon: Trash2,
      variant: 'destructive',
      onClick: () => handleBatchDelete(),
    },
    {
      id: 'export',
      label: 'Export',
      icon: Download,
      onClick: () => handleExport(),
    },
  ]}
  onClearSelection={() => setSelectedIds([])}
/>
```

### Animations (Auto-loaded)

The animations CSS is automatically imported via DashboardLayout. Use these classes:

```tsx
// Entry animations
<div className="animate-slide-in-up">Content slides up</div>
<div className="animate-fade-in">Content fades in</div>
<div className="animate-scale-in">Content scales in</div>

// Loading animations
<div className="animate-shimmer">Shimmer effect for skeletons</div>
<div className="animate-pulse-subtle">Subtle pulse effect</div>
<div className="animate-spin-slow">Slow rotation</div>

// Transitions
<button className="transition-smooth hover:scale-up">
  Smooth transitions
</button>

// Focus states
<input className="focus-ring" />
```

## Integration Pattern

### Standard Page Structure
```tsx
import { PageHeader } from '@/components/crm/PageHeader'
import { EmptyState } from '@/components/crm/EmptyState'
import { SkeletonLoader } from '@/components/crm/SkeletonLoader'
import { StatusBadge } from '@/components/crm/StatusBadge'

export default function MyPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  // Loading state
  if (loading) {
    return (
      <DashboardLayout>
        <div className="space-y-6">
          <div className="h-20 bg-secondary/5 rounded animate-shimmer" />
          <SkeletonLoader variant="table" rows={5} columns={4} />
        </div>
      </DashboardLayout>
    )
  }

  // Empty state
  if (data.length === 0) {
    return (
      <DashboardLayout>
        <PageHeader title="My Page" />
        <div className="bg-card border border-border rounded">
          <EmptyState
            icon="📭"
            title="No items yet"
            description="Create your first item to get started."
            primaryAction={{
              label: 'Add Item',
              onClick: () => {},
            }}
          />
        </div>
      </DashboardLayout>
    )
  }

  // Content with data
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <PageHeader
          title="My Page"
          description="Manage your items"
          actions={<Button onClick={handleAdd}>Add Item</Button>}
        />

        <div className="space-y-3">
          {data.map((item) => (
            <div key={item.id} className="p-4 border border-border rounded">
              <div className="flex justify-between items-center">
                <span>{item.name}</span>
                <StatusBadge status={item.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
```

## Best Practices

1. **Always use PageHeader** for consistent page titles and actions
2. **Show SkeletonLoader during loading** for better perceived performance
3. **Use EmptyState** when no data is available (much better UX than empty tables)
4. **Apply StatusBadge** to all status/state fields
5. **Use ValidationFeedback** in forms for real-time feedback
6. **Leverage animations** for smooth transitions but don't overdo it
7. **Keep action buttons in PageHeader** for consistency
8. **Use semantic status names** (active, pending, error, etc.)

## Color Reference

### Status Badge Colors
- `active` - Accent-olive (green) ✓ Active
- `inactive` - Muted (gray) ✗ Inactive
- `draft` - Yellow Draft
- `published` - Blue Published
- `pending` - Orange Pending
- `error` - Red ✗ Error
- `processing` - Blue Processing
- `completed` - Green ✓ Completed
- `cancelled` - Red ✗ Cancelled

### Primary Color
- Primary: `#0479c8` (blue)
- Dark theme with luxury spacing

## Accessibility Notes

- All components support keyboard navigation
- StatusBadge includes ARIA labels
- Focus states use `focus-ring` class
- Semantic HTML for screen readers
- Color contrast meets WCAG AA standards

## Performance Tips

1. Skeleton loaders reduce CLS (Cumulative Layout Shift)
2. Animations use CSS (no JavaScript overhead)
3. Components are lightweight (~7KB total)
4. Tree-shaking removes unused components
5. No external animation libraries needed

---

**Last Updated**: November 20, 2025  
**Components**: 7 new components + animations  
**Coverage**: 8 CRM pages fully enhanced
